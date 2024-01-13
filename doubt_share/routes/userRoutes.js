const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/userModel');
const Tutor = require('../models/tutorModel');
const jwt = require('jsonwebtoken')


//resgiter a user

router.post('/register', async (req, res) => {
    try {

        const userExists = await User.findOne({ email: req.body.email })

        if (userExists) {
            return res.send({
                success: false,
                message: 'User Alreay Exists'
            })   
        } 

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password , salt)
        req.body.password = hashedPassword

        const newUser = new User(req.body)
        const u_response = await newUser.save()

        const tutorId = u_response._id;

        const newTutorAvail = new Tutor({
            "tutor": tutorId,
            "lastPingTime": new Date()
        })
        const t_response = await newTutorAvail.save()

        res.send({ success: true, message: "Registration Successfull , Please login" , user_response: u_response, tutor_response: t_response});

    } catch (error) {
        console.log(error)
    }
})

//login Route

router.post('/login' , async (req , res)=>{
    const user = await User.findOne({email : req.body.email})
   if(!user){
        return res.send({
            success : false,
            message : 'User does not exist'
        })
    } 

    const validPassword = await bcrypt.compare(req.body.password , user.password)
     
    if(!validPassword){
        return res.send({
            success : false,
            message : 'Invalid Password'
        })
    }


    const token = jwt.sign({userId : user._id} , process.env.jwt_secret , {expiresIn :"1d"})

    console.log(token)


   res.send({
        success : true,
        message : 'User Logged in',
        data : token
    })
})


module.exports = router
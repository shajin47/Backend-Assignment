const router = require('express').Router()
const bcrypt = require('bcrypt')
const Doubt = require('../models/doubtModel');
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')


//resgiter a user

router.post('/add',authMiddleware, async (req, res) => {
    try {
        const newDoubt = new Doubt(req.body)
        await newDoubt.save()

        res.send({ success: true, message: "New doubt has been created!" });

    } catch (error) {
        console.log(error) 
    }
})

//login Routes

router.get('/all-doubts' ,authMiddleware, async (req , res)=>{
    try {
        const studentId = req.body.userId
        const doubts = await Doubt.find({ student : studentId})
          .sort( {createdAt : -1})
          .exec();
        res.json(doubts);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router
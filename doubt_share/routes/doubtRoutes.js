const router = require('express').Router()
const Doubt = require('../models/doubtModel');
const authMiddleware = require('../middlewares/authMiddleware')


//all-doubts

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

//add doubts

router.post('/add',authMiddleware, async (req, res) => {
    try {
        const newDoubt = new Doubt(req.body)
        await newDoubt.save()

        res.send({ success: true, message: "New doubt has been created!" });

    } catch (error) {
        console.log(error) 
    }
})



module.exports = router

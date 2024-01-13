const router = require("express").Router();
const bcrypt = require("bcrypt");
const Tutor = require("../models/tutorModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

//resgiter a user

router.post("/update",authMiddleware, async (req, res) => {
  try {
    const tutor = req.body.userId;

    // Update the tutor availability with the current system time
    const response = await Tutor.findOneAndUpdate(
      { tutor: tutor },
      { lastPingTime: new Date() },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Tutor availability updated successfully" , response: response});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/get", async (req, res) => {
    try {
        // Assuming your Tutor model has a 'lastPingTime' field
        const now = new Date();
        const availableTutorsCount = await Tutor.countDocuments({
          lastPingTime: { $gt: new Date(now - 1000000) }, // Tutors with last ping time within the last 10 seconds
        }); 
    
        console.log(`Real-time available tutors: ${availableTutorsCount}`);
        res.status(200)
            
      } catch (error) {
        console.error('Error counting available tutors:', error);
        res.status(500)
      }
    });

module.exports = router;

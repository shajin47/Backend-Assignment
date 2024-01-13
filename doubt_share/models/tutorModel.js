const mongoose = require('mongoose')

const tutorAvailabilitySchema = new mongoose.Schema({
   tutor : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "users"
   },
   lastPingTime : {
    type : Date
   }
})    
 

module.exports = mongoose.model('tutorAvailability' , tutorAvailabilitySchema ) 
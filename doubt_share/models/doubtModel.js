const mongoose = require('mongoose')

const doubtSchema = new mongoose.Schema({
    doubt : {
        type: String
    },

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})
 

module.exports = mongoose.model('doubts' , doubtSchema ) 
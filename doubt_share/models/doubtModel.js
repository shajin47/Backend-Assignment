const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const doubtSchema = new mongoose.Schema({
    doubt : {
        type: String
    },

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps : true });
 

module.exports = mongoose.model('doubts' , doubtSchema ) 
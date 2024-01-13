const express = require("express");
var cors = require('cors');

const app = express();


var corsOptions = {
    origin: '*'
}
app.use(cors(corsOptions));
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const userRoute = require('./routes/userRoutes')
const doubtRoute = require('./routes/doubtRoutes')
const tutorAvail = require('./routes/tutorRoutes')

app.use(express.json());
app.use('/api/users' , userRoute)  ;
app.use('/api/doubts' , doubtRoute)  ;
app.use('/api/tutor-availability' , tutorAvail)  ;




app.listen(process.env.PORT,()=>{
    console.log(`Server listening to ${process.env.PORT}`)
})        
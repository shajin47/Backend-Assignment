const axios = require('axios');
const cron = require('node-cron');

// Function to count real-time available tutors
const countAvailableTutors = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8080/api/tutor-availability/get');
    const tutorAvailability = response.data;

    console.log(`Real-time available tutors: ${tutorAvailability}`);
  } catch (error) {
    console.error('Error counting available tutors:', error.message);
  }
};

// CRON job to run every second
cron.schedule('* * * * * *', () => {
  countAvailableTutors();
});

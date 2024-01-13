import React, { useEffect } from 'react';
import axios from 'axios';

const TutorAvailabilityUpdater = () => {
  const updateTutorPingTime = async () => {
      // Make an API request to update the Tutor's ping time
      axios.post('http://127.0.0.1:8080/api/tutor-availability/update', {}, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWExMWQ5ZTgwZWFlN2UyZWYwY2RjMWYiLCJpYXQiOjE3MDUwNTg5MzYsImV4cCI6MTcwNTE0NTMzNn0.KmjjcYrkPp4bmgA2Za41srmJGpmCKhprTWVc9ohkW1c',
        'Content-Type': 'application/json'
    },
    })
    .then((response) => {
      console.log(`ping updated :${JSON.stringify(response)}`);
    })
    .catch((error) => {
      console.error("here is the error"+error);
    });

  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await updateTutorPingTime();
    }, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {/* Additional component content goes here */}
    </div>
  );
};

export default TutorAvailabilityUpdater;
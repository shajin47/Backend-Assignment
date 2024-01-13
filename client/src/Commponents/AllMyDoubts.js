import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllMyDoubts =  () => {
  const [doubtHistory, setDoubtHistory] = useState([]);

  useEffect( () => {
    axios.get('http://127.0.0.1:8080/api/doubts/all-doubts', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWExNGQxNmNiMTAwOThlNDMwOTc0NDAiLCJpYXQiOjE3MDUxMjYyMTAsImV4cCI6MTcwNTIxMjYxMH0.SwRNtcE9B4bKVV5Zl-ZlLzx9_v54ILFUTMJb_KkVyBo',
      },
    })
    .then((response) => {
      setDoubtHistory(response.data);
    })
    .catch((error) => {
      console.error("here is the error"+error);
    });
  }, []); 
  console.log(doubtHistory);
  return (
    <div>
      <header>
        <h1>Doubt History</h1>
      </header>
      <main>
        <h2>Your Doubt History</h2>
        <ul>
          {doubtHistory.map((doubt, index) => (
            <li key={index}>
              {doubt.doubt} - {new Date(doubt.createdAt).toLocaleString()}
            </li>
          ))}
        </ul> 
      </main>
    </div>
  );
};

export default AllMyDoubts;

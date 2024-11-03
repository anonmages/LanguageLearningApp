import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function LearningProgress() {
  const [progressData, setProgressData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setIsLoading(true);
        const cachedData = sessionStorage.getItem("progressData");
        
        if (cachedData) {
          setProgressData(JSON.parse(cachedData));
        } else {
          const response = await axios.get(`${API_URL}/progress`);
          setProgressData(response.data);
          sessionStorage.setItem("progressData", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Failed to fetch progress data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgressData();
  }, []);
  
  if (isLoading) {
    return <div>Loading progress...</div>;
  }

  if (error) {
    return <div>Failed to load progress. Please try again later.</div>;
  }
  
  if (!progressData) {
    return <div>No progress data found.</div>;
  }
  
  return (
    <div>
      <h2>Your Learning Progress</h2>
      {progressData.map((item) => (
        <div key={item.language}>
          <h3>{item.language}</h3>
          <p>Completion: {item.completion}%</p>
          <p>Current Level: {item.currentLevel}</p>
        </div>
      ))}
    </div>
  );
}

export default LearningProgress;
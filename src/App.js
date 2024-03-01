import React, { useState, useEffect } from 'react';
import RecordForm from './RecordForm';
import CacheList from './CacheList';
import axios from 'axios';

const App = () => {
  const [cacheData, setCacheData] = useState([]);
  const [sentCount, setSentCount] = useState(0);

  // Load cached data from localStorage on component mount
  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem('cachedData')) || [];
    setCacheData(cachedData);
  }, []);

  // Save cached data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cachedData', JSON.stringify(cacheData));
  }, [cacheData]);

  const addToCache = (data) => {
    setCacheData((prevData) => [...prevData, data]);
  };

  const sendLater = async () => {
    try {
      // Loop through each cached item and send it to the server
      for (const data of cacheData) {
        await axios.post('http://localhost:3001/send_data/', data);
      }

      // Update the sent count and clear the cache
      setSentCount(sentCount + cacheData.length);
      setCacheData([]);

      alert(`Successfully sent ${cacheData.length} data items to the server.`);
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Failed to send data. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Record Management App</h1>
      <RecordForm addToCache={addToCache} />
      <CacheList cacheData={cacheData} onSendLater={sendLater} />
      <div>
        <p>Total Data Sent to API: {sentCount}</p>
      </div>
    </div>
  );
};

export default App;

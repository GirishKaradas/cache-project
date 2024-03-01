import React from 'react';

const CacheList = ({ cacheData, onSendLater }) => {
  return (
    <div>
      <h2>Unsent Data</h2>
      {cacheData.length > 0 ? (
        <ul>
          {cacheData.map((data, index) => (
            <li key={index}>
              <strong>{`Data ${index + 1}: `}</strong>
              <div>First Name: {data.fname}</div>
              <div>Last Name: {data.lname}</div>
              <div>Email: {data.email}</div>
              <div>Password: {data.pass}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No unsent data.</p>
      )}
      <button onClick={onSendLater} disabled={cacheData.length === 0}>
        Send Later
      </button>
    </div>
  );
};

export default CacheList;

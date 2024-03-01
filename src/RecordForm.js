import React, { useState } from 'react';
import axios from 'axios';

const RecordForm = ({ addToCache }) => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    pass: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/send_data/', formData);
      alert('Data sent successfully!');
    } catch (error) {
      console.error('Error sending data:', error);
      addToCache(formData);
    }

    setFormData({
      fname: '',
      lname: '',
      email: '',
      pass: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="fname" value={formData.fname} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="lname" value={formData.lname} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="pass" value={formData.pass} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecordForm;

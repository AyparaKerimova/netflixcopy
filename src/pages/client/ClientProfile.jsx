import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/api';

const ClientProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); 
      try {
        const response = await axios.get(`${BASE_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        
        setUser(response.data.data);
        setFullName(response.data.data.fullName);
        setNickname(response.data.data.nickname);
        setEmail(response.data.data.email);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    formData.append('fullName', fullName);
    formData.append('nickname', nickname);
    formData.append('email', email);
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      await axios.patch(`${BASE_URL}/users/update-profile`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', 
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 mt-24 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Edit Profile</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="profileImage" className="block text-lg mb-2">Profile Image</label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="file:border file:border-gray-400 file:bg-gray-600 file:text-white file:px-4 file:py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fullName" className="block text-lg mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nickname" className="block text-lg mb-2">Nickname</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientProfile;

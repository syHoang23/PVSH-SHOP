import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const ProfileCompoment = () => {
  const [user, setUser] = useState(null);
  const { Id } = useParams(); 

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:3002/users/user-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userid: Id })
        });
    
        if (response.ok) {
          const userInfo = await response.json();
          setUser(userInfo);
        } else {
          console.error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    if (Id) {
      fetchUserInfo();
    }
  }, [Id]); 

  return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f4f8' }}>
    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '600px', width: '100%' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Profile Page</h1>
      {user && (
        <div>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <label style={{ fontSize: '18px', color: '#555' }}>
              Welcome, <strong style={{ color: '#007bff' }}>{user[1]}</strong>!
            </label>
          </div>
  
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <label style={{ fontSize: '16px', color: '#333', width: '30%' }}>
              Username:
            </label>
            <div style={{ width: '65%', padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '4px' }}>
              {user[1]}
            </div>
          </div>
  
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <label style={{ fontSize: '16px', color: '#333', width: '30%' }}>
              Password:
            </label>
            <div style={{ width: '65%', padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '4px' }}>
              *****
            </div>
          </div>
  
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <label style={{ fontSize: '16px', color: '#333', width: '30%' }}>
              Email:
            </label>
            <div style={{ width: '65%', padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '4px' }}>
              {user[3]}
            </div>
          </div>
  
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <label style={{ fontSize: '16px', color: '#333', width: '30%' }}>
              Full Name:
            </label>
            <div style={{ width: '65%', padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '4px' }}>
              {user[4]}
            </div>
          </div>
  
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <label style={{ fontSize: '16px', color: '#333', width: '30%' }}>
              Phone Number:
            </label>
            <div style={{ width: '65%', padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '4px' }}>
              {user[5]}
            </div>
          </div>
  
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <label style={{ fontSize: '16px', color: '#333', width: '30%' }}>
              Address:
            </label>
            <div style={{ width: '65%', padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '4px' }}>
              {user[6]}
            </div>
          </div>
  
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <label style={{ fontSize: '16px', color: '#333', width: '30%' }}>
              Registration Date:
            </label>
            <div style={{ width: '65%', padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '4px' }}>
              {user[7]}
            </div>
          </div>
  
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <label style={{ fontSize: '16px', color: '#333', width: '30%' }}>
              Role:
            </label>
            <div style={{ width: '65%', padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '4px' }}>
              {user[8]}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default ProfileCompoment;

import { useState, useEffect, useLayoutEffect } from "react";
import { Link } from 'react-router-dom';
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from "../components/Users";
import auth from "../utils/auth";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

// Import your images
import brainMeeting from '../assets/images/brain-meeting.png';
import mindlessLogo from '../assets/images/mindless-logo.png';
import mindlessLogoFull from '../assets/images/mindless-logo-full.png';
import brainIcon from '../assets/images/brain-icon.png';

const Home = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (loginCheck) {
      fetchUsers();
    }
  }, [loginCheck]);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Your login logic here
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loginCheck ? (
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: '#86A7E8',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '80px',
            padding: '0 40px'
          }}>
            {/* Left Side - Brain Meeting Image */}
            <div style={{
              width: '500px',
              height: '500px',
              border: '2px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <img 
                src={brainMeeting} 
                alt="Brain Meeting Illustration" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Right Side - Login Form */}
            <div style={{
              width: '400px',
              height: '500px',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
              backgroundColor: '#ABC7FF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '32px'
            }}>
              {/* Top Logo */}
              <img 
                src={mindlessLogoFull} 
                alt="Mindless Lounge Logo" 
                style={{
                  width: '100px',
                  marginBottom: '40px'
                }}
              />

              {/* Login Form */}
              <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <FormGroup>
                  <Label 
                    for="username" 
                    style={{ 
                      fontSize: '1.25rem', 
                      color: '#2A4374',
                      marginBottom: '15px'
                    }}
                  >
                    Email/Username:
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid #2A4374',
                      borderRadius: '0',
                      padding: '8px 0',
                      color: '#2A4374',
                      marginBottom: '25px',
                      fontSize: '1.1rem'
                    }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label 
                    for="password" 
                    style={{ 
                      fontSize: '1.25rem', 
                      color: '#2A4374',
                      marginBottom: '15px'
                    }}
                  >
                    Password:
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid #2A4374',
                      borderRadius: '0',
                      padding: '8px 0',
                      color: '#2A4374',
                      fontSize: '1.1rem'
                    }}
                  />
                </FormGroup>
              </Form>

              {/* Brain Icon */}
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '30px 0'
              }}>
                <img 
                  src={brainIcon} 
                  alt="Brain Icon" 
                  style={{ 
                    width: '100px',
                    opacity: 0.9
                  }}
                />
              </div>

              {/* Create New Profile Link */}
              <Link 
                to="/signup" 
                style={{
                  fontSize: '1.25rem',
                  color: '#2A4374',
                  textDecoration: 'none',
                  marginTop: '20px'
                }}
              >
                Create New Profile
              </Link>
            </div>
          </div>

          {/* Bottom Logo */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px',
            marginTop: '20px'
          }}>
            <img 
              src={mindlessLogo} 
              alt="Mindless Lounge" 
              style={{ 
                width: '300px',
                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
              }}
            />
          </div>
        </div>
      ) : (
        <UserList users={users} />
      )}
    </>
  );
};

export default Home;
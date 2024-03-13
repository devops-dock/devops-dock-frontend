import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Networking from './pages/Networking/Networking';
import Timer from './pages/Timer/Timer';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ErrorPage from './pages/ErrorPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const userItem = JSON.parse(sessionStorage.getItem('userInfo'));
  let usersession = userItem ? userItem : false;

  useEffect(() => {
    const userFunction = async (usersession) => {
      if (usersession) {
        setUser(usersession);
      } else {
        try {
          const response = await fetch("http://localhost:5000/auth/login/success", {
            method: 'GET',
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true
            }
          });
          const data = await response.json();
          const guser = {
            displayName: data.user.displayName,
            email: data.user.email
          }
          sessionStorage.setItem('guser', JSON.stringify(guser))
          setUser(data.user);
        } catch (err) {
          console.log(err.message)
        }
      }
    }
    userFunction(usersession);
  }, []);

  return (
    <Router>
      <div className='App'>
        <Header user={user} />
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route path="/networking" Component={Networking} />
            {user ? 
              <Route path="/:username/timer" Component={Timer} />
              : <Route path='*' Component={ErrorPage} />
            }
            <Route path="/about" Component={About} />
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={Signup} />
            <Route path='*' Component={ErrorPage} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
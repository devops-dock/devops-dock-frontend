// src/components/Header/Header.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ user }) {
  const navigate = useNavigate();

  const handlelogout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
    sessionStorage.clear();
    navigate('/');
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg" style={{color: '#DDE6ED'}}>
        <div className="container-fluid align-items-center justify-content-center justify-content-md-between">
          <Link className="navbar-brand ms-5" to="/">DevOpsDocker</Link>
          <button className="navbar-toggler focus-ring" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="menu-icon"><i className="bi bi-list"></i></span>
          </button>
          <div className="collapse navbar-collapse align-items-center justify-content-lg-around" id="navbarNav">
            {/* menu */}
            <ul className="navbar-nav me-lg-5 mb-lg-0">
              <li className="nav-item me-lg-4 mb-1 mb-lg-0">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item me-lg-4 mb-1 mb-lg-0">
                <Link className="nav-link" to="/networking">Networking</Link>
              </li>
              <li className="nav-item me-lg-4 mb-1 mb-lg-0">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
            {user ?
              <ul className='navbar-nav me-lg-5 mb-lg-0'>
                <li className="nav-item me-lg-4 mb-2 mb-lg-0">
                  <Link className="nav-link" 
                    to={`/${user.displayName}/timer`}>
                      Pomodoro
                  </Link>
                </li>
                <li className='nav-item me-lg-4 mb-1 mb-lg-0 dropdown'>
                  <button className='px-3 py-1 mx-auto rounded-pill border border-info-subtle d-flex align-items-center dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.avatar.imgType === 'text' ?  
                      <span className="avatar me-2">{user.avatar.data}</span>
                      :
                      <img src={user.avatar.data} className='me-2 rounded-pill' alt='avatar' width='20px' height='20px' />
                    }
                    <span className="">{user.displayName}</span>
                  </button>
                  <ul className='dropdown-menu'>
                    <li className='dropdown-item mb-1' onClick={handlelogout}>Logout</li>
                    <li className='dropdown-item mb-1'>Settings</li>
                  </ul>
                </li> 
              </ul>
            : (
            <ul className="navbar-nav justify-content-lg-end">
              <li className="nav-item me-lg-4 mb-2 mb-lg-0">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item me-lg-4 mb-2 mb-lg-0">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>
            </ul>)
          }

          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

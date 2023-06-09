import React from 'react';
import '../styles/Navbar.css'
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  const { username, isLoggedIn } = props;

  return (
    <div className="nav">
      <nav className="navigation">
        <div className="brand-nam">
        </div>
        <div className="navigation-menu">
          <ul>
            <li>
              <NavLink to={'/'}> Home</NavLink>
            </li>
            <li>
              <NavLink to={'/userPage'}> Profil</NavLink>
            </li>
            <li>
              <NavLink to={'/login'}> Login</NavLink>
            </li>

            <li>
              <NavLink to={'/signup'}> Inscription</NavLink>
            </li>
            <li>
              <NavLink to={'/userPage'}> {username}</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React from 'react';
import '../styles/Navbar.css'
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  const { username, isLoggedIn } = props;

  return (
    <div className="nav">
      <nav className="navigation">
        <div className="brand-nam">
          {/* <NavLink to={'/'}>
<img src={'Logo2'} alt="" width={100} height={100} />
</NavLink> */}
        </div>
        <div className="navigation-menu">
          <ul>
            <li>
              <NavLink to={'/'}> Home</NavLink>
            </li>
            {!isLoggedIn && (
              <li>
                <NavLink to={'/login'}> Login</NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink to={'/signup'}> Inscription</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to={'/userPage'}> {username}</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink to={'/userPage'}> UserPage</NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

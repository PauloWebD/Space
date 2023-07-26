import React, { useState } from 'react';
import '../styles/Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import barre from './astronaute.png';
import rankImageExpert from '../Components/3D/assets/rank/1.png';
import rankImageAvance from '../Components/3D/assets/rank/3.png';
import rankImageDebutant from '../Components/3D/assets/rank/2.png';

const Navbar = ({ userId, userName, userRank }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/Login';
  };

  const getRankImage = () => {
    if (userRank === 'Expert') {
      return rankImageExpert;
    } else if (userRank === 'Avancé') {
      return rankImageAvance;
    } else {
      return rankImageDebutant;
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="menu-button" onClick={toggleMenu}>
        <img className='menuSvg' src={barre} alt="Menu" />
      </div>
      <div className={`navigation-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li className="username">
            {userName}
            {userRank && <img className="rank-nav" src={getRankImage()} alt="Rank" />}
          </li>
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          {userId ? (
            <>
              <li>
                <NavLink to={'/userPage'}>Profil</NavLink>
              </li>
              <li>
                <NavLink to={'/Home'} className="button-link">
                  Explorer
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleLogout}>Déconnexion</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={'/login'}>Connexion</NavLink>
              </li>
              <li>
                <NavLink to={'/signup'}>Inscription</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import '../styles/Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';


import rankImageExpert from '../Components/3D/assets/rank/1.png';
import rankImageAvance from '../Components/3D/assets/rank/3.png';
import rankImageDebutant from '../Components/3D/assets/rank/2.png';

const Navbar = ({ userId, userName, userRank }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/Login'; // Redirection vers la page d'accueil après la déconnexion
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

  return (
    <div className="nav">
      <nav className="navigation">
        <div className="brand-nam"></div>
        <div className="navigation-menu">
          <ul>
            <li className="username">
              {userName}
              {userRank && <img className='rank-nav' src={getRankImage()} alt="Rank" />}
            </li>
            <li>
              <NavLink to={'/'}> Home</NavLink>
            </li>
            {userId ? (
              <>
                <li>
                  <NavLink to={'/userPage'}> Profil</NavLink>
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
                  <NavLink to={'/login'}> Connexion</NavLink>
                </li>
                <li>
                  <NavLink to={'/signup'}> Inscription</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

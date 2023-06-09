import React from 'react';
import '../styles/Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const navigate = useNavigate(); // Utiliser le hook useNavigate pour la redirection

  const handleLogout = () => {
    // Code pour gérer la déconnexion de l'utilisateur
    sessionStorage.removeItem('token');
    window.location.href = '/Login'; // Redirection vers la page d'accueil après la déconnexion
  };

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
            {props.userId ? (
              <>
                <li>
                  <NavLink to={'/userPage'}> Profil</NavLink>
                </li>
                <li>
                  <NavLink to={'/Home'} className='button-link'>
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

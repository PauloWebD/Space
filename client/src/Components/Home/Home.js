import React from 'react';
import SystemSolaire from '../3D/SystemeSolaire';
import Footer from '../Footer';
import './Home.css';
import Planet from '../Planetes/Planet';
import Navbar from '../Navbar';
import WelcomePage from '../Welcome/WelcomePage';

const Home = () => {
    return (
        <div>
            {/* <Planet /> */}
            <SystemSolaire />
            {/* <WelcomePage /> */}
            {/* <Footer /> */}
        </div>
    );
};

export default Home;
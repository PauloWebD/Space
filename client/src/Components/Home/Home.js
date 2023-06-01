import React from 'react';
import SystemSolaire from '../3D/SystemeSolaire';
import Footer from '../Footer';
import Navbar from '../Navbar';
import './Home.css';
import Planet from '../Planetes/Planet';


const Home = () => {
    return (
        <div>
            <Planet />
            {/* <Navbar /> */}
            {/* <SystemSolaire /> */}
            {/* <Footer /> */}
        </div>
    );
};

export default Home;
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Planet from './Components/Planetes/Planet';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
import UserPage from './Components/UserPage/UserPage';
import WelcomePage from './Components/Welcome/WelcomePage';
import React from "react";
import PrivateRoute from './Components/routes/PrivateRoute';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<Home />} />
          </Route>
          <Route path='/Home' element={<Planet />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/WelcomePage/:userId" element={<WelcomePage />} />
          <Route path="/userPage/:userId" element={<UserPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

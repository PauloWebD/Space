import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Planet from './Components/Planetes/Planet';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
import UserPage from './Components/UserPage/UserPage';
import WelcomePage from './Components/Welcome/WelcomePage';
import React, { useState, useEffect } from "react";
import PrivateRoute from './Components/routes/PrivateRoute';


function App() {
  const [userId, setUserId] = useState('');

  const verifyToken = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(`http://localhost:3001/api/users/verifyToken/${token}`);
      console.log('yolo===>', response.data.userId);
      setUserId(response.data.userId);
      console.log('userid ==>', userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [userId]);


  const handleChildPropChange = (value) => {
    setUserId(value);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/Home' element={<PrivateRoute />}>
            <Route exact path='/Home' element={<Planet userId={userId} />} />
          </Route>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login onPropChange={handleChildPropChange} />} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path='/userPage' element={<PrivateRoute />}>
            <Route exact path="/userPage" element={<UserPage userId={userId} />} />
          </Route>
          <Route exact path='/WelcomePage/:userId' element={<PrivateRoute />}>
            <Route path="/WelcomePage/:userId" element={<WelcomePage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

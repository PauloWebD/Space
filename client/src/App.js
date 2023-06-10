import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Planet from './Components/Planetes/Planet';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
import UserPage from './Components/UserPage/UserPage';
import WelcomePage from './Components/Welcome/WelcomePage';
import React, { useState, useEffect } from "react";
import PrivateRoute from './Components/routes/PrivateRoute';
import Navbar from './Components/Navbar';


function App() {
  const [userId, setUserId] = useState('');

  const verifyToken = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(`http://localhost:3001/api/users/verifyToken/${token}`);
      setUserId(response.data.userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [userId]);

  console.log(userId);
  const handleChildPropChange = (value) => {
    setUserId(value);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar userId={userId} />
        <Routes>
          <Route exact path='/Home' element={<PrivateRoute />}>
            <Route exact path='/Home' element={<Planet userId={userId} />} />
          </Route>
          <Route path='/' element={<Home userId={userId} />} />
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

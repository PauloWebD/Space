import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Planet from './Components/Planetes/Planet';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
import UserPage from './Components/UserPage/UserPage';
import WelcomePage from './Components/Welcome/WelcomePage';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Home' element={<Planet />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/WelcomePage/:userId" element={<WelcomePage />}></Route>
          <Route path="/userPage/:userId" element={<UserPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

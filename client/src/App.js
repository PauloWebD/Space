import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Planet from './Components/Planetes/Planet';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
// import UserPage from './Components/UserPage/UserPage';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          {/* <Route path="/userPage" element={<UserPage />}></Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

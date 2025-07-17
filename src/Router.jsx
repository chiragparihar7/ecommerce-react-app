import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from './user/auth/login/Login';
// import Register from './user/auth/register/Register';
import Header from './user/layout/Header.jsx';
import HeroSection from './user/layout/Hero-Section.jsx';
import Footer from './user/layout/Footer.jsx';
import Home from './user/layout/Home.jsx';



const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User routes */}
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}

        <Route path="/" element={<Home />} />

        {/* Admin routes */}
        {/* Add admin routes here */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

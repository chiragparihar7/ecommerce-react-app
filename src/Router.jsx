import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from './user/auth/login/Login';
// import Register from './user/auth/register/Register';
import Header from './user/layout/Header.jsx';
import HeroSection from './user/layout/Hero-Section.jsx';
import Footer from './user/layout/Footer.jsx';

const Home = () => (
  <>
    <Header />
    <HeroSection />
    <Footer />
  </>
);

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* user route  */}
        {/* <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<Home />} />


        {/* admin route  */}

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
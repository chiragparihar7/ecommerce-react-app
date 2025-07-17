import { BrowserRouter, Route, Routes } from 'react-router-dom'
<<<<<<< HEAD
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
=======
// import Login from './containers/admin/auth/login/Login'
import SellerLogin from './containers/seller/auth/Login';
import SellerRegister from './containers/seller/auth/Register'; 
import AdminLogin from './containers/admin/auth/login/Login'
import AdminDashboard from './containers/admin/pages/dashboard/Dashboard'
import Register from './user/auth/register/Register';
import Login from './user/auth/login/Login';
>>>>>>> 76309f07feeeaf99aa073b418cf46b9cb6eba977

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD

        {/* user route  */}
        {/* <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<Home />} />


        {/* admin route  */}

=======
      
        {/* Seller Routes */}
        <Route path="/seller/register" element={<SellerRegister/>} />
        <Route path="/seller/login" element={<SellerLogin/>} />



        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        


        {/* User Routes */}
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
>>>>>>> 76309f07feeeaf99aa073b418cf46b9cb6eba977
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
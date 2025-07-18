import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from './containers/admin/auth/login/Login'
import SellerLogin from './containers/seller/auth/Login';
import SellerRegister from './containers/seller/auth/Register'; 
import AdminLogin from './containers/admin/auth/login/Login'
import AdminDashboard from './containers/admin/pages/dashboard/Dashboard'
import Register from './user/auth/register/Register';
import Login from './user/auth/login/Login';
import SellerDashboard from './containers/seller/dashboard/Dashboard';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
      
        {/* Seller Routes */}
        <Route path="/seller/register" element={<SellerRegister/>} />
        <Route path="/seller/login" element={<SellerLogin/>} />
        <Route path="seller/dashboard" element={<SellerDashboard/>} />



        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        


        {/* User Routes */}
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
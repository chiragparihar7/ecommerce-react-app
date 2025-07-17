import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from './containers/admin/auth/login/Login'
import Login from './containers/seller/auth/Login';
import Register from './containers/seller/auth/Register'; 

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Register/>} />
        <Route path="/Login" element={<Login/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
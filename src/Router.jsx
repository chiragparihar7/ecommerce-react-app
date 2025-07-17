import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './containers/admin/auth/login/Login'
import Dashboard from './containers/admin/pages/dashboard/Dashboard'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/admin/Dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
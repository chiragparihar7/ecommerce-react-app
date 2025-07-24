// src/pages/admin/Login.jsx

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import './Login.css';

import DataService from '../../../../config/DataService';
import { API } from '../../../../config/API';
import { adminLoginSuccess, adminAuthFailed } from '../../../../redux/slices/adminSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain a special character')
      .required('Password is required')
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await DataService().post(API.ADMIN_LOGIN, values);

      if (response.data.token) {
        dispatch(adminLoginSuccess({ 
          token: response.data.token, 
          admin: response.data.admin 
        }));
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Login failed');
        dispatch(adminAuthFailed({ error: 'No token received' }));
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Login failed';
      dispatch(adminAuthFailed({ error: errMsg }));
      toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">ADMIN LOG-IN</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <Field type="text" id="email" name="email" placeholder="Enter Email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" placeholder="Enter Password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <button type="submit" className="login-button" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'LOGIN'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

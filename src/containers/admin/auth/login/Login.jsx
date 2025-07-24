import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import DataService from '../../../../config/DataService';
import { API } from '../../../../config/API';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
const Login = () => {
  const navigate = useNavigate();
 
  const initialValues = {
    email: '',
    password: ''
  };
 
  const validationSchema = Yup.object({
    email: Yup.string().email()
      .required('Email is required'),
 
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least one special character')
      .required('Password is required')
  });
 
  const onSubmit = async (values, { setSubmitting }) => {
    try {

      const response = await DataService().post(API.ADMIN_LOGIN, values);

      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
 
      toast.error(error.response?.data?.message || 'Login failed!');
    } finally {
      setSubmitting(false);
    }
  };
 
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">ADMIN LOG-IN</h2>
 
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
 
              <div className="input-group">
                <label htmlFor="password">PASSWORD</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
 
              <button
                type="submit"
                className="login-button"
                disabled={isSubmitting}
              >
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

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import './Login.css';

const Login = () => {
  const initialValues = {
    adminName: '',
    password: ''
  };

const handlSubmit = () => {
   navigate('/admin/Dashboard');
}

const navigate = useNavigate();
  const validationSchema = Yup.object({
    adminName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Only letters allowed, no numbers or symbols')
      .required('Admin name is required'),

    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least one special character')
      .required('Password is required')
  });

  const onSubmit = (values) => {
    console.log('Admin Name:', values.adminName);
    console.log('Password:', values.password);
   
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
          <Form>
            <div className="input-group">
              <label htmlFor="adminName">ADMIN-NAME</label>
              <Field
                type="text"
                id="adminName"
                name="adminName"
                placeholder="Enter admin name"
              />
              <ErrorMessage name="adminName" component="div" className="error" />
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

            <button type="submit" className="login-button" onClick={handlSubmit} >LOGIN</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;

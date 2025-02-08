import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../store/api/authApi';
import { setCredentials } from '../../store/slices/authSlice';
import { loginSchema } from '../../validations/auth';

const ClientLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values) => {
    try {
      const response = await login(values).unwrap();
      if (response.token) {
        dispatch(setCredentials({ user: response.user, token: response.token }));
        localStorage.setItem('token', response.token);
        navigate('/client/dashboard'); 
        toast.success('Giriş başarılı!');
      }
    } catch (error) {
      const errorMessage = error?.data?.message || 'Giriş yapılırken bir hata oluştu.';
      toast.error(errorMessage); 
    }
  };

  return (
    <div className="login-container">
      <h2>Client Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="email">E-posta</label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="E-posta adresinizi girin"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Şifrenizi girin"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ClientLogin;

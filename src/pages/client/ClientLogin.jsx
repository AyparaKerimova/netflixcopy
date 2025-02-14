import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../store/api/authApi";
import { setCredentials } from "../../store/slices/authSlice";
import { loginSchema } from "../../validations/auth";
import styles from "../../assets/css/CLogin.module.css";

const ClientLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values) => {
    try {
      const response = await login(values).unwrap();
      if (response.token) {
        dispatch(
          setCredentials({ user: response.user, token: response.token })
        );
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/client/dashboard");
        toast.success("Giriş başarılı!");
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message || "Giriş yapılırken bir hata oluştu.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className={`${styles.login}`}>
        <img
          className="ml-24"
          width="200"
          height="200"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt=""
        />

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col justify-center mt-24 items-center gap-4">
            <h1 className="text-5xl text-white font-bold">Sign In</h1>
            <div className="">
              <Field className="border rounded p-2 py-4 pr-32" type="email" id="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>

            <div className="form-group">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="border rounded p-2 py-4 pr-32"
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>

            <button className="text-white bg-red-600 rounded px-32 py-4 text-xl" type="submit" disabled={isLoading}>
              {isLoading ? "Signing..." : "Sign In"}
            </button>
            <div className="flex gap-1">
              <input type="checkbox" />
              <label className="text-white">Remember me</label>
            </div>
            <div className="flex gap-3">
              <h6 className="text-gray-400">New to Netflix?</h6>
              <Link className="text-white font-semibold" to="/client-registration">Sign Up Now</Link>
            </div>
              <p className="text-gray-300 text-sm w-80">This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className="text-blue-500"><a href="https://policies.google.com/privacy">Learn more.</a></span></p>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default ClientLogin;

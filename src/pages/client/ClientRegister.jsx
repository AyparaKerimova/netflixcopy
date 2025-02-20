import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../store/api/authApi";
import { useFormik } from "formik";
import { signupSchema } from "../../validations/auth";
import { setCredentials } from "../../store/slices/authSlice";
import { handleGoogleSignup } from "../../config/firebaseConfig";

const ClientRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup] = authApi.useSignupMutation();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const response = await signup(values).unwrap();
        dispatch(setCredentials(response));
        navigate("/membership-plan");
      } catch (error) {
        console.error("Failed to signup:", error);
      }
    },
  });

  return (
    <>
      <nav className="flex items-center justify-between">
        <img
          className="ml-4"
          width="200"
          height="200"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix Logo"
        />
        <Link to="/client/login" className="mr-20 text-xl font-medium">
          <h5>Sign In</h5>
        </Link>
      </nav>
      <hr />
      <div className="flex flex-col justify-center items-center mt-4 gap-4">
        <div>
          <p className="mt-2">STEP 1 OF 3</p>
          <h2 className="text-3xl font-medium w-96 mt-2 text-gray-800">
            Create a password to start your membership
          </h2>
          <p className="w-80 text-lg mt-2">
            Just a few more steps and you're done! We hate paperwork, too.
          </p>
          <form
            className="mt-2 flex flex-col gap-6"
            onSubmit={formik.handleSubmit}
          >
            <input
              id="email"
              name="email"
              {...formik.getFieldProps("email")}
              type="text"
              placeholder="Email"
              className="border pl-4 py-4 rounded border-black"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
            <input
              id="fullName"
              name="fullName"
              {...formik.getFieldProps("fullName")}
              type="text"
              placeholder="Full name"
              className="border pl-4 py-4 rounded border-black"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.fullName}
              </div>
            )}
            <input
              id="nickname"
              name="nickname"
              {...formik.getFieldProps("nickname")}
              type="text"
              placeholder="Nickname"
              className="border pl-4 py-4 rounded border-black"
            />
            {formik.touched.nickname && formik.errors.nickname && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.nickname}
              </div>
            )}
            <input
              id="password"
              name="password"
              {...formik.getFieldProps("password")}
              type="text"
              placeholder="Add a password"
              className="border pl-4 py-4 rounded border-black"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
            <input
              id="confirmPassword"
              name="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
              type="text"
              placeholder="Confirm password"
              className="border pl-4 py-4 rounded border-black"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.confirmPassword}
              </div>
            )}
            <div className="flex gap-2 mt-2">
              <input type="checkbox" />
              <label>Please do not email me Netflix special offers</label>
            </div>
            <button type="submit" className="bg-red-600 text-white px-44 py-6 rounded text-2xl">
              Next
            </button>
          </form>
          <div className="mt-4">
          <button
            className="bg-blue-600 text-white px-8 py-3 mt-4 rounded text-xl"
            onClick={handleGoogleSignup}
          >
            Sign Up with Google
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientRegister;

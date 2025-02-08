import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../store/api/authApi";
import { useFormik } from "formik";
import { loginSchema } from "../../validations/auth";
import { setCredentials } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = authApi.useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    async onSubmit  (values)  {
        try {
          const response = await login(values).unwrap();
      
          console.log("Login Response:", response); 
      
          dispatch(setCredentials(response));
          toast.success("Admin login successful!");
          navigate("/admin/dashboard");

          
        } catch (error) {
          console.error("Login failed:", error);
          toast.error(error.data?.message || "Failed to login as admin.");
        }
      }
      
  });

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black">
             <img
          className="ml-4"
          width="400"
          height="400"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt=""
        />
            <form
                onSubmit={formik.handleSubmit}
                className="bg-white p-6 rounded shadow-lg w-96"
            >
                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

                
                <input
                    type="email"
                    name="email"
                    placeholder="Admin Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border p-2 rounded w-full mb-2"
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}

                
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border p-2 rounded w-full mb-2"
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">{formik.errors.password}</p>
                )}

                <button
                    type="submit"
                    className="bg-red-600 text-white py-2 px-4 rounded w-full"
                >
                     Login as Admin
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;

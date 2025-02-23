import React from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";

const AdminNavbar = () => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const messagesLength = JSON.parse(localStorage.getItem("messages"))?.length || " "
  const dispatch = useDispatch();
  const navigate = useNavigate()
   const handleLogout = () => {
      dispatch(logout());
      navigate("/")
    };
  return (
    <>
      <div className="flex h-screen">
        <div className="hidden md:flex flex-col w-64 bg-black">
          <div className="flex items-center justify-center h-16 bg-black">
            <span className="text-white font-bold uppercase">
            <img
          className="ml-4"
          width="150"
          height="150"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt=""
        />
            </span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-black">
              <Link
                to="/admin/dashboard"
                className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                Dashboard
              </Link>
              <hr className="mt-3"/>
              <Link
                to={`/admin/messages/${userId}`}
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <i className="fa-regular fa-message ml-1 text-lg mr-3"></i>
                Messages <span className="ml-2 bg-red-600 rounded px-2">{messagesLength || " "}</span>
              </Link>
              <hr className="mt-3"/>
              <Link
                to="/admin/statistics"
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <i className="fa-solid fa-chart-simple ml-1 text-lg mr-3"></i>
                Statistics
              </Link>
            </nav>
            <button onClick={handleLogout} className="text-white bg-red-600 rounded w-2/3 mx-auto mb-2">Logout</button>
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <Outlet/>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;

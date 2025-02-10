import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminNavbar = () => {
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
              <a
                href="#"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Messages
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Settings
              </a>
            </nav>
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

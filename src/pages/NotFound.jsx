import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="bg-gray-100">
        <div className="h-screen flex flex-col justify-center items-center">
          <h1 className="text-8xl font-bold text-red-600">404</h1>
          <p className="text-4xl font-medium text-gray-800">Page Not Found</p>
          <Link to="/" className="mt-4 text-xl text-gray-600 hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;

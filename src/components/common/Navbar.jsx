import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {logout} from '../../store/slices/authSlice'
const Navbar = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <img
          className="ml-4"
          width="200"
          height="200"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt=""
        />
        <div className="flex gap-4 items-center mr-4">
          <select name="" className="border text-white rounded p-1">
            <option value="">English</option>
            <option value="">Russian</option>
          </select>
          {user && token ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white rounded px-4 py-1"
          >
            Log Out
          </button>
        ) : (
          <Link to="/client/login">
            <p className="bg-white text-black rounded text-center px-4 py-1">
              Sign In
            </p>
          </Link>
        )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

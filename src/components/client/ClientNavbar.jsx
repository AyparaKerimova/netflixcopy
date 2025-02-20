import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const ClientNavbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  console.log(user);

  if (!user) return null;
  const handleLogout = () => {
        dispatch(logout());
        navigate("/")
      };
  return (
    <>
      <header className="z-10 fixed top-0 right-0 left-0 bg-black opacity-90">
        <nav className="flex justify-between items-center p-2">
          <div className="flex items-center gap-2">
            <img
              className=""
              width="120"
              height="120"
              src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
              alt=""
            />
            <Link className="text-white" to="/client/dashboard">Home</Link>
            <Link className="text-white">Series</Link>
            <Link className="text-white">Movies</Link>
            <Link className="text-white">Newest</Link>
            <Link to={`/client/list/${user._id}`} className="text-white">My List</Link>
          </div>
          <div className="flex gap-6 items-center">
          <Link to={`/client/profile/${user._id}`}>
          <img style={{width:"50px",height:"50px",objectFit:"cover",borderRadius:"50%"}}src={user.profileImage} alt={user.nickname} />
        </Link>
            <i className="fa-regular fa-bell text-white text-2xl mr-3"></i>
            <button onClick={handleLogout} className="text-white bg-red-600 rounded px-3 py-1">Logout</button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default ClientNavbar;

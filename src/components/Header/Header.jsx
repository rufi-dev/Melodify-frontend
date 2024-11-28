import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getLoginStatus,
  getUser,
  logout,
  RESET,
} from "../../redux/features/auth/authSlice";
import Loader from "../Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  AdminLink,
  ShowOnLogin,
  ShowOnLogout,
} from "../../protect/hiddenLink.jsx";
import Notification from "../Notification/Notification.jsx";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const { isLoading, user, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value); // Pass the search value to the parent component
  };
  const handleLogout = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUser()); // Fetch user data
      await dispatch(getLoginStatus()); // Check login status
    };
    fetchData();
  }, [dispatch]);

  return (
    <header className="flex p-5 items-center h-16 w-full">
      <div className="relative flex justify-between w-full">
        <div className="relative">
          <input
            required
            placeholder="Type something..."
            className="w-full px-10 py-2 text-base border-b-2 border-gray-300 bg-transparent outline-none transition-colors duration-300 focus:border-indigo-500"
            type="text"
            value={search}
            onChange={handleSearchChange}
          />
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-indigo-500 scale-x-0 transition-transform duration-300 transform focus:scale-x-100" />
          <div className="absolute bottom-0 left-0 h-full w-0 bg-indigo-100 opacity-50 transition-all duration-300 focus:w-full" />
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 focus:text-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth={2}
                stroke="currentColor"
                d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              />
            </svg>
          </div>
        </div>
        <AdminLink>
          <div>Admin</div>
        </AdminLink>
        <ShowOnLogout>
          {isLoading ? (
            <button
              disabled
              className="bg-[#00FF7F] text-black flex justify-center items-center  h-[40px] w-[100px] rounded hover:bg-[#209e5f] duration-200"
            >
              <Loader />
            </button>
          ) : (
            <Link
              to={"/login"}
              className="bg-[#00FF7F] text-black flex justify-center items-center w-[100px] rounded hover:bg-[#209e5f] duration-200"
            >
              Login
            </Link>
          )}
        </ShowOnLogout>
        <ShowOnLogin>
          <div className="gap-[40px] flex items-center">
            <Link to={"/profile"} className="hover:underline">
              Hello, {user?.username}
            </Link>

            {isLoading ? (
              <button
                disabled
                className="bg-[#00FF7F] text-black flex justify-center items-center  h-[40px] w-[100px] rounded hover:bg-[#209e5f] duration-200"
              >
                <Loader />
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-[#00FF7F] text-black w-[100px] h-[40px] rounded hover:bg-[#209e5f] duration-200"
              >
                Log out
              </button>
            )}
          </div>
        </ShowOnLogin>
      </div>
    </header>
  );
};

export default Header;

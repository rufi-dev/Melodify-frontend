import React, { useEffect } from "react";
import profile from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/features/auth/authSlice";
import { FaPhoneAlt } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";
const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, user } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUser());
    };
    fetchUser();
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-black text-white shadow-3xlgreen outline-[#2b9962] rounded-lg w-[600px] p-6">
        {isLoading && !isSuccess ? (
          <div className="flex text-center justify-center">
            <Spinner className="" />
          </div>
        ) : (
          user && (
            <div className="text-left">
              <div className="mb-4">
                <img
                  src={user.photo}
                  alt="Profile Picture"
                  className="w-24 h-24 rounded-full object-cover mx-auto"
                />
              </div>
              <div className="mb-4 text-center">
                <h2 className="text-2xl font-semibold">{user.username}</h2>
                <p className="">{user.bio}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold flex gap-2 items-center">
                  <FaPhoneAlt /> {user.phone}
                </h2>
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <IoIosMail />
                    {user.email} <br />
                  {user.isVerified ? (
                    <p className="text-[#2b9962] text-sm">Verified</p>
                  ) : (
                    <p className="text-[#ee404c] text-sm">Not Verified</p>
                  )}
                </h2>
                <h2 className="text-2xl font-semibold">{user?.role}</h2>
              </div>
              <div className="flex justify-center gap-3 mb-6">
                <a href="#" className="text-gray-700 text-xl">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-700 text-xl">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-700 text-xl">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href="#" className="text-gray-700 text-xl">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="#" className="text-gray-700 text-xl">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
              
              <div className="flex justify-between">
                <Link to={"/update"} className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
                  Update
                </Link>
                <Link to="changePassword" className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
                  Change Password
                </Link>
                <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
                  Change Email
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;

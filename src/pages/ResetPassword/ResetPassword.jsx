import React, { useEffect, useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  logout,
  RESET,
  resetPassword,
} from "../../redux/features/auth/authSlice";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { validatePassword } from "../../redux/features/auth/authService";
import { toast } from "react-toastify";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import Loader from "../../components/Loader";
import { sendAutomatedEmail } from "../../redux/features/email/emailSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {resetToken} = useParams()
  const initialState = {
    password: "",
    confirmPassword: "",
  };

  const { isLoading, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const [userData, setUserData] = useState(initialState);
  const { password, confirmPassword } = userData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const [uCase, setUcase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const wrongIcon = <MdOutlineClose className="text-[red] text-[17px]" />;
  const correctIcon = (
    <LiaCheckDoubleSolid className="text-[#00FF7F] text-[17px]" />
  );

  const switchIcon = (condition) => {
    if (condition) {
      return correctIcon;
    }
    return wrongIcon;
  };

  useEffect(() => {
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z]).*$/)) {
      setUcase(true);
    } else {
      setUcase(false);
    }

    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }

    if (password.match(/([!@#$%^&*.?,<>/])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }

    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("All fields are required!");
    }
    if (!validatePassword(password)) {
      return toast.error("Password should contain at least one digit");
    }
    if (!password.match(/([!@#$%^&*.?,<>/])/)) {
      return toast.error(
        "Password should contain at least one special character"
      );
    }

    if (password != confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (password.length < 6) {
      return toast.error("Password must be up to 6 character");
    }

    const userData = {
      password,
    };
   
    try {
      const resultAction = await dispatch(resetPassword({resetToken, userData})).unwrap();
      if (resultAction) {
        await dispatch(logout());
        dispatch(RESET());
        navigate("/login");
      }
    } catch (error) {
      toast.error(error || "Failed to change password");
    }
  };
  return (
    <section className="flex items-center justify-center min-h-screen ">
      <div className="bg-black p-10 rounded-lg shadow-3xlgreen outline-[#2b9962] w-full max-w-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">Reset Password</h2>
        </div>
        <form onSubmit={handleResetPassword}>
         
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white font-medium mb-2"
            >
              New Password
            </label>
            <div className="flex items-center bg-white  text-black w-full gap-2 rounded-lg shadow-sm px-4 py-2">
              <RiLockPasswordFill size={25} />

              <input
                className="w-full border-none outline-none bg-transparent"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
                placeholder="New Password"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-white font-medium mb-2"
            >
              Confirm New Password
            </label>
            <div className="flex items-center bg-white rounded-lg  text-black w-full gap-2 shadow-sm px-4 py-2">
              <RiLockPasswordFill size={25} />

              <input
                className="w-full border-none outline-none bg-transparent"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                required
                id="confirmPassword"
                placeholder="Confirm New Password"
              />
            </div>
          </div>
          <ul className="mt-4 border border-[#00FF7F] p-2 rounded-md text-sm">
            <li className="flex gap-2 items-center text-white">
              {switchIcon(uCase)}
              Lowercase & Uppercase
            </li>
            <li className="flex gap-2 items-center text-white">
              {switchIcon(num)}
              Number (0-9)
            </li>
            <li className="flex gap-2 items-center text-white">
              {switchIcon(sChar)}
              Special Character (!@#$%^&*)
            </li>
            <li className="flex gap-2 items-center text-white">
              {switchIcon(passLength)}
              At least 6 Characters
            </li>
          </ul>
          <div className="mt-6">
            {isLoading ? (
              <button
                id="submit-button"
                disabled
                className="!bg-[#b3f3d3] h-[50px]  text-white flex items-center justify-center"
              >
                <Loader />
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
              >
                Reset Password
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;

import React, { useState } from "react";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { validateEmail } from "../../redux/features/auth/authService";
import { forgotPassword } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch()
  const { isLoading, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email address!");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email!");
    }

    const userData = {
      email,
    };

    await dispatch(forgotPassword(userData));
    await dispatch(RESET(userData));
  };

  return (
    <section className="flex items-center justify-center min-h-screen ">
      <div className="bg-black p-8 rounded-lg shadow-3xlgreen outline-[#2b9962] w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="relative mb-6">
          <label
              htmlFor="oldPassword"
              className="block text-white font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Please enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className=" bg-transparent text-white text-left w-full px-4 py-3 rounded-lg border outline-none"
            />
            
          </div>
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
              Send Reset Password Email
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;

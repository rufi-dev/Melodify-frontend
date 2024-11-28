import React, { useState, useRef, useEffect } from "react";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { loginWithCode, RESET, sendLoginCode } from "../../redux/features/auth/authSlice";

export default function LoginWithCode() {
  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError, message, user } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (index, value) => {
    if (/^\d$/.test(value) || value === "") {
      const updatedValues = [...inputValues];
      updatedValues[index] = value;
      setInputValues(updatedValues);

      // Move focus to the next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && inputValues[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = inputValues.join("");
    const loginCode = {
      code,
    };
    if (code.length === 6) {
      try {
        const resultAction = await dispatch(
          loginWithCode({ username, loginCode })
        ).unwrap();
        if (resultAction) {
          navigate("/");
        }
      } catch (error) {
        toast.error(error || "Failed to change password");
      }
    } else {
      toast.error("Please fill all 6 digits.");
    }
  };

  const resendUserLoginCode = async (e) => {
    e.preventDefault();
    await dispatch(sendLoginCode(username))
    await dispatch(RESET())
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-black shadow-3xlgreen outline-[#2b9962] p-6 rounded-lg max-w-md mx-auto gap-6"
      >
        <div className="grid grid-cols-6 gap-4">
          {inputValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-full py-4 px-2 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          ))}
        </div>
        <button
          onClick={resendUserLoginCode}
          className="text-white text-right w-full my-4 underline"
        >
          Resend code
        </button>
        {isLoading ? (
          <button
            id="submit-button"
            disabled
            className="!bg-[#b3f3d3] h-[50px] flex items-center justify-center"
            type="submit"
          >
            <Loader />
          </button>
        ) : (
          <button
            id="submit-button"
            type="submit"
            className=" h-[50px] flex items-center justify-center"
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
}

import React from "react";
import { useDispatch } from "react-redux";
import { sendVerificationEmail } from "../../redux/features/auth/authSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail());
    await dispatch(RESET())
  };
  return (
    <div className="text-[black] text-[20px] bg-[#f07070] flex justify-center">
      Your account has not been verified, please check your email for
      verification!
      <p
        className="underline cursor-pointer ml-5 text-[#04160d]"
        onClick={sendVerEmail}
      >
        Resend Link
      </p>
    </div>
  );
};

export default Notification;

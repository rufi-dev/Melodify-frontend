import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RESET, verifyUser } from "../../redux/features/auth/authSlice";
import { FcApproval } from "react-icons/fc";
import approve from "../../assets/approve.png";
import reject from "../../assets/reject.png";
const VerifyUser = () => {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();
  const { isLoading, message, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyAccount = async () => {
      await dispatch(verifyUser(verificationToken));
      await dispatch(RESET());
    };
    verifyAccount();
  }, [dispatch, verificationToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <div
        className={`bg-[black] ${
          !isLoading && isSuccess
            ? "shadow-3xlgreen outline-[#2b9962]"
            : "shadow-3xlred outline-[#ee404c]"
        }  outline outline-1  w-[400px] text-center h-[600px] rounded-xl flex flex-col items-center gap-5 justify-center`}
      >
        {!isLoading && isSuccess ? (
          <img src={approve} className="w-[200px]" />
        ) : (
          <img src={reject} className="w-[200px]" />
        )}

        <h1 className="text-[40px] font-bold">Email Verification</h1>
        <h1 className="text-[20px]">{message}</h1>
        <a href="/" className="underline">
          Go to Home page
        </a>
      </div>
    </div>
  );
};

export default VerifyUser;

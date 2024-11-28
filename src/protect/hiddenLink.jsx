import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../redux/features/auth/authSlice";

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <>{children}</>;
  } else {
    return null;
  }
};
export const AdminLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);
  console.log(userRole);
  if (isLoggedIn && userRole === "admin") {
    return <>{children}</>;
  } else {
    return null;
  }
};

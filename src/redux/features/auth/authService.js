import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const API_URL = `${BACKEND_URL}/api/users/`;


// Validate email
export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Validate password
export const validatePassword = (password) => {
    if (!password.match(/([0-9])/)) {
        return false;
    }
    return true;
};


//Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

//Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.message;
};

const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "getLoginStatus");
  return response.data;
};

const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + "sendVerificationEmail");
  return response.data.message;
};

const verifyUser = async (verificationToken) => {
  const response = await axios.patch(`${API_URL}verifyUser/${verificationToken}`);
  return response.data.message;
};

const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + "changePassword", userData);
  return response.data;
};

const resetPassword = async ({resetToken, userData}) => {
  const response = await axios.patch(`${API_URL}resetPassword/${resetToken}`, userData);
  return response.data.message;
};
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgotPassword", userData);
  return response.data.message;
};

const sendLoginCode = async (username) => {
  const response = await axios.post(API_URL + `sendLoginCode/${username}`);
  return response.data.message;
};
const loginWithCode = async ({username, loginCode}) => {
  const response = await axios.post(`${API_URL}loginWithCode/${username}`, loginCode);
  return response.data;
};

const loginWithGoogle = async (userToken) => {
  const response = await axios.post(`${API_URL}google/callback`, userToken);
  return response.data;
};
const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  resetPassword,
  forgotPassword,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle
};

export default authService;

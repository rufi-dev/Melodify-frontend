import "./Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  login,
  register,
  RESET,
  sendLoginCode,
  loginWithGoogle,
} from "../../redux/features/auth/authSlice";
import Register from "../Register/Register";
import Loader from "../../components/Loader";
import { validateEmail } from "../../redux/features/auth/authService";
import { GoogleLogin } from "@react-oauth/google";

const initialState = {
  username: "",
  password: "",
};
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isError, twoFactor, isSuccess, message } =
    useSelector((state) => state.auth);
  const [isLoginActive, setIsLoginActive] = useState(true);

  const [userData, setUserData] = useState(initialState);
  const { username, password } = userData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const toggleToSignUp = (e) => {
    e.preventDefault();
    setIsLoginActive(false); // Switch to sign-up form
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!username || !password) {
      return toast.error("All fields are required!");
    }
    const userData = {
      username,
      password,
    };

    await dispatch(login(userData));
  };
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }
    if (isError && twoFactor) {
      dispatch(sendLoginCode(username));
      navigate(`/loginWithCode/${username}`);
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate, isError, twoFactor, username]);

  const googleLogin = async (credentialResponse) => {
    console.log(credentialResponse.credential)
    await dispatch(
      loginWithGoogle({ userToken: credentialResponse.credential })
    );
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div id="form-ui">
        {/* Login Form */}
        <form
          action=""
          method="post"
          id="form-login"
          onSubmit={handleLogin}
          className={
            isLoginActive ? "active-form-login" : "inactive-form-login"
          }
        >
          <div id="form-body">
            <div id="welcome-lines">
              <div id="welcome-line-1">Spotify</div>
              <div id="welcome-line-2">Welcome Back</div>
            </div>
            <div id="input-area">
              <div className="form-inp">
                <input
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  required
                  placeholder="User Name"
                  type="text"
                />
              </div>
              <div className="form-inp">
                <input
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  required
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>
            <div id="submit-button-cvr">
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
            </div>

            <div className="flex justify-center mt-5">
              <GoogleLogin
                onSuccess={googleLogin}
                onError={() => {
                  toast.error("Login Failed");
                }}
              />
            </div>

            <div id="forgot-pass">
              <Link to="/forgotPassword">Forgot password?</Link>
            </div>
            <div id="sign-up">
              <span>Don't have an account?</span>
              <a onClick={toggleToSignUp} href="#" id="toggle-sign-up">
                {" "}
                Sign up
              </a>
            </div>
          </div>
        </form>

        {/* Sign-up Form */}
        <Register
          isLoginActive={isLoginActive}
          setIsLoginActive={setIsLoginActive}
        />
      </div>
    </div>
  );
}

export default Login;

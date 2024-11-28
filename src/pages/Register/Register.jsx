import "@fortawesome/fontawesome-free/css/all.min.css";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { MdOutlineClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register, RESET, sendVerificationEmail } from "../../redux/features/auth/authSlice";
import {
  validateEmail,
  validatePassword,
} from "../../redux/features/auth/authService";
import Loader from "../../components/Loader";
const initialState = {
  username: "",
  email: "",
  password: "",
  password2: "",
};
const Register = ({ isLoginActive, setIsLoginActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [userData, setUserData] = useState(initialState);
  const { username, email, password, password2 } = userData;

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

  const toggleToLogin = (e) => {
    e.preventDefault();
    setIsLoginActive(true); // Switch to login form
  };

  const switchIcon = (condition) => {
    if (condition) {
      return correctIcon;
    }
    return wrongIcon;
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
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

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation
    if (!username || !password || !email) {
      return toast.error("All fields are required!");
    }
    if (!validatePassword(password)) {
      return toast.error("Password should contain at least one digit");
    }
    if(!password.match(/([!@#$%^&*.?,<>/])/)){
      return toast.error("Password should contain at least one special character");
    }
    if (!validateEmail(email)) {
      return toast.error("Email is in wrong format");
    }

    if (password != password2) {
      return toast.error("Passwords do not match");
    }

    if (password.length < 6) {
      return toast.error("Password must be up to 6 character");
    }

    const userData = {
      username,
      email,
      password,
    };

    await dispatch(register(userData));
    await dispatch(sendVerificationEmail());
  };
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }
    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <form
      action=""
      onSubmit={handleRegister}
      method="post"
      id="form-signup"
      className={!isLoginActive ? "active-form-signup" : "inactive-form-signup"}
    >
      <div id="form-body">
        <div id="welcome-lines">
          <div id="welcome-line-1">Spotify</div>
          <div id="welcome-line-2">Create a new account</div>
        </div>
        <div id="input-area">
          <div className="form-inp">
            <input
              name="username"
              value={username}
              onChange={handleInputChange}
              placeholder="User Name"
              required
              type="text"
            />
          </div>
          <div className="form-inp">
            <input
              name="email"
              value={email}
              onChange={handleInputChange}
              required
              placeholder="Email Address"
              type="text"
            />
          </div>
          <div className="form-inp">
            <input
              name="password"
              value={password}
              onChange={handleInputChange}
              required
              placeholder="Create Password"
              type="password"
            />
          </div>
          <div className="form-inp">
            <input
              name="password2"
              value={password2}
              onChange={handleInputChange}
              required
              placeholder="Confirm Password"
              type="password"
              onPaste={(e) => {
                e.preventDefault();
                toast.error("Please type instead of pasting!");
                return false;
              }}
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
        <div id="submit-button-cvr">
          {isLoading ? (
            <button id="submit-button" disabled className="!bg-[#b3f3d3] h-[50px] flex items-center justify-center" type="submit">
              <Loader />
            </button>
          ) : (
            <button id="submit-button" type="submit" className=" h-[50px] flex items-center justify-center">
              Sign Up
            </button>
          )}
        </div>

        <button className="btn google">
          <i className="fab fa-google"></i>
          Google
        </button>

        <div id="sign-up">
          <span>Already have an account?</span>
          <a onClick={toggleToLogin} href="#" id="toggle-login">
            Login
          </a>
        </div>
      </div>
    </form>
  );
};

export default Register;

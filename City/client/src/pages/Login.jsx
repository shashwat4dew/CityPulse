// import React, { useEffect, useState } from "react";
// import Image from "../assets/image.png";
// import Logo from "../assets/logo.png";
// import GoogleSvg from "../assets/icons8-google.svg";
// import { FaEye } from "react-icons/fa6";
// import { FaEyeSlash } from "react-icons/fa6";
// import "../styles/Login.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");
//   const navigate = useNavigate();



//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     let email = e.target.email.value;
//     let password = e.target.password.value;

//     if (email.length > 0 && password.length > 0) {
//       const formData = {
//         email,
//         password,
//       };
//       try {
//         const response = await axios.post(
//           "http://localhost:3000/api/v1/login",
//           formData
//         );
//         localStorage.setItem('auth', JSON.stringify(response.data.token));
//         toast.success("Login successfull");
//         navigate("/dashboard");
//       } catch (err) {
//         console.log(err);
//         toast.error(err.message);
//       }
//     } else {
//       toast.error("Please fill all inputs");
//     }
//   };

//   useEffect(() => {
//     if(token !== ""){
//       toast.success("You already logged in");
//       navigate("/dashboard");
//     }
//   }, []);

//   return (
//     <div className="login-main">
//       <div className="login-left">
//         <img src={Image} alt="" />
//       </div>
//       <div className="login-right">
//         <div className="login-right-container">
//           <div className="login-logo">
//             <img src={Logo} alt="" />
//           </div>
//           <div className="login-center">
//             <h2>Welcome back!</h2>
//             <p>Please enter your details</p>
//             <form onSubmit={handleLoginSubmit}>
//               <input type="email" placeholder="Email" name="email" />
//               <div className="pass-input-div">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   name="password"
//                 />
//                 {showPassword ? (
//                   <FaEyeSlash
//                     onClick={() => {
//                       setShowPassword(!showPassword);
//                     }}
//                   />
//                 ) : (
//                   <FaEye
//                     onClick={() => {
//                       setShowPassword(!showPassword);
//                     }}
//                   />
//                 )}
//               </div>

//               <div className="login-center-options">
//                 <div className="remember-div">
//                   <input type="checkbox" id="remember-checkbox" />
//                   <label htmlFor="remember-checkbox">
//                     Remember for 30 days
//                   </label>
//                 </div>
//                 <a href="#" className="forgot-pass-link">
//                   Forgot password?
//                 </a>
//               </div>
//               <div className="login-center-buttons">
//                 <button type="submit">Log In</button>
//                 <button type="submit">
//                   <img src={GoogleSvg} alt="" />
//                   Log In with Google
//                 </button>
//               </div>
//             </form>
//           </div>

//           <p className="login-bottom-p">
//             Don't have an account? <Link to="/register">Sign Up</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
  
    if (email.length > 0 && password.length > 0) {
      const formData = { email, password };
      try {
        const response = await axios.post("http://localhost:3000/api/login", formData);
  
        // Save token and email to localStorage
        const { token } = response.data;
        localStorage.setItem("auth", JSON.stringify(token));
        localStorage.setItem("email", email);
        localStorage.setItem("token", response.data.token);
  
        toast.success("Login successful");
  
        // Redirect based on email
        if (email === "admin@example.com") {
          navigate("/dashboard2");
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Login failed");
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };
  

  // useEffect(() => {
  //   if (token !== "") {
  //     const email = localStorage.getItem("email");
  //     toast.success("You are already logged in");

  //     // Redirect based on stored email
  //     if (email === "admin@example.com") {
  //       navigate("/dashboard2");
  //     } else {
  //       navigate("/dashboard");
  //     }
  //   }
  // }, [token, navigate]);

  useEffect(() => {
    if (token !== "") {
      const email = localStorage.getItem("email");
      //toast.success("You are already logged in");
  
      // Prevent redirection if the user is already on login or register
      if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
        if (email === "admin@example.com") {
          navigate("/dashboard2");
        } else {
          navigate("/dashboard");
        }
      }
    }
  }, [token, navigate]);
  

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Email" name="email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
                <button type="submit">
                  <img src={GoogleSvg} alt="" />
                  Log In with Google
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

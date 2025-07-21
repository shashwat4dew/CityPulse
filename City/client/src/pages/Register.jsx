// import React, { useEffect, useState } from "react";
// import Image from "../assets/image.png";
// import Logo from "../assets/logo.png";
// import GoogleSvg from "../assets/icons8-google.svg";
// import { FaEye } from "react-icons/fa6";
// import { FaEyeSlash } from "react-icons/fa6";
// import "../styles/Register.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const baseURL = import.meta.env.VITE_BACKEND_URL;

// const Login = () => {
//   const [ showPassword, setShowPassword ] = useState(false);
//   const navigate = useNavigate();
//   const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");



//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     let name = e.target.name.value;
//     let lastname = e.target.lastname.value;
//     let email = e.target.email.value;
//     let password = e.target.password.value;
//     let confirmPassword = e.target.confirmPassword.value;

//     if(name.length > 0 && lastname.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0){

//       if(password === confirmPassword){
//         const formData = {
//           username: name + " " + lastname,
//           email,
//           password
//         };
//         try{
//         const response = await axios.post(`${baseURL}/api/register`, formData);
//         localStorage.setItem("token", response.data.token);

//          toast.success("Registration successfull");
//          navigate("/login");
//        }catch(err){
//          toast.error(err.message);
//        }
//       }else{
//         toast.error("Passwords don't match");
//       }
    

//     }else{
//       toast.error("Please fill all inputs");
//     }


//   }

//   // useEffect(() => {
//   //   if(token !== ""){
//   //     toast.success("You already logged in");
//   //     navigate("/dashboard");
//   //   }
//   // }, []);

//   useEffect(() => {
//     if (token !== "") {
//       const email = localStorage.getItem("email");
//       //toast.success("You are already logged in");
  
//       // Prevent redirection if the user is already on login or register
//       if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
//         if (email === "admin@example.com") {
//           navigate("/dashboard2");
//         } else {
//           navigate("/dashboard");
//         }
//       }
//     }
//   }, [token, navigate]);
 

//   return (
//     <div className="register-main">
//       <div className="register-left">
//         <img src={Image} alt="" />
//       </div>
//       <div className="register-right">
//         <div className="register-right-container">
//           <div className="register-logo">
//             <img src={Logo} alt="" />
//           </div>
//           <div className="register-center">
//             <h2>Welcome to our website!</h2>
//             <p>Please enter your details</p>
//             <form onSubmit={handleRegisterSubmit}>
//             <input type="text" placeholder="Name" name="name" required={true} />
//             <input type="text" placeholder="Lastname" name="lastname" required={true} />
//               <input type="email" placeholder="Email" name="email" required={true} />
//               <div className="pass-input-div">
//                 <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required={true} />
//                 {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                
//               </div>
//               <div className="pass-input-div">
//                 <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" required={true} />
//                 {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                
//               </div>
//               <div className="register-center-buttons">
//                 <button type="submit">Sign Up</button>
//                 <button type="submit">
//                   <img src={GoogleSvg} alt="" />
//                   Sign Up with Google
//                 </button>
//               </div>
//             </form>
//           </div>

//           <p className="login-bottom-p">
//             Already have an account? <Link to="/login">Login</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useRef, useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");

  useEffect(() => {
    if (token !== "") {
      const email = localStorage.getItem("email");
      if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
        navigate(email === "admin@example.com" ? "/dashboard2" : "/dashboard");
      }
    }
  }, [token, navigate]);

  const setUpRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
        callback: () => {
          console.log("Recaptcha verified");
        },
      }, auth);
    }
  };

  const handlePhoneVerify = async () => {
    try {
      if (!phone) return toast.error("Enter phone number");

      setUpRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      toast.success("OTP sent to your phone");
    } catch (error) {
      toast.error("Failed to send OTP");
      console.error(error);
    }
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    try {
      const result = await confirmationResult.confirm(otp);
      toast.success("Phone verified");
      document.getElementById("submit-btn").disabled = false;
    } catch (error) {
      toast.error("Invalid OTP");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!name || !lastname || !email || !password || !confirmPassword) {
      return toast.error("Please fill all inputs");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords don't match");
    }

    const formData = {
      username: `${name} ${lastname}`,
      email,
      password,
    };

    try {
      const response = await axios.post(`${baseURL}/api/register`, formData);
      localStorage.setItem("token", response.data.token);
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error during registration");
    }
  };

  return (
    <div className="register-main">
      <div className="register-left">
        <img src={Image} alt="" />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="register-center">
            <h2>Welcome to our website!</h2>
            <p>Please enter your details</p>
            <form onSubmit={otpSent ? handleOTPVerify : handleRegisterSubmit}>
              <input type="text" placeholder="Name" name="name" required />
              <input type="text" placeholder="Lastname" name="lastname" required />
              <input type="email" placeholder="Email" name="email" required />
              <input
                type="tel"
                placeholder="Phone number (+91...)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" required />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              {!otpSent ? (
                <button type="button" onClick={handlePhoneVerify}>Send OTP</button>
              ) : (
                <>
                  <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                  <button type="submit">Verify OTP</button>
                </>
              )}

              <div id="recaptcha-container"></div>

              <div className="register-center-buttons">
                <button id="submit-btn" type="submit" disabled={!otpSent}>Sign Up</button>
                <button type="button">
                  <img src={GoogleSvg} alt="" />
                  Sign Up with Google
                </button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

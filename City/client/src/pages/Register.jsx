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

import React, { useEffect, useState } from "react";
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
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("auth") || "");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (token !== "") {
      const email = localStorage.getItem("email");
      if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
        if (email === "admin@example.com") {
          navigate("/dashboard2");
        } else {
          navigate("/dashboard");
        }
      }
    }
  }, [token, navigate]);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {},
      }
    );
  };

  const sendOtp = async () => {
    if (!phone) {
      toast.error("Enter phone number");
      return;
    }

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setVerificationId(confirmation);
      setOtpSent(true);
      toast.success("OTP sent successfully");
    } catch (err) {
      toast.error("Failed to send OTP: " + err.message);
    }
  };

  const verifyOtpAndRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!name || !lastname || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!otpSent || !otp) {
      toast.error("OTP not verified");
      return;
    }

    try {
      await verificationId.confirm(otp);
      const formData = {
  username: `${name} ${lastname}`,
  email,
  password,
  phoneNumber: phone,  // ✅ not just `phone`
};


      const response = await axios.post(`${baseURL}/api/register`, formData);
      localStorage.setItem("token", response.data.token);
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error("Invalid OTP or registration failed");
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
            <form onSubmit={verifyOtpAndRegister}>
              <input type="text" placeholder="Name" name="name" required />
              <input type="text" placeholder="Last Name" name="lastname" required />
              <input type="email" placeholder="Email" name="email" required />
              <input
                type="tel"
                placeholder="Phone (e.g. +91xxxxxxxxxx)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <button type="button" onClick={sendOtp}>
                Send OTP
              </button>
              {otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              )}
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="register-center-buttons">
                <button type="submit">Sign Up</button>
                <button type="submit">
                  <img src={GoogleSvg} alt="" />
                  Sign Up with Google
                </button>
              </div>
            </form>
            <div id="recaptcha-container"></div>
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

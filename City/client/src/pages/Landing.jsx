// import React from 'react'
// import "../styles/Landing.css";
// import { Link } from 'react-router-dom';

// const Landing = () => {
//   return (
//     <div className='landing-main'>
//     <h1>Welcome to City Pulse</h1>
//     <p>where streets glow</p>
//     <Link to="/login" className="landing-login-button">Login</Link>
//     <Link to="/register" className="landing-register-button">Register</Link>
//   </div>
//   )
// }

// export default Landing




import React from 'react'
import "../styles/Landing.css";
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='landing-main'>
    <div className="animated-text-container">
      <div className="animated-text">
        Welcome to CityPulse – Empowering Communities.
      </div>
    </div>
    <Link to="/login" className="landing-login-button">Login</Link>
    <Link to="/register" className="landing-register-button">Register</Link>
  </div>
  )
}

export default Landing
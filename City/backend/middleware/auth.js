// const jwt = require('jsonwebtoken');

// const authenticationMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     console.log("Missing or invalid Authorization header");
//     return res.status(401).json({ msg: "Unauthorized. Please add valid token" });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const { id, name } = decoded;
//     req.user = { id, name };
//     next();
 
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     return res.status(401).json({ msg: "Unauthorized. Please add valid token" });
//   }
  

// }

// module.exports = authenticationMiddleware;

const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Log the raw auth header
  console.log("🔐 Received Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("❌ Missing or invalid Authorization header");
    return res.status(401).json({ msg: "Unauthorized. Please add valid token" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded token
    console.log("✅ Decoded token:", decoded);

    const { id, name } = decoded;
    req.user = { id, name };
    next();
  } catch (error) {
    console.error("❌ Error verifying token:", error.message);
    return res.status(401).json({ msg: "Unauthorized. Invalid or expired token" });
  }
};

module.exports = authenticationMiddleware;

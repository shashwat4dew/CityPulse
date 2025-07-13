// // import React, { useEffect, useState } from 'react'
// // import "../styles/Dashboard.css";
// // import { Link, useNavigate } from 'react-router-dom';
// // import axios from "axios";



// // const Dashboard2 = () => {
// //   const [uploads, setUploads] = useState([]);

// //   const fetchUploads = async () => {
// //     try {
// //       // Get the token from localStorage
// //       const token = localStorage.getItem("token");
  
// //       const res = await axios.get("http://localhost:3000/api/uploads", {
// //         headers: {
// //           Authorization: `Bearer ${token}`, // Include token in Authorization header
// //         },
// //       });
  
// //       setUploads(res.data.uploads);
// //     } catch (err) {
// //       console.error("Error fetching uploads:", err);
// //     }
// //   };
  
// //   useEffect(() => {
// //     fetchUploads();
// //   }, []);
  

// //   return (
// //     <div>
// //       <h1>Admin Dashboard</h1>
      
// //       <div className="uploads">
// //   {Array.isArray(uploads) && uploads.length > 0 ? (
// //     uploads.map((upload, index) => (
// //       <div key={index} className="upload-item">
         
// //          <img
// //   src={upload.imageUrl}
// //   alt="upload"
// //   width="200"
// //   onError={(e) => {
// //     e.target.onerror = null; // Prevent infinite loop
// //     e.target.src = "/path/to/default/image.jpg"; // Fallback image
// //   }}
// // />
// //         <p>{upload.description}</p>
// //       </div>
// //     ))
// //   ) : (
// //     <p>No uploads available</p>
// //   )}
// // </div>

// //     </div>
// //   );
// //   };
// // export default Dashboard2

// import "../styles/Dashboard2.css";

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [uploads, setUploads] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUploads = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:3000/api/uploads", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUploads(res.data.uploads);
//       } catch (err) {
//         console.error("Error fetching uploads:", err);
//         setError("Failed to fetch uploads. Please try again later.");
//       }
//     };

//     fetchUploads();
//   }, []);

//   const handleToggleStatus = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.patch(
//         `http://localhost:3000/api/uploads/${id}/status`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const updatedUpload = res.data.upload;

//       // Update state with the new status
//       setUploads((prevUploads) =>
//         prevUploads.map((upload) =>
//           upload._id === id ? { ...upload, status: updatedUpload.status } : upload
//         )
//       );
//     } catch (err) {
//       console.error("Error toggling status:", err);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>
//       {error && <p className="error">{error}</p>}
//       {uploads.length === 0 ? (
//         <p>No uploads found.</p>
//       ) : (
//         <div className="uploads">
//           {uploads.map((upload, index) => (
//             <div key={index} className="upload-item">
//               <img
//                 src={upload.imageUrl}
//                 alt={upload.description}
//                 width="200"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "/path/to/default/image.jpg";
//                 }}
//               />
//               <p>{upload.description}</p>
//               <p>Status: {upload.status}</p>
//               <button onClick={() => handleToggleStatus(upload._id)}>
//                 Toggle Status
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;


//////////////////////////////////////////////////////////////////////////////////////////////////

// import "../styles/Dashboard2.css";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const baseURL = import.meta.env.VITE_BACKEND_URL;

// const AdminDashboard = () => {
//   const [uploads, setUploads] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUploads = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`${baseURL}/uploads`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUploads(res.data.uploads);
//       } catch (err) {
//         console.error("Error fetching uploads:", err);
//         setError("Failed to fetch uploads. Please try again later.");
//       }
//     };

//     fetchUploads();
//   }, []);

//   const handleToggleStatus = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.patch(
//         `${baseURL}/uploads/${id}/status`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const updatedUpload = res.data.upload;

//       setUploads((prevUploads) =>
//         prevUploads.map((upload) =>
//           upload._id === id ? { ...upload, status: updatedUpload.status } : upload
//         )
//       );
//     } catch (err) {
//       console.error("Error toggling status:", err);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>
//       {error && <p className="error">{error}</p>}
//       {uploads.length === 0 ? (
//         <p>No uploads found.</p>
//       ) : (
//         <div className="uploads">
//           {uploads.map((upload, index) => (
//             <div key={index} className="upload-item">
//               <img
//                 src={upload.imageUrl}
//                 alt={upload.description}
//                 width="200"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "/path/to/default/image.jpg";
//                 }}
//               />
//               <p>{upload.description}</p>
//               <p>Status: {upload.status}</p>
//               <button onClick={() => handleToggleStatus(upload._id)}>
//                 Toggle Status
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;



//////////////////////////////////////////////////////////////////////////////////////////

import "../styles/Dashboard2.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const AdminDashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseURL}/api/uploads`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUploads(res.data.uploads);
      } catch (err) {
        console.error("Error fetching uploads:", err);
        setError("Failed to fetch uploads. Please try again later.");
      }
    };

    fetchUploads();
  }, []);

  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${baseURL}/api/uploads/${id}/status`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUpload = res.data.upload;

      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload._id === id ? { ...upload, status: updatedUpload.status } : upload
        )
      );
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <p className="error">{error}</p>}
      {uploads.length === 0 ? (
        <p>No uploads found.</p>
      ) : (
        <div className="uploads">
          {uploads.map((upload, index) => (
            <div key={index} className="upload-item">
              <img
                src={`${baseURL}${upload.imageUrl}`}
                alt={upload.description}
                width="200"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback.jpg"; // Make sure fallback.jpg exists in /public
                }}
              />
              <p>{upload.description}</p>
              <p>Status: <strong>{upload.status}</strong></p>
              <button onClick={() => handleToggleStatus(upload._id)}>
                Toggle Status
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

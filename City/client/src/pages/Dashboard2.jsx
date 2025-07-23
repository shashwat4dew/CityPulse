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



////////////////////////////////////////////////////////////////////////////////////////
// Dashboard2.jsx
import "./Dash2.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const baseURL = import.meta.env.VITE_BACKEND_URL;

// Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const AdminDashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState("");
  const [visibleMaps, setVisibleMaps] = useState({}); // control which map is shown

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

  const toggleMap = (id) => {
    setVisibleMaps((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <p className="error">{error}</p>}

      {uploads.length === 0 ? (
        <p>No uploads found.</p>
      ) : (
        <div className="uploads-grid">
          {uploads.map((upload, index) => (
            <div key={index} className="upload-card">
              <img
                src={`${baseURL}${upload.imageUrl}`}
                alt={upload.description}
                className="upload-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback.jpg";
                }}
              />
              <div className="upload-details">
                <p><strong>Description:</strong> {upload.description}</p>
                {upload?.location?.address && (
                  <p><strong>📍 Address:</strong> {upload.location.address}</p>
                )}
                <p>
                  <strong>Status:</strong> <span className={`status-${upload.status}`}>
                    {upload.status}
                  </span>
                </p>

                <div className="admin-buttons">
                  <button onClick={() => handleToggleStatus(upload._id)}>
                    Toggle Status
                  </button>
                  {upload.location?.lat && upload.location?.lng && (
                    <button onClick={() => toggleMap(upload._id)}>
                      {visibleMaps[upload._id] ? "Hide Location" : "Show Location"}
                    </button>
                  )}
                </div>

                {visibleMaps[upload._id] && upload.location?.lat && upload.location?.lng && (
                  <div className="map-container">
                    <MapContainer
                      center={[upload.location.lat, upload.location.lng]}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={{ height: "250px", width: "100%", marginTop: "10px" }}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker position={[upload.location.lat, upload.location.lng]}>
                        <Popup>{upload.location.address || "Location"}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

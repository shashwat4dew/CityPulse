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
//         const res = await axios.get(`${baseURL}/api/uploads`, {
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
//         `${baseURL}/api/uploads/${id}/status`,
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
//                 src={`${baseURL}${upload.imageUrl}`}
//                 alt={upload.description}
//                 width="200"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "/fallback.jpg"; // Make sure fallback.jpg exists in /public
//                 }}
//               />
//               <p>{upload.description}</p>
//               <p>Status: <strong>{upload.status}</strong></p>
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


//working above//////////////////////////////////////////////////////////////////////

import "../styles/Dashboard.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const baseURL = import.meta.env.VITE_BACKEND_URL;

// Leaflet fix for missing icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Dashboard = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [fileInputRef] = useState(useRef());

  // Map modal state
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const fetchUploads = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${baseURL}/api/uploads`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUploads(res.data.uploads);
    } catch (err) {
      console.error("Error fetching uploads:", err);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !description) return alert("Provide all fields");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    const token = localStorage.getItem("token");
    if (!token) return alert("Login required");

    try {
      const res = await axios.post(`${baseURL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setUploads((prev) => [...prev, res.data.upload]);
      setDescription("");
      setImage(null);
      fileInputRef.current.value = "";
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  const handleViewLocation = (location) => {
    setSelectedLocation(location);
    setShowMap(true);
  };

  return (
    <div className="dashboard-container">
      <h1>Upload Issue</h1>

      <form onSubmit={handleSubmit} className="upload-form">
        <label htmlFor="fileInput">Upload an Image</label>
        <input
          id="fileInput"
          type="file"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description..."
          required
        />
        <button type="submit">Submit</button>
      </form>

      <hr />
      <h2>Previous Uploads</h2>
      <div className="uploads">
        {uploads.length > 0 ? (
          uploads.map((upload, idx) => (
            <div key={idx} className="upload-item">
              <img
                src={`${baseURL}${upload.imageUrl}`}
                alt="upload"
                width="200"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback.jpg";
                }}
              />
              <p>{upload.description}</p>
              {upload.location?.address && (
                <p>
                  <strong>📍</strong> {upload.location.address}
                </p>
              )}
              {upload.status === "completed" && (
                <p className="completed-mark">✅ Solved</p>
              )}

              {/* View on Map Button */}
              {upload.location?.lat && upload.location?.lng && (
                <button
                  onClick={() => handleViewLocation(upload.location)}
                  style={{
                    marginTop: "0.5rem",
                    padding: "5px 10px",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  View on Map
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No uploads available</p>
        )}
      </div>

      {/* Map Modal */}
      {showMap && selectedLocation && (
        <div className="map-popup">
          <div className="map-popup-inner">
            <button
              className="close-btn"
              onClick={() => setShowMap(false)}
              style={{ float: "right", marginBottom: "5px" }}
            >
              ✖
            </button>
            <MapContainer
              center={[selectedLocation.lat, selectedLocation.lng]}
              zoom={15}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
                <Popup>{selectedLocation.address}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

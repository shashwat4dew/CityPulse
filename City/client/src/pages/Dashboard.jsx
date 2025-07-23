

// import "../styles/Dashboard.css";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";

// const baseURL = import.meta.env.VITE_BACKEND_URL;

// const Dashboard = () => {
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [uploads, setUploads] = useState([]);
//   const fileInputRef = useRef();

//   const fetchUploads = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("No token found");
//         return;
//       }

//       const res = await axios.get(`${baseURL}/api/uploads`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUploads(res.data.uploads);
//     } catch (err) {
//       console.error("Error fetching uploads:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUploads();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!image || !description) {
//       return alert("Please provide both an image and a description.");
//     }

//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("description", description);

//     const token = localStorage.getItem("token");
//     if (!token) {
//       return alert("You must be logged in to upload.");
//     }

//     try {
//       const res = await axios.post(`${baseURL}/api/upload`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Add the actual response to uploads
//       setUploads((prevUploads) => [...prevUploads, res.data.upload]);

//       setDescription("");
//       setImage(null);
//       fileInputRef.current.value = "";
//     } catch (err) {
//       console.error("Error uploading image:", err.response?.data || err.message);
//       alert("Failed to upload image. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h1>Upload Issues</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="fileInput">Upload an Image</label>
//         <input
//           id="fileInput"
//           type="file"
//           ref={fileInputRef}
//           onChange={(e) => setImage(e.target.files[0])}
//           required
//         />
//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Enter a description..."
//           required
//         />
//         <button type="submit">Submit</button>
//       </form>

//       <div className="uploads">
//         {Array.isArray(uploads) && uploads.length > 0 ? (
//           uploads.map((upload, index) => (
//             <div key={index} className="upload-item">
//               <img
//                 src={`${baseURL}${upload.imageUrl}`} // ✅ Prefix with backend URL
//                 alt="upload"
//                 width="200"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "/fallback.jpg"; // ✅ Update if needed
//                 }}
//               />
//               <p>{upload.description}</p>
//               {upload.status === "completed" && (
//                 <p className="completed-mark">✅ Solved</p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No uploads available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import "../styles/Dashboard.css";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// const baseURL = import.meta.env.VITE_BACKEND_URL;

// // Fix leaflet default icon issue
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // Component to handle map clicks
// const LocationMarker = ({ setLat, setLng, setAddress }) => {
//   useMapEvents({
//     click: async (e) => {
//       const { lat, lng } = e.latlng;
//       setLat(lat);
//       setLng(lng);

//       try {
//         const res = await fetch(
//           `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
//         );
//         const data = await res.json();
//         setAddress(data.display_name);
//       } catch (err) {
//         console.error("Reverse geocoding failed", err);
//         setAddress("Unknown Location");
//       }
//     },
//   });

//   return null;
// };

// const Dashboard = () => {
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [uploads, setUploads] = useState([]);
//   const [lat, setLat] = useState(null);
//   const [lng, setLng] = useState(null);
//   const [address, setAddress] = useState("");
//   const fileInputRef = useRef();

//   const fetchUploads = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await axios.get(`${baseURL}/api/uploads`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUploads(res.data.uploads);
//     } catch (err) {
//       console.error("Error fetching uploads:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUploads();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!image || !description || !lat || !lng || !address) {
//       return alert("Please provide all fields including map location.");
//     }

//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("description", description);
//     formData.append("lat", lat);
//     formData.append("lng", lng);
//     formData.append("address", address);

//     const token = localStorage.getItem("token");
//     if (!token) {
//       return alert("You must be logged in to upload.");
//     }

//     try {
//       const res = await axios.post(`${baseURL}/api/upload`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUploads((prev) => [...prev, res.data.upload]);
//       setDescription("");
//       setImage(null);
//       setLat(null);
//       setLng(null);
//       setAddress("");
//       fileInputRef.current.value = "";
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Upload failed");
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h1>Upload Issue</h1>

//       <form onSubmit={handleSubmit} className="upload-form">
//         <label htmlFor="fileInput">Upload an Image</label>
//         <input
//           id="fileInput"
//           type="file"
//           ref={fileInputRef}
//           onChange={(e) => setImage(e.target.files[0])}
//           required
//         />

//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Enter a description..."
//           required
//         />

//         <div className="map-wrapper">
//           <label>Pick Location on Map:</label>
//           <MapContainer
//             center={[20.5937, 78.9629]}
//             zoom={5}
//             style={{ height: "300px", width: "100%", marginTop: "1rem" }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {lat && lng && (
//               <Marker position={[lat, lng]}>
//                 <Popup>{address || "Selected location"}</Popup>
//               </Marker>
//             )}
//             <LocationMarker setLat={setLat} setLng={setLng} setAddress={setAddress} />
//           </MapContainer>
//         </div>

//         {address && <p><strong>Address:</strong> {address}</p>}

//         <button type="submit">Submit</button>
//       </form>

//       <hr />
//       <h2>Previous Uploads</h2>
//       <div className="uploads">
//         {uploads.length > 0 ? (
//           uploads.map((upload, idx) => (
//             <div key={idx} className="upload-item">
//               <img
//                 src={`${baseURL}${upload.imageUrl}`}
//                 alt="upload"
//                 width="200"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "/fallback.jpg";
//                 }}
//               />
//               <p>{upload.description}</p>
//               {upload.address && <p><strong>📍</strong> {upload.address}</p>}
//               {upload.status === "completed" && (
//                 <p className="completed-mark">✅ Solved</p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No uploads available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





// import "../styles/Dashboard.css";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// const baseURL = import.meta.env.VITE_BACKEND_URL;

// // Fix leaflet icon issue
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // Component to get clicked map location
// const LocationMarker = ({ setLat, setLng, setAddress }) => {
//   useMapEvents({
//     click: async (e) => {
//       const { lat, lng } = e.latlng;
//       setLat(lat);
//       setLng(lng);

//       try {
//         const res = await fetch(
//           `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
//         );
//         const data = await res.json();
//         setAddress(data.display_name || "Unknown Location");
//       } catch (err) {
//         console.error("Geocoding failed", err);
//         setAddress("Unknown Location");
//       }
//     },
//   });
//   return null;
// };

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [uploads, setUploads] = useState([]);
//   const [lat, setLat] = useState(null);
//   const [lng, setLng] = useState(null);
//   const [address, setAddress] = useState("");
//   const [mapVisibleId, setMapVisibleId] = useState(null);
//   const fileInputRef = useRef();

//   const fetchUploads = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await axios.get(`${baseURL}/api/uploads`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUploads(res.data.uploads);
//     } catch (err) {
//       console.error("Error fetching uploads:", err);
//     }
//   };

//   useEffect(() => {
//     const email = localStorage.getItem("email");
//     const token = localStorage.getItem("token");

//     // ✅ Redirect admin
//     if (token && email === "admin@example.com") {
//       navigate("/dashboard2");
//     }

//     fetchUploads();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!image || !description || !lat || !lng || !address) {
//       return alert("Please provide all fields including map location.");
//     }

//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("description", description);
//     formData.append("lat", lat);
//     formData.append("lng", lng);
//     formData.append("address", address);

//     const token = localStorage.getItem("token");
//     if (!token) return alert("Login required.");

//     try {
//       const res = await axios.post(`${baseURL}/api/upload`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUploads((prev) => [...prev, res.data.upload]);
//       setDescription("");
//       setImage(null);
//       setLat(null);
//       setLng(null);
//       setAddress("");
//       fileInputRef.current.value = "";
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Upload failed");
//     }
//   };

//   const toggleMap = (id) => {
//     setMapVisibleId((prev) => (prev === id ? null : id));
//   };

//   return (
//     <div className="dashboard-container">
//       <h1>Upload Issue</h1>

//       <form onSubmit={handleSubmit} className="upload-form">
//         <label htmlFor="fileInput">Upload an Image</label>
//         <input
//           id="fileInput"
//           type="file"
//           ref={fileInputRef}
//           onChange={(e) => setImage(e.target.files[0])}
//           required
//         />

//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Enter a description..."
//           required
//         />

//         <div className="map-wrapper">
//           <label>Pick Location on Map:</label>
//           <MapContainer
//             center={[20.5937, 78.9629]}
//             zoom={5}
//             style={{ height: "300px", width: "100%", marginTop: "1rem" }}
//           >
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             {lat && lng && (
//               <Marker position={[lat, lng]}>
//                 <Popup>{address || "Selected location"}</Popup>
//               </Marker>
//             )}
//             <LocationMarker
//               setLat={setLat}
//               setLng={setLng}
//               setAddress={setAddress}
//             />
//           </MapContainer>
//         </div>

//         {address && <p><strong>Address:</strong> {address}</p>}

//         <button type="submit">Submit</button>
//       </form>

//       <hr />
//       <h2>Previous Uploads</h2>
//       <div className="uploads">
//         {uploads.length > 0 ? (
//           uploads.map((upload, idx) => (
//             <div key={idx} className="upload-item">
//               <img
//                 src={`${baseURL}${upload.imageUrl}`}
//                 alt="upload"
//                 width="200"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "/fallback.jpg";
//                 }}
//               />
//               <p>{upload.description}</p>

//               {upload.location?.address && (
//                 <p><strong>📍</strong> {upload.location.address}</p>
//               )}

//               {upload.status === "completed" && (
//                 <p className="completed-mark">✅ Solved</p>
//               )}

//               {upload.location?.lat && upload.location?.lng && (
//                 <>
//                   <button onClick={() => toggleMap(upload._id)} style={{ marginTop: "5px" }}>
//                     {mapVisibleId === upload._id ? "Hide Map" : "View on Map"}
//                   </button>

//                   {mapVisibleId === upload._id && (
//                     <MapContainer
//                       center={[upload.location.lat, upload.location.lng]}
//                       zoom={13}
//                       scrollWheelZoom={false}
//                       style={{
//                         height: "250px",
//                         width: "100%",
//                         marginTop: "10px",
//                         border: "1px solid #ccc",
//                       }}
//                     >
//                       <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                       />
//                       <Marker position={[upload.location.lat, upload.location.lng]}>
//                         <Popup>{upload.location.address}</Popup>
//                       </Marker>
//                     </MapContainer>
//                   )}
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No uploads available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







import "../styles/Dashboard.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const baseURL = import.meta.env.VITE_BACKEND_URL;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMarker = ({ setLat, setLng, setAddress }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setLat(lat);
      setLng(lng);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();
        setAddress(data.display_name || "Unknown Location");
      } catch (err) {
        console.error("Geocoding failed", err);
        setAddress("Unknown Location");
      }
    },
  });
  return null;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [address, setAddress] = useState("");
  const fileInputRef = useRef();
  const [openMapIndex, setOpenMapIndex] = useState(null);

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
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (token && email === "admin@example.com") {
      navigate("/dashboard2");
    }

    fetchUploads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !description || !lat || !lng || !address) {
      return alert("Please provide all fields including map location.");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("address", address);

    const token = localStorage.getItem("token");
    if (!token) return alert("Login required.");

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
      setLat(null);
      setLng(null);
      setAddress("");
      fileInputRef.current.value = "";
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>📤 Upload Issue</h1>

      <form onSubmit={handleSubmit} className="upload-form">
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
        <div className="map-wrapper">
          <label>📍 Pick Location:</label>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "250px", width: "100%", marginTop: "0.5rem" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {lat && lng && (
              <Marker position={[lat, lng]}>
                <Popup>{address || "Selected location"}</Popup>
              </Marker>
            )}
            <LocationMarker
              setLat={setLat}
              setLng={setLng}
              setAddress={setAddress}
            />
          </MapContainer>
        </div>
        {address && <p className="address-preview">📌 {address}</p>}
        <button type="submit">Submit</button>
      </form>

      <h2>🧾 Previous Uploads</h2>
      <div className="upload-cards-container">
        {uploads.map((upload, idx) => (
          <div key={idx} className="upload-card">
            <img
              src={`${baseURL}${upload.imageUrl}`}
              alt="upload"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback.jpg";
              }}
            />
            <div className="card-details">
              <p>{upload.description}</p>
              {upload.location?.address && (
                <p className="upload-address">📍 {upload.location.address}</p>
              )}
              <p>Status: <strong>{upload.status}</strong></p>
              <button
                className="map-toggle-btn"
                onClick={() =>
                  setOpenMapIndex(openMapIndex === idx ? null : idx)
                }
              >
                {openMapIndex === idx ? "Hide Map" : "Show Map"}
              </button>
              {openMapIndex === idx && upload.location?.lat && upload.location?.lng && (
                <MapContainer
                  center={[upload.location.lat, upload.location.lng]}
                  zoom={14}
                  style={{ height: "200px", width: "100%", marginTop: "0.5rem" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    position={[upload.location.lat, upload.location.lng]}
                  >
                    <Popup>{upload.location.address}</Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

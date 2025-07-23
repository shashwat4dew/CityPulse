





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

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

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
//   const fileInputRef = useRef();
//   const [openMapIndex, setOpenMapIndex] = useState(null);

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

//   return (
//     <div className="dashboard-container">
//       <h1>📤 Upload Issue</h1>

//       <form onSubmit={handleSubmit} className="upload-form">
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
//           <label>📍 Pick Location:</label>
//           <MapContainer
//             center={[20.5937, 78.9629]}
//             zoom={5}
//             style={{ height: "250px", width: "100%", marginTop: "0.5rem" }}
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
//         {address && <p className="address-preview">📌 {address}</p>}
//         <button type="submit">Submit</button>
//       </form>

//       <h2>🧾 Previous Uploads</h2>
//       <div className="upload-cards-container">
//         {uploads.map((upload, idx) => (
//           <div key={idx} className="upload-card">
//             <img
//               src={`${baseURL}${upload.imageUrl}`}
//               alt="upload"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "/fallback.jpg";
//               }}
//             />
//             <div className="card-details">
//               <p>{upload.description}</p>
//               {upload.location?.address && (
//                 <p className="upload-address">📍 {upload.location.address}</p>
//               )}
//               <p>Status: <strong>{upload.status}</strong></p>
//               <button
//                 className="map-toggle-btn"
//                 onClick={() =>
//                   setOpenMapIndex(openMapIndex === idx ? null : idx)
//                 }
//               >
//                 {openMapIndex === idx ? "Hide Map" : "Show Map"}
//               </button>
//               {openMapIndex === idx && upload.location?.lat && upload.location?.lng && (
//                 <MapContainer
//                   center={[upload.location.lat, upload.location.lng]}
//                   zoom={14}
//                   style={{ height: "200px", width: "100%", marginTop: "0.5rem" }}
//                 >
//                   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                   <Marker
//                     position={[upload.location.lat, upload.location.lng]}
//                   >
//                     <Popup>{upload.location.address}</Popup>
//                   </Marker>
//                 </MapContainer>
//               )}
//             </div>
//           </div>
//         ))}
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

// Fix leaflet icon issue
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
      } catch {
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
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [expandedMap, setExpandedMap] = useState({});
  const fileInputRef = useRef();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (token && email === "admin@example.com") {
      navigate("/dashboard2");
    }

    fetchUploads();
  }, []);

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

  const filteredUploads = uploads
    .filter((u) => filter === "all" || u.status === filter)
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  return (
    <div className="dashboard-container">
      <h1>Upload Issue</h1>

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

        <label>Select Location on Map:</label>
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: "300px", marginBottom: "1rem" }}
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

        {address && <p><strong>📍 Address:</strong> {address}</p>}

        <button type="submit">Submit</button>
      </form>

      <div className="filter-bar">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      <h2>Previous Uploads</h2>
      <div className="uploads">
        {filteredUploads.length > 0 ? (
          filteredUploads.map((upload) => (
            <div key={upload._id} className="upload-card">
              <img
                src={`${baseURL}${upload.imageUrl}`}
                alt="upload"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback.jpg";
                }}
              />
              <div className="upload-info">
                <p>{upload.description}</p>
                {upload.location?.address && (
                  <p><strong>📍</strong> {upload.location.address}</p>
                )}
                {upload.status === "completed" && (
                  <p className="completed">✅ Solved</p>
                )}
                <button
                  className="toggle-map"
                  onClick={() =>
                    setExpandedMap((prev) => ({
                      ...prev,
                      [upload._id]: !prev[upload._id],
                    }))
                  }
                >
                  {expandedMap[upload._id] ? "Hide Map" : "Show Map"}
                </button>
                {expandedMap[upload._id] && upload.location?.lat && (
                  <MapContainer
                    center={[upload.location.lat, upload.location.lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "200px", marginTop: "10px" }}
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
          ))
        ) : (
          <p>No uploads found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


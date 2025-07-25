
// import "../styles/Dashboard2.css";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// const baseURL = import.meta.env.VITE_BACKEND_URL;

// // Fix leaflet icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const AdminDashboard = () => {
//   const [uploads, setUploads] = useState([]);
//   const [error, setError] = useState("");
//   const [openMapIndex, setOpenMapIndex] = useState(null);

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

//   const toggleMap = (index) => {
//     setOpenMapIndex(openMapIndex === index ? null : index);
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
//             <div key={upload._id} className="upload-item">
//               <img
//                 src={`${baseURL}${upload.imageUrl}`}
//                 alt={upload.description}
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "/fallback.jpg";
//                 }}
//               />
//               <p><strong>Description:</strong> {upload.description}</p>
//               {upload.location?.address && (
//                 <p><strong>📍 Address:</strong> {upload.location.address}</p>
//               )}
//               <p>Status: <strong>{upload.status}</strong></p>

//               <button onClick={() => handleToggleStatus(upload._id)}>
//                 Toggle Status
//               </button>

//               {upload.location?.lat && upload.location?.lng && (
//                 <>
//                   <button className="toggle-map" onClick={() => toggleMap(index)}>
//                     {openMapIndex === index ? "Hide Map" : "Show Location on Map"}
//                   </button>

//                   {openMapIndex === index && (
//                     <div className="map-container">
//                       <MapContainer
//                         center={[upload.location.lat, upload.location.lng]}
//                         zoom={13}
//                         scrollWheelZoom={false}
//                         style={{ height: "100%", width: "100%" }}
//                       >
//                         <TileLayer
//                           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         />
//                         <Marker
//                           position={[upload.location.lat, upload.location.lng]}
//                         >
//                           <Popup>{upload.location.address}</Popup>
//                         </Marker>
//                       </MapContainer>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

import "../styles/Dashboard.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
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

const AdminDashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [mapVisible, setMapVisible] = useState({});

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${baseURL}/api/uploads`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUploads(res.data.uploads);
    } catch (err) {
      console.error("Error fetching uploads:", err);
    }
  };

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

  const filteredSortedUploads = uploads
    .filter((u) => filter === "all" || u.status === filter)
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

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

      <div className="uploads">
        {filteredSortedUploads.length > 0 ? (
          filteredSortedUploads.map((upload) => (
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
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={upload.status === "completed" ? "completed" : ""}>
                    {upload.status}
                  </span>
                </p>
                {upload.location?.address && (
                  <p>
                    <strong>📍</strong> {upload.location.address}
                  </p>
                )}
                <button
                  className="toggle-map"
                  onClick={() =>
                    setMapVisible((prev) => ({
                      ...prev,
                      [upload._id]: !prev[upload._id],
                    }))
                  }
                >
                  {mapVisible[upload._id] ? "Hide Map" : "Show Map"}
                </button>
                <button
                  className="status-btn"
                  onClick={() => handleToggleStatus(upload._id)}
                >
                  Toggle Status
                </button>

                {mapVisible[upload._id] && upload.location?.lat && (
                  <MapContainer
                    center={[upload.location.lat, upload.location.lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "200px", marginTop: "10px" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[upload.location.lat, upload.location.lng]}>
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

export default AdminDashboard;

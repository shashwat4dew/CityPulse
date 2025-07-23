
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
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");
  const [openMapIds, setOpenMapIds] = useState(new Set());

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseURL}/api/uploads`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sorted = res.data.uploads.sort(
          (a, b) =>
            new Date(b.createdAt || b._id.substring(0, 8)) -
            new Date(a.createdAt || a._id.substring(0, 8))
        );
        setUploads(sorted);
        setFiltered(sorted);
      } catch (err) {
        console.error("Error fetching uploads:", err);
        setError("Failed to fetch uploads. Please try again later.");
      }
    };

    fetchUploads();
  }, []);

  useEffect(() => {
    let result = [...uploads];

    if (filterStatus !== "all") {
      result = result.filter((u) => u.status === filterStatus);
    }

    if (sortOrder === "latest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || b._id.substring(0, 8)) -
          new Date(a.createdAt || a._id.substring(0, 8))
      );
    } else {
      result.sort(
        (a, b) =>
          new Date(a.createdAt || a._id.substring(0, 8)) -
          new Date(b.createdAt || b._id.substring(0, 8))
      );
    }

    setFiltered(result);
  }, [filterStatus, sortOrder, uploads]);

  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${baseURL}/api/uploads/${id}/status`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = res.data.upload;
      setUploads((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: updated.status } : u))
      );
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const toggleMap = (id) => {
    const updatedSet = new Set(openMapIds);
    if (updatedSet.has(id)) {
      updatedSet.delete(id);
    } else {
      updatedSet.add(id);
    }
    setOpenMapIds(updatedSet);
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      {error && <p className="error">{error}</p>}

      {/* 🔍 Filters */}
      <div className="filter-bar">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No uploads found.</p>
      ) : (
        <div className="upload-cards-container">
          {filtered.map((upload, index) => (
            <div key={index} className="upload-card">
              <img
                src={`${baseURL}${upload.imageUrl}`}
                alt={upload.description}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback.jpg";
                }}
              />
              <div className="card-details">
                <p><strong>Description:</strong> {upload.description}</p>
                <p className="upload-address">
                  📍 {upload?.location?.address || "No address provided"}
                </p>
                <p className={upload.status === "completed" ? "completed-mark" : "pending-mark"}>
                  Status: {upload.status}
                </p>

                <button
                  className="map-toggle-btn"
                  onClick={() => toggleMap(upload._id)}
                >
                  {openMapIds.has(upload._id)
                    ? "Hide Map"
                    : "Show Map"}
                </button>

                <button
                  style={{ marginLeft: "0.5rem" }}
                  onClick={() => handleToggleStatus(upload._id)}
                  className="map-toggle-btn"
                >
                  Toggle Status
                </button>
              </div>

              {openMapIds.has(upload._id) &&
                upload?.location?.lat &&
                upload?.location?.lng && (
                  <div style={{ width: "100%", marginTop: "1rem" }}>
                    <MapContainer
                      center={[
                        upload.location.lat,
                        upload.location.lng,
                      ]}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={{ height: "200px", width: "100%" }}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marker
                        position={[
                          upload.location.lat,
                          upload.location.lng,
                        ]}
                      >
                        <Popup>{upload.location.address}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

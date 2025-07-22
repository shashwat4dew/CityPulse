

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
import "../styles/Dashboard.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const baseURL = import.meta.env.VITE_BACKEND_URL;

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationPicker = ({ setLatLng }) => {
  useMapEvents({
    click(e) {
      setLatLng({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

const Dashboard = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [latLng, setLatLng] = useState(null);
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const fileInputRef = useRef();

  const fetchUploads = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${baseURL}/api/uploads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUploads(res.data.uploads);
    } catch (err) {
      console.error("Error fetching uploads:", err);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  useEffect(() => {
    const getAddress = async () => {
      if (!latLng) return;
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse`,
          {
            params: {
              lat: latLng.lat,
              lon: latLng.lng,
              format: "json",
            },
          }
        );
        setAddress(res.data.display_name || "Unknown Location");
      } catch (err) {
        console.error("Reverse geocoding failed:", err);
        setAddress("Unknown Location");
      }
    };

    getAddress();
  }, [latLng]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !description || !latLng || !address) {
      return alert("Please fill all fields and pick a location.");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("lat", latLng.lat);
    formData.append("lng", latLng.lng);
    formData.append("address", address);

    const token = localStorage.getItem("token");
    if (!token) {
      return alert("You must be logged in to upload.");
    }

    try {
      const res = await axios.post(`${baseURL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setUploads((prevUploads) => [...prevUploads, res.data.upload]);

      // Reset
      setDescription("");
      setImage(null);
      setLatLng(null);
      setAddress("");
      fileInputRef.current.value = "";
      setShowMap(false);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="dashboard">
      <h1>Upload Issue</h1>

      <form onSubmit={handleSubmit}>
        <label>Upload an Image</label>
        <input
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

        <button type="button" onClick={() => setShowMap(!showMap)}>
          {latLng ? "📍 Location Selected" : "📌 Pick Location on Map"}
        </button>

        {showMap && (
          <div style={{ height: "300px", margin: "1rem 0" }}>
            <MapContainer center={[20.59, 78.96]} zoom={4} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap"
              />
              <LocationPicker setLatLng={setLatLng} />
              {latLng && <Marker position={[latLng.lat, latLng.lng]} icon={markerIcon} />}
            </MapContainer>
          </div>
        )}

        {latLng && (
          <div>
            <p><strong>Lat:</strong> {latLng.lat.toFixed(4)}</p>
            <p><strong>Lng:</strong> {latLng.lng.toFixed(4)}</p>
            <p><strong>Address:</strong> {address}</p>
          </div>
        )}

        <button type="submit">Submit</button>
      </form>

      <h2 style={{ marginTop: "2rem" }}>Your Uploads</h2>
      <div className="uploads">
        {uploads.length ? (
          uploads.map((upload, index) => (
            <div key={index} className="upload-item">
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

              {upload.address && (
                <p><strong>📍 Address:</strong> {upload.address}</p>
              )}
              {upload.location?.lat && upload.location?.lng && (
                <p><strong>🌍 Coordinates:</strong> {upload.location.lat.toFixed(4)}, {upload.location.lng.toFixed(4)}</p>
              )}
              {upload.status === "completed" && (
                <p className="completed-mark">✅ Solved</p>
              )}
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

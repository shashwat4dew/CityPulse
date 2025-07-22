

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
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const baseURL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null, address: "" });
  const [showMap, setShowMap] = useState(false);
  const fileInputRef = useRef();

  const fetchUploads = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !description) {
      return alert("Please provide both an image and a description.");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("lat", location.lat);
    formData.append("lng", location.lng);
    formData.append("address", location.address);

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
      setDescription("");
      setImage(null);
      setLocation({ lat: null, lng: null, address: "" });
      fileInputRef.current.value = "";
    } catch (err) {
      console.error("Error uploading image:", err.response?.data || err.message);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div>
      <h1>Upload Issues</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="button" onClick={() => setShowMap(true)}>
          Pick Location on Map
        </button>

        {location.address && (
          <p>
            <strong>Selected Address:</strong> {location.address}
          </p>
        )}

        <button type="submit">Submit</button>
      </form>

      {showMap && (
        <div style={{ height: "400px", margin: "1rem 0" }}>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
            onClick={(e) => {
              const lat = e.latlng.lat;
              const lng = e.latlng.lng;
              setLocation((prev) => ({ ...prev, lat, lng }));

              fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
              )
                .then((res) => res.json())
                .then((data) => {
                  setLocation((prev) => ({
                    ...prev,
                    address: data.display_name,
                  }));
                })
                .catch((err) => {
                  console.error("Error fetching address:", err);
                });
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {location.lat && location.lng && (
              <Marker position={[location.lat, location.lng]}>
                <Popup>{location.address || "Selected Location"}</Popup>
              </Marker>
            )}
          </MapContainer>
          <button onClick={() => setShowMap(false)} style={{ marginTop: "1rem" }}>
            Done
          </button>
        </div>
      )}

      <div className="uploads">
        {Array.isArray(uploads) && uploads.length > 0 ? (
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
                <p>
                  <strong>Location:</strong> {upload.address}
                </p>
              )}
              {upload.status === "completed" && (
                <p className="completed-mark">✅ Solved</p>
              )}
            </div>
          ))
        ) : (
          <p>No uploads available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



// import "../styles/Dashboard.css";

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [uploads, setUploads] = useState([]);

//   const fetchUploads = async () => {
//     try {
//       // Get the token from localStorage
//       const token = localStorage.getItem("token");
  
//       const res = await axios.get("http://localhost:3000/api/uploads", {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include token in Authorization header
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

//   const fileInputRef = React.useRef();

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
  
//     // Create an optimistic upload object
//     const optimisticUpload = {
//       imageUrl: URL.createObjectURL(image),
//       description,
//       user: "current-user-id", // Replace with the current user's ID
//     };
  
//     setUploads((prevUploads) => [...prevUploads, optimisticUpload]);
  
//     try {
//       const res = await axios.post("http://localhost:3000/api/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       // Replace the optimistic upload with the real one from the server
//       setUploads((prevUploads) =>
//         prevUploads.map((upload) =>
//           upload.imageUrl === optimisticUpload.imageUrl ? res.data.upload : upload
//         )
//       );
  
//       setDescription("");
//       setImage(null);
//       fileInputRef.current.value = ""; // Reset file input
//     } catch (err) {
//       console.error("Error uploading image:", err.response?.data || err.message);
//       alert("Failed to upload image. Please try again.");
//     }
//   };
  

//   return (
//     <div>
//       <h1>User Dashboard</h1>
//       <form onSubmit={handleSubmit}>
//       <input
//   type="file"
//   ref={fileInputRef}
//   onChange={(e) => setImage(e.target.files[0])}
//   required
// />

//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Enter description"
//           required
//         />
//         <button type="submit">Upload</button>
//       </form>
//       <div className="uploads">
//   {Array.isArray(uploads) && uploads.length > 0 ? (
//     uploads.map((upload, index) => (
//       <div key={index} className="upload-item">
         
//          <img
//   src={upload.imageUrl}
//   alt="upload"
//   width="200"
//   onError={(e) => {
//     e.target.onerror = null; // Prevent infinite loop
//     e.target.src = "/path/to/default/image.jpg"; // Fallback image
//   }}
// />
//         <p>{upload.description}</p>
//       </div>
//     ))
//   ) : (
//     <p>No uploads available</p>
//   )}


// </div>

//     </div>
//   );
// };
// export default Dashboard;

import "../styles/Dashboard.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploads, setUploads] = useState([]);

  const fetchUploads = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3000/api/uploads", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
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

  const fileInputRef = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !description) {
      return alert("Please provide both an image and a description.");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    const token = localStorage.getItem("token");

    if (!token) {
      return alert("You must be logged in to upload.");
    }

    // Create an optimistic upload object
    const optimisticUpload = {
      imageUrl: URL.createObjectURL(image),
      description,
      user: "current-user-id", // Replace with the current user's ID
      status: "pending", // Default status
    };

    setUploads((prevUploads) => [...prevUploads, optimisticUpload]);

    try {
      const res = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Replace the optimistic upload with the real one from the server
      setUploads((prevUploads) =>
        prevUploads.map((upload) =>
          upload.imageUrl === optimisticUpload.imageUrl ? res.data.upload : upload
        )
      );

      setDescription("");
      setImage(null);
      fileInputRef.current.value = ""; // Reset file input
    } catch (err) {
      console.error("Error uploading image:", err.response?.data || err.message);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <form onSubmit={handleSubmit}>
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
          placeholder="Enter description"
          required
        />
        <button type="submit">Upload</button>
      </form>
      <div className="uploads">
        {Array.isArray(uploads) && uploads.length > 0 ? (
          uploads.map((upload, index) => (
            <div key={index} className="upload-item">
              <img
                src={upload.imageUrl}
                alt="upload"
                width="200"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = "/path/to/default/image.jpg"; // Fallback image
                }}
              />
              <p>{upload.description}</p>
              {/* Display a mark for completed uploads */}
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

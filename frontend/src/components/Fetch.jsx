import { useState, useEffect } from "react";
import axios from "axios";
import VideoPlayer from "./VideoPlayer"; // Import Video Player

const Fetch = () => {
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState("all"); // "audio", "video", "all"

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const query = filter !== "all" ? `?type=${filter}` : "";
        const response = await axios.get(`http://localhost:5000/api/auth/files${query}`);
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, [filter]); // Refetch when filter changes

  return (
    <div>
      <h2>Uploaded Files</h2>

      {/* Filter Buttons */}
      <div>
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>
          Show All
        </button>
        <button onClick={() => setFilter("audio")} disabled={filter === "audio"}>
          Audios
        </button>
        <button onClick={() => setFilter("video")} disabled={filter === "video"}>
          Videos
        </button>
      </div>

      {/* File List */}
      {files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        files.map((file) => (
          <div key={file._id}>
            <p>{file.fileName}</p>
            {file.type === "audio" ? (
              <audio controls src={file.fileUrl}></audio>
            ) : (
              <VideoPlayer publicId={file.fileUrl} />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Fetch;

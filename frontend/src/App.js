import { useState } from "react";
import Upload from "./components/Upload";
import Fetch from "./components/Fetch";
import "./App.css"; // Import styles

const App = () => {
  const [view, setView] = useState("upload");

  return (
    <div className="app-container">
      <h1 className="title">Media Upload & Streaming</h1>
      
      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <button 
          className={view === "upload" ? "active" : ""}
          onClick={() => setView("upload")}
        >
          Upload Files
        </button>
        <button 
          className={view === "fetch" ? "active" : ""}
          onClick={() => setView("fetch")}
        >
          View Uploaded Files
        </button>
      </div>
      
      {/* Dynamic Component Rendering */}
      <div className="content">
        {view === "upload" ? <Upload /> : <Fetch />}
      </div>
    </div>
  );
};

export default App;

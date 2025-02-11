import { useEffect, useRef } from "react";

const VideoPlayer = ({ publicId, width = 640, height = 360 }) => {
  const videoRef = useRef();
  const cloudinaryRef = useRef();
  const playerRef = useRef();

  useEffect(() => {
    if (!window.cloudinary) {
      console.error("Cloudinary not found on window");
      return;
    }

    if (!cloudinaryRef.current) {
      cloudinaryRef.current = window.cloudinary;
      playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, {
        cloud_name: "dpsenybgc", // Cloudinary Cloud Name
        secure: true,
      });
    }
  }, []);

  return (
    <div style={{ width: "100%", aspectRatio: `${width} / ${height}` }}>
      <video
        ref={videoRef}
        className="cld-video-player cld-fluid"
        controls
        data-cld-public-id={publicId} // Cloudinary Video Public ID
      />
    </div>
  );
};

export default VideoPlayer;

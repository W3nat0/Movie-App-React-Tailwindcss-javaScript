import React from "react";

const VideoShow = ({ selectedVideo }) => {
  if (!selectedVideo) {
    return <p className="text-lg text-gray-400 mt-4">No video available.</p>;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="relative mb-36 w-full" style={{ paddingTop: "50%" }}>
        <iframe
          src={`https://www.youtube.com/embed/${selectedVideo}`}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoShow;

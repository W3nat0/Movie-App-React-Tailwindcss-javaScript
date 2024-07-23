import React from "react";

const VideoShow = ({ selectedVideo }) => {
  if (!selectedVideo) {
    return <p className="text-lg text-gray-400 mt-4">No video available.</p>;
  }

  return (
    <div className="mt-6 relative flex justify-center">
      <iframe
        width="90%"
        height="750px"
        src={`https://www.youtube.com/embed/${selectedVideo}`}
        title="Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

export default VideoShow;

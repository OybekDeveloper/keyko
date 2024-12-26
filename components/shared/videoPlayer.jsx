"use client";
import React from "react";
import ReactPlayer from "react-player";
import Loader from "./loader";

const VideoPlayer = ({ video, poster }) => {
  const preventContextMenu = (e) => {
    e.preventDefault();
    alert("Yuklab olish man etilgan!");
  };
  return (
    <div className="w-full" onContextMenu={preventContextMenu}>
      <ReactPlayer
        poster={poster}
        url={video}
        controls
        width="100%"
        height="100%"
        pip={false}
        fallback={<Loader />}
      />
    </div>
  );
};

export default VideoPlayer;

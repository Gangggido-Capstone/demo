import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoPlayer = ({ onStartTracking }) => {
    const [videoId, setVideoId] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const videoUrl = "https://www.googleapis.com/youtube/v3/videos";

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(videoUrl, {
                    params: {
                        part: "snippet",
                        id: "wJMHAzKxbh8",
                        key: API_KEY,
                    },
                });
                setVideoId(response.data.items[0].id);
            } catch (error) {
                console.error("Error fetching video: ", error);
            }
        };
        fetchVideo();
    });

    const handlePlayButton = () => {
        setIsPlaying(true);
        onStartTracking();
    };

    return (
        <div>
            {isPlaying ? (
                <iframe
                    width="1000"
                    height="600"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <button onClick={handlePlayButton}>Play Video</button>
            )}
        </div>
    );
};

export default VideoPlayer;

import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import GazeTracker from "./components/GazeTracker";

function App() {
    const [isTracking, setIsTracking] = useState(false);
    const [isCalibrated, setIsCalibrated] = useState(false);

    const handleStartTracking = () => {
        setIsTracking(true);
    };

    const handleCalibrationComplete = () => {
        setIsCalibrated(true);
    };

    return (
        <div className="App">
            <h1>YouTube Eye Tracker</h1>
            {!isCalibrated && (
                <GazeTracker
                    onCalibrationComplete={handleCalibrationComplete}
                />
            )}
            {isCalibrated && (
                <VideoPlayer onStartTracking={handleStartTracking} />
            )}
            {isTracking && <GazeTracker isTracking={isTracking} />}
        </div>
    );
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";

const GazeTracker = ({ isTracking, onCalibrationComplete }) => {
    const [gazeData, setGazeData] = useState([]);
    const [timestamp, setTimestamp] = useState(0);
    const [pointerPosition, setPointerPosition] = useState({ X: 0, Y: 0 });

    useEffect(() => {
        if (isTracking) {
            window.GazeCloudAPI.OnResult = (GazeData) => {
                if (GazeData.state === 0) {
                    const { docX, docY, time } = GazeData;
                    setPointerPosition({ X: docX, Y: docY });
                    setGazeData((prevData) => [
                        ...prevData,
                        { X: docX, Y: docY, time },
                    ]);
                    setTimestamp(time);
                }
            };
        }
    }, [isTracking]);

    useEffect(() => {
        if (isTracking && gazeData.length > 0) {
            axios
                .post("http://localhost:5000/save-gaze-data", gazeData)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Error saving gaze data:", error);
                });
        }
    }, [gazeData, isTracking]);

    useEffect(() => {
        window.GazeCloudAPI.OnCalibrationComplete = () => {
            console.log("Calibration Complete");
            onCalibrationComplete();
        };
        window.GazeCloudAPI.OnCamDenied = () => {
            console.log("Camera access denied");
        };
        window.GazeCloudAPI.OnError = (msg) => {
            console.log("Error: " + msg);
        };
        window.GazeCloudAPI.UseClickRecalibration = true;
        window.GazeCloudAPI.StartEyeTracking();
    }, [onCalibrationComplete]);

    return (
        <div>
            {isTracking ? (
                <div>
                    <p>Current Timestamp: {timestamp}</p>
                    <p>
                        Gaze Coordinates:{" "}
                        {gazeData.length > 0
                            ? `X: ${gazeData[gazeData.length - 1].X}, Y: ${
                                  gazeData[gazeData.length - 1].Y
                              }`
                            : "N/A"}
                    </p>
                    <div
                        style={{
                            position: "absolute",
                            top: pointerPosition.Y,
                            left: pointerPosition.X,
                            width: "10px",
                            height: "10px",
                            backgroundColor: "red",
                            borderRadius: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                </div>
            ) : (
                <div>Calibrating... Please follow the instructions.</div>
            )}
        </div>
    );
};

export default GazeTracker;

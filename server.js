const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

let corsOptions = {
    origin: "*", // 출처 허용 옵션
    credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.post("/save-gaze-data", (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, "gaze-data.csv");
    const csvData = data.map((d) => `${d.time},${d.X},${d.Y}`).join("\n");

    fs.appendFile(filePath, csvData + "\n", (err) => {
        if (err) {
            return res.status(500).send("Error saving data");
        }
        res.send("Data saved successfully");
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

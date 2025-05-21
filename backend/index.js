const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 5000;

app.use(cors()); 
app.use("/compressed", express.static(path.join(__dirname, "compressed")));

const upload = multer({ dest: "uploads/" });
if (!fs.existsSync("compressed")) fs.mkdirSync("compressed");

app.post("/compress", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    const inputFilePath = path.join(__dirname, req.file.path);
    const outputFileName = `${Date.now()}_compressed.bin`;
    const outputFilePath = path.join(__dirname, "compressed", outputFileName);
    
    const huffmanBinary = path.join(__dirname, process.platform === "win32" ? "huffman.exe" : "huffman");

    if (!fs.existsSync(huffmanBinary)) return res.status(500).json({ error: "Huffman binary not found." });

    const huffmanProcess = spawn(huffmanBinary, [inputFilePath, outputFilePath]);

    huffmanProcess.on("close", (code) => {
        if (code === 0) {
            res.json({
                message: "Compression successful!",
                originalSize: fs.statSync(inputFilePath).size,
                compressedSize: fs.statSync(outputFilePath).size,
                downloadUrl: `http://localhost:5000/compressed/${outputFileName}`,
            });
        } else {
            res.status(500).json({ error: "Compression failed." });
        }
    });

    huffmanProcess.on("error", (err) => {
        console.error("Failed to start Huffman process:", err);
        res.status(500).json({ error: "Internal server error." });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

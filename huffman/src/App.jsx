import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [sizes, setSizes] = useState({ original: 0, compressed: 0 });

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5000/compress", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      setDownloadUrl(data.downloadUrl);
      setSizes({ original: data.originalSize, compressed: data.compressedSize });
    } else {
      alert("Compression failed.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="app-container">
        <h1>File Size Reduction using Huffman Coding</h1>
        <label htmlFor="file-upload" className="file-label">
          Choose File
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="file-input"
          />
        </label>
        <br />
        <button onClick={handleUpload} className="compress-button">
          Compress
        </button>

        {downloadUrl && (
          <div className="result">
            <h2>Your Compressed File</h2>
            <p><strong>Original Size:</strong> {sizes.original} bytes</p>
            <p><strong>Compressed Size:</strong> {sizes.compressed} bytes</p>
            <a href={downloadUrl} download="compressed.bin">
              Download Compressed File
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

// OutfitTest.js - Component to test Outfit upload functionality
import React, { useState } from 'react';
import apiClient from './apiClient';

function OutfitTest() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [folder, setFolder] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [userOutfitList, setUserOutfitList] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("folder", folder);
    formData.append("description", description);
    apiClient.post(`/outfits/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      setMessage("Upload successful!");
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      setMessage("Upload failed. Please try again.");
    });
  };

  const handleGetImageUrl = () => {
    apiClient.get(`/outfits/image/${fileName}`)
      .then((response) => {
        setImageUrl(response.data);
        setMessage("Image fetched successfully!");
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        setMessage("Failed to fetch image. Please try again.");
      });
  };

  const handleGetUserOutfitList = () => {
    apiClient.get(`/outfits/list`)
      .then((response) => {
        setUserOutfitList(response.data);
        setMessage("User outfit list fetched successfully!");
      })
      .catch((error) => {
        console.error("Error fetching user outfit list:", error);
        setMessage("Failed to fetch user outfit list. Please try again.");
      });
  };

  return (
    <div>
      <h2>Outfit Upload Test</h2>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input type="text" placeholder="Folder" value={folder} onChange={(e) => setFolder(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleUpload}>Upload Outfit</button>
      <br />
      <input type="text" placeholder="File Name to Fetch" value={fileName} onChange={(e) => setFileName(e.target.value)} />
      <button onClick={handleGetImageUrl}>Get Image</button>
      <button onClick={handleGetUserOutfitList}>Get User Outfit List</button>
      {message && <p>{message}</p>}
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded Outfit" width="300" />
        </div>
      )}
      {userOutfitList.length > 0 && (
        <div>
          <h3>User Outfit List:</h3>
          <ul>
            {userOutfitList.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OutfitTest;

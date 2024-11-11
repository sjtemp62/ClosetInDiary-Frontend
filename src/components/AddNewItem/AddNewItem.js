import React, { useState } from "react";
import "./AddNewItem.css";
import apiClient from "../../api/apiClient";

export const AddNewItem = ({ closeModal, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [category, setCategory] = useState("");
  const [folder, setFolder] = useState(""); // 폴더 이름을 저장하는 상태
  const [description, setDescription] = useState(""); // 설명을 저장하는 상태
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const preview = URL.createObjectURL(selectedFile);
      setPreviewUrl(preview);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleModalClose = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    closeModal();
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("folder", folder);
    formData.append("description", description);

    apiClient.post(`/closet/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(() => {
      alert("Upload successful!");
      onUploadSuccess(); // 업로드 성공 시 호출
      handleModalClose();
    })
    .catch((error) => {
      console.error("Error saving outfit:", error);
      alert("Save failed. Please try again.");
    });
  };

  const categoryOptions = [
    "Tops", "Dresses", "Pants", "Skirts", "Outerwear", "Shoes", "Bags", "Accessory"
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Item</h2>

        <select
          className="modal-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>Choose a category</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Folder"
          className="modal-input"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="modal-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input type="file" onChange={handleFileChange} className="modal-input" />

        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="Preview" className="preview-image" />
          </div>
        )}

        <button onClick={handleUpload} className="modal-upload-button">Upload</button>
        <button onClick={handleModalClose} className="modal-close-button">Close</button>
      </div>
    </div>
  );
};

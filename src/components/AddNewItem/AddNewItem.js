import React, { useState } from "react";
import "./AddNewItem.css";

export const AddNewItem = ({ closeModal }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [category, setCategory] = useState(""); // 선택된 카테고리를 저장하는 상태

  // 파일이 변경되었을 때 호출되는 함수
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // 파일이 선택된 경우 미리보기 URL 생성
    if (selectedFile) {
      const preview = URL.createObjectURL(selectedFile);
      setPreviewUrl(preview);
    } else {
      setPreviewUrl(null); // 파일이 없으면 미리보기 URL 제거
    }
  };

  // 미리보기 URL 해제 (메모리 정리)
  const handleModalClose = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    closeModal();
  };

  // 카테고리 목록
  const categoryOptions = [
    "Tops", "Dresses", "Pants", "Skirts", "Outerwear", "Shoes", "Bags", "Accessory"
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Item</h2>
        
        {/* 카테고리 선택 드롭다운 */}
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

        <input type="text" placeholder="Folder" className="modal-input" />
        <input type="text" placeholder="Description" className="modal-input" />

        {/* 파일 선택 인풋 */}
        <input type="file" onChange={handleFileChange} className="modal-input" />
        
        {/* 파일 미리보기 */}
        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="Preview" className="preview-image" />
          </div>
        )}
        
        <button onClick={handleModalClose} className="modal-close-button">Close</button>
      </div>
    </div>
  );
};

import React from 'react';
import './UploadModal.css';

function UploadModal({
  onClose,
  onSave,
  file,
  setFile,
  category,
  setCategory,
  folder,
  setFolder,
  description,
  setDescription,
  editMode
}) {
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{editMode ? "Edit Outfit" : "Upload New Outfit"}</h3>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Folder"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">{editMode ? "Save Changes" : "Upload"}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;

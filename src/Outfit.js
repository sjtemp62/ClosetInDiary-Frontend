import React, { useEffect, useState, useCallback } from 'react';
import apiClient from './apiClient';
import { useNavigate } from 'react-router-dom';
import UploadModal from './UploadModal'; 
import './Outfit.css';

function Outfit() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [folder, setFolder] = useState("");
  const [description, setDescription] = useState("");
  const [userOutfitList, setUserOutfitList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false); // 수정 모드 상태
  const [editOutfitId, setEditOutfitId] = useState(null); // 수정할 항목 ID

  const itemsPerPage = 6;

  const handleGetUserOutfitList = useCallback(() => {
    apiClient.get(`/outfits/list`)
      .then(async (response) => {
        const outfits = response.data;
        const outfitsWithImages = await Promise.all(outfits.map(async (outfit) => {
          const imageUrl = await fetchImage(outfit.id);
          return { ...outfit, imageUrl };
        }));
        setUserOutfitList(outfitsWithImages);
        setMessage("User outfit list fetched successfully!");
      })
      .catch((error) => {
        console.error("Error fetching user outfit list:", error);
        setMessage("Failed to fetch user outfit list. Please try again.");
      });
  }, []);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('accessToken');
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }
    handleGetUserOutfitList();
  }, [navigate, handleGetUserOutfitList]);

  const handleOpenModal = () => {
    setEditMode(false); // 추가 모드로 열기
    setIsModalOpen(true);
  };

  const handleEdit = (outfit) => {
    setEditMode(true); // 수정 모드로 전환
    setEditOutfitId(outfit.id);
    setCategory(outfit.category);
    setFolder(outfit.folder);
    setDescription(outfit.description);
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setFile(null);
    setCategory("");
    setFolder("");
    setDescription("");
    setEditMode(false);
    setEditOutfitId(null);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("folder", folder);
    formData.append("description", description);
    if (file) formData.append("file", file);

    const request = editMode 
      ? apiClient.put(`/outfits/image/${editOutfitId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      : apiClient.post(`/outfits/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

    request
      .then(() => {
        setMessage(editMode ? "Update successful!" : "Upload successful!");
        handleGetUserOutfitList();
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error saving outfit:", error);
        setMessage("Save failed. Please try again.");
      });
  };

  const fetchImage = async (id) => {
    try {
      const response = await apiClient.get(`/outfits/image/${id}`, {
        responseType: 'blob',
      });
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching image:", error);
      return "";
    }
  };

  const handleDelete = (id) => {
    apiClient.delete(`/outfits/image/${id}`)
      .then(() => {
        setMessage("Outfit deleted successfully!");
        handleGetUserOutfitList();
      })
      .catch((error) => {
        console.error("Error deleting outfit:", error);
        setMessage("Failed to delete outfit. Please try again.");
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userOutfitList.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(userOutfitList.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="outfit-test-container">
      <h2>Outfit Upload Test</h2>
      <button onClick={handleOpenModal}>Upload New Outfit</button>
      {message && <p>{message}</p>}

      <h3>User Outfit List</h3>
      {userOutfitList.length > 0 ? (
        <div className="card-container">
          {currentItems.map((item) => (
            <div key={item.id} className="card-outfit">
              <img src={item.imageUrl} alt="Outfit" className="card-image" />
              <div className="card-details">
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Folder:</strong> {item.folder}</p>
                <p><strong>Description:</strong> {item.description}</p>
              </div>
              <div className="card-actions">
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No outfits found.</p>
      )}

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(userOutfitList.length / itemsPerPage)}>
          Next
        </button>
      </div>

      {isModalOpen && (
        <UploadModal
          onClose={handleCloseModal}
          onSave={handleSave}
          file={file}
          setFile={setFile}
          category={category}
          setCategory={setCategory}
          folder={folder}
          setFolder={setFolder}
          description={description}
          setDescription={setDescription}
          editMode={editMode}
        />
      )}
    </div>
  );
}

export default Outfit;

import React, { useEffect, useState, useCallback } from 'react';
import apiClient from './apiClient';
import { useNavigate } from 'react-router-dom';

function OutfitTest() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [folder, setFolder] = useState("");
  const [description, setDescription] = useState("");
  const [userOutfitList, setUserOutfitList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const itemsPerPage = 10;

  const handleGetUserOutfitList = useCallback(() => {
    apiClient.get(`/outfits/list`)
      .then(async (response) => {
        const outfits = response.data;
        // 각각의 이미지에 대해 서버에서 URL을 받아옴
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
    handleGetUserOutfitList(); // 페이지 로드 시 사용자 다이어리 목록 가져오기
  }, [navigate, handleGetUserOutfitList]);

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
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(() => {
      setMessage("Upload successful!");
      handleGetUserOutfitList(); // 새 목록을 불러옵니다.
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      setMessage("Upload failed. Please try again.");
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
        handleGetUserOutfitList(); // 삭제 후 새 목록을 불러옵니다.
      })
      .catch((error) => {
        console.error("Error deleting outfit:", error);
        setMessage("Failed to delete outfit. Please try again.");
      });
  };

  const handleEdit = (id) => {
    setMessage(`Edit function triggered for outfit with ID: ${id}`);
  };

  // 페이지네이션에 따른 데이터 설정
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
    <div>
      <h2>Outfit Upload Test</h2>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input type="text" placeholder="Folder" value={folder} onChange={(e) => setFolder(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleUpload}>Upload Outfit</button>
      
      {message && <p>{message}</p>}

      <h3>User Outfit List</h3>
      {userOutfitList.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Folder</th>
                <th>Description</th>
                <th>File Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.category}</td>
                  <td>{item.folder}</td>
                  <td>{item.description}</td>
                  <td>{item.fileName}</td>
                  <td>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="Outfit" width="50" />
                    ) : (
                      <span>Image not available</span>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage === Math.ceil(userOutfitList.length / itemsPerPage)}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No outfits found.</p>
      )}
    </div>
  );
}

export default OutfitTest;

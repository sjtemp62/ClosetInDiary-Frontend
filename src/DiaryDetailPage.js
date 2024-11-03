import React, { useEffect, useState } from 'react';
import axios from './apiClient';
import { useParams, useNavigate } from 'react-router-dom';
import './DiaryDetailPage.css';

const DiaryDetailPage = () => {
    const { id } = useParams();
    const [diary, setDiary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState('');
    const [editedEmotion, setEditedEmotion] = useState('');
    const [editedDate, setEditedDate] = useState('');
    const [outfits, setOutfits] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('accessToken');
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
            return;
        }

        const fetchDiary = async () => {
            try {
                const response = await axios.get(`/diaries/${id}`);
                const diaryData = response.data;

                // 이미지 URL을 outfit 객체에 추가
                const outfitsWithImages = await Promise.all(
                    diaryData.outfits.map(async (outfit) => {
                        const imageUrl = await fetchImage(outfit.id);
                        return { ...outfit, imageUrl };
                    })
                );

                setDiary({ ...diaryData, outfits: outfitsWithImages });
                setEditedContent(diaryData.content);
                setEditedEmotion(diaryData.emotion);
                setEditedDate(diaryData.date);
                setSelectedImages(diaryData.outfits.map(outfit => outfit.id));
            } catch (err) {
                setError('다이어리를 불러오는 중 문제가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        const fetchOutfits = async () => {
            try {
                const response = await axios.get('/outfits/list');
                const outfitsWithImages = await Promise.all(
                    response.data.map(async (outfit) => {
                        const imageUrl = await fetchImage(outfit.id);
                        return { ...outfit, imageUrl };
                    })
                );
                setOutfits(outfitsWithImages);
            } catch (error) {
                console.error('Error fetching outfits:', error);
            }
        };

        fetchDiary();
        fetchOutfits();
    }, [id, navigate]);

    const fetchImage = async (id) => {
        try {
            const response = await axios.get(`/outfits/image/${id}`, {
                responseType: 'blob',
            });
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error('Error fetching image:', error);
            return '';
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveChanges = async () => {
        try {
            const updatedDiary = {
                content: editedContent,
                emotion: editedEmotion,
                date: editedDate,
                outfitIds: selectedImages,
            };
    
            await axios.put(`/diaries/${id}`, updatedDiary);
    
            // 새로 갱신된 이미지 URL 가져오기
            const outfitsWithImages = await Promise.all(
                selectedImages.map(async (outfitId) => {
                    const imageUrl = await fetchImage(outfitId);
                    return { id: outfitId, imageUrl };
                })
            );
    
            setDiary({ ...diary, ...updatedDiary, outfits: outfitsWithImages });
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating diary:', err);
            setError('다이어리 수정 중 문제가 발생했습니다.');
        }
    };

    const handleImageSelect = (imageId) => {
        setSelectedImages((prevSelected) =>
            prevSelected.includes(imageId)
                ? prevSelected.filter((id) => id !== imageId)
                : [...prevSelected, imageId]
        );
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!diary) return <p>다이어리를 찾을 수 없습니다.</p>;

    return (
        <div className="diary-detail-container">
            <div className="diary-content">
                {isEditing ? (
                    <>
                        <input
                            type="date"
                            value={editedDate}
                            onChange={(e) => setEditedDate(e.target.value)}
                            className="edit-input"
                        />
                        <input
                            type="text"
                            value={editedEmotion}
                            onChange={(e) => setEditedEmotion(e.target.value)}
                            placeholder="감정"
                            className="edit-input"
                        />
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="edit-textarea"
                        />
                        <h3>착장 수정</h3>
                        <div className="outfit-grid">
                            {outfits.map((outfit) => (
                                <div
                                    key={outfit.id}
                                    className={`outfit-item ${selectedImages.includes(outfit.id) ? 'selected' : ''}`}
                                    onClick={() => handleImageSelect(outfit.id)}
                                >
                                    <img src={outfit.imageUrl} alt="Outfit" />
                                </div>
                            ))}
                        </div>
                        <button onClick={handleSaveChanges} className="save-button">
                            저장
                        </button>
                        <button onClick={handleEditToggle} className="cancel-button">
                            취소
                        </button>
                    </>
                ) : (
                    <>
                        <h1>{diary.date}</h1>
                        <h2>감정: {diary.emotion}</h2>
                        <p>{diary.content}</p>
                        <button onClick={handleEditToggle} className="edit-button">
                            수정
                        </button>
                    </>
                )}

                <h3>착장 목록:</h3>
                {diary.outfits.length > 0 ? (
                    <div className="outfit-grid">
                        {diary.outfits.map((outfit) => (
                            <div key={outfit.id} className="outfit-card">
                                <img
                                    src={outfit.imageUrl}
                                    alt="Outfit"
                                    className="outfit-thumbnail"
                                />
                                <p><strong>ID:</strong> {outfit.id}</p>
                                <p><strong>파일명:</strong> {outfit.fileName}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>착장 없음</p>
                )}

                <button onClick={() => navigate('/diaries')} className="back-button">
                    목록으로 돌아가기
                </button>
            </div>
        </div>
    );
};

export default DiaryDetailPage;

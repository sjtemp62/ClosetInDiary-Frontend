import React, { useState, useEffect } from 'react';
import axios from './apiClient';
import { useNavigate } from 'react-router-dom';
import './DiaryCreatePage.css';

const DiaryCreatePage = () => {
    const [emotion, setEmotion] = useState('');
    const [content, setContent] = useState('');
    const [outfits, setOutfits] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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

        fetchOutfits();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/diaries', {
                date: new Date().toISOString().split('T')[0],
                emotion,
                content,
                outfitIds: selectedImages,
            });
            navigate('/diaries');
        } catch (error) {
            console.error('Error creating diary:', error);
        }
    };

    const handleImageSelect = (imageId) => {
        setSelectedImages((prevSelected) =>
            prevSelected.includes(imageId)
                ? prevSelected.filter((id) => id !== imageId)
                : [...prevSelected, imageId]
        );
    };

    return (
        <div className="diary-create-container">
            <h1>새 다이어리 작성</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    감정:
                    <input
                        type="text"
                        value={emotion}
                        onChange={(e) => setEmotion(e.target.value)}
                        required
                    />
                </label>
                <label>
                    내용:
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </label>
                <h3>착장 선택</h3>
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
                <button type="submit" className="submit-button">저장</button>
            </form>
        </div>
    );
};

export default DiaryCreatePage;

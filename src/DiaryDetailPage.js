import React, { useEffect, useState } from 'react';
import axios from './apiClient';
import { useParams, useNavigate } from 'react-router-dom';
import './DiaryDetailPage.css';

const DiaryDetailPage = () => {
    const { id } = useParams();
    const [diary, setDiary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                        const imageUrl = await fetchImage(outfit.id); // 옷의 ID 기반으로 이미지 요청
                        return { ...outfit, imageUrl };
                    })
                );

                setDiary({ ...diaryData, outfits: outfitsWithImages });
            } catch (err) {
                setError('다이어리를 불러오는 중 문제가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchDiary();
    }, [id, navigate]);

    // 서버에 옷의 ID를 기반으로 이미지 요청
    const fetchImage = async (outfitId) => {
        try {
            const response = await axios.get(`/outfits/image/${outfitId}`, {
                responseType: 'blob',
            });
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error('Error fetching image:', error);
            return '';
        }
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!diary) return <p>다이어리를 찾을 수 없습니다.</p>;

    return (
        <div className="diary-detail-container">
            <div className="diary-content">
                <h1>{diary.date}</h1>
                <h2>감정: {diary.emotion}</h2>
                <p>{diary.content}</p>

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

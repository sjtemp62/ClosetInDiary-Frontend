// 다이어리 상세 페이지
import React, { useEffect, useState } from 'react';
import axios from './apiClient';
import { useParams, useNavigate } from 'react-router-dom';

const DiaryDetailPage = () => {
    const { id } = useParams();
    const [diary, setDiary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 사용자가 인증되었는지 확인 후 인증되지 않았다면 로그인 페이지로 이동
        const isAuthenticated = localStorage.getItem('accessToken');
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
            return;
        }

        const fetchDiary = async () => {
            try {
                const response = await axios.get(`/diaries/${id}`);
                setDiary(response.data);
            } catch (err) {
                setError('다이어리를 불러오는 중 문제가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchDiary();
    }, [id, navigate]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!diary) return <p>다이어리를 찾을 수 없습니다.</p>;

    return (
        <div>
            <h1>{diary.date}</h1>
            <h2>감정: {diary.emotion}</h2>
            <p>착장 IDs: {diary.outfitIds}</p>
            <p>{diary.content}</p>
            <button onClick={() => navigate('/diaries')}>목록으로 돌아가기</button>
        </div>
    );
};

export default DiaryDetailPage;

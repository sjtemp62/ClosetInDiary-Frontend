import React, { useEffect, useState } from 'react';
import axios from './apiClient';
import { useNavigate } from 'react-router-dom';

const DiariesPage = () => {
    const [diaries, setDiaries] = useState([]);
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

        const fetchDiaries = async () => {
            try {
                const response = await axios.get('/diaries');
                setDiaries(response.data);
            } catch (err) {
                setError('다이어리를 불러오는 중 문제가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchDiaries();
    }, [navigate]);

    const handleCreateDiary = () => {
        navigate('/diaries/create');
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>다이어리 목록</h1>
            <button onClick={handleCreateDiary}>새 다이어리 작성</button>
            {diaries.length > 0 ? (
                <ul>
                    {diaries.map(diary => (
                        <li key={diary.id} onClick={() => navigate(`/diaries/${diary.id}`)}>
                            <h3>{diary.date} - {diary.emotion}</h3>
                            <p>{diary.content.slice(0, 100)}...</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>다이어리가 없습니다.</p>
            )}
        </div>
    );
};

export default DiariesPage;
// 다이어리 작성 페이지
import React, { useState, useEffect } from 'react';
import axios from './apiClient';
import { useNavigate } from 'react-router-dom';

const CreateDiaryPage = () => {
    const [emotion, setEmotion] = useState('');
    const [outfitIds, setOutfitIds] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 사용자가 인증되었는지 확인 후 인증되지 않았다면 로그인 페이지로 이동
        const isAuthenticated = localStorage.getItem('accessToken');
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
            return;
        }
    }, [navigate]);

    const handleCreate = async () => {
        try {
            await axios.post('/diaries', { emotion, outfitIds, content });
            navigate('/diaries');
        } catch (err) {
            setError('다이어리를 생성하는 중 문제가 발생했습니다.');
        }
    };

    return (
        <div>
            <h1>새 다이어리 작성</h1>
            {error && <p>{error}</p>}
            <div>
                <label>감정: </label>
                <input type="text" value={emotion} onChange={(e) => setEmotion(e.target.value)} />
            </div>
            <div>
                <label>착장 IDs: </label>
                <input type="text" value={outfitIds} onChange={(e) => setOutfitIds(e.target.value)} />
            </div>
            <div>
                <label>내용: </label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <button onClick={handleCreate}>작성</button>
        </div>
    );
};

export default CreateDiaryPage;

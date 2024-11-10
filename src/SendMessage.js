import React, { useState } from 'react';
import axios from './api/apiClient'; // Axios 인스턴스 설정 파일
import { useParams } from 'react-router-dom';
import './SendMessage.css'; // 스타일 파일 추가

const SendMessage = () => {
    const { friendId } = useParams();
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const handleSendMessage = async () => {
        if (!message) return;
        try {
            await axios.post('/message/send', {
                receiver: friendId,
                content: message,
            });
            alert('메시지를 보냈습니다.');
            setMessage('');
        } catch (err) {
            setError('메시지 전송 중 문제가 발생했습니다.');
        }
    };

    return (
        <div className="send-message-container">
            <h1>쪽지 보내기</h1>
            {error && <p className="error-message">{error}</p>}
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요"
                className="message-input"
            />
            <button onClick={handleSendMessage} className="send-button">보내기</button>
        </div>
    );
};

export default SendMessage;

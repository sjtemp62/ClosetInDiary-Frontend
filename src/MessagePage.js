import React, { useState, useEffect } from 'react';
import axios from './apiClient'; // Axios 인스턴스 설정 파일
import { useNavigate } from 'react-router-dom';
import './MessagePage.css'; // 스타일 파일 추가

const MessagePage = () => {
    const [friends, setFriends] = useState([]);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get('/friends');
                setFriends(response.data);
            } catch (err) {
                setError('친구 목록을 불러오는 중 문제가 발생했습니다.');
            }
        };

        const fetchMessages = async () => {
            try {
                const response = await axios.get('/message');
                setMessages(response.data);
            } catch (err) {
                setError('메시지를 불러오는 중 문제가 발생했습니다.');
            }
        };

        fetchFriends();
        fetchMessages();
    }, []);

    const handleNavigateToSendMessage = (friendId) => {
        navigate(`/send-message/${friendId}`);
    };

    return (
        <div className="message-page-container">
            <h1>쪽지 목록</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className="message-item">
                        <p><strong>{msg.sender.name}:</strong> {msg.content}</p>
                    </div>
                ))}
            </div>

            <h2>친구 목록</h2>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.id}>
                        {friend.name} ({friend.username})
                        <button onClick={() => handleNavigateToSendMessage(friend.id)} className="send-button">
                            쪽지 보내기
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessagePage;

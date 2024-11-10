import React, { useEffect, useState } from 'react';
import axios from './api/apiClient'; // Axios 인스턴스 설정 파일
import { useNavigate } from 'react-router-dom';
import './FriendsPage.css'; // 스타일 파일 추가

const FriendsPage = () => {
    const [friends, setFriends] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [newFriendId, setNewFriendId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 여부 확인
        const isAuthenticated = localStorage.getItem('accessToken');
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
            return;
        }

        // 친구 리스트와 요청 가져오기
        const fetchFriendsAndRequests = async () => {
            try {
                const [friendsResponse, receivedRequestsResponse, sentRequestsResponse] = await Promise.all([
                    axios.get('/friends'),
                    axios.get('/friend-requests/received'),
                    axios.get('/friend-requests/sent'),
                ]);
                setFriends(friendsResponse.data);
                setReceivedRequests(receivedRequestsResponse.data);
                setSentRequests(sentRequestsResponse.data);
            } catch (err) {
                setError('친구 목록과 요청을 가져오는 중 문제가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchFriendsAndRequests();
    }, [navigate]);

    const handleSendRequest = async () => {
        if (!newFriendId) return;
        try {
            await axios.post('/friend-requests/send', null, {
                params: { receiverId: newFriendId },
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            alert('친구 요청을 보냈습니다.');
            setNewFriendId('');
        } catch (err) {
            setError('친구 요청을 보내는 중 문제가 발생했습니다.');
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            await axios.post('/friend-requests/accept', null, {
                params: { requestId },
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            alert('친구 요청을 수락했습니다.');
            setReceivedRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));

            // 수락 후 친구 목록을 갱신
            const response = await axios.get('/friends');
            setFriends(response.data);
        } catch (err) {
            setError('친구 요청 수락 중 문제가 발생했습니다.');
        }
    };

    const handleDeclineRequest = async (requestId) => {
        try {
            await axios.post('/friend-requests/decline', null, {
                params: { requestId },
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            alert('친구 요청을 거절했습니다.');
            setReceivedRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
        } catch (err) {
            setError('친구 요청 거절 중 문제가 발생했습니다.');
        }
    };

    const handleSendMessage = (friendId) => {
        navigate(`/send-message/${friendId}`);
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="friends-page-container centered">
            <h1>친구 목록</h1>
            <ul className="list-container">
                {friends.length > 0 ? (
                    friends.map((friend) => (
                        <li key={friend.id} className="list-item">
                            {friend.name} ({friend.username})
                            <button onClick={() => handleSendMessage(friend.id)} className="message-button">
                                쪽지 보내기
                            </button>
                        </li>
                    ))
                ) : (
                    <p>현재 친구가 없습니다.</p>
                )}
            </ul>

            <h2>받은 친구 요청 목록</h2>
            <ul className="list-container">
                {receivedRequests.length > 0 ? (
                    receivedRequests.map((request) => (
                        <li key={request.id} className="list-item">
                            {request.sender.name} ({request.sender.email})님의 친구 요청
                            <button onClick={() => handleAcceptRequest(request.id)} className="action-button accept-button">
                                수락
                            </button>
                            <button onClick={() => handleDeclineRequest(request.id)} className="action-button decline-button">
                                거절
                            </button>
                        </li>
                    ))
                ) : (
                    <p>받은 친구 요청이 없습니다.</p>
                )}
            </ul>

            <h2>보낸 친구 요청 목록</h2>
            <ul className="list-container">
                {sentRequests.length > 0 ? (
                    sentRequests.map((request) => (
                        <li key={request.id} className="list-item">
                            {request.receiver.name} ({request.receiver.email})에게 보낸 친구 요청 - 상태: {request.status}
                        </li>
                    ))
                ) : (
                    <p>보낸 친구 요청이 없습니다.</p>
                )}
            </ul>

            <h2>친구 요청 보내기</h2>
            <div className="form-group">
                <input
                    type="text"
                    value={newFriendId}
                    onChange={(e) => setNewFriendId(e.target.value)}
                    placeholder="친구 ID 입력"
                    className="input-field"
                />
                <button onClick={handleSendRequest} className="action-button send-button">친구 요청 보내기</button>
            </div>
        </div>
    );
};

export default FriendsPage;
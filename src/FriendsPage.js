import React, { useEffect, useState } from 'react';
import axios from './apiClient'; // Axios 인스턴스 설정 파일
import { useNavigate } from 'react-router-dom';
import './FriendsPage.css'; // 스타일 파일 추가

const FriendsPage = () => {
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
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
                const [friendsResponse, requestsResponse] = await Promise.all([
                    axios.get('/friends'),
                    axios.get('/friend-requests/received'),
                ]);
                setFriends(friendsResponse.data);
                setRequests(requestsResponse.data);
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
            await axios.post('/friend-requests/send', { receiverId: newFriendId });
            alert('친구 요청을 보냈습니다.');
            setNewFriendId('');
        } catch (err) {
            setError('친구 요청을 보내는 중 문제가 발생했습니다.');
        }
    };

    const handleAcceptRequest = async (requestId) => {
        try {
            const formData = new FormData();
            formData.append('requestId', requestId);
    
            console.log(...formData.entries()); // 데이터를 확인
            await axios.post(`/friend-requests/accept`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
            alert('친구 요청을 수락했습니다.');
            setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
    
            // 수락 후 친구 목록을 갱신
            const response = await axios.get('/api/friends');
            setFriends(response.data);
        } catch (err) {
            setError('친구 요청 수락 중 문제가 발생했습니다.');
        }
    };

    const handleDeclineRequest = async (requestId) => {
        try {
            await axios.post(`/friend-requests/${requestId}/decline`);
            alert('친구 요청을 거절했습니다.');
            setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
        } catch (err) {
            setError('친구 요청 거절 중 문제가 발생했습니다.');
        }
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="friends-page-container">
            <h1>친구 목록</h1>
            <ul>
                {friends.length > 0 ? (
                    friends.map((friend) => (
                        <li key={friend.id}>
                            {friend.name} ({friend.username})
                        </li>
                    ))
                ) : (
                    <p>현재 친구가 없습니다.</p>
                )}
            </ul>

            <h2>친구 요청 목록</h2>
            <ul>
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <li key={request.id}>
                            {request.sender.name} ({request.sender.email})님의 친구 요청
                            <button onClick={() => handleAcceptRequest(request.id)} className="accept-button">
                                수락
                            </button>
                            <button onClick={() => handleDeclineRequest(request.id)} className="decline-button">
                                거절
                            </button>
                        </li>
                    ))
                ) : (
                    <p>친구 요청이 없습니다.</p>
                )}
            </ul>

            <h2>친구 요청 보내기</h2>
            <input
                type="text"
                value={newFriendId}
                onChange={(e) => setNewFriendId(e.target.value)}
                placeholder="친구 ID 입력"
            />
            <button onClick={handleSendRequest}>친구 요청 보내기</button>
        </div>
    );
};

export default FriendsPage;

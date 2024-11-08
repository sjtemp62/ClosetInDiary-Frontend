import React, { useEffect, useState } from 'react';
import axios from './components/hooks/apiClient';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DiariesPage.css'; // 스타일 파일 추가

const DiariesPage = () => {
    const [diaries, setDiaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false); // 달력 열림 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
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

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setIsCalendarOpen(false); // 날짜 선택 시 달력을 접음
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const selectedDateDiaries = diaries.filter(
        (diary) => diary.date === formatDate(selectedDate)
    );

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="diaries-page-container">
            <h1>다이어리 목록</h1>
            <button onClick={handleCreateDiary} className="create-button">새 다이어리 작성</button>
            
            {/* 날짜 표시 */}
            <div onClick={toggleCalendar} className="selected-date">
                <h2>{formatDate(selectedDate)}</h2>
                <p>날짜를 클릭하여 달력을 펼치거나 접을 수 있습니다.</p>
            </div>
            
            {/* 조건부 렌더링으로 달력 표시 */}
            {isCalendarOpen && (
                <Calendar onChange={handleDateChange} value={selectedDate} />
            )}

            <h2>{formatDate(selectedDate)}의 다이어리</h2>
            {selectedDateDiaries.length > 0 ? (
                <ul>
                    {selectedDateDiaries.map((diary) => (
                        <li key={diary.id} onClick={() => navigate(`/diaries/${diary.id}`)}>
                            <h3>{diary.emotion}</h3>
                            <p>{diary.content.slice(0, 100)}...</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>해당 날짜에 작성된 다이어리가 없습니다.</p>
            )}
        </div>
    );
};

export default DiariesPage;

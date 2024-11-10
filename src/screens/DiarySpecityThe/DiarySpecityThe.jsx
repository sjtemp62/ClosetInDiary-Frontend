import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../App";
import { DailyLookList } from "../../components/DailyLookList";
import { MenuComponents } from "../../components/MenuComponents";
import { Scrollbar } from "../../components/Scrollbar";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./style.css";
import apiClient from "../../api/apiClient";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

export const DiarySpecityThe = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [diaryList, setDiaryList] = useState([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [activeSort, setActiveSort] = useState('latest');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
      return;
    }
    fetchDiaries("latest");
  }, [isLoggedIn, navigate]);

  const fetchDiaries = async (sort = "latest", startDate = null, endDate = null) => {
    try {
      const response = await apiClient.get("/diaries", {
        params: { sort, startDate, endDate },
      });
      setDiaryList(response.data);
    } catch (error) {
      console.error("Failed to fetch diaries:", error);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleLatestSort = () => {
    fetchDiaries("latest");
    setActiveSort('latest');
    setIsDatePickerVisible(false);
  };

  const datePickerRef = useRef(null);
  const dateRangeButtonRef = useRef(null);

  const handleDateRangeToggle = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
    setActiveSort('dateRange');
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setTempStartDate(start);
    setTempEndDate(end);
  };

  // 적용 버튼 클릭 핸들러
  const handleApplyDateRange = () => {
  if (tempStartDate && tempEndDate) {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);

    const formattedStartDate = formatDate(tempStartDate);
    const formattedEndDate = formatDate(tempEndDate);

    fetchDiaries("dateRange", formattedStartDate, formattedEndDate);
    setIsDatePickerVisible(false); // 날짜 선택기 닫기
  } else {
    alert('시작일과 종료일을 모두 선택해주세요.');
  }
};

  // 4개씩 그룹핑
  const groupedDiaries = [];
  for (let i = 0; i < diaryList.length; i += 4) {
    groupedDiaries.push(diaryList.slice(i, i + 4));
  }

  return (
    <div className="diary-specity-the">
      <div className="div-2">
        <header className="header">
          <div className="frame-3">
            <img className="vector" alt="Vector" src="/img/vector-3.svg" />

            <div className="frame-4">
              <MenuComponents
                className="menu-components-instance"
                shape="/img/shape-5.svg"
                text="CLOSET"
                onClick={() => navigate('/closet')}
              />
              <MenuComponents
                className="menu-components-instance"
                shape="/img/shape-5.svg"
                text="DIARY"
                onClick={() => navigate('/diaries')}
              />
              <MenuComponents
                className="menu-components-instance"
                shape="/img/shape-5.svg"
                text="FRIENDS"
                onClick={() => navigate('/friends')}
              />
            </div>
          </div>

          <div className="frame-5">
            <div className="frame-6">
              <div className="text-wrapper-2">Profile</div>
              <div className="text-wrapper-2">Sign out</div>
            </div>

            <div className="frame-7">
              <div className="search">
                <img className="img" alt="Search" src="/img/search-1.svg" />
              </div>
              <img className="notifications" alt="Notifications" src="/img/notifications-1.png" />
            </div>
          </div>
        </header>

        <div className="div-wrapper">
          <div className="text-wrapper-7">MY DIARY</div>
        </div>

        <div className="group">
          <div
            className={`frame-8 ${activeSort === 'latest' ? 'active-button' : ''}`}
            onClick={handleLatestSort}
          >
            <div className="text-wrapper-8">최신순</div>
          </div>
          <div
            className={`frame-9 ${activeSort === 'dateRange' ? 'active-button' : ''}`}
            onClick={handleDateRangeToggle}
            ref={dateRangeButtonRef}
            style={{ position: 'relative' }} // 추가된 스타일
          >
            <div className="text-wrapper-9">기간 지정</div>
            {isDatePickerVisible && (
              <div className="date-picker" ref={datePickerRef} onClick={(e) => e.stopPropagation()}>
                <DatePicker
                  selected={tempStartDate}
                  onChange={handleDateChange}
                  startDate={tempStartDate}
                  endDate={tempEndDate}
                  selectsRange
                  inline
                  locale={ko}
                  shouldCloseOnSelect={false}
                />
                <button className="apply-button" onClick={handleApplyDateRange}>
                  적용
                </button>
              </div>
            )}
          </div>
        </div>

        {/* {startDate && endDate && (
          <div className="selected-date-range">
            선택한 기간: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </div>
        )} */}

        <div className="overlap-group">
          {diaryList.length === 0 ? (
            <p className="empty-diary-message">여기는 당신의 이야기로 채워질 공간입니다. 오늘 하루는 어땠나요?</p>
          ) : (
            groupedDiaries.map((group, groupIndex) => (
              <div key={`group-${groupIndex}`} className={`group-${groupIndex + 2}`}>
                {group.map((diary, index) => {
                  let className = '';
                  switch (index) {
                    case 0:
                      className = 'daily-look-list-instance';
                      break;
                    case 1:
                      className = 'daily-look-list-2';
                      break;
                    case 2:
                      className = 'daily-look-list-4';
                      break;
                    case 3:
                      className = 'daily-look-list-6';
                      break;
                    default:
                      className = '';
                  }
                  return (
                    <DailyLookList
                      key={diary.id}
                      className={className}
                      text={diary.date}
                      text1={diary.content}
                    />
                  );
                })}
              </div>
            ))
          )}
        </div>
        <footer className="footer">
          <img className="vector-2" alt="Vector" src="/img/vector-4.svg" />
          <div className="sitemap">
            <div className="flexcontainer">
              <p className="text-i">
                <span className="span">
                  Home
                  <br />
                </span>
              </p>
              <p className="text-i">
                <span className="span">
                  Abouts
                  <br />
                </span>
              </p>
              <p className="text-i">
                <span className="span">
                  Growers
                  <br />
                </span>
              </p>
              <p className="text-i">
                <span className="span">
                  Merchants
                  <br />
                </span>
              </p>
              <p className="text-i">
                <span className="span">Contact</span>
              </p>
            </div>
            <div className="text-wrapper-3">Sitemap</div>
          </div>
          <div className="socials">
            <div className="flexcontainer-i">
              <p className="text-i">
                <span className="span">
                  Facebook
                  <br />
                </span>
              </p>
              <p className="text-i">
                <span className="span">
                  Linkedin
                  <br />
                </span>
              </p>
              <p className="text-i">
                <span className="span">
                  Instagram
                  <br />
                </span>
              </p>
              <p className="text-i">
                <span className="span">Twitter</span>
              </p>
            </div>
            <div className="text-wrapper-3">Socials</div>
          </div>
          <div className="head-office">
            <p className="p">
              52-57, Yangjeong-ro, Busanjin-gu, Busan, Republic of Korea
            </p>
            <div className="text-wrapper-3">Head Office</div>
          </div>
          <div className="newsletter">
            <div className="text-wrapper-3">News letter</div>
            <img className="line" alt="Line" src="/img/line-16.svg" />
            <div className="text-wrapper-4">Enter your email address</div>
            <img className="mail-icon" alt="Mail icon" src="/img/mail-icon.png" />
          </div>
          <p className="element-ST-all-rights">© 2024 ST& All rights reserved.</p>
          <div className="text-wrapper-5">(123) 456-7890</div>
          <img className="line-2" alt="Line" src="/img/line-16-1.svg" />
          <div className="text-wrapper-6">contact@stand.agency</div>
          <img className="line-3" alt="Line" src="/img/line-15.svg" />
        </footer>
      </div>
    </div>
  );
};

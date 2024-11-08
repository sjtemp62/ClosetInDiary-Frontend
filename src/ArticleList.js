import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './components/hooks/apiClient';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자가 인증되었는지 확인 후 인증되지 않았다면 로그인 페이지로 이동
    const isAuthenticated = localStorage.getItem('accessToken');
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    // API를 통해 게시글 목록 가져오기
    const fetchArticles = async () => {
      try {
        const response = await apiClient.get('/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('게시글을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchArticles();
  }, [navigate]);

  // 글 작성 버튼 클릭 시 호출되는 함수
  const handleCreate = () => {
    navigate('/new-article');
  };

  // 로그아웃 버튼 클릭 시 호출되는 함수
  const handleLogout = () => {
    // 인증 정보를 삭제하여 로그아웃 처리
    localStorage.removeItem('accessToken');
    navigate('/login', { replace: true }); // 로그인 페이지로 이동
  };

  return (
    <div>
      <div className="p-5 mb-5 text-center bg-light">
        <h1 className="mb-3">My Blog</h1>
        <h4 className="mb-3">블로그에 오신 것을 환영합니다.</h4>
      </div>

      <div className="container">
        <button type="button" onClick={handleCreate} className="btn btn-secondary btn-sm mb-3">
          글 등록
        </button>
        <div className="row">
          {articles.map((item) => (
            <div className="col-lg-4 mb-4" key={item.id}>
              <div className="card">
                <div className="card-header">{item.id}</div>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.content}</p>
                  <button onClick={() => navigate(`/article/${item.id}`)} className="btn btn-primary">
                    보러가기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default ArticleList;

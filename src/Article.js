// Article.js (React)
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from './apiClient';

function Article() {
  const [article, setArticle] = useState(null);
  const { id } = useParams(); // Assuming you're using React Router to get the article ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated before fetching article data
    const isAuthenticated = localStorage.getItem('accessToken');
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    // Fetch the article data from the API
    const fetchArticle = async () => {
      try {
        const response = await apiClient.get(`/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login', { replace: true });
        }
      }
    };

    fetchArticle();
  }, [id, navigate]);

  const handleModify = () => {
    navigate(`/new-article?id=${article.id}`);
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/articles/${article.id}`);
      alert('삭제가 완료되었습니다.');
      navigate('/articles'); // Redirect to articles list after deletion
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="p-5 mb-5 text-center bg-light">
        <h1 className="mb-3">My Blog</h1>
        <h4 className="mb-3">블로그에 오신 것을 환영합니다.</h4>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-8">
            <article>
              <header className="mb-4">
                <h1 className="fw-bolder mb-1">{article.title}</h1>
                <div className="text-muted fst-italic mb-2">
                  Posted on {new Date(article.createdAt).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </header>
              <section className="mb-5">
                <p className="fs-5 mb-4">{article.content}</p>
              </section>
              <button type="button" id="modify-btn" onClick={handleModify} className="btn btn-primary btn-sm">
                수정
              </button>
              <button type="button" id="delete-btn" onClick={handleDelete} className="btn btn-secondary btn-sm">
                삭제
              </button>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
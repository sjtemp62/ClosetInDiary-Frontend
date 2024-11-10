import { useState } from 'react';
import apiClient from '../../api/apiClient'; // apiClient를 이용하여 axios 인스턴스 사용

export function useCategorySelection() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [images, setImages] = useState([]); // 이미지 리스트 상태 추가

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);

    try {
      // 서버에 카테고리 요청 보내기
      const response = await apiClient.get(`/closet/${category}`);
      
      // 서버로부터 이미지 ID 리스트를 받아옴
      const imageIds = response.data.map(item => item.id);

      // 각 이미지 ID를 이용해 개별 이미지 요청
      const imageRequests = imageIds.map(id =>
        apiClient.get(`/closet/image/${id}`, { responseType: 'blob' })
      );

      // 모든 이미지 요청이 완료되면 처리
      const imageResponses = await Promise.all(imageRequests);

      // 이미지를 Blob URL로 변환하여 상태에 저장
      const imageUrls = imageResponses.map(response => URL.createObjectURL(response.data));
      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching category data:', error);
      alert('Failed to load category data. Please try again.');
    }
  };

  return {
    selectedCategory,
    handleCategoryClick,
    images, // 이미지 상태도 반환
  };
}

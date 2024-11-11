import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ClosetCategory } from "../../components/ClosetCategory";
import { FrameOfClothes } from "../../components/FrameOfClothes";
import { Header } from "../../components/ALHeader";
import { useCategorySelection } from "../../components/hooks/useCategorySelection";
import "./style.css";
import { useAuth } from '../../App';
import { AddNewItem } from "../../components/AddNewItem/AddNewItem";

export const Closet = () => {
  // 커스텀 훅을 사용하여 선택 상태와 클릭 핸들러를 가져옵니다.
  const { selectedCategory, handleCategoryClick, images } = useCategorySelection();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
      return;
    }
  });
  // `Add New` 클릭 시 모달 열림 상태로 설정
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCategoryClickWithCondition = (text) => {
    if (text === "Add New") {
      openModal(); // 모달 열기
    } else {
      handleCategoryClick(text); // 일반 카테고리 처리 (서버 요청 등)
    }
  };
  
  const handleUploadSuccess = () => {
    handleCategoryClick(selectedCategory); // 업로드 성공 후 현재 카테고리의 이미지 갱신
  };

  // div-3에 적용할 클래스를 동적으로 설정
  const divClassName = images.length === 0 ? "div-3 no-images" : "div-3";

  return (
    <div className="closet">
      <div className={divClassName}>
        <Header className="header-instance" login="after" />
        <div className="overlap">
          <div className="frame-5">
            <div className="frame-wrapper">
              <div className="div-wrapper">
                <div className="text-wrapper">MY CLOSET</div>
              </div>
            </div>

            <div className="div-4">
              <div className="frame-6">
              <ClosetCategory
                  className="closet-category-instance"
                  selected={selectedCategory === "Add New" ? "when-selected" : "not-selected"}
                  text="Add New"
                  onClick={() => handleCategoryClickWithCondition("Add New")}
                />
                <div className="overlap-group">
                  <ClosetCategory
                    className="closet-category-instance"
                    selected={selectedCategory === "All" ? "when-selected" : "not-selected"}
                    text="All"
                    onClick={() => handleCategoryClickWithCondition("All")}
                  />
                  <img className="image-2" alt="All" src="/img/image-4-1.png" />
                </div>
                <div className="overlap-group-2">
                  <ClosetCategory
                    className="closet-category-instance"
                    selected={selectedCategory === "Tops" ? "when-selected" : "not-selected"}
                    text="Tops"
                    onClick={() => handleCategoryClickWithCondition("Tops")}
                  />
                  <img className="image-2" alt="Tops" src="/img/image-5.png" />
                </div>

                <div className="overlap-group-3">
                  <ClosetCategory
                    className="closet-category-instance"
                    selected={selectedCategory === "Dresses" ? "when-selected" : "not-selected"}
                    text="Dresses"
                    onClick={() => handleCategoryClickWithCondition("Dresses")}
                  />
                  <img className="image" alt="Dresses" src="/img/image-6-1.png" />
                </div>
                <div className="overlap-2">
                  <ClosetCategory
                    className="closet-category-instance"
                    selected={selectedCategory === "Pants" ? "when-selected" : "not-selected"}
                    text="Pants"
                    onClick={() => handleCategoryClickWithCondition("Pants")}
                  />
                  <img className="image" alt="Pants" src="/img/image-9.png" />
                </div>
              </div>

              <div className="frame-7">
                <div className="overlap-3">
                  <ClosetCategory
                    className="closet-category-instance"
                    selected={selectedCategory === "Skirts" ? "when-selected" : "not-selected"}
                    text="Skirts"
                    onClick={() => handleCategoryClickWithCondition("Skirts")}
                  />
                  <img
                    className="image"
                    alt="Skirts"
                    src="/img/image-10.png"
                  />
                </div>
                <div className="overlap-group">
                  <ClosetCategory
                    className="closet-category-instance"
                    selected={selectedCategory === "Outerwear" ? "when-selected" : "not-selected"}
                    text="Outerwear"
                    onClick={() => handleCategoryClickWithCondition("Outerwear")}
                  />
                  <img className="image" alt="Outerwear" src="/img/image-8.png" />
                </div>
                <ClosetCategory
                  className="closet-category-3"
                  selected={selectedCategory === "Shoes" ? "when-selected" : "not-selected"}
                  text="Shoes"
                  onClick={() => handleCategoryClickWithCondition("Shoes")}
                />
                <ClosetCategory
                  className="closet-category-4"
                  selected={selectedCategory === "Bags" ? "when-selected" : "not-selected"}
                  text="Bags"
                  onClick={() => handleCategoryClickWithCondition("Bags")}
                />
                <ClosetCategory
                  className="design-component-instance-node"
                  selected={selectedCategory === "Accessory" ? "when-selected" : "not-selected"}
                  text="Accessory"
                  onClick={() => handleCategoryClickWithCondition("Accessory")}
                />
              </div>
              <img className="image" alt="AddNew" src="/img/image-1.png" />

              <img className="image-4" alt="Shoes" src="/img/image-11.png" />

              <img className="image-5" alt="Bags" src="/img/image-12.png" />

              <img className="image-6" alt="Accessory" src="/img/image-15.png" />
            </div>
          </div>
        </div>

        <div className="row-of-clothes">
          {images.length === 0 ? (
            <p className="text-wrapper-6">
              옷장이 아직 비어있어요! 당신의 스타일로 채워보세요.
            </p>
          ) : (
            <div className="frame-8">
              {images.map((image, index) => (
                <FrameOfClothes
                  key={index}
                  className="frame-of-clothes-closet"
                  imageUrl={image} // FrameOfClothes에 imageUrl prop 전달
                />
              ))}
            </div>
          )}
        </div>

        <footer className="footer">
          <img className="vector-2" alt="Vector" src="/img/vector.svg" />

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

            <div className="text-wrapper-2">Sitemap</div>
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

            <div className="text-wrapper-2">Socials</div>
          </div>

          <div className="head-office">
            <p className="p">
              52-57, Yangjeong-ro, Busanjin-gu, Busan, Republic of Korea
            </p>

            <div className="text-wrapper-2">Head Office</div>
          </div>

          <div className="newsletter">
            <div className="text-wrapper-2">News letter</div>

            <img className="line" alt="Line" src="/img/line-16.svg" />

            <div className="text-wrapper-3">Enter your email address</div>

            <img
              className="mail-icon"
              alt="Mail icon"
              src="/img/mail-icon.png"
            />
          </div>

          <p className="element-ST-all-rights">
            © 2024 ST&amp; All rights reserved.
          </p>

          <div className="text-wrapper-4">(123) 456-7890</div>

          <img className="line-2" alt="Line" src="/img/line-16-1.svg" />

          <div className="text-wrapper-5">contact@stand.agency</div>

          <img className="line-3" alt="Line" src="/img/line-15.svg" />
        </footer>

        {isModalOpen && <AddNewItem closeModal={closeModal} onUploadSuccess={handleUploadSuccess} />}
      </div>
    </div>
  );
};

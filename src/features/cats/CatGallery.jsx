import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchCats, clearCats } from "./CatsSlice";

const GalleryWrapper = styled.div`
  flex: 1;
  padding: 1rem;
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(150px,1fr));
  gap: 1rem;
`;

const CatImage = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const LoadMoreButton = styled.button`
  margin-top: 1rem;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

const CatGallery = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const { items, status, error, page } = useSelector((state) => state.cats);

  // وقتی دسته‌بندی تغییر کرد، عکس‌ها رو پاک کن و صفحه رو صفر کن
  useEffect(() => {
    dispatch(clearCats());
    dispatch(fetchCats({ categoryId: selectedCategory, page: 0 }));
  }, [dispatch, selectedCategory]);

  const handleLoadMore = () => {
    dispatch(fetchCats({ categoryId: selectedCategory, page }));
  };

  if (status === "loading" && page === 0) {
    return <GalleryWrapper>در حال بارگذاری...</GalleryWrapper>;
  }

  if (status === "failed") {
    return <GalleryWrapper>خطا: {error}</GalleryWrapper>;
  }

  return (
    <GalleryWrapper>
      <ImagesGrid>
        {items.map((cat) => (
          <CatImage key={cat.id} src={cat.url} alt="Cat" />
        ))}
      </ImagesGrid>
      <LoadMoreButton onClick={handleLoadMore} disabled={status === "loading"}>
        {status === "loading" && page > 0 ? "در حال بارگذاری..." : "بارگذاری بیشتر"}
      </LoadMoreButton>
    </GalleryWrapper>
  );
};

export default CatGallery;

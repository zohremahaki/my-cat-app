import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSelectedCategory } from "./features/categories/CategoriesSlice";

import Sidebar from "./features/categories/Sidebar";
import { clearCats, fetchCats } from "./features/cats/CatsSlice";

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const GalleryWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const ImagesGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  overflow-y: auto;
`;

const CatImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const LoadMoreButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  align-self: center;
  background-color: #4caf50;
  color: white;
  border: none;
  &:hover {
    background-color: #45a049;
  }
  &:disabled {
    background-color: #a5d6a7;
    cursor: not-allowed;
  }
`;

function App() {
  const dispatch = useDispatch();
  const { items: cats, status, error } = useSelector((state) => state.cats);
  const { selectedCategory } = useSelector((state) => state.categories);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(clearCats());
      dispatch(fetchCats({ categoryId: selectedCategory, limit: 10 }));
    }
  }, [selectedCategory, dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchCats({ categoryId: selectedCategory, limit: 10 }));
  };

  return (
    <AppWrapper>
      <Sidebar
        selectedCategory={selectedCategory}
        onCategorySelect={(id) => dispatch(setSelectedCategory(id))}
      />
      <GalleryWrapper>
        <h1>🐱 Cat Gallery</h1>

        {status === "loading" && cats.length === 0 && <p>در حال بارگذاری...</p>}
        {status === "failed" && <p style={{ color: "red" }}>{error}</p>}

        <ImagesGrid>
          {cats.map((cat) => (
            <CatImage key={cat.id} src={cat.url} alt="Cat" />
          ))}
        </ImagesGrid>

        {cats.length > 0 && (
          <LoadMoreButton
            onClick={handleLoadMore}
            disabled={status === "loading"}
          >
            {status === "loading" ? "در حال بارگذاری..." : "Load More"}
          </LoadMoreButton>
        )}
      </GalleryWrapper>
    </AppWrapper>
  );
}

export default App;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchCategories } from "./CategoriesSlice";

const SidebarWrapper = styled.div`
  width: 200px;
  background: #f4f4f4;
  padding: 1rem;
  border-right: 1px solid #ddd;
`;
const CategoryItem = styled.div`
  padding: 0.5rem;
  cursor:pointer;
  border-radius:5px;
  margin-bottom:0.5rem;
  background: ${(props) => (props.active ? "#ccc" : "transparent")}
  &:hover{
    background:#ddd
}
`;

const Sidebar = ({ selectedCategory, onCategorySelect }) => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    if (status === "initial") {
      dispatch(fetchCategories);
    }
  }, [status, dispatch]);

  if (status === "loading")
    return <SidebarWrapper>در حال بارگذاری...</SidebarWrapper>;
  if (status === "failed") return <SidebarWrapper>خطا: {error}</SidebarWrapper>;
  return (
    <SidebarWrapper>
      {categories.map((cat) => (
        <CategoryItem
          key={cat.id}
          active={selectedCategory === cat.id}
          onClick={() => onCategorySelect(cat.id)}
        >
          {cat.name}
        </CategoryItem>
      ))}
    </SidebarWrapper>
  );
};

export default Sidebar;

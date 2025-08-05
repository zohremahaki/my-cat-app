import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./features/categories/Sidebar";
import { clearCats, fetchCats } from "./features/cats/CatsSlice";

function App() {
  const dispatch = useDispatch();
  const { items: cats, status, error } = useSelector((state) => state.cats);
  const { selectedCategory } = useSelector((state) => state.categories);

  // وقتی دسته‌بندی تغییر می‌کنه، عکس‌های جدید بیاد
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
    <div style={{ display: "flex" }}>
      {/* سایدبار دسته‌بندی‌ها */}
      <Sidebar />

      {/* بخش اصلی نمایش عکس‌ها */}
      <div style={{ flex: 1, padding: "1rem" }}>
        <h1>🐱 Cat Gallery</h1>

        {status === "loading" && <p>در حال بارگذاری...</p>}
        {status === "failed" && <p style={{ color: "red" }}>{error}</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {cats.map((cat) => (
            <img
              key={cat.id}
              src={cat.url}
              alt="Cat"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ))}
        </div>

        {cats.length > 0 && (
          <button
            onClick={handleLoadMore}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

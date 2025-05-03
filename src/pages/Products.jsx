import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import secureAxios from "../utils/secureAxios";
import "../css/Products.css"; // ✅ Import the new CSS

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;


  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  // Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await secureAxios.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    loadCategories();
  }, []);

  // Fetch products with filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${apiUrl}/api/products?`;
        if (searchTerm) url += `search=${searchTerm}&`;
        if (selectedCategory) url += `category=${selectedCategory}&`;
        if (minPrice) url += `minPrice=${minPrice}&`;
        if (maxPrice) url += `maxPrice=${maxPrice}&`;

        const res = await secureAxios.get(url);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchTerm, selectedCategory, minPrice, maxPrice]);

  // Handle filter submit
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory) params.set("category", selectedCategory);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    navigate(`/products?${params.toString()}`);
  };

  return (
    <div className="products-container">
     

      {/* Filters */}
      <form className="row g-3 mb-4 filter-form" onSubmit={handleFilterSubmit}>
        {/* Category */}
        <div className="col-md-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="col-md-2">
          <label className="form-label">Min Price</label>
          <input
            type="number"
            className="form-control"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g. 100"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Max Price</label>
          <input
            type="number"
            className="form-control"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 1000"
          />
        </div>

        {/* Filter Button */}
        <div className="col-md-2 align-self-end">
          <button type="submit" className="btn btn-primary w-100">
            Apply Filters
          </button>
        </div>
      </form>

      {/* Products Display */}
      <div className="row product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-4 mb-3" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

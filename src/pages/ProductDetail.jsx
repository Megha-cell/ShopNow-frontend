import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import secureAxios from "../utils/secureAxios";
import { toast } from "react-toastify";


function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await secureAxios.post(
        "/cart",
        { product: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      //alert("✅ Item added to cart!");
      toast.success("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      //alert("❌ Failed to add item to cart");
      toast.error("Failed to add item to cart");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{product.name}</h2>

      <div className="row">
        <div className="col-md-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover", marginBottom: "20px" }}
          />
        </div>

        <div className="col-md-6">
          <p className="fs-5">{product.description}</p>
          <p className="fs-4 fw-bold">₹{product.price}</p>
          <p className="text-muted">Stock: {product.stock}</p>

          <div className="d-flex align-items-center my-3">
            <label htmlFor="quantity" className="me-2 fw-bold">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="form-control w-25"
            />
          </div>

          <button
            className="btn btn-primary mt-3"
            onClick={handleAddToCart}
            style={{ width: "100%" }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

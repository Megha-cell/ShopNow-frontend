import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card p-3">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="card-img-top"
        style={{ maxHeight: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h4 className="card-title">{product.name}</h4>
        <p className="card-text">{product.description}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Stock:</strong> {product.stock} available</p>
        <Link to={`/product/${product._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;

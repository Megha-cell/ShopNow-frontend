import '../css/Home.css';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to <span className="brand-name">ShopNow</span></h1>
        <p className="home-subtitle">Find quality products at unbeatable prices.</p>
        {/* <a href="/products" className="home-btn">Shop Now</a> */}
        <Link to="/products" className="home-btn">Shop Now</Link>

      </div>
    </div>
  );
}

export default Home;

import '../css/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to <span className="brand-name">ShopNow</span></h1>
        <p className="home-subtitle">Find quality products at unbeatable prices.</p>
        <a href="/products" className="home-btn">Shop Now</a>
      </div>
    </div>
  );
}

export default Home;

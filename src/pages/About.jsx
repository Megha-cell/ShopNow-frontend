import React from 'react';
import '../css/About.css'; // Ensure you have the correct CSS file for this page

function About() {
    return (
        <div className="about-container">
            <div className="about-content">
                <h1 className="about-title">About Our ShopNow</h1>
                <p className="about-description">We provide the best products at affordable prices. Our platform ensures a smooth shopping experience with secure payments and fast delivery.</p>
                <h3 className="about-heading">Why Choose Us?</h3>
                <ul className="about-list">
                    <li>High-quality products</li>
                    <li>Fast delivery</li>
                    <li>Secure payments</li>
                </ul>
                <h3 className="about-heading">Contact Us</h3>
                <p>Email: <a href="mailto:support@saas-ecommerce.com" className="about-email">shopnow@gmail.com</a></p>
            </div>
        </div>
    );
}

export default About;

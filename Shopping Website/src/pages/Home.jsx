import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import allProducts from '../data/products.json';
import './Home.css';

const CATEGORIES = [
    { name: "men's clothing", label: 'Men', emoji: '👔', color: '#6c63ff' },
    { name: "women's clothing", label: 'Women', emoji: '👗', color: '#ff6584' },
    { name: 'electronics', label: 'Electronics', emoji: '💻', color: '#00d2ff' },
    { name: 'jewelry', label: 'Jewelry', emoji: '💎', color: '#f1c40f' },
];

const FEATURES = [
    { icon: <FiTruck />, title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: <FiShield />, title: 'Secure Payment', desc: 'Stripe protected' },
    { icon: <FiRefreshCw />, title: 'Easy Returns', desc: '30-day return policy' },
    { icon: <FiHeadphones />, title: '24/7 Support', desc: 'Always here to help' },
];

const featuredProducts = allProducts.filter((p) => p.featured);

export default function Home() {

    return (
        <div className="home">
            {/* Hero */}
            <section className="hero">
                <div className="hero__bg-orb hero__bg-orb--1"></div>
                <div className="hero__bg-orb hero__bg-orb--2"></div>
                <div className="hero__bg-orb hero__bg-orb--3"></div>
                <div className="hero__content container">
                    <span className="hero__badge">✨ New Season Collection 2026</span>
                    <h1 className="hero__title">
                        Discover Your <br />
                        <span className="hero__title-accent">Perfect Style</span>
                    </h1>
                    <p className="hero__subtitle">
                        Explore curated collections of fashion, electronics, and jewelry.
                        Premium quality, unbeatable prices.
                    </p>
                    <div className="hero__actions">
                        <Link to="/products" className="btn-primary">
                            Shop Now <FiArrowRight />
                        </Link>
                        <Link to="/about" className="btn-secondary">
                            Learn More
                        </Link>
                    </div>
                    <div className="hero__stats">
                        <div className="hero__stat">
                            <strong>500+</strong>
                            <span>Products</span>
                        </div>
                        <div className="hero__stat">
                            <strong>10K+</strong>
                            <span>Customers</span>
                        </div>
                        <div className="hero__stat">
                            <strong>4.9★</strong>
                            <span>Rating</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features container">
                <div className="features__grid">
                    {FEATURES.map((f) => (
                        <div className="features__item" key={f.title}>
                            <div className="features__icon">{f.icon}</div>
                            <h4>{f.title}</h4>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section className="categories container">
                <h2 className="section-title">Shop by Category</h2>
                <p className="section-subtitle">Find exactly what you&apos;re looking for</p>
                <div className="categories__grid">
                    {CATEGORIES.map((cat) => (
                        <Link
                            to={`/products?category=${encodeURIComponent(cat.name)}`}
                            className="category-card"
                            key={cat.name}
                            style={{ '--cat-color': cat.color }}
                        >
                            <span className="category-card__emoji">{cat.emoji}</span>
                            <h3>{cat.label}</h3>
                            <span className="category-card__arrow"><FiArrowRight /></span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured container">
                <h2 className="section-title">Featured Products</h2>
                <p className="section-subtitle">Handpicked just for you</p>
                <div className="featured__grid">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="featured__cta">
                    <Link to="/products" className="btn-secondary">
                        View All Products <FiArrowRight />
                    </Link>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter container">
                <div className="newsletter__card">
                    <h2>Stay in the Loop</h2>
                    <p>Get exclusive deals, new arrivals, and style tips delivered to your inbox.</p>
                    <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Enter your email" />
                        <button type="submit" className="btn-primary">Subscribe</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

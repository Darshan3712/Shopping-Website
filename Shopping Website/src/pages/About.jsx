import { FiHeart, FiGlobe, FiUsers, FiAward } from 'react-icons/fi';
import './About.css';

const VALUES = [
    { icon: <FiHeart />, title: 'Quality First', desc: 'Every product in our catalog is carefully curated to ensure the highest quality standards.' },
    { icon: <FiGlobe />, title: 'Global Reach', desc: 'We source products from the best brands worldwide, bringing them right to your doorstep.' },
    { icon: <FiUsers />, title: 'Community', desc: 'Over 10,000 satisfied customers trust ShopVista for their shopping needs.' },
    { icon: <FiAward />, title: 'Excellence', desc: 'Awarded "Best Online Shopping Experience" for three consecutive years.' },
];

export default function About() {
    return (
        <div className="about-page page-padding">
            <div className="container">
                <div className="about-page__hero">
                    <h1 className="section-title">About ShopVista</h1>
                    <p className="about-page__intro">
                        We believe shopping should be an experience, not a chore. ShopVista combines
                        curated collections, seamless technology, and exceptional service to create
                        the future of online retail.
                    </p>
                </div>

                <div className="about-page__story">
                    <div className="about-page__story-content">
                        <h2>Our Story</h2>
                        <p>
                            Founded in 2024, ShopVista started with a simple idea: make premium shopping
                            accessible to everyone. We partner directly with brands and artisans to bring
                            you authentic products at fair prices.
                        </p>
                        <p>
                            Today, we serve customers across the globe with a growing catalog of fashion,
                            electronics, and jewelry. Every item is hand-selected by our team of style
                            experts and tech enthusiasts.
                        </p>
                    </div>
                    <div className="about-page__story-visual">
                        <div className="about-page__stat-grid">
                            <div className="about-page__stat"><strong>500+</strong><span>Products</span></div>
                            <div className="about-page__stat"><strong>10K+</strong><span>Customers</span></div>
                            <div className="about-page__stat"><strong>50+</strong><span>Brands</span></div>
                            <div className="about-page__stat"><strong>4.9★</strong><span>Rating</span></div>
                        </div>
                    </div>
                </div>

                <section className="about-page__values">
                    <h2 className="section-title">Our Values</h2>
                    <div className="about-page__values-grid">
                        {VALUES.map((v) => (
                            <div className="about-page__value" key={v.title}>
                                <div className="about-page__value-icon">{v.icon}</div>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

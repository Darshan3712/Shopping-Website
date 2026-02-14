import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <h3 className="footer__logo">
                            <span className="footer__logo-icon">✦</span> ShopVista
                        </h3>
                        <p className="footer__desc">
                            Premium shopping experience with curated collections from around the world. Quality meets style.
                        </p>
                        <div className="footer__socials">
                            <a href="#" aria-label="GitHub"><FiGithub /></a>
                            <a href="#" aria-label="Twitter"><FiTwitter /></a>
                            <a href="#" aria-label="Instagram"><FiInstagram /></a>
                        </div>
                    </div>

                    <div className="footer__col">
                        <h4>Shop</h4>
                        <Link to="/products">All Products</Link>
                        <Link to="/products?category=electronics">Electronics</Link>
                        <Link to="/products?category=jewelery">Jewelry</Link>
                        <Link to="/products?category=men's clothing">Men's</Link>
                        <Link to="/products?category=women's clothing">Women's</Link>
                    </div>

                    <div className="footer__col">
                        <h4>Company</h4>
                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact</Link>
                        <a href="#">Careers</a>
                        <a href="#">Blog</a>
                    </div>

                    <div className="footer__col">
                        <h4>Support</h4>
                        <a href="#">FAQ</a>
                        <a href="#">Shipping</a>
                        <a href="#">Returns</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>&copy; {new Date().getFullYear()} ShopVista. All rights reserved.</p>
                    <p>Built with ❤️ using React</p>
                </div>
            </div>
        </footer>
    );
}

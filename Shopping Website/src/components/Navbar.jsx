import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
    const { totalItems } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setMenuOpen(false);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner container">
                <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
                    <span className="navbar__logo-icon">✦</span>
                    <span className="navbar__logo-text">ShopVista</span>
                </Link>

                <div className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
                    <div className="navbar__links">
                        <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/products" onClick={() => setMenuOpen(false)}>Products</NavLink>
                        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
                        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
                    </div>

                    <form className="navbar__search" onSubmit={handleSearch}>
                        <FiSearch className="navbar__search-icon" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>

                <div className="navbar__actions">
                    <Link to="/cart" className="navbar__cart" id="navbar-cart-link">
                        <FiShoppingCart />
                        {totalItems > 0 && (
                            <span className="navbar__cart-badge">{totalItems}</span>
                        )}
                    </Link>

                    <button
                        className="navbar__hamburger"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>
        </nav>
    );
}

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import allProducts from '../data/products.json';
import './ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const product = allProducts.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <div className="page-padding container">
                <p>Product not found.</p>
                <Link to="/products" className="btn-primary">Back to Products</Link>
            </div>
        );
    }

    const images = product.images || [product.image];

    const handleAddToCart = () => {
        addToCart({
            ...product,
            selectedSize,
            selectedColor,
            image: images[0], // main image for cart
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="product-detail page-padding">
            <div className="container">
                <Link to="/products" className="product-detail__back">
                    <FiArrowLeft /> Back to Products
                </Link>

                <div className="product-detail__grid">
                    {/* Image Gallery */}
                    <div className="product-detail__image-section">
                        <div className="product-detail__image-card">
                            <img src={images[selectedImage]} alt={product.title} />
                        </div>
                        {images.length > 1 && (
                            <div className="product-detail__thumbnails">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        className={`product-detail__thumb ${idx === selectedImage ? 'product-detail__thumb--active' : ''}`}
                                        onClick={() => setSelectedImage(idx)}
                                    >
                                        <img src={img} alt={`${product.title} view ${idx + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="product-detail__info">
                        <div className="product-detail__top-meta">
                            <span className="product-detail__category">{product.category}</span>
                            {product.brand && (
                                <span className="product-detail__brand">{product.brand}</span>
                            )}
                        </div>
                        <h1 className="product-detail__title">{product.title}</h1>

                        <div className="product-detail__rating">
                            <StarRating rating={product.rating?.rate || 0} showValue />
                            <span className="product-detail__reviews">
                                {product.rating?.count || 0} reviews
                            </span>
                        </div>

                        <p className="product-detail__price">${product.price.toFixed(2)}</p>

                        <p className="product-detail__desc">{product.description}</p>

                        {/* Material */}
                        {product.material && (
                            <div className="product-detail__attribute">
                                <span className="product-detail__attr-label">Material</span>
                                <span className="product-detail__attr-value">{product.material}</span>
                            </div>
                        )}

                        {/* Color Selector */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="product-detail__selector">
                                <span className="product-detail__selector-label">
                                    Color{selectedColor ? `: ${selectedColor}` : ''}
                                </span>
                                <div className="product-detail__selector-options">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            className={`product-detail__color-btn ${selectedColor === color ? 'product-detail__color-btn--active' : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selector */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="product-detail__selector">
                                <span className="product-detail__selector-label">
                                    Size{selectedSize ? `: ${selectedSize}` : ''}
                                </span>
                                <div className="product-detail__selector-options">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`product-detail__size-btn ${selectedSize === size ? 'product-detail__size-btn--active' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="product-detail__actions">
                            <button
                                className={`btn-primary product-detail__add ${added ? 'product-detail__add--added' : ''}`}
                                onClick={handleAddToCart}
                                id="add-to-cart-btn"
                            >
                                {added ? (
                                    <><FiCheck /> Added!</>
                                ) : (
                                    <><FiShoppingCart /> Add to Cart</>
                                )}
                            </button>
                            <Link to="/cart" className="btn-secondary">
                                View Cart
                            </Link>
                        </div>

                        <div className="product-detail__badges">
                            <span>🚚 Free shipping on orders over $50</span>
                            <span>🔒 Secure checkout with Stripe</span>
                            <span>↩️ 30-day easy returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

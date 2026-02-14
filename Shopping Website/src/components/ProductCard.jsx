import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';
import './ProductCard.css';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    // Support both single `image` and `images` array
    const mainImage = product.images ? product.images[0] : product.image;

    return (
        <Link
            to={`/products/${product.id}`}
            className="product-card"
            id={`product-card-${product.id}`}
        >
            <div className="product-card__image-wrapper">
                <img
                    src={mainImage}
                    alt={product.title}
                    className="product-card__image"
                    loading="lazy"
                />
                <div className="product-card__overlay">
                    <button className="product-card__add-btn" onClick={handleAdd}>
                        <FiShoppingCart /> Add to Cart
                    </button>
                </div>
            </div>

            <div className="product-card__info">
                <div className="product-card__top-row">
                    <span className="product-card__category">{product.category}</span>
                    {product.brand && (
                        <span className="product-card__brand">{product.brand}</span>
                    )}
                </div>
                <h3 className="product-card__title">{product.title}</h3>
                <div className="product-card__meta">
                    <StarRating rating={product.rating?.rate || 0} />
                    <span className="product-card__rating-count">
                        ({product.rating?.count || 0})
                    </span>
                </div>
                {product.colors && (
                    <div className="product-card__colors">
                        {product.colors.slice(0, 3).map((c) => (
                            <span key={c} className="product-card__color-dot" title={c}></span>
                        ))}
                        {product.colors.length > 3 && (
                            <span className="product-card__more-colors">+{product.colors.length - 3}</span>
                        )}
                    </div>
                )}
                <p className="product-card__price">${product.price.toFixed(2)}</p>
            </div>
        </Link>
    );
}

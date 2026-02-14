import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

    if (cart.length === 0) {
        return (
            <div className="cart-page page-padding">
                <div className="container cart-page__empty">
                    <FiShoppingBag className="cart-page__empty-icon" />
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven&apos;t added anything yet.</p>
                    <Link to="/products" className="btn-primary">
                        Start Shopping <FiArrowRight />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page page-padding">
            <div className="container">
                <h1 className="section-title">Shopping Cart</h1>
                <p className="section-subtitle">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>

                <div className="cart-page__layout">
                    {/* Items */}
                    <div className="cart-page__items">
                        {cart.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <Link to={`/products/${item.id}`} className="cart-item__image">
                                    <img src={item.image} alt={item.title} />
                                </Link>

                                <div className="cart-item__info">
                                    <Link to={`/products/${item.id}`} className="cart-item__title">
                                        {item.title}
                                    </Link>
                                    <span className="cart-item__category">{item.category}</span>
                                    <p className="cart-item__price">${item.price.toFixed(2)}</p>
                                </div>

                                <div className="cart-item__controls">
                                    <div className="cart-item__qty">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            aria-label="Decrease quantity"
                                        >
                                            <FiMinus />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            aria-label="Increase quantity"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>

                                    <p className="cart-item__subtotal">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>

                                    <button
                                        className="cart-item__remove"
                                        onClick={() => removeFromCart(item.id)}
                                        aria-label="Remove item"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="cart-page__summary">
                        <div className="cart-summary">
                            <h3>Order Summary</h3>
                            <div className="cart-summary__row">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="cart-summary__row">
                                <span>Shipping</span>
                                <span className="cart-summary__free">Free</span>
                            </div>
                            <div className="cart-summary__row">
                                <span>Tax (est.)</span>
                                <span>${(totalPrice * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="cart-summary__divider"></div>
                            <div className="cart-summary__row cart-summary__total">
                                <span>Total</span>
                                <span>${(totalPrice * 1.08).toFixed(2)}</span>
                            </div>
                            <Link to="/checkout" className="btn-primary cart-summary__checkout" id="checkout-btn">
                                Proceed to Checkout <FiArrowRight />
                            </Link>
                            <Link to="/products" className="btn-secondary cart-summary__continue">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

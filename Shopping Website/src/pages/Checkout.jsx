import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiCheck, FiCreditCard } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { redirectToCheckout } from '../utils/stripe';
import './Checkout.css';

export default function Checkout() {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({
        email: '', name: '', address: '', city: '', zip: '',
        cardNumber: '', expiry: '', cvc: '',
    });

    const tax = totalPrice * 0.08;
    const total = totalPrice + tax;
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await redirectToCheckout(cart);
            if (result.success) { setSuccess(true); clearCart(); setTimeout(() => navigate('/'), 4000); }
        } catch (err) { console.error('Payment failed:', err); }
        finally { setLoading(false); }
    };

    if (cart.length === 0 && !success) {
        return (
            <div className="checkout-page page-padding">
                <div className="container checkout-page__empty">
                    <h2>Nothing to checkout</h2>
                    <p>Add some items to your cart first.</p>
                    <Link to="/products" className="btn-primary">Shop Now</Link>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="checkout-page page-padding">
                <div className="container checkout-page__success">
                    <div className="checkout-page__success-icon"><FiCheck /></div>
                    <h2>Payment Successful!</h2>
                    <p>Thank you for your purchase. Your order has been confirmed.</p>
                    <p className="checkout-page__success-total">Total charged: <strong>${total.toFixed(2)}</strong></p>
                    <p className="checkout-page__redirect">Redirecting to home page...</p>
                    <Link to="/" className="btn-primary">Go to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page page-padding">
            <div className="container">
                <Link to="/cart" className="checkout-page__back"><FiArrowLeft /> Back to Cart</Link>
                <h1 className="section-title">Checkout</h1>
                <p className="section-subtitle">Complete your purchase securely</p>

                <div className="checkout-page__layout">
                    <form className="checkout-form" onSubmit={handleSubmit}>
                        <div className="checkout-form__section">
                            <h3>Contact Information</h3>
                            <div className="checkout-form__field">
                                <label htmlFor="email">Email</label>
                                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                            </div>
                            <div className="checkout-form__field">
                                <label htmlFor="name">Full Name</label>
                                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                            </div>
                        </div>
                        <div className="checkout-form__section">
                            <h3>Shipping Address</h3>
                            <div className="checkout-form__field">
                                <label htmlFor="address">Address</label>
                                <input id="address" name="address" type="text" value={form.address} onChange={handleChange} placeholder="123 Main Street" required />
                            </div>
                            <div className="checkout-form__row">
                                <div className="checkout-form__field">
                                    <label htmlFor="city">City</label>
                                    <input id="city" name="city" type="text" value={form.city} onChange={handleChange} placeholder="New York" required />
                                </div>
                                <div className="checkout-form__field">
                                    <label htmlFor="zip">ZIP Code</label>
                                    <input id="zip" name="zip" type="text" value={form.zip} onChange={handleChange} placeholder="10001" required />
                                </div>
                            </div>
                        </div>
                        <div className="checkout-form__section">
                            <h3><FiCreditCard /> Payment Details</h3>
                            <p className="checkout-form__stripe-note"><FiLock /> Secured by Stripe · Test card: <code>4242 4242 4242 4242</code></p>
                            <div className="checkout-form__field">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input id="cardNumber" name="cardNumber" type="text" value={form.cardNumber} onChange={handleChange} placeholder="4242 4242 4242 4242" maxLength={19} required />
                            </div>
                            <div className="checkout-form__row">
                                <div className="checkout-form__field">
                                    <label htmlFor="expiry">Expiry</label>
                                    <input id="expiry" name="expiry" type="text" value={form.expiry} onChange={handleChange} placeholder="MM/YY" maxLength={5} required />
                                </div>
                                <div className="checkout-form__field">
                                    <label htmlFor="cvc">CVC</label>
                                    <input id="cvc" name="cvc" type="text" value={form.cvc} onChange={handleChange} placeholder="123" maxLength={4} required />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn-primary checkout-form__submit" disabled={loading} id="pay-now-btn">
                            {loading ? 'Processing...' : <><FiLock /> Pay ${total.toFixed(2)}</>}
                        </button>
                    </form>

                    <div className="checkout-page__summary">
                        <div className="checkout-summary">
                            <h3>Order Summary</h3>
                            <div className="checkout-summary__items">
                                {cart.map((item) => (
                                    <div className="checkout-summary__item" key={item.id}>
                                        <div className="checkout-summary__item-img">
                                            <img src={item.image} alt={item.title} />
                                            <span className="checkout-summary__item-qty">{item.quantity}</span>
                                        </div>
                                        <div className="checkout-summary__item-info">
                                            <p>{item.title}</p>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="checkout-summary__divider"></div>
                            <div className="checkout-summary__row"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                            <div className="checkout-summary__row"><span>Shipping</span><span className="checkout-summary__free">Free</span></div>
                            <div className="checkout-summary__row"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                            <div className="checkout-summary__divider"></div>
                            <div className="checkout-summary__row checkout-summary__total"><span>Total</span><span>${total.toFixed(2)}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

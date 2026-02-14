import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import './Contact.css';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <div className="contact-page page-padding">
            <div className="container">
                <div className="contact-page__hero">
                    <h1 className="section-title">Get in Touch</h1>
                    <p className="section-subtitle">Have a question? We'd love to hear from you.</p>
                </div>

                <div className="contact-page__layout">
                    <div className="contact-page__info">
                        <div className="contact-info-card">
                            <FiMail className="contact-info-card__icon" />
                            <h3>Email</h3>
                            <p>support@shopvista.com</p>
                        </div>
                        <div className="contact-info-card">
                            <FiPhone className="contact-info-card__icon" />
                            <h3>Phone</h3>
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div className="contact-info-card">
                            <FiMapPin className="contact-info-card__icon" />
                            <h3>Address</h3>
                            <p>123 Commerce St, New York, NY 10001</p>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        {sent && <div className="contact-form__success">✅ Message sent successfully!</div>}
                        <div className="contact-form__row">
                            <div className="contact-form__field">
                                <label htmlFor="contact-name">Name</label>
                                <input id="contact-name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required />
                            </div>
                            <div className="contact-form__field">
                                <label htmlFor="contact-email">Email</label>
                                <input id="contact-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required />
                            </div>
                        </div>
                        <div className="contact-form__field">
                            <label htmlFor="contact-subject">Subject</label>
                            <input id="contact-subject" type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" required />
                        </div>
                        <div className="contact-form__field">
                            <label htmlFor="contact-message">Message</label>
                            <textarea id="contact-message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us more..." required />
                        </div>
                        <button type="submit" className="btn-primary"><FiSend /> Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

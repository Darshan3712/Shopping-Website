import './StarRating.css';

export default function StarRating({ rating, showValue = false }) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`} className="star star--full">★</span>
            ))}
            {hasHalf && <span className="star star--half">★</span>}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`} className="star star--empty">★</span>
            ))}
            {showValue && <span className="star-rating__value">{rating.toFixed(1)}</span>}
        </div>
    );
}

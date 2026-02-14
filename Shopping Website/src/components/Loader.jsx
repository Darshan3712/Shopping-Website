import './Loader.css';

export default function Loader() {
    return (
        <div className="loader-wrapper">
            <div className="loader">
                <div className="loader__ring"></div>
                <div className="loader__ring"></div>
                <div className="loader__ring"></div>
                <span className="loader__text">Loading</span>
            </div>
        </div>
    );
}

import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import allProducts from '../data/products.json';
import './Products.css';

const SORT_OPTIONS = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'name', label: 'Name A–Z' },
];

const categories = [...new Set(allProducts.map((p) => p.category))];

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilter, setShowFilter] = [true, () => { }]; // always visible on desktop

    const activeCategory = searchParams.get('category') || '';
    const searchQuery = searchParams.get('search') || '';
    const sortBy = searchParams.get('sort') || 'default';

    const filtered = useMemo(() => {
        let result = [...allProducts];

        if (activeCategory) {
            result = result.filter((p) => p.category === activeCategory);
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q) ||
                    (p.brand && p.brand.toLowerCase().includes(q))
            );
        }

        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
                break;
            case 'name':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        return result;
    }, [activeCategory, searchQuery, sortBy]);

    const updateParam = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (value) params.set(key, value);
        else params.delete(key);
        setSearchParams(params);
    };

    return (
        <div className="products-page page-padding">
            <div className="container">
                {/* Header */}
                <div className="products-page__header">
                    <div>
                        <h1 className="section-title">
                            {activeCategory
                                ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
                                : 'All Products'}
                        </h1>
                        <p className="section-subtitle" style={{ marginBottom: 0 }}>
                            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
                            {searchQuery && ` for "${searchQuery}"`}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="products-page__filters products-page__filters--open">
                    <div className="products-page__categories">
                        <button
                            className={`filter-chip ${!activeCategory ? 'filter-chip--active' : ''}`}
                            onClick={() => updateParam('category', '')}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-chip ${activeCategory === cat ? 'filter-chip--active' : ''}`}
                                onClick={() => updateParam('category', cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="products-page__sort">
                        <label htmlFor="sort-select">Sort by:</label>
                        <select
                            id="sort-select"
                            value={sortBy}
                            onChange={(e) => updateParam('sort', e.target.value)}
                        >
                            {SORT_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {(activeCategory || searchQuery) && (
                        <button
                            className="products-page__clear"
                            onClick={() => setSearchParams({})}
                        >
                            <FiX /> Clear Filters
                        </button>
                    )}
                </div>

                {/* Grid */}
                {filtered.length === 0 ? (
                    <div className="products-page__empty">
                        <p>No products match your criteria.</p>
                        <button className="btn-primary" onClick={() => setSearchParams({})}>
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="products-page__grid">
                        {filtered.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

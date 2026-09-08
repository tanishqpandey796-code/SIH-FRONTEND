// ServiceCatalog Component - Sahakar Gig Platform
const { useState } = React;
import { SERVICE_CATEGORIES } from '../mockData.js';

export default function ServiceCatalog({ onSelectCategory }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredServices = SERVICE_CATEGORIES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'high') return matchesSearch && service.badge === 'High Demand';
    if (selectedFilter === 'popular') return matchesSearch && (service.badge === 'Popular' || service.badge === 'Govt Approved');
    return matchesSearch;
  });

  return (
    <section id="services-catalog" className="section-wrapper container">
      <div className="section-header">
        <div style={{
          color: 'var(--secondary)',
          fontWeight: 800,
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem'
        }}>
          Direct Cooperative Marketplace
        </div>
        <h2 className="section-title">Explore Verified Services</h2>
        <p className="section-subtitle">
          Select a category to view nearby certified workers from registered Labour Cooperative Societies.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="search-filter-bar">
        <div className="search-input-group">
          <span style={{ fontSize: '1.2rem' }}>🔍</span>
          <input
            type="text"
            placeholder="Search electrician, plumbing, caregiver, painter, driver..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              ✕
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`role-btn ${selectedFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('all')}
          >
            All Services
          </button>
          <button 
            className={`role-btn ${selectedFilter === 'popular' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('popular')}
          >
            Popular
          </button>
          <button 
            className={`role-btn ${selectedFilter === 'high' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('high')}
          >
            High Demand
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {filteredServices.map((service) => (
          <div key={service.id} className="service-card">
            <div>
              <div className="service-card-top">
                <div className="service-icon-box">
                  {getCategoryEmoji(service.id)}
                </div>
                <span className="badge-tag">{service.badge}</span>
              </div>

              <h3 className="service-name">{service.name}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 700, marginBottom: '0.75rem' }}>
                👥 {service.workersAvailable} Verified Workers Nearby
              </div>

              <div className="service-meta">
                <div className="price-text">
                  ₹{service.basePrice} <span>/ starting fare</span>
                </div>

                <button 
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                  onClick={() => onSelectCategory(service)}
                >
                  Add 📍
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          No services match your search term "{searchQuery}". Try searching for 'electrician' or 'caregiver'.
        </div>
      )}
    </section>
  );
}

function getCategoryEmoji(id) {
  const map = {
    electrical: '⚡',
    plumbing: '🚰',
    carpentry: '🪚',
    painting: '🎨',
    caregiver: '🩺',
    domestic_help: '🍲',
    driver: '🚘',
    gardener: '🪴',
    cleaning: '🧹',
    technician: '🔧'
  };
  return map[id] || '🛠️';
}

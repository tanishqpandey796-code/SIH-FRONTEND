// Header Component - Sahakar Gig Platform (SIH26089)
// Header uses global React from CDN

export default function Header({ activeRole, setActiveRole, onOpenSOS, bookingCount }) {
  return (
    <header className="header-wrapper">
      {/* Government & SIH Announcement Bar */}
      <div className="govt-banner">
        <div className="container govt-banner-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>🇮🇳 Ministry of Cooperation | Govt of India</span>
            <span style={{ opacity: 0.6 }}>•</span>
            <span>Labour Cooperative Digital Marketplace Platform</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="sih-badge-pill">SIH 2026 Problem ID: SIH26089</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>Toll Free Welfare Helpline: 1800-11-SAHAKAR</span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="container header-container">
        <div className="brand-section">
          <div className="emblem-badge">सह</div>
          <div className="brand-text">
            <h1>
              सहकार GIG 
              <span style={{ 
                background: '#ECFDF5', 
                color: '#047857', 
                padding: '2px 8px', 
                borderRadius: '12px', 
                fontSize: '0.7rem',
                border: '1px solid #A7F3D0'
              }}>Verified Cooperative</span>
            </h1>
            <span>Cooperative Household & Community Services Portal</span>
          </div>
        </div>

        {/* Multi-Role Switcher (Customer / Federation Admin) */}
        <div className="role-switcher">
          <button 
            className={`role-btn ${activeRole === 'customer' ? 'active' : ''}`}
            onClick={() => setActiveRole('customer')}
          >
            🏠 Household Customer
          </button>
          <button 
            className={`role-btn ${activeRole === 'admin' || activeRole === 'worker' ? 'active' : ''}`}
            onClick={() => setActiveRole('admin')}
          >
            🏛️ Federation Admin
          </button>
        </div>

        {/* Actions & Emergency SOS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {activeRole === 'customer' && (
            <button className="sos-trigger-btn" onClick={onOpenSOS}>
              🚨 1-Click SOS Booking
            </button>
          )}

          {bookingCount > 0 && activeRole === 'customer' && (
            <div style={{
              background: '#0F2C59',
              color: 'white',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <span>📋 Active Bookings:</span>
              <span style={{ background: '#F59E0B', color: '#000', padding: '2px 8px', borderRadius: '10px' }}>
                {bookingCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// HeroSection Component - Sahakar Gig Platform
// HeroSection uses global React from CDN
import { FEDERATION_STATS } from '../mockData.js';

export default function HeroSection({ onExploreServices, onOpenCalculator }) {
  return (
    <section className="hero-wrapper">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-tag">
              ✨ Sahakar se Samriddhi • Official Cooperative Marketplace
            </div>
            <h1 className="hero-title">
              Verified Skilled Workers.<br />
              <span>Fair Wages. Trusted Household Services.</span>
            </h1>
            <p className="hero-desc">
              Connect directly with government-certified Labour Cooperative Societies for electricians, plumbers, carpenters, caregivers, cleaners & technicians. 90%+ of your booking payment goes straight to worker welfare & insurance.
            </p>

            <div className="hero-cta-group">
              <button className="btn-primary" onClick={onExploreServices}>
                🔍 Find Local Certified Worker
              </button>
              <button className="btn-secondary" onClick={onOpenCalculator}>
                📊 Compare Fair Wage vs Commercial Apps
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <strong style={{ color: '#059669' }}>✓</strong> Police Verified
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <strong style={{ color: '#059669' }}>✓</strong> PM Bima Covered
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <strong style={{ color: '#059669' }}>✓</strong> Transparent Invoicing
              </span>
            </div>
          </div>

          {/* Feature Highlight Graphic */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(15, 44, 89, 0.04), rgba(5, 150, 105, 0.08))',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            padding: '2rem',
            position: 'relative'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.2rem'
              }}>
                90%
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Direct Worker Wage Share</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Zero exploitative private platform commission</p>
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.2rem'
              }}>
                100%
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Cooperative Ownership</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Managed by registered Labour Cooperative Federations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Ribbon */}
        <div style={{ marginTop: '3rem' }}>
          <div className="stats-card-grid">
            <div className="stat-item">
              <div className="stat-icon">👥</div>
              <div>
                <div className="stat-val">{FEDERATION_STATS.totalRegisteredWorkers.toLocaleString()}</div>
                <div className="stat-label">Verified Skilled Workers</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">🏛️</div>
              <div>
                <div className="stat-val">{FEDERATION_STATS.activeSocieties}</div>
                <div className="stat-label">Cooperative Societies</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">💰</div>
              <div>
                <div className="stat-val">{FEDERATION_STATS.fairWagePaid}</div>
                <div className="stat-label">Worker Wages Disbursed</div>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">🛡️</div>
              <div>
                <div className="stat-val">{FEDERATION_STATS.welfareFundBalance}</div>
                <div className="stat-label">Social Welfare & Insurance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

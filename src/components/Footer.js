// Footer Component - Sahakar Gig Platform (SIH26089)
// Footer uses global React from CDN

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="emblem-badge" style={{ width: '40px', height: '40px', fontSize: '1rem' }}>सह</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>सहकार GIG PLATFORM</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', maxWidth: '360px', marginBottom: '1.25rem' }}>
              A Cooperative-Owned Digital Service Marketplace enabling Labour Cooperative Federations to connect verified skilled workers with households & institutions.
            </p>
            <div style={{ fontSize: '0.8rem', color: '#F59E0B', fontWeight: 700 }}>
              Smart India Hackathon (SIH) 2026 • Problem Statement SIH26089
            </div>
          </div>

          <div className="footer-col">
            <h4>Cooperative Ecosystem</h4>
            <ul>
              <li><a href="#services-catalog">Electricians & Wiring</a></li>
              <li><a href="#services-catalog">Sanitation & Plumbing</a></li>
              <li><a href="#services-catalog">Elderly Care & Nursing</a></li>
              <li><a href="#services-catalog">Painters & Woodwork</a></li>
              <li><a href="#services-catalog">Appliance Technicians</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Government Portals</h4>
            <ul>
              <li><a href="https://cooperation.gov.in" target="_blank" rel="noreferrer">Ministry of Cooperation</a></li>
              <li><a href="https://sih.gov.in" target="_blank" rel="noreferrer">Smart India Hackathon 2026</a></li>
              <li><a href="https://ncui.coop" target="_blank" rel="noreferrer">National Cooperative Union of India</a></li>
              <li><a href="https://ncdc.in" target="_blank" rel="noreferrer">NCDC Sahakar Portal</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Worker Welfare & Support</h4>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1rem', borderRadius: '12px', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 800, color: '#10B981', marginBottom: '0.25rem' }}>
                📞 Worker Helpline: 1800-11-SAHAKAR
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                24x7 Toll Free Support for Worker Onboarding, Insurance Claims & Emergency SOS.
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 Ministry of Cooperation, Govt of India. Developed for Smart India Hackathon 2026.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Cooperative Service</span>
            <span>Fair Wage Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

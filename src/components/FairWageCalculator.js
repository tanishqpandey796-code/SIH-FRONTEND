// FairWageCalculator Component - Sahakar Gig Platform (SIH26089)
const { useState } = React;

export default function FairWageCalculator({ onClose }) {
  const [bookingAmount, setBookingAmount] = useState(1000);

  // Private Platform Math (Exploitative)
  const privateCommission = Math.round(bookingAmount * 0.30);
  const privateWorkerWage = Math.round(bookingAmount * 0.70);
  const privateWelfare = 0;

  // Sahakar Cooperative Math (Fair)
  const sahakarWorkerWage = Math.round(bookingAmount * 0.90);
  const sahakarSocietyDividend = Math.round(bookingAmount * 0.05);
  const sahakarWelfarePool = Math.round(bookingAmount * 0.05);

  const wageDifference = sahakarWorkerWage - privateWorkerWage;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '750px' }}>
        <div className="modal-header">
          <div className="modal-title">
            <span>📊 Fair-Wage & Welfare Impact Visualizer</span>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: 800, display: 'block', marginBottom: '0.5rem' }}>
              Select Sample Customer Service Booking Fare: <strong>₹{bookingAmount}</strong>
            </label>
            <input
              type="range"
              min="300"
              max="5000"
              step="100"
              value={bookingAmount}
              onChange={(e) => setBookingAmount(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--secondary)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>₹300 (Basic Repair)</span>
              <span>₹2,500 (Full House Paint/Care)</span>
              <span>₹5,000 (Major Overhaul)</span>
            </div>
          </div>

          {/* Side by Side Comparison Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Private Commercial Aggregator */}
            <div style={{
              background: '#FEF2F2',
              border: '2px solid #FCA5A5',
              borderRadius: '16px',
              padding: '1.5rem'
            }}>
              <div style={{ background: '#DC2626', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800, display: 'inline-block', marginBottom: '0.75rem' }}>
                Private Aggregator Model
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#991B1B', marginBottom: '0.75rem' }}>
                Commercial Intermediary
              </h4>

              <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Worker Direct Take-Home:</span>
                  <strong style={{ color: '#DC2626' }}>₹{privateWorkerWage} (70%)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Platform Commission Cut:</span>
                  <strong>₹{privateCommission} (30%)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Worker Health Insurance:</span>
                  <strong style={{ color: '#DC2626' }}>₹0 (Nil)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Society Dividend Share:</span>
                  <strong>₹0 (Corporate Profit)</strong>
                </div>
              </div>
            </div>

            {/* Sahakar Cooperative Model */}
            <div style={{
              background: '#ECFDF5',
              border: '2px solid #6EE7B7',
              borderRadius: '16px',
              padding: '1.5rem'
            }}>
              <div style={{ background: '#059669', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800, display: 'inline-block', marginBottom: '0.75rem' }}>
                Sahakar Cooperative Model
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#065F46', marginBottom: '0.75rem' }}>
                Cooperative-Owned Platform
              </h4>

              <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Worker Direct Take-Home:</span>
                  <strong style={{ color: '#059669' }}>₹{sahakarWorkerWage} (90%)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Cooperative Society Dividend:</span>
                  <strong>₹{sahakarSocietyDividend} (5%)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Health & Welfare Fund:</span>
                  <strong style={{ color: '#059669' }}>₹{sahakarWelfarePool} (5%)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Private Intermediary Cut:</span>
                  <strong style={{ color: '#059669' }}>₹0 (Zero Cut)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Key Impact Summary */}
          <div style={{
            background: 'var(--primary-glow)',
            border: '1px solid var(--primary-light)',
            padding: '1.25rem',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.4rem' }}>
              💡 Social Impact Impact Summary
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
              By choosing the Sahakar Cooperative platform, the skilled worker earns <strong>₹{wageDifference} MORE</strong> on this single job, while auto-accumulating <strong>₹{sahakarWelfarePool}</strong> for PM Bima health insurance coverage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

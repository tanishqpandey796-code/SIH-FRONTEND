// GeoMatchingModal Component - Sahakar Gig Platform
const { useState } = React;
import { SAMPLE_WORKERS } from '../mockData.js';

export default function GeoMatchingModal({ selectedCategory, onClose, onSelectWorker }) {
  const [selectedWorkerId, setSelectedWorkerId] = useState(SAMPLE_WORKERS[0].id);
  const [bookingType, setBookingType] = useState('instant'); // 'instant' | 'scheduled'
  const [selectedDate, setSelectedDate] = useState('2026-09-04');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [customerAddress, setCustomerAddress] = useState('B-42, Gulmohar Park, New Delhi');

  // Filter workers matching category or default to all
  const categoryWorkers = SAMPLE_WORKERS.filter(
    w => w.categoryId === selectedCategory?.id
  );
  const availableWorkers = categoryWorkers.length > 0 ? categoryWorkers : SAMPLE_WORKERS;

  const activeWorker = availableWorkers.find(w => w.id === selectedWorkerId) || availableWorkers[0];

  const handleProceedToCheckout = () => {
    onSelectWorker({
      worker: activeWorker,
      category: selectedCategory,
      bookingType,
      date: selectedDate,
      time: selectedTime,
      address: customerAddress
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            <span>📍 Geo-Location Worker Match</span>
            <span style={{ 
              fontSize: '0.85rem', 
              background: '#ECFDF5', 
              color: '#047857', 
              padding: '2px 10px', 
              borderRadius: '12px' 
            }}>
              {selectedCategory?.name || 'Household Service'}
            </span>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Simulated Map Radar UI */}
          <div className="map-simulation-box">
            <div className="map-radar-circle"></div>
            
            {/* User Center Pin */}
            <div className="user-location-pin" title="Your Location"></div>

            {/* Worker Pins Around Map */}
            {availableWorkers.map((worker, idx) => {
              const offsets = [
                { top: '30%', left: '25%' },
                { top: '65%', left: '70%' },
                { top: '20%', left: '60%' },
                { top: '75%', left: '30%' },
                { top: '45%', left: '80%' }
              ];
              const pos = offsets[idx % offsets.length];

              return (
                <div
                  key={worker.id}
                  className="worker-node-pin"
                  style={{
                    ...pos,
                    borderColor: worker.id === selectedWorkerId ? '#F59E0B' : '#10B981'
                  }}
                  onClick={() => setSelectedWorkerId(worker.id)}
                  title={`${worker.name} (${worker.distanceKm} km away)`}
                >
                  <img src={worker.photo} alt={worker.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              );
            })}

            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '15px',
              background: 'rgba(15, 23, 42, 0.85)',
              color: 'white',
              fontSize: '0.75rem',
              padding: '4px 10px',
              borderRadius: '6px'
            }}>
              📡 Scanning GPS Radius (5km): Found {availableWorkers.length} Certified Cooperative Workers
            </div>
          </div>

          {/* Delivery Address Input */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
              Service Location / Household Address
            </label>
            <input
              type="text"
              className="search-input-group"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--card-border)',
                background: 'var(--card-bg)'
              }}
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </div>

          {/* Booking Type Toggle */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <button
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: bookingType === 'instant' ? '2px solid var(--secondary)' : '1px solid var(--card-border)',
                background: bookingType === 'instant' ? 'var(--secondary-glow)' : 'transparent',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              onClick={() => setBookingType('instant')}
            >
              ⚡ Instant Dispatch (30 Mins)
            </button>

            <button
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: bookingType === 'scheduled' ? '2px solid var(--primary)' : '1px solid var(--card-border)',
                background: bookingType === 'scheduled' ? 'var(--primary-glow)' : 'transparent',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              onClick={() => setBookingType('scheduled')}
            >
              📅 Schedule Date & Time
            </button>
          </div>

          {bookingType === 'scheduled' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Select Date</label>
                <input
                  type="date"
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--card-border)' }}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Select Time Slot</label>
                <select
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--card-border)' }}
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option>09:00 AM - 11:00 AM</option>
                  <option>10:00 AM - 12:00 PM</option>
                  <option>02:00 PM - 04:00 PM</option>
                  <option>05:00 PM - 07:00 PM</option>
                </select>
              </div>
            </div>
          )}

          {/* Worker Selection List */}
          <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Select Nearby Cooperative Worker
          </h4>

          {availableWorkers.map((worker) => (
            <div
              key={worker.id}
              className={`worker-card-selectable ${worker.id === selectedWorkerId ? 'selected' : ''}`}
              onClick={() => setSelectedWorkerId(worker.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={worker.photo} alt={worker.name} className="worker-avatar" />
                <div>
                  <div className="worker-details">
                    <h4>
                      {worker.name}
                      <span className="verified-badge-pill">✓ Govt Verified</span>
                    </h4>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    🏛️ {worker.society}
                  </div>
                  <div style={{ fontSize: '0.8rem', display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                    <span>⭐ {worker.rating} ({worker.reviewsCount} reviews)</span>
                    <span>📍 {worker.distanceKm} km away</span>
                    <span style={{ color: '#059669', fontWeight: 700 }}>🛡️ PM Bima Covered</span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                  ₹{worker.hourlyRate}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>per service visit</div>
              </div>
            </div>
          ))}

          {/* Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Selected Worker:</span>
              <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{activeWorker.name}</div>
            </div>

            <button className="btn-primary" onClick={handleProceedToCheckout}>
              Proceed to Transparent Checkout 💳
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

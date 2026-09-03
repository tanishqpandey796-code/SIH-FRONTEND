// EmergencySOSModal Component - Sahakar Gig Platform (SIH26089)
const { useState } = React;

export default function EmergencySOSModal({ onClose, onConfirmSOS }) {
  const [selectedEmergency, setSelectedEmergency] = useState('electrical');
  const [sosActive, setSosActive] = useState(false);
  const [dispatchedWorker, setDispatchedWorker] = useState(null);

  const emergencyTypes = [
    {
      id: 'electrical',
      title: '⚡ Electrical Short Circuit / MCB Fire Hazard',
      sla: '15 Mins Guaranteed Dispatch',
      desc: 'Immediate power cut-off, burning smell, sparks in panel box'
    },
    {
      id: 'plumbing',
      title: '🚰 Water Pipe Burst / Flooding Crisis',
      sla: '20 Mins Dispatch',
      desc: 'Overhead tank leakage, main inlet line burst'
    },
    {
      id: 'caregiver',
      title: '🩺 Elderly Caregiver Urgent Emergency',
      sla: '15 Mins Dispatch',
      desc: 'Patient mobility crisis, vital monitoring support'
    },
    {
      id: 'lockout',
      title: '🔑 Home Lockout / Broken Key Locksmith',
      sla: '25 Mins Dispatch',
      desc: 'Door lock jammed or key snapped inside latch'
    }
  ];

  const handleTriggerSOS = () => {
    setSosActive(true);

    setTimeout(() => {
      setDispatchedWorker({
        name: 'Ramesh Kumar Verma',
        role: 'Certified Emergency Responder',
        society: 'South Delhi Labour Cooperative Federation #402',
        phone: '+91 98765 43210',
        etaMinutes: 12,
        photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80'
      });
      onConfirmSOS();
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px', border: '3px solid #DC2626' }}>
        <div className="modal-header" style={{ background: '#FEF2F2', borderBottom: '1px solid #FCA5A5' }}>
          <div className="modal-title" style={{ color: '#991B1B' }}>
            <span>🚨 1-Click SOS Emergency Service Booking</span>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {!sosActive ? (
            <>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Broadcast urgent crisis to nearest standby certified cooperative workers with 15-minute response guarantee.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {emergencyTypes.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '12px',
                      border: selectedEmergency === item.id ? '2px solid #DC2626' : '1px solid var(--card-border)',
                      background: selectedEmergency === item.id ? '#FEF2F2' : 'var(--card-bg)',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                    onClick={() => setSelectedEmergency(item.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: selectedEmergency === item.id ? '#991B1B' : 'var(--text-main)' }}>
                        {item.title}
                      </h4>
                      <span style={{ background: '#DC2626', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800 }}>
                        {item.sla}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                ))}
              </div>

              <button
                className="sos-trigger-btn"
                style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.1rem' }}
                onClick={handleTriggerSOS}
              >
                BROADCAST URGENT SOS DISPATCH NOW 🚨
              </button>
            </>
          ) : !dispatchedWorker ? (
            /* Scanning Radar State */
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div className="map-radar-circle" style={{ margin: '0 auto 1.5rem auto', borderColor: '#DC2626' }}></div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#991B1B', marginBottom: '0.5rem' }}>
                📡 Broadcasting Emergency SOS Signal...
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Matching nearby verified standby workers within 3 km radius...
              </p>
            </div>
          ) : (
            /* Dispatched Worker Confirmation State */
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                background: '#FEF2F2',
                border: '2px solid #FCA5A5',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{ background: '#DC2626', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800 }}>
                  🚨 EMERGENCY RESPONDER EN ROUTE
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.25rem', textAlign: 'left' }}>
                  <img src={dispatchedWorker.photo} alt={dispatchedWorker.name} className="worker-avatar" style={{ width: '70px', height: '70px', border: '3px solid #DC2626' }} />
                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{dispatchedWorker.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{dispatchedWorker.role}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>🏛️ {dispatchedWorker.society}</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed #FCA5A5' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Arrival</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#991B1B' }}>⏱️ {dispatchedWorker.etaMinutes} Mins</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Emergency Helpline</span>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>📞 {dispatchedWorker.phone}</div>
                  </div>
                </div>
              </div>

              <button className="btn-primary" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
                Track Live GPS Location
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

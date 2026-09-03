// WorkerDashboard Component - Sahakar Gig Platform (SIH26089)
const { useState } = React;
import { SAMPLE_WORKERS } from '../mockData.js';

export default function WorkerDashboard() {
  const [workerState, setWorkerState] = useState(SAMPLE_WORKERS[0]);
  const [standbyActive, setStandbyActive] = useState(true);
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' | 'earnings' | 'welfare' | 'idcard'

  const [jobRequests, setJobRequests] = useState([
    {
      id: 'REQ-501',
      serviceName: 'Emergency Electrical MCB Trip Fix',
      customerName: 'Anil Agarwal',
      address: 'C-14, Hauz Khas Enclave, New Delhi',
      distance: '1.4 km away',
      estimatedPayout: '₹450',
      timeSlot: 'Immediate (Instant SOS)',
      status: 'Pending'
    },
    {
      id: 'REQ-502',
      serviceName: 'Complete House Wiring Audit',
      customerName: 'Meenakshi Sundaram',
      address: 'Flat 402, Safdarjung Enclave, New Delhi',
      distance: '2.1 km away',
      estimatedPayout: '₹850',
      timeSlot: 'Tomorrow, 11:00 AM',
      status: 'Pending'
    }
  ]);

  const handleAcceptJob = (reqId) => {
    setJobRequests(prev => prev.map(job => job.id === reqId ? { ...job, status: 'Accepted' } : job));
  };

  const handleDeclineJob = (reqId) => {
    setJobRequests(prev => prev.filter(job => job.id !== reqId));
  };

  return (
    <div className="container section-wrapper">
      {/* Worker Top Profile Header */}
      <div className="welfare-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img src={workerState.photo} alt={workerState.name} className="worker-avatar" style={{ width: '80px', height: '80px', border: '3px solid #F59E0B' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{workerState.name}</h2>
                <span className="verified-badge-pill">✓ Govt Certified</span>
              </div>
              <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>
                {workerState.role} • <strong>{workerState.society}</strong> ({workerState.societyRegNo})
              </p>
              <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.25rem' }}>
                ⭐ {workerState.rating} Rating • {workerState.completedJobs} Jobs Completed • {workerState.experience} Experience
              </div>
            </div>
          </div>

          {/* Standby SOS Mode Toggle */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.12)',
            padding: '1rem',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.9, fontWeight: 700, marginBottom: '0.5rem' }}>
              🚨 Emergency Standby Status:
            </div>
            <button
              style={{
                background: standbyActive ? '#10B981' : '#64748B',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onClick={() => setStandbyActive(!standbyActive)}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }}></span>
              {standbyActive ? 'Active on Emergency Radar' : 'Offline'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Navigation */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.75rem' }}>
        <button 
          className={`role-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          📥 Live Job Requests ({jobRequests.length})
        </button>
        <button 
          className={`role-btn ${activeTab === 'earnings' ? 'active' : ''}`}
          onClick={() => setActiveTab('earnings')}
        >
          💰 Transparent Earnings & Dividend
        </button>
        <button 
          className={`role-btn ${activeTab === 'welfare' ? 'active' : ''}`}
          onClick={() => setActiveTab('welfare')}
        >
          🛡️ Social Security & Health Insurance
        </button>
        <button 
          className={`role-btn ${activeTab === 'idcard' ? 'active' : ''}`}
          onClick={() => setActiveTab('idcard')}
        >
          🪪 Digital Cooperative ID Card
        </button>
      </div>

      {/* Tab 1: Live Job Requests */}
      {activeTab === 'jobs' && (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            Incoming Service Calls Near You
          </h3>

          {jobRequests.map((req) => (
            <div key={req.id} style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ background: '#FEF3C7', color: '#D97706', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                    {req.timeSlot}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>📍 {req.distance}</span>
                </div>

                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.2rem 0' }}>{req.serviceName}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Customer: <strong>{req.customerName}</strong> | {req.address}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--secondary)' }}>
                  {req.estimatedPayout} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Direct Worker Share)</span>
                </div>

                {req.status === 'Pending' ? (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => handleAcceptJob(req.id)}>
                      Accept Job ✓
                    </button>
                    <button className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem', color: '#DC2626' }} onClick={() => handleDeclineJob(req.id)}>
                      Decline
                    </button>
                  </div>
                ) : (
                  <div style={{ background: '#ECFDF5', color: '#047857', padding: '6px 14px', borderRadius: '8px', fontWeight: 800, fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    ✓ Job Accepted • En Route
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Earnings Ledger */}
      {activeTab === 'earnings' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>This Month Direct Earnings</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', margin: '0.5rem 0' }}>₹38,450</div>
              <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>+18% vs private platform average</div>
            </div>

            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Accumulated Society Dividend</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)', margin: '0.5rem 0' }}>₹4,200</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Annual patronage rebate share</div>
            </div>

            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Welfare & Insurance Contribution</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', margin: '0.5rem 0' }}>₹2,150</div>
              <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>Auto-funded via 5% client contribution</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Social Security & Welfare Insurance */}
      {activeTab === 'welfare' && (
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>
            Integrated Social Security & Health Shield
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ border: '1px solid #A7F3D0', background: '#ECFDF5', padding: '1.25rem', borderRadius: '12px' }}>
              <h4 style={{ color: '#065F46', fontWeight: 800 }}>🛡️ PM Suraksha Bima Yojana (Accident Cover)</h4>
              <p style={{ fontSize: '0.85rem', color: '#047857', margin: '0.5rem 0' }}>
                Coverage: <strong>₹2,00,000</strong> | Status: <span style={{ fontWeight: 800 }}>ACTIVE</span>
              </p>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Policy #: PM-Suraksha-Bima #8839201</div>
            </div>

            <div style={{ border: '1px solid #BFDBFE', background: '#EFF6FF', padding: '1.25rem', borderRadius: '12px' }}>
              <h4 style={{ color: '#1E40AF', fontWeight: 800 }}>🩺 Sahakar Medical Health Insurance</h4>
              <p style={{ fontSize: '0.85rem', color: '#1E3A8A', margin: '0.5rem 0' }}>
                Coverage: <strong>₹5,00,000 Cashless Hospitalization</strong>
              </p>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Cooperative Mutual Fund #DL-90214</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Digital ID Card */}
      {activeTab === 'idcard' && (
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0F2C59, #1E3A8A)',
            color: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: 'var(--shadow-lg)',
            border: '3px solid #F59E0B'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#F59E0B', fontWeight: 800 }}>MINISTRY OF COOPERATION</h4>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Labour Cooperative Official Worker ID</div>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>सहकार</div>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <img src={workerState.photo} alt={workerState.name} style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover', border: '2px solid white' }} />
              <div style={{ fontSize: '0.85rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{workerState.name}</h3>
                <div>Skill: <strong>{workerState.role}</strong></div>
                <div>Society: <strong>{workerState.society}</strong></div>
                <div>Reg No: <strong>{workerState.societyRegNo}</strong></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed rgba(255, 255, 255, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                ✓ Police Verified<br />
                ✓ Aadhaar Biometric Authenticated
              </div>

              <div style={{ background: 'white', color: 'black', padding: '6px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 800, textAlign: 'center' }}>
                [QR CODE VERIFY]
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

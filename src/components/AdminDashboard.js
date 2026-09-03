// AdminDashboard Component - Sahakar Gig Platform (SIH26089)
const { useState } = React;
import { PENDING_VERIFICATIONS, FEDERATION_STATS } from '../mockData.js';

export default function AdminDashboard() {
  const [verifications, setVerifications] = useState(PENDING_VERIFICATIONS);
  const [activeTab, setActiveTab] = useState('verification'); // 'verification' | 'societies' | 'welfare'

  const handleApproveWorker = (id) => {
    setVerifications(prev => prev.filter(v => v.id !== id));
    alert('Worker application approved! Digital Certificate & Cooperative Badge issued.');
  };

  const handleRejectWorker = (id) => {
    setVerifications(prev => prev.filter(v => v.id !== id));
  };

  return (
    <div className="container section-wrapper">
      {/* Admin Title Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0F2C59, #1E293B)',
        color: 'white',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#F59E0B', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Ministry of Cooperation • State Federation Governance Panel
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Labour Cooperative Federation Dashboard</h2>
            <p style={{ opacity: 0.8, fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Monitoring worker verification, society registrations, fair-wage compliance, and social security funds.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '12px 20px', borderRadius: '12px', textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Active Federation Region</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10B981' }}>Delhi NCR Sector #04</div>
          </div>
        </div>
      </div>

      {/* Admin Metric Cards */}
      <div className="stats-card-grid" style={{ marginBottom: '2.5rem' }}>
        <div className="stat-item">
          <div className="stat-icon">👥</div>
          <div>
            <div className="stat-val">{FEDERATION_STATS.totalRegisteredWorkers.toLocaleString()}</div>
            <div className="stat-label">Total Verified Workers</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">🏛️</div>
          <div>
            <div className="stat-val">{FEDERATION_STATS.activeSocieties}</div>
            <div className="stat-label">Affiliated Societies</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">📜</div>
          <div>
            <div className="stat-val">{verifications.length}</div>
            <div className="stat-label">Pending Verification Queue</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">🛡️</div>
          <div>
            <div className="stat-val">{FEDERATION_STATS.welfareFundBalance}</div>
            <div className="stat-label">Accumulated Welfare Pool</div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.75rem' }}>
        <button 
          className={`role-btn ${activeTab === 'verification' ? 'active' : ''}`}
          onClick={() => setActiveTab('verification')}
        >
          🔍 Worker Verification Queue ({verifications.length})
        </button>
        <button 
          className={`role-btn ${activeTab === 'societies' ? 'active' : ''}`}
          onClick={() => setActiveTab('societies')}
        >
          🏛️ Registered Cooperative Societies
        </button>
        <button 
          className={`role-btn ${activeTab === 'welfare' ? 'active' : ''}`}
          onClick={() => setActiveTab('welfare')}
        >
          📊 Fair-Wage & Welfare Governance Metrics
        </button>
      </div>

      {/* Verification Queue Tab */}
      {activeTab === 'verification' && (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            Worker Certification & Background Review Pipeline
          </h3>

          {verifications.map((item) => (
            <div key={item.id} style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '1rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{item.name}</h4>
                    <span style={{ background: '#FEF3C7', color: '#D97706', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>
                      {item.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Skill: <strong>{item.role}</strong> | Society: <strong>{item.society}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', marginTop: '0.75rem' }}>
                    <span style={{ color: item.aadharVerified ? '#059669' : '#DC2626', fontWeight: 700 }}>
                      ✓ Aadhaar Biometric Linked
                    </span>
                    <span style={{ textDecoration: 'underline', color: 'var(--primary)', cursor: 'pointer' }}>
                      📄 {item.policeVerificationDoc}
                    </span>
                    <span style={{ textDecoration: 'underline', color: 'var(--primary)', cursor: 'pointer' }}>
                      🎓 {item.skillCertificateDoc}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.875rem' }} onClick={() => handleApproveWorker(item.id)}>
                    Approve & Issue ID ✓
                  </button>
                  <button className="btn-secondary" style={{ padding: '10px 16px', fontSize: '0.875rem', color: '#DC2626' }} onClick={() => handleRejectWorker(item.id)}>
                    Reject Application
                  </button>
                </div>
              </div>
            </div>
          ))}

          {verifications.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              ✓ All pending worker applications have been processed and verified!
            </div>
          )}
        </div>
      )}

      {/* Registered Societies Tab */}
      {activeTab === 'societies' && (
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            Affiliated Labour Cooperative Societies Directory
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--card-border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px' }}>Society Name</th>
                <th style={{ padding: '10px' }}>Reg Number</th>
                <th style={{ padding: '10px' }}>Workers Enrolled</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                <td style={{ padding: '12px 10px', fontWeight: 700 }}>South Delhi Labour Cooperative Federation #402</td>
                <td style={{ padding: '12px 10px' }}>ND-LAB-2018-992</td>
                <td style={{ padding: '12px 10px', fontWeight: 700 }}>1,240 Workers</td>
                <td style={{ padding: '12px 10px', color: '#059669', fontWeight: 800 }}>✓ Verified Active</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                <td style={{ padding: '12px 10px', fontWeight: 700 }}>Mahila Utthan Sahakari Samiti #108</td>
                <td style={{ padding: '12px 10px' }}>DL-WOM-2020-112</td>
                <td style={{ padding: '12px 10px', fontWeight: 700 }}>890 Workers</td>
                <td style={{ padding: '12px 10px', color: '#059669', fontWeight: 800 }}>✓ Verified Active</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 10px', fontWeight: 700 }}>Capital Labour Construction & Maintenance Society</td>
                <td style={{ padding: '12px 10px' }}>DL-LAB-2016-044</td>
                <td style={{ padding: '12px 10px', fontWeight: 700 }}>2,150 Workers</td>
                <td style={{ padding: '12px 10px', color: '#059669', fontWeight: 800 }}>✓ Verified Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Welfare Governance Tab */}
      {activeTab === 'welfare' && (
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            Fair-Wage Enforcement & Anti-Exploitation Compliance
          </h3>

          <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1.5rem', borderRadius: '12px', color: '#065F46' }}>
            <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>✓ Zero Intermediary Commission Standard</h4>
            <p style={{ fontSize: '0.9rem' }}>
              Unlike commercial gig aggregators charging 25%-35% commission with zero health benefits, Sahakar Gig Platform enforces a maximum 5% platform operations fee, disbursing 90% directly to worker bank accounts and reserving 5% for social welfare & medical insurance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

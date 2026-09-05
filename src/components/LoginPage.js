// LoginPage Component - Sahakar GIG Platform / CoopServe (SIH26089)
const { useState } = React;

export default function LoginPage({ onLogin, onEmergencyDirect }) {
  // Active Role Tab: 'customer' | 'society'
  const [activeTab, setActiveTab] = useState('customer');

  // Customer Login Form States
  const [custMethod, setCustMethod] = useState('otp'); // 'otp' | 'email'
  const [custMobile, setCustMobile] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPassword, setCustPassword] = useState('');
  const [showCustPassword, setShowCustPassword] = useState(false);
  const [custOtpSent, setCustOtpSent] = useState(false);
  const [custOtp, setCustOtp] = useState('');

  // Society Login Form States
  const [societyEmail, setSocietyEmail] = useState('');
  const [societyPassword, setSocietyPassword] = useState('');
  const [showSocietyPassword, setShowSocietyPassword] = useState(false);

  // Google Login Handler
  const handleGoogleLogin = (role) => {
    const defaultUser = role === 'admin' 
      ? { name: 'Federation Officer', email: 'officer@sahakar.coop', role: 'admin' }
      : { name: 'Pooja Verma', email: 'pooja.verma@gmail.com', role: 'customer' };
    onLogin(defaultUser, role);
  };

  // Customer Login Submit
  const handleCustomerSubmit = (e) => {
    if (e) e.preventDefault();
    const user = {
      name: custEmail ? custEmail.split('@')[0] : 'Suresh Kumar',
      email: custEmail || (custMobile ? `${custMobile}@sahakargig.in` : 'resident@sahakargig.in'),
      role: 'customer'
    };
    onLogin(user, 'customer');
  };

  // Society / Admin Login Submit
  const handleSocietySubmit = (e) => {
    if (e) e.preventDefault();
    const user = {
      name: societyEmail ? societyEmail.split('@')[0] : 'Delhi State Federation',
      email: societyEmail || 'admin@sahakar.coop',
      role: 'admin'
    };
    onLogin(user, 'admin');
  };

  return (
    <div style={{
      height: '100vh',
      maxHeight: '100vh',
      background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 50%, #EFF6FF 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      overflow: 'hidden',
      paddingBottom: '0.4rem',
      boxSizing: 'border-box'
    }}>
      {/* 1. Top Government & SIH Banner (Compact) */}
      <div className="govt-banner" style={{ padding: '0.3rem 1rem', fontSize: '0.73rem', flexShrink: 0 }}>
        <div className="container govt-banner-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span>🇮🇳 Ministry of Cooperation | Govt of India</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span>Labour Cooperative Marketplace Platform</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="sih-badge-pill" style={{ padding: '2px 8px', fontSize: '0.68rem' }}>SIH 2026: SIH26089</span>
            <span style={{ opacity: 0.9 }}>Toll Free: 1800-11-SAHAKAR</span>
          </div>
        </div>
      </div>

      {/* 2. Main Header Branding (Compact) */}
      <div style={{ textAlign: 'center', padding: '0.4rem 1rem 0.1rem 1rem', flexShrink: 0 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="emblem-badge" style={{
            width: '42px',
            height: '42px',
            fontSize: '1.2rem',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0F2C59, #1E40AF)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            boxShadow: '0 4px 12px rgba(15, 44, 89, 0.2)',
            border: '2px solid #F59E0B'
          }}>
            सह
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.55rem', fontWeight: 900, color: '#0F2C59', margin: 0, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                सहकार GIG
              </h1>
              <span style={{
                background: '#ECFDF5',
                color: '#047857',
                padding: '2px 8px',
                borderRadius: '8px',
                fontSize: '0.65rem',
                fontWeight: 800,
                border: '1px solid #A7F3D0'
              }}>VERIFIED COOPERATIVE</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
              Trusted Services. Fair Wages. Stronger Communities.
            </span>
          </div>
        </div>
      </div>

      {/* 3. Single Centered Tabbed Login Card */}
      <div className="container" style={{ maxWidth: '480px', width: '100%', margin: '0 auto', padding: '0 1rem', flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{
          background: 'white',
          borderRadius: '18px',
          border: '1.5px solid #CBD5E1',
          boxShadow: '0 10px 30px rgba(15, 44, 89, 0.08), 0 4px 12px rgba(0,0,0,0.02)',
          padding: '1.25rem 1.6rem',
          width: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Top Color Accent Line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: activeTab === 'customer' 
              ? 'linear-gradient(90deg, #1D4ED8, #3B82F6)'
              : 'linear-gradient(90deg, #0F2C59, #059669)'
          }}></div>

          {/* TAB SWITCHER: CUSTOMER LOGIN vs COOPERATIVE SOCIETY */}
          <div style={{
            display: 'flex',
            background: '#F1F5F9',
            borderRadius: '10px',
            padding: '3px',
            marginBottom: '0.9rem',
            border: '1px solid #E2E8F0'
          }}>
            <button
              type="button"
              onClick={() => setActiveTab('customer')}
              style={{
                flex: 1,
                padding: '0.5rem 0.4rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'customer' ? 'white' : 'transparent',
                color: activeTab === 'customer' ? '#1D4ED8' : '#64748B',
                fontWeight: activeTab === 'customer' ? 800 : 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'customer' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <span>👤</span>
              <span>Customer Login</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('society')}
              style={{
                flex: 1,
                padding: '0.5rem 0.4rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'society' ? 'white' : 'transparent',
                color: activeTab === 'society' ? '#0F2C59' : '#64748B',
                fontWeight: activeTab === 'society' ? 800 : 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'society' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <span>🏛️</span>
              <span>Cooperative Society</span>
            </button>
          </div>

          {/* TAB 1: CUSTOMER LOGIN */}
          {activeTab === 'customer' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F2C59', margin: 0 }}>
                    Customer Login
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: '#64748B', margin: '1px 0 0 0' }}>
                    Book trusted home & community services
                  </p>
                </div>

                {/* Method Switcher */}
                <div style={{ display: 'flex', gap: '2px', background: '#F8FAFC', padding: '2px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <button
                    type="button"
                    onClick={() => setCustMethod('otp')}
                    style={{
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: custMethod === 'otp' ? '#1D4ED8' : 'transparent',
                      color: custMethod === 'otp' ? 'white' : '#64748B'
                    }}
                  >
                    OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustMethod('email')}
                    style={{
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: 'none',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: custMethod === 'email' ? '#1D4ED8' : 'transparent',
                      color: custMethod === 'email' ? 'white' : '#64748B'
                    }}
                  >
                    Email
                  </button>
                </div>
              </div>

              {/* Mobile OTP Sub-form */}
              {custMethod === 'otp' ? (
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.25rem' }}>
                    Mobile Number
                  </label>
                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.45rem' }}>
                    <div style={{
                      padding: '0.5rem 0.7rem',
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#334155',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      +91 🇮🇳
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      maxLength="10"
                      value={custMobile}
                      onChange={(e) => setCustMobile(e.target.value.replace(/\D/g, ''))}
                      style={{
                        flex: 1,
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.82rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {custOtpSent && (
                    <div style={{ marginBottom: '0.45rem' }}>
                      <input
                        type="text"
                        placeholder="Enter 4-digit OTP (demo: 5291)"
                        maxLength="6"
                        value={custOtp}
                        onChange={(e) => setCustOtp(e.target.value)}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          border: '1.5px solid #1D4ED8',
                          fontSize: '0.82rem',
                          outline: 'none',
                          background: '#EFF6FF'
                        }}
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (!custMobile || custMobile.length < 10) {
                        alert('Please enter a valid 10-digit mobile number.');
                        return;
                      }
                      if (!custOtpSent) {
                        setCustOtpSent(true);
                        alert('Demo OTP sent: 5291');
                      } else {
                        onLogin({ name: `Resident (${custMobile})`, phone: custMobile, role: 'customer' }, 'customer');
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      background: 'linear-gradient(135deg, #1D4ED8, #2563EB)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      boxShadow: '0 3px 8px rgba(29, 78, 216, 0.25)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {custOtpSent ? 'Verify OTP & Enter' : 'Send OTP'}
                  </button>
                </div>
              ) : (
                /* Email & Password Sub-form */
                <form onSubmit={handleCustomerSubmit}>
                  <div style={{ marginBottom: '0.4rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.15rem' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={custEmail}
                      onChange={(e) => setCustEmail(e.target.value)}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.82rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '0.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.15rem' }}>
                      Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showCustPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={custPassword}
                        onChange={(e) => setCustPassword(e.target.value)}
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '0.5rem 2rem 0.5rem 0.75rem',
                          borderRadius: '8px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.82rem',
                          outline: 'none'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCustPassword(!showCustPassword)}
                        style={{
                          position: 'absolute',
                          right: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          opacity: 0.7
                        }}
                      >
                        {showCustPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginBottom: '0.4rem' }}>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your email.'); }} style={{ fontSize: '0.7rem', color: '#1D4ED8', textDecoration: 'none', fontWeight: 600 }}>
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      background: '#0F2C59',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      boxShadow: '0 3px 8px rgba(15, 44, 89, 0.2)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Login as Customer →
                  </button>
                </form>
              )}

              {/* Google Login Button */}
              <button
                type="button"
                onClick={() => handleGoogleLogin('customer')}
                style={{
                  width: '100%',
                  padding: '0.48rem',
                  background: 'white',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  color: '#1E293B',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  marginBottom: '0.5rem'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>


              {/* Create Account Link */}
              <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#64748B', borderTop: '1px solid #F1F5F9', paddingTop: '0.35rem' }}>
                New here?{' '}
                <a href="#register" onClick={(e) => { e.preventDefault(); onLogin({ name: 'New Resident', role: 'customer' }, 'customer'); }} style={{ color: '#1D4ED8', fontWeight: 800, textDecoration: 'none' }}>
                  Create Account
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: COOPERATIVE SOCIETY LOGIN */}
          {activeTab === 'society' && (
            <div>
              <div style={{ marginBottom: '0.65rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F2C59', margin: 0 }}>
                  Cooperative Society Login
                </h3>
                <p style={{ fontSize: '0.72rem', color: '#64748B', margin: '1px 0 0 0' }}>
                  Manage workers, service orders & welfare fund
                </p>
              </div>

              <form onSubmit={handleSocietySubmit}>
                <div style={{ marginBottom: '0.4rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.15rem' }}>
                    Email ID or Society Reg Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DL-LAB-2018-992 or admin@sahakar.coop"
                    value={societyEmail}
                    onChange={(e) => setSocietyEmail(e.target.value)}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '8px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.82rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '0.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.15rem' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showSocietyPassword ? 'text' : 'password'}
                      placeholder="Enter society password"
                      value={societyPassword}
                      onChange={(e) => setSocietyPassword(e.target.value)}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '0.5rem 2rem 0.5rem 0.75rem',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.82rem',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSocietyPassword(!showSocietyPassword)}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        opacity: 0.7
                      }}
                    >
                      {showSocietyPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginBottom: '0.4rem' }}>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Call 1800-11-SAHAKAR for password reset.'); }} style={{ fontSize: '0.7rem', color: '#1D4ED8', textDecoration: 'none', fontWeight: 600 }}>
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    background: 'linear-gradient(135deg, #0F2C59, #1D4ED8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    boxShadow: '0 3px 8px rgba(15, 44, 89, 0.25)',
                    marginBottom: '0.5rem'
                  }}
                >
                  Login as Cooperative Society →
                </button>
              </form>

              {/* Google Workspace Button */}
              <button
                type="button"
                onClick={() => handleGoogleLogin('admin')}
                style={{
                  width: '100%',
                  padding: '0.48rem',
                  background: 'white',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  color: '#1E293B',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  marginBottom: '0.5rem'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Google Workspace Sign in</span>
              </button>


              {/* Register Society Link */}
              <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#64748B', borderTop: '1px solid #F1F5F9', paddingTop: '0.35rem' }}>
                New Cooperative Society?{' '}
                <a href="#register-society" onClick={(e) => { e.preventDefault(); onLogin({ name: 'Affiliated Society Admin', role: 'admin' }, 'admin'); }} style={{ color: '#0F2C59', fontWeight: 800, textDecoration: 'none' }}>
                  Register Now
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Urgent Emergency Booking Bar (Directly below Login Card) */}
      <div className="container" style={{ maxWidth: '980px', width: '100%', margin: '0.2rem auto', padding: '0 1rem', flexShrink: 0 }}>
        <div style={{
          background: 'linear-gradient(135deg, #FEF2F2, #FFF1F2)',
          border: '1.5px solid #FECDD3',
          borderRadius: '12px',
          padding: '0.5rem 1.2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 3px 10px rgba(220, 38, 38, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#FEE2E2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              flexShrink: 0
            }}>
              🚨
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#991B1B', fontSize: '0.82rem', lineHeight: 1.1 }}>
                Need Urgent Emergency Service?
              </div>
              <div style={{ fontSize: '0.68rem', color: '#7F1D1D' }}>
                Book verified emergency workers instantly without logging in.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => onEmergencyDirect('⚡ Emergency Short Circuit / MCB Trip')}
              style={{
                background: 'white',
                border: '1px solid #FCA5A5',
                padding: '4px 10px',
                borderRadius: '14px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#B91C1C',
                cursor: 'pointer'
              }}
            >
              ⚡ Electrician
            </button>
            <button
              type="button"
              onClick={() => onEmergencyDirect('🚰 Water Pipe Burst / Leakage')}
              style={{
                background: 'white',
                border: '1px solid #FCA5A5',
                padding: '4px 10px',
                borderRadius: '14px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#B91C1C',
                cursor: 'pointer'
              }}
            >
              🚰 Plumber
            </button>
            <button
              type="button"
              onClick={() => onEmergencyDirect(null)}
              style={{
                background: 'linear-gradient(135deg, #DC2626, #B91C1C)',
                color: 'white',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.78rem',
                cursor: 'pointer',
                boxShadow: '0 3px 8px rgba(220, 38, 38, 0.3)',
                whiteSpace: 'nowrap'
              }}
            >
              Book Now (Without Login) ⚡
            </button>
          </div>
        </div>
      </div>

      {/* 5. Minimal Footer Note */}
      <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: '0.68rem', flexShrink: 0 }}>
        © 2026 Ministry of Cooperation, Govt of India • Labour Cooperative Digital Marketplace (SIH26089)
      </div>
    </div>
  );
}

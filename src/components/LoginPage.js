// LoginPage Component - Sahakar GIG Platform (SIH26089)
const { useState } = React;

export default function LoginPage({ onLogin, onEmergencyDirect }) {
  // Customer Login Form States
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
    e.preventDefault();
    const user = {
      name: custEmail ? custEmail.split('@')[0] : 'Suresh Kumar',
      email: custEmail || `${custMobile}@sahakargig.in`,
      role: 'customer'
    };
    onLogin(user, 'customer');
  };

  // Society / Admin Login Submit
  const handleSocietySubmit = (e) => {
    e.preventDefault();
    const user = {
      name: societyEmail ? societyEmail.split('@')[0] : 'Delhi State Federation',
      email: societyEmail || 'admin@sahakar.coop',
      role: 'admin'
    };
    onLogin(user, 'admin');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Top Government & SIH Banner */}
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

      {/* Main Branding Header */}
      <div style={{ textAlign: 'center', padding: '2.5rem 1rem 1.5rem 1rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div className="emblem-badge" style={{ width: '52px', height: '52px', fontSize: '1.4rem' }}>
            सह
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#0F2C59', margin: 0, letterSpacing: '-0.5px' }}>
                सहकार GIG
              </h1>
              <span style={{
                background: '#ECFDF5',
                color: '#047857',
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 800,
                border: '1px solid #A7F3D0'
              }}>VERIFIED COOPERATIVE</span>
            </div>
            <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>
              COOPERATIVE HOUSEHOLD & COMMUNITY SERVICES PLATFORM
            </span>
          </div>
        </div>
        <p style={{ fontSize: '0.95rem', color: '#475569', fontWeight: 600, marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          Trusted Services. Fair Wages. Stronger Communities.
        </p>

        <div style={{ display: 'inline-block' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F2C59', margin: 0 }}>
            Welcome to Sahakar GIG
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
            <span style={{ height: '1px', width: '40px', background: '#CBD5E1' }}></span>
            <span style={{ fontSize: '0.9rem', color: '#64748B' }}>Login to continue</span>
            <span style={{ height: '1px', width: '40px', background: '#CBD5E1' }}></span>
          </div>
        </div>
      </div>

      {/* Dual Login Container */}
      <div className="container" style={{ maxWidth: '1080px', margin: '0 auto 2.5rem auto', padding: '0 1rem', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'stretch',
          position: 'relative'
        }}>

          {/* CARD 1: CUSTOMER LOGIN (BLUE THEME) */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            border: '1.5px solid #BFDBFE',
            padding: '2rem 2.2rem',
            boxShadow: '0 10px 30px rgba(15, 44, 89, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Top Accent Stripe */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #1D4ED8, #3B82F6)' }}></div>

            <div>
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1D4ED8, #2563EB)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  boxShadow: '0 6px 16px rgba(29, 78, 216, 0.25)',
                  flexShrink: 0
                }}>
                  👤
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F2C59', margin: 0 }}>
                    Customer Login
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0.2rem 0 0 0' }}>
                    Book trusted services for your home quickly and easily.
                  </p>
                </div>
              </div>

              {/* Illustration Visual */}
              <div style={{
                background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
                borderRadius: '16px',
                padding: '1rem',
                textAlign: 'center',
                marginBottom: '1.5rem',
                border: '1px solid #BFDBFE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}>
                <div style={{ fontSize: '2.5rem' }}>🏡</div>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  border: '1px solid #93C5FD',
                  textAlign: 'left',
                  fontSize: '0.75rem'
                }}>
                  <div style={{ fontWeight: 800, color: '#1D4ED8' }}>📱 Sahakar Services App</div>
                  <div style={{ color: '#64748B' }}>⚡ Electrician • 🚰 Plumber</div>
                  <div style={{ color: '#059669', fontWeight: 700, marginTop: '2px' }}>✓ 15-min instant dispatch</div>
                </div>
              </div>

              {/* Mobile OTP Section */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.4rem' }}>
                  Mobile Number
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{
                    padding: '0.75rem 0.9rem',
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#334155'
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
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1D4ED8'}
                    onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
                  />
                </div>

                {custOtpSent && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <input
                      type="text"
                      placeholder="Enter 4-digit OTP (e.g. 5291)"
                      maxLength="6"
                      value={custOtp}
                      onChange={(e) => setCustOtp(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '1.5px solid #1D4ED8',
                        fontSize: '0.9rem',
                        outline: 'none',
                        background: '#EFF6FF',
                        marginBottom: '0.5rem'
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
                      onLogin({ name: `User (${custMobile})`, phone: custMobile, role: 'customer' }, 'customer');
                    }
                  }}
                  style={{
                    width: '100%',
                    marginTop: '0.6rem',
                    padding: '0.8rem',
                    background: 'linear-gradient(135deg, #1D4ED8, #2563EB)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(29, 78, 216, 0.25)',
                    transition: 'all 0.2s'
                  }}
                >
                  {custOtpSent ? 'Verify OTP & Enter' : 'Send OTP'}
                </button>
              </div>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.25rem 0' }}>
                <span style={{ flex: 1, height: '1px', background: '#E2E8F0' }}></span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 800 }}>OR LOGIN WITH EMAIL</span>
                <span style={{ flex: 1, height: '1px', background: '#E2E8F0' }}></span>
              </div>

              {/* Email & Password Form */}
              <form onSubmit={handleCustomerSubmit}>
                <div style={{ marginBottom: '0.9rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.3rem' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>✉️</span>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={custEmail}
                      onChange={(e) => setCustEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '0.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.3rem' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>🔒</span>
                    <input
                      type={showCustPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={custPassword}
                      onChange={(e) => setCustPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCustPassword(!showCustPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        opacity: 0.7
                      }}
                    >
                      {showCustPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered contact.'); }} style={{ fontSize: '0.8rem', color: '#1D4ED8', textDecoration: 'none', fontWeight: 600 }}>
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    background: '#0F2C59',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(15, 44, 89, 0.3)',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>Login as Customer</span>
                  <span>→</span>
                </button>
              </form>

              {/* Google Login Option */}
              <div style={{ marginTop: '0.9rem' }}>
                <button
                  type="button"
                  onClick={() => handleGoogleLogin('customer')}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'white',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#1E293B',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#1D4ED8'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#CBD5E1'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>

            {/* Bottom Register Link */}
            <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', fontSize: '0.85rem', color: '#64748B' }}>
              New here?{' '}
              <a href="#register" onClick={(e) => { e.preventDefault(); onLogin({ name: 'New Resident', role: 'customer' }, 'customer'); }} style={{ color: '#1D4ED8', fontWeight: 800, textDecoration: 'none' }}>
                Create Account
              </a>
            </div>
          </div>

          {/* CARD 2: COOPERATIVE SOCIETY / FEDERATION LOGIN (BLUE THEME) */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            border: '1.5px solid #93C5FD',
            padding: '2rem 2.2rem',
            boxShadow: '0 10px 30px rgba(15, 44, 89, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Top Accent Stripe */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #0F2C59, #1D4ED8)' }}></div>

            <div>
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0F2C59, #1E40AF)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  boxShadow: '0 6px 16px rgba(15, 44, 89, 0.25)',
                  flexShrink: 0
                }}>
                  🏛️
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F2C59', margin: 0 }}>
                    Cooperative Society Login
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0.2rem 0 0 0' }}>
                    Manage your workers, services and bookings in one place.
                  </p>
                </div>
              </div>

              {/* Illustration Visual */}
              <div style={{
                background: 'linear-gradient(135deg, #EFF6FF, #E0E7FF)',
                borderRadius: '16px',
                padding: '1rem',
                textAlign: 'center',
                marginBottom: '1.5rem',
                border: '1px solid #BFDBFE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}>
                <div style={{ fontSize: '2.5rem' }}>🏢</div>
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  border: '1px solid #93C5FD',
                  textAlign: 'left',
                  fontSize: '0.75rem'
                }}>
                  <div style={{ fontWeight: 800, color: '#0F2C59' }}>📊 Federation Admin Portal</div>
                  <div style={{ color: '#64748B' }}>14,850 Workers • 108 Societies</div>
                  <div style={{ color: '#1D4ED8', fontWeight: 700, marginTop: '2px' }}>₹3.82 Cr Welfare Pool</div>
                </div>
              </div>

              {/* Society Credentials Form */}
              <form onSubmit={handleSocietySubmit}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.4rem' }}>
                    Email ID or Society Registration Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>✉️</span>
                    <input
                      type="text"
                      placeholder="e.g. DL-LAB-2018-992 or admin@sahakar.coop"
                      value={societyEmail}
                      onChange={(e) => setSocietyEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '0.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.4rem' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }}>🔒</span>
                    <input
                      type={showSocietyPassword ? 'text' : 'password'}
                      placeholder="Enter society password"
                      value={societyPassword}
                      onChange={(e) => setSocietyPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSocietyPassword(!showSocietyPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        opacity: 0.7
                      }}
                    >
                      {showSocietyPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginBottom: '1.25rem' }}>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Contact your State Cooperative Registrar or use 1800-11-SAHAKAR for password reset.'); }} style={{ fontSize: '0.8rem', color: '#1D4ED8', textDecoration: 'none', fontWeight: 600 }}>
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    background: 'linear-gradient(135deg, #0F2C59, #1D4ED8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(15, 44, 89, 0.3)',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>Login as Cooperative Society</span>
                  <span>→</span>
                </button>
              </form>

              {/* Google Workspace Login Option */}
              <div style={{ marginTop: '0.9rem' }}>
                <button
                  type="button"
                  onClick={() => handleGoogleLogin('admin')}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'white',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#1E293B',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#0F2C59'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#CBD5E1'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Sign in with Google Workspace</span>
                </button>
              </div>
            </div>

            {/* Bottom Society Register Link */}
            <div style={{ textAlign: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', fontSize: '0.85rem', color: '#64748B' }}>
              New Cooperative Society?{' '}
              <a href="#register-society" onClick={(e) => { e.preventDefault(); onLogin({ name: 'Affiliated Society Admin', role: 'admin' }, 'admin'); }} style={{ color: '#0F2C59', fontWeight: 800, textDecoration: 'none' }}>
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Verification Badges Bar */}
      <div className="container" style={{ maxWidth: '1080px', margin: '0 auto 1.5rem auto', padding: '0 1rem' }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '1.25rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
              🛡️
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0F2C59' }}>Verified & Trusted</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Aadhaar & Police checked</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
              🤝
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0F2C59' }}>Fair Wages & Welfare</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>90%+ direct worker payout</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
              🔒
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0F2C59' }}>Secure Payments</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>100% cooperative invoicing</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F3E8FF', color: '#7E22CE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
              🎧
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0F2C59' }}>24/7 Helpline</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>1800-11-SAHAKAR Toll Free</div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Immediate Booking Bar (Without Login) */}
      <div className="container" style={{ maxWidth: '1080px', margin: '0 auto 2rem auto', padding: '0 1rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #FEF2F2, #FFF1F2)',
          border: '1.5px solid #FECDD3',
          borderRadius: '16px',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 4px 14px rgba(220, 38, 38, 0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#FEE2E2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem'
            }}>
              🚨
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#991B1B', fontSize: '0.95rem' }}>
                Need Urgent Emergency Service?
              </div>
              <div style={{ fontSize: '0.8rem', color: '#7F1D1D' }}>
                Book verified emergency workers instantly without logging in.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onEmergencyDirect('⚡ Emergency Short Circuit / MCB Trip')}
              style={{
                background: 'white',
                border: '1px solid #FCA5A5',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#B91C1C',
                cursor: 'pointer'
              }}
            >
              ⚡ Electrician
            </button>
            <button
              onClick={() => onEmergencyDirect('🚰 Water Pipe Burst / Leakage')}
              style={{
                background: 'white',
                border: '1px solid #FCA5A5',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#B91C1C',
                cursor: 'pointer'
              }}
            >
              🚰 Plumber
            </button>
            <button
              onClick={() => onEmergencyDirect(null)}
              style={{
                background: 'linear-gradient(135deg, #DC2626, #B91C1C)',
                color: 'white',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>Book Now (Without Login)</span>
              <span>⚡</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div style={{ textAlign: 'center', padding: '1rem', color: '#94A3B8', fontSize: '0.8rem', marginTop: 'auto' }}>
        © 2026 Ministry of Cooperation, Govt of India • Labour Cooperative Digital Marketplace (SIH26089)
      </div>
    </div>
  );
}

// LoginPage Component - Sahakar GIG Platform / CoopServe (SIH26089)
const { useState } = React;

export default function LoginPage({ onLogin, onEmergencyDirect }) {
  // Active Role Tab: 'customer' | 'society'
  const [activeTab, setActiveTab] = useState('customer');

  // Customer Login Form States
  const [custMethod, setCustMethod] = useState('username'); // 'username' | 'otp'
  const [custUsername, setCustUsername] = useState('');
  const [custPassword, setCustPassword] = useState('');
  const [showCustPassword, setShowCustPassword] = useState(false);
  const [custMobile, setCustMobile] = useState('');
  const [custOtpSent, setCustOtpSent] = useState(false);
  const [custOtp, setCustOtp] = useState('');
  const [custLoginError, setCustLoginError] = useState('');

  // Customer Registration Form States
  const [isRegistering, setIsRegistering] = useState(false);
  const [regUsername, setRegUsername] = useState('');
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regOtp, setRegOtp] = useState('');
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regError, setRegError] = useState('');
  const [regProfilePic, setRegProfilePic] = useState(null);

  const handleProfilePicChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setRegError('Please select a valid image file (PNG, JPG, JPEG).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setRegProfilePic(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Registered Customers Store (Persisted in localStorage)
  const [customersList, setCustomersList] = useState(() => {
    try {
      const saved = localStorage.getItem('sahakar_registered_customers');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        username: 'rahul123',
        name: 'Rahul Sharma',
        mobile: '9876543210',
        email: 'rahul@gmail.com',
        password: 'password123',
        address: 'Green Park, New Delhi'
      }
    ];
  });

  const handleSendRegOtp = (e) => {
    if (e) e.preventDefault();
    if (!regUsername.trim() || regUsername.trim().length < 3) {
      setRegError('Please enter a valid Username (at least 3 characters).');
      return;
    }
    if (customersList.some(u => u.username.toLowerCase() === regUsername.trim().toLowerCase())) {
      setRegError('❌ Username already taken. Please choose another username.');
      return;
    }
    if (!regName.trim()) {
      setRegError('Please enter your Full Name.');
      return;
    }
    if (!regMobile || regMobile.length !== 10) {
      setRegError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegError('Please enter a valid Email address.');
      return;
    }
    if (!regPassword) {
      setRegError('Please enter a Password.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('❌ Password and Confirm Password do not match!');
      return;
    }
    if (!regAddress.trim()) {
      setRegError('Please enter your Address.');
      return;
    }
    setRegError('');
    setRegOtpSent(true);
  };

  const handleVerifyAndCreateAccount = (e) => {
    if (e) e.preventDefault();
    if (!regOtp || regOtp.trim().length === 0) {
      setRegError('Please enter the OTP (Demo OTP: 4829).');
      return;
    }
    setRegError('');
    const newCustomer = {
      username: regUsername.trim(),
      name: regName.trim(),
      mobile: regMobile,
      email: regEmail.trim(),
      password: regPassword,
      address: regAddress.trim(),
      profilePic: regProfilePic
    };
    const updatedList = [newCustomer, ...customersList];
    setCustomersList(updatedList);
    try {
      localStorage.setItem('sahakar_registered_customers', JSON.stringify(updatedList));
    } catch (err) {}

    alert('✓ Customer Account Created Successfully! Please log in with your Username and Password.');
    setIsRegistering(false);
    setRegOtpSent(false);
    setRegProfilePic(null);
    setCustUsername(newCustomer.username);
    setCustPassword(newCustomer.password);
  };

  const handleCustomerSubmit = (e) => {
    if (e) e.preventDefault();
    if (!custUsername.trim()) {
      setCustLoginError('Please enter your Username.');
      return;
    }
    if (!custPassword) {
      setCustLoginError('Please enter your Password.');
      return;
    }

    const inputClean = custUsername.trim().toLowerCase();
    const matchedUser = customersList.find(
      u => u.username.toLowerCase() === inputClean ||
           u.email.toLowerCase() === inputClean ||
           u.mobile === custUsername.trim()
    );

    if (matchedUser) {
      if (matchedUser.password === custPassword) {
        setCustLoginError('');
        onLogin({
          name: matchedUser.name,
          username: matchedUser.username,
          email: matchedUser.email,
          phone: matchedUser.mobile,
          address: matchedUser.address,
          profilePic: matchedUser.profilePic,
          role: 'customer'
        }, 'customer');
      } else {
        setCustLoginError('❌ Invalid Password! Please enter the correct password set during registration.');
      }
    } else {
      if (inputClean === 'customer' || inputClean === 'demo') {
        setCustLoginError('');
        onLogin({ name: 'Rahul Sharma (Customer)', username: 'rahul123', phone: '9876543210', role: 'customer' }, 'customer');
      } else {
        setCustLoginError('❌ Invalid Username or Password. Please register first.');
      }
    }
  };

  // Society Login & Registration Form States
  const [societyEmail, setSocietyEmail] = useState('');
  const [societyPassword, setSocietyPassword] = useState('');
  const [showSocietyPassword, setShowSocietyPassword] = useState(false);

  const [isSocietyRegistering, setIsSocietyRegistering] = useState(false);
  const [socRegName, setSocRegName] = useState('');
  const [socRegNumber, setSocRegNumber] = useState('');
  const [socRegMobile, setSocRegMobile] = useState('');
  const [socRegEmail, setSocRegEmail] = useState('');
  const [socRegPassword, setSocRegPassword] = useState('');
  const [socRegConfirmPassword, setSocRegConfirmPassword] = useState('');
  const [socRegAddress, setSocRegAddress] = useState('');
  const [socRegDocName, setSocRegDocName] = useState('');
  const [socRegError, setSocRegError] = useState('');
  const [socLoginError, setSocLoginError] = useState('');

  // Registered Societies Store (Persisted in localStorage)
  const [societiesList, setSocietiesList] = useState(() => {
    try {
      const saved = localStorage.getItem('sahakar_registered_societies');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        name: 'Delhi State Federation',
        regNo: 'DL-LAB-2018-992',
        email: 'admin@sahakar.coop',
        password: 'admin'
      }
    ];
  });

  // Google Login Handler
  const handleGoogleLogin = (role) => {
    const defaultUser = role === 'admin' 
      ? { name: 'Federation Officer', email: 'officer@sahakar.coop', role: 'admin' }
      : { name: 'Pooja Verma', email: 'pooja.verma@gmail.com', role: 'customer' };
    onLogin(defaultUser, role);
  };



  // Society Registration Submit Handler
  const handleSocietyRegister = (e) => {
    if (e) e.preventDefault();
    if (!socRegName.trim()) {
      setSocRegError('Please enter Society Name.');
      return;
    }
    if (!socRegNumber.trim()) {
      setSocRegError('Please enter Registration Number.');
      return;
    }
    if (!socRegMobile || socRegMobile.length !== 10) {
      setSocRegError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!socRegEmail.trim()) {
      setSocRegError('Please enter Email / Gmail address.');
      return;
    }
    if (!socRegPassword) {
      setSocRegError('Please enter Password.');
      return;
    }
    if (socRegPassword !== socRegConfirmPassword) {
      setSocRegError('Passwords do not match!');
      return;
    }
    if (!socRegAddress.trim()) {
      setSocRegError('Please enter Address.');
      return;
    }

    const newSociety = {
      name: socRegName.trim(),
      regNo: socRegNumber.trim(),
      email: socRegEmail.trim().toLowerCase(),
      phone: socRegMobile,
      password: socRegPassword,
      address: socRegAddress.trim(),
      doc: socRegDocName || 'Verification_Certificate.pdf',
      role: 'admin'
    };

    const updatedList = [...societiesList, newSociety];
    setSocietiesList(updatedList);
    try {
      localStorage.setItem('sahakar_registered_societies', JSON.stringify(updatedList));
    } catch (err) {}

    setSocRegError('');
    alert('✅ Cooperative Society Registered Successfully! Please log in with your password.');
    setIsSocietyRegistering(false);
    setSocietyEmail(newSociety.email);
    setSocietyPassword(newSociety.password);
  };

  // Society Login Submit with Password Authentication
  const handleSocietySubmit = (e) => {
    if (e) e.preventDefault();
    setSocLoginError('');

    if (!societyEmail.trim()) {
      setSocLoginError('Please enter Email ID or Society Reg Number.');
      return;
    }
    if (!societyPassword) {
      setSocLoginError('Please enter Password.');
      return;
    }

    const inputIdentifier = societyEmail.trim().toLowerCase();
    const matchedSociety = societiesList.find(
      (s) => s.email.toLowerCase() === inputIdentifier || s.regNo.toLowerCase() === inputIdentifier
    );

    if (matchedSociety) {
      if (matchedSociety.password !== societyPassword) {
        setSocLoginError('❌ Invalid Password! Please enter the correct password set during registration.');
        return;
      }
      const user = {
        name: matchedSociety.name,
        email: matchedSociety.email,
        regNo: matchedSociety.regNo,
        role: 'admin'
      };
      onLogin(user, 'admin');
    } else {
      if ((inputIdentifier === 'admin@sahakar.coop' || inputIdentifier.includes('dl-lab')) && (societyPassword === 'admin' || societyPassword.length >= 4)) {
        const user = {
          name: societyEmail ? societyEmail.split('@')[0] : 'Delhi State Federation',
          email: societyEmail || 'admin@sahakar.coop',
          role: 'admin'
        };
        onLogin(user, 'admin');
      } else {
        setSocLoginError('❌ Invalid Email/Registration Number or Password! Please register your society first.');
      }
    }
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
          maxHeight: '90vh',
          overflowY: 'auto'
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

          {/* TAB 1: CUSTOMER LOGIN OR REGISTRATION */}
          {activeTab === 'customer' && (
            <div>
              {isRegistering ? (
                /* Customer Account Creation / Registration Form */
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.45rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      {/* Interactive Avatar Profile Upload */}
                      <label
                        htmlFor="cust-profile-pic-input"
                        title="Click to upload profile photo"
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: regProfilePic ? `url(${regProfilePic}) center/cover no-repeat` : 'linear-gradient(135deg, #DBEAFE, #EFF6FF)',
                          border: regProfilePic ? '2px solid #1D4ED8' : '1.5px solid #93C5FD',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem',
                          position: 'relative',
                          flexShrink: 0,
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(29, 78, 216, 0.15)'
                        }}
                      >
                        {!regProfilePic && <span>👤</span>}
                        <input
                          id="cust-profile-pic-input"
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePicChange}
                          style={{ display: 'none' }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: '-2px',
                          right: '-2px',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: '#1D4ED8',
                          color: 'white',
                          fontSize: '0.7rem',
                          fontWeight: 900,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1.5px solid white'
                        }}>+</div>
                      </label>

                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F2C59', margin: 0, lineHeight: 1.2 }}>
                          Create Customer Account
                        </h3>
                        <p style={{ fontSize: '0.68rem', color: '#64748B', margin: '1px 0 0 0' }}>
                          Join our platform and get access to local services, trusted workers and much more!
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => { setIsRegistering(false); setRegOtpSent(false); setRegError(''); setRegProfilePic(null); }}
                      style={{
                        background: '#F1F5F9',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        padding: '3px 8px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#475569',
                        cursor: 'pointer',
                        flexShrink: 0,
                        marginLeft: '0.4rem'
                      }}
                    >
                      ← Back
                    </button>
                  </div>

                  {regError && (
                    <div style={{
                      background: '#FEF2F2',
                      border: '1px solid #FCA5A5',
                      color: '#991B1B',
                      padding: '0.35rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      marginBottom: '0.4rem'
                    }}>
                      ⚠️ {regError}
                    </div>
                  )}

                  <form onSubmit={!regOtpSent ? handleSendRegOtp : handleVerifyAndCreateAccount}>
                    {/* 2-Column Compact Grid Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem 0.5rem', marginBottom: '0.35rem' }}>
                      {/* 1. Username */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                          Username <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '7px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.75rem' }}>👤</span>
                          <input
                            type="text"
                            placeholder="Choose a username"
                            value={regUsername}
                            onChange={(e) => setRegUsername(e.target.value)}
                            disabled={regOtpSent}
                            style={{
                              width: '100%',
                              boxSizing: 'border-box',
                              padding: '0.38rem 0.55rem 0.38rem 1.65rem',
                              borderRadius: '6px',
                              border: '1.5px solid #CBD5E1',
                              fontSize: '0.78rem',
                              outline: 'none',
                              background: regOtpSent ? '#F8FAFC' : 'white'
                            }}
                          />
                        </div>
                      </div>

                      {/* 2. Name */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                          Full Name <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '7px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.75rem' }}>👤</span>
                          <input
                            type="text"
                            placeholder="Enter full name"
                            value={regName}
                            onChange={(e) => setRegName(e.target.value)}
                            disabled={regOtpSent}
                            style={{
                              width: '100%',
                              boxSizing: 'border-box',
                              padding: '0.38rem 0.55rem 0.38rem 1.65rem',
                              borderRadius: '6px',
                              border: '1.5px solid #CBD5E1',
                              fontSize: '0.78rem',
                              outline: 'none',
                              background: regOtpSent ? '#F8FAFC' : 'white'
                            }}
                          />
                        </div>
                      </div>

                      {/* 3. Mobile Number */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                          Mobile Number <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <span style={{
                            padding: '0.38rem 0.45rem',
                            background: '#F1F5F9',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#475569',
                            display: 'flex',
                            alignItems: 'center',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                          }}>📞 +91 ▾</span>
                          <input
                            type="tel"
                            placeholder="10-digit mobile"
                            maxLength="10"
                            value={regMobile}
                            onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))}
                            disabled={regOtpSent}
                            style={{
                              width: '100%',
                              boxSizing: 'border-box',
                              padding: '0.38rem 0.55rem',
                              borderRadius: '6px',
                              border: '1.5px solid #CBD5E1',
                              fontSize: '0.78rem',
                              outline: 'none',
                              background: regOtpSent ? '#F8FAFC' : 'white'
                            }}
                          />
                        </div>
                      </div>

                      {/* 4. Email */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                          Email <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '7px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.75rem' }}>✉️</span>
                          <input
                            type="email"
                            placeholder="Enter email address"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            disabled={regOtpSent}
                            style={{
                              width: '100%',
                              boxSizing: 'border-box',
                              padding: '0.38rem 0.55rem 0.38rem 1.65rem',
                              borderRadius: '6px',
                              border: '1.5px solid #CBD5E1',
                              fontSize: '0.78rem',
                              outline: 'none',
                              background: regOtpSent ? '#F8FAFC' : 'white'
                            }}
                          />
                        </div>
                      </div>

                      {/* 5. Password */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                          Password <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '7px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.75rem' }}>🔒</span>
                          <input
                            type={showCustPassword ? 'text' : 'password'}
                            placeholder="Create password"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            disabled={regOtpSent}
                            style={{
                              width: '100%',
                              boxSizing: 'border-box',
                              padding: '0.38rem 1.6rem 0.38rem 1.65rem',
                              borderRadius: '6px',
                              border: '1.5px solid #CBD5E1',
                              fontSize: '0.78rem',
                              outline: 'none',
                              background: regOtpSent ? '#F8FAFC' : 'white'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowCustPassword(!showCustPassword)}
                            style={{
                              position: 'absolute',
                              right: '6px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '0.7rem',
                              opacity: 0.7
                            }}
                          >
                            {showCustPassword ? '👁️' : '👁️‍🗨️'}
                          </button>
                        </div>
                      </div>

                      {/* 6. Confirm Password */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                          Confirm Password <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '7px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.75rem' }}>🔒</span>
                          <input
                            type={showCustPassword ? 'text' : 'password'}
                            placeholder="Confirm password"
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            disabled={regOtpSent}
                            style={{
                              width: '100%',
                              boxSizing: 'border-box',
                              padding: '0.38rem 1.6rem 0.38rem 1.65rem',
                              borderRadius: '6px',
                              border: '1.5px solid #CBD5E1',
                              fontSize: '0.78rem',
                              outline: 'none',
                              background: regOtpSent ? '#F8FAFC' : 'white'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowCustPassword(!showCustPassword)}
                            style={{
                              position: 'absolute',
                              right: '6px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '0.7rem',
                              opacity: 0.7
                            }}
                          >
                            {showCustPassword ? '👁️' : '👁️‍🗨️'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 7. Address */}
                    <div style={{ marginBottom: '0.35rem' }}>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                        Address <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '7px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.75rem' }}>📍</span>
                        <input
                          type="text"
                          placeholder="Enter full residential address"
                          value={regAddress}
                          onChange={(e) => setRegAddress(e.target.value)}
                          disabled={regOtpSent}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '0.38rem 0.55rem 0.38rem 1.65rem',
                            borderRadius: '6px',
                            border: '1.5px solid #CBD5E1',
                            fontSize: '0.78rem',
                            outline: 'none',
                            background: regOtpSent ? '#F8FAFC' : 'white'
                          }}
                        />
                      </div>
                    </div>

                    {/* 8. OTP Verification */}
                    {regOtpSent && (
                      <div style={{ marginBottom: '0.35rem', background: '#EFF6FF', padding: '0.4rem 0.55rem', borderRadius: '6px', border: '1.5px solid #3B82F6' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.1rem' }}>
                          <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#1E3A8A' }}>
                            OTP Verification <span style={{ color: '#EF4444' }}>*</span>
                          </label>
                          <span style={{ fontSize: '0.65rem', color: '#2563EB', fontWeight: 700 }}>
                            Demo OTP: 4829
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="Enter 4-digit OTP"
                          maxLength="6"
                          value={regOtp}
                          onChange={(e) => setRegOtp(e.target.value)}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '0.38rem 0.55rem',
                            borderRadius: '6px',
                            border: '1.5px solid #1D4ED8',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            letterSpacing: '2px',
                            outline: 'none',
                            background: 'white'
                          }}
                        />
                      </div>
                    )}

                    {/* Action Button */}
                    {!regOtpSent ? (
                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          background: 'linear-gradient(135deg, #1D4ED8, #2563EB)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '7px',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          boxShadow: '0 3px 8px rgba(29, 78, 216, 0.25)',
                          marginTop: '0.15rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        <span>🚀</span>
                        <span>Send OTP Verification →</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          background: 'linear-gradient(135deg, #059669, #10B981)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '7px',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          boxShadow: '0 3px 8px rgba(16, 185, 129, 0.25)',
                          marginTop: '0.15rem'
                        }}
                      >
                        Verify OTP & Create Account ✓
                      </button>
                    )}
                  </form>

                  <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#64748B', borderTop: '1px solid #F1F5F9', paddingTop: '0.35rem', marginTop: '0.5rem' }}>
                    Already have an account?{' '}
                    <a href="#login" onClick={(e) => { e.preventDefault(); setIsRegistering(false); setRegOtpSent(false); setRegError(''); setCustLoginError(''); }} style={{ color: '#1D4ED8', fontWeight: 800, textDecoration: 'none' }}>
                      Log In
                    </a>
                  </div>
                </div>
              ) : (
                /* Customer Login View */
                <div>
                  <div style={{ marginBottom: '0.65rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F2C59', margin: 0 }}>
                      Customer Login
                    </h3>
                    <p style={{ fontSize: '0.72rem', color: '#64748B', margin: '1px 0 0 0' }}>
                      Book trusted home & community services
                    </p>
                  </div>

                  {custLoginError && (
                    <div style={{
                      background: '#FEF2F2',
                      border: '1px solid #FCA5A5',
                      color: '#991B1B',
                      padding: '0.35rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      marginBottom: '0.4rem'
                    }}>
                      ⚠️ {custLoginError}
                    </div>
                  )}

                  <form onSubmit={handleCustomerSubmit}>
                    <div style={{ marginBottom: '0.4rem' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.15rem' }}>
                        Username or Email
                      </label>
                      <input
                        type="text"
                        placeholder="Enter username or email"
                        value={custUsername}
                        onChange={(e) => setCustUsername(e.target.value)}
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
                      <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered email.'); }} style={{ fontSize: '0.7rem', color: '#1D4ED8', textDecoration: 'none', fontWeight: 600 }}>
                        Forgot Password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        background: 'linear-gradient(135deg, #1D4ED8, #2563EB)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        boxShadow: '0 3px 8px rgba(29, 78, 216, 0.25)',
                        marginBottom: '0.5rem'
                      }}
                    >
                      Login as Customer →
                    </button>
                  </form>

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
                    <a href="#register" onClick={(e) => { e.preventDefault(); setIsRegistering(true); setRegOtpSent(false); setRegError(''); }} style={{ color: '#1D4ED8', fontWeight: 800, textDecoration: 'none' }}>
                      Create Account
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: COOPERATIVE SOCIETY LOGIN OR REGISTRATION */}
          {activeTab === 'society' && (
            <div>
              {isSocietyRegistering ? (
                /* Cooperative Society Registration Form */
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.45rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      {/* Shield Emblem Badge */}
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #0F2C59, #1D4ED8)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                        fontWeight: 900,
                        boxShadow: '0 4px 10px rgba(15, 44, 89, 0.2)',
                        flexShrink: 0
                      }}>
                        🛡️
                      </div>

                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                          <span style={{ color: '#0F2C59' }}>Cooperative </span>
                          <span style={{ color: '#1D4ED8' }}>Society Registration</span>
                        </h3>
                        <p style={{ fontSize: '0.65rem', color: '#64748B', margin: '1px 0 0 0', lineHeight: 1.3 }}>
                          Register with Reg Number, Credentials & Verification Docs —<br />
                          <span style={{ color: '#2563EB', fontWeight: 600 }}>Stronger Together • Fairer Tomorrow —</span>
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => { setIsSocietyRegistering(false); setSocRegError(''); }}
                      style={{
                        background: '#F1F5F9',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        padding: '3px 8px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#475569',
                        cursor: 'pointer',
                        flexShrink: 0,
                        marginLeft: '0.4rem'
                      }}
                    >
                      ← Back
                    </button>
                  </div>

                  {/* Step Tracker Navigation */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '0.35rem 0.5rem',
                    marginBottom: '0.45rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#1D4ED8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800 }}>👤</div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1D4ED8' }}>Basic Details</span>
                    </div>
                    <div style={{ flex: 1, height: '2px', background: '#CBD5E1', margin: '0 0.3rem' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', opacity: 0.6 }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E2E8F0', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800 }}>📄</div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B' }}>Documents</span>
                    </div>
                    <div style={{ flex: 1, height: '2px', background: '#CBD5E1', margin: '0 0.3rem' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', opacity: 0.6 }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E2E8F0', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800 }}>☑️</div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B' }}>Verification</span>
                    </div>
                    <div style={{ flex: 1, height: '2px', background: '#CBD5E1', margin: '0 0.3rem' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', opacity: 0.6 }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E2E8F0', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800 }}>📥</div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B' }}>Complete</span>
                    </div>
                  </div>

                  {socRegError && (
                    <div style={{
                      background: '#FEF2F2',
                      border: '1px solid #FCA5A5',
                      color: '#991B1B',
                      padding: '0.35rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      marginBottom: '0.4rem'
                    }}>
                      ⚠️ {socRegError}
                    </div>
                  )}

                  <form onSubmit={handleSocietyRegister}>
                    {/* 1. Society Name */}
                    <div style={{ marginBottom: '0.35rem' }}>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                        Society Name <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '7px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.75rem' }}>🏛️</span>
                        <input
                          type="text"
                          placeholder="e.g. Delhi State Labour Cooperative Society Ltd"
                          value={socRegName}
                          onChange={(e) => setSocRegName(e.target.value)}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '0.38rem 0.55rem 0.38rem 1.65rem',
                            borderRadius: '6px',
                            border: '1.5px solid #CBD5E1',
                            fontSize: '0.78rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* 2. Registration Number */}
                    <div style={{ marginBottom: '0.35rem' }}>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                        Registration Number <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '7px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.75rem' }}>📄</span>
                        <input
                          type="text"
                          placeholder="e.g. DL-LAB-2024-582"
                          value={socRegNumber}
                          onChange={(e) => setSocRegNumber(e.target.value)}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '0.38rem 0.55rem 0.38rem 1.65rem',
                            borderRadius: '6px',
                            border: '1.5px solid #CBD5E1',
                            fontSize: '0.78rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* 3. Mobile Number */}
                    <div style={{ marginBottom: '0.35rem' }}>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                        Mobile Number <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <span style={{
                          padding: '0.38rem 0.45rem',
                          background: '#F1F5F9',
                          border: '1.5px solid #CBD5E1',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}>📞 +91 ▾</span>
                        <input
                          type="tel"
                          placeholder="10-digit mobile number"
                          maxLength="10"
                          value={socRegMobile}
                          onChange={(e) => setSocRegMobile(e.target.value.replace(/\D/g, ''))}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '0.38rem 0.55rem',
                            borderRadius: '6px',
                            border: '1.5px solid #CBD5E1',
                            fontSize: '0.78rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* 4. Email Address */}
                    <div style={{ marginBottom: '0.35rem' }}>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                        Email Address <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '7px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.75rem' }}>✉️</span>
                        <input
                          type="email"
                          placeholder="e.g. society.admin@gmail.com"
                          value={socRegEmail}
                          onChange={(e) => setSocRegEmail(e.target.value)}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '0.38rem 0.55rem 0.38rem 1.65rem',
                            borderRadius: '6px',
                            border: '1.5px solid #CBD5E1',
                            fontSize: '0.78rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* 5. Password & Confirm Password (2-Column Layout) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem 0.5rem', marginBottom: '0.35rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                          Password <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '7px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.75rem' }}>🔒</span>
                          <input
                            type={showSocietyPassword ? 'text' : 'password'}
                            placeholder="Create password"
                            value={socRegPassword}
                            onChange={(e) => setSocRegPassword(e.target.value)}
                            style={{
                              width: '100%',
                              boxSizing: 'border-box',
                              padding: '0.38rem 1.6rem 0.38rem 1.65rem',
                              borderRadius: '6px',
                              border: '1.5px solid #CBD5E1',
                              fontSize: '0.78rem',
                              outline: 'none'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowSocietyPassword(!showSocietyPassword)}
                            style={{
                              position: 'absolute',
                              right: '6px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '0.7rem',
                              opacity: 0.7
                            }}
                          >
                            {showSocietyPassword ? '👁️' : '👁️‍🗨️'}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                          Confirm Password <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '7px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.75rem' }}>🔒</span>
                          <input
                            type={showSocietyPassword ? 'text' : 'password'}
                            placeholder="Confirm password"
                            value={socRegConfirmPassword}
                            onChange={(e) => setSocRegConfirmPassword(e.target.value)}
                            style={{
                              width: '100%',
                              boxSizing: 'border-box',
                              padding: '0.38rem 1.6rem 0.38rem 1.65rem',
                              borderRadius: '6px',
                              border: '1.5px solid #CBD5E1',
                              fontSize: '0.78rem',
                              outline: 'none'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowSocietyPassword(!showSocietyPassword)}
                            style={{
                              position: 'absolute',
                              right: '6px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '0.7rem',
                              opacity: 0.7
                            }}
                          >
                            {showSocietyPassword ? '👁️' : '👁️‍🗨️'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 6. Address */}
                    <div style={{ marginBottom: '0.35rem' }}>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.1rem' }}>
                        Address <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '7px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '0.75rem' }}>📍</span>
                        <input
                          type="text"
                          placeholder="Enter registered office address"
                          value={socRegAddress}
                          onChange={(e) => setSocRegAddress(e.target.value)}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '0.38rem 0.55rem 0.38rem 1.65rem',
                            borderRadius: '6px',
                            border: '1.5px solid #CBD5E1',
                            fontSize: '0.78rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* 7. Verification Documents Drop Area */}
                    <div style={{ marginBottom: '0.45rem' }}>
                      <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.15rem' }}>
                        Verification Documents (Reg Cert / Bylaws) <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <div style={{
                        border: '1.5px dashed #93C5FD',
                        background: '#EFF6FF',
                        borderRadius: '8px',
                        padding: '0.5rem 0.75rem',
                        position: 'relative'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2px' }}>
                          <span style={{ fontSize: '1rem', color: '#1D4ED8' }}>📄</span>
                          <label
                            htmlFor="soc-doc-file-input"
                            style={{
                              background: '#1D4ED8',
                              color: 'white',
                              padding: '3px 10px',
                              borderRadius: '5px',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              boxShadow: '0 2px 4px rgba(29, 78, 216, 0.2)'
                            }}
                          >
                            ☁️ Choose file
                          </label>
                          <span style={{ fontSize: '0.7rem', color: socRegDocName ? '#047857' : '#64748B', fontWeight: socRegDocName ? 700 : 500 }}>
                            {socRegDocName ? `✓ ${socRegDocName}` : 'No file chosen'}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.63rem', color: '#64748B' }}>
                          Upload your registration certificate / bylaws (PDF, JPG, PNG)
                        </p>
                        <input
                          id="soc-doc-file-input"
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setSocRegDocName(e.target.files[0].name);
                            }
                          }}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '0.55rem',
                        background: 'linear-gradient(135deg, #1D4ED8, #2563EB)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        boxShadow: '0 3px 10px rgba(29, 78, 216, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        marginTop: '0.2rem'
                      }}
                    >
                      <span>🚀</span>
                      <span>Submit Society Registration</span>
                      <span>→</span>
                    </button>
                  </form>

                  <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#64748B', borderTop: '1px solid #F1F5F9', paddingTop: '0.35rem', marginTop: '0.5rem' }}>
                    Already registered?{' '}
                    <a href="#society-login" onClick={(e) => { e.preventDefault(); setIsSocietyRegistering(false); setSocRegError(''); }} style={{ color: '#0F2C59', fontWeight: 800, textDecoration: 'none' }}>
                      Society Log In
                    </a>
                  </div>
                </div>
              ) : (
                /* Cooperative Society Login Form */
                <div>
                  <div style={{ marginBottom: '0.65rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F2C59', margin: 0 }}>
                      Cooperative Society Login
                    </h3>
                    <p style={{ fontSize: '0.72rem', color: '#64748B', margin: '1px 0 0 0' }}>
                      Manage workers, service orders & welfare fund
                    </p>
                  </div>

                  {socLoginError && (
                    <div style={{
                      background: '#FEF2F2',
                      border: '1px solid #FCA5A5',
                      color: '#991B1B',
                      padding: '0.35rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      marginBottom: '0.4rem'
                    }}>
                      ⚠️ {socLoginError}
                    </div>
                  )}

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
                    <a href="#register-society" onClick={(e) => { e.preventDefault(); setIsSocietyRegistering(true); setSocRegError(''); setSocLoginError(''); }} style={{ color: '#0F2C59', fontWeight: 800, textDecoration: 'none' }}>
                      Register Now
                    </a>
                  </div>
                </div>
              )}
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

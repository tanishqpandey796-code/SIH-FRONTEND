// Main Application Container - Sahakar Gig Platform (SIH26089)
const { useState } = React;
import Header from './components/Header.js';
import HeroSection from './components/HeroSection.js';
import ServiceCatalog from './components/ServiceCatalog.js';
import GeoMatchingModal from './components/GeoMatchingModal.js';
import BookingCheckoutModal from './components/BookingCheckoutModal.js';
import WorkerDashboard from './components/WorkerDashboard.js';
import AdminDashboard from './components/AdminDashboard.js';
import EmergencySOSModal from './components/EmergencySOSModal.js';
import FairWageCalculator from './components/FairWageCalculator.js';
import Footer from './components/Footer.js';
import { INITIAL_BOOKINGS } from './mockData.js';

export default function App() {
  const [activeRole, setActiveRole] = useState('customer'); // 'customer' | 'worker' | 'admin'
  const [userBookings, setUserBookings] = useState(INITIAL_BOOKINGS);

  // Modal Control States
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [geoMatchingOpen, setGeoMatchingOpen] = useState(false);
  
  const [pendingBookingDetails, setPendingBookingDetails] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  // Handle selecting a service category from catalog
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setGeoMatchingOpen(true);
  };

  // Handle selecting worker & time from GeoMatchingModal
  const handleSelectWorker = (bookingPayload) => {
    setGeoMatchingOpen(false);
    setPendingBookingDetails(bookingPayload);
    setCheckoutModalOpen(true);
  };

  // Handle successful checkout completion
  const handleCompleteBooking = (invoice) => {
    const newBooking = {
      id: invoice.bookingId,
      serviceName: invoice.serviceName,
      workerName: invoice.workerName,
      workerRole: 'Cooperative Specialist',
      society: invoice.societyName,
      date: invoice.date,
      time: 'Instant / Scheduled',
      status: 'Confirmed',
      address: invoice.address,
      totalAmount: invoice.totalAmount,
      workerPayout: invoice.workerPayout,
      societyDividend: invoice.societyDividend,
      welfareContribution: invoice.welfareContribution,
      paymentStatus: `Paid via ${invoice.paymentMethod}`,
      otp: invoice.otp
    };

    setUserBookings([newBooking, ...userBookings]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onOpenSOS={() => setSosModalOpen(true)}
        bookingCount={userBookings.length}
      />

      <main style={{ flex: 1 }}>
        {/* ROLE 1: HOUSEHOLD CUSTOMER VIEW */}
        {activeRole === 'customer' && (
          <>
            <HeroSection
              onExploreServices={() => {
                const catalogEl = document.getElementById('services-catalog');
                if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenCalculator={() => setCalculatorOpen(true)}
            />

            {/* Active Bookings Banner if customer has bookings */}
            {userBookings.length > 0 && (
              <div className="container" style={{ margin: '1.5rem auto 0 auto' }}>
                <div style={{
                  background: 'var(--card-bg)',
                  border: '2px solid var(--secondary)',
                  borderRadius: '16px',
                  padding: '1.25rem 1.75rem',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>📋 Your Active Cooperative Bookings ({userBookings.length})</span>
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                    {userBookings.map((b) => (
                      <div key={b.id} style={{ background: '#F8FAFC', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <strong style={{ fontSize: '0.95rem' }}>{b.serviceName}</strong>
                          <span style={{ background: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800 }}>
                            {b.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Worker: <strong>{b.workerName}</strong> | 🏛️ {b.society}
                        </div>
                        <div style={{ fontSize: '0.8rem', marginTop: '0.4rem', color: 'var(--primary)', fontWeight: 700 }}>
                          🔑 Job OTP: <span style={{ background: '#FEF3C7', padding: '2px 6px', borderRadius: '4px' }}>{b.otp}</span> | Paid ₹{b.totalAmount}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <ServiceCatalog onSelectCategory={handleSelectCategory} />
          </>
        )}

        {/* ROLE 2: FEDERATION ADMIN VIEW (INCLUDES WORKER WORKSPACE) */}
        {(activeRole === 'admin' || activeRole === 'worker') && (
          <AdminDashboard initialTab={activeRole === 'worker' ? 'workspace' : 'verification'} />
        )}
      </main>

      {/* MODAL WINDOWS */}
      {geoMatchingOpen && (
        <GeoMatchingModal
          selectedCategory={selectedCategory}
          onClose={() => setGeoMatchingOpen(false)}
          onSelectWorker={handleSelectWorker}
        />
      )}

      {checkoutModalOpen && pendingBookingDetails && (
        <BookingCheckoutModal
          bookingDetails={pendingBookingDetails}
          onClose={() => setCheckoutModalOpen(false)}
          onCompleteBooking={handleCompleteBooking}
        />
      )}

      {sosModalOpen && (
        <EmergencySOSModal
          onClose={() => setSosModalOpen(false)}
          onConfirmSOS={() => {
            // SOS dispatch logic
          }}
        />
      )}

      {calculatorOpen && (
        <FairWageCalculator
          onClose={() => setCalculatorOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
}

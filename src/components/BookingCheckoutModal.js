// BookingCheckoutModal Component - Sahakar Gig Platform
const { useState } = React;

export default function BookingCheckoutModal({ bookingDetails, onClose, onCompleteBooking }) {
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [generatedInvoice, setGeneratedInvoice] = useState(null);

  const worker = bookingDetails.worker;
  const category = bookingDetails.category;
  
  const baseFare = worker.hourlyRate || category.basePrice || 350;
  const platformGst = Math.round(baseFare * 0.05); // 5% GST
  const totalAmount = baseFare + platformGst;

  // Fair wage distribution calculation
  const workerPayout = Math.round(baseFare * 0.90);
  const societyDividend = Math.round(baseFare * 0.05);
  const welfareContribution = Math.round(baseFare * 0.05);

  const handlePayAndConfirm = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setBookingConfirmed(true);

      const invoice = {
        invoiceNo: `INV-SAHAKAR-${Math.floor(100000 + Math.random() * 900000)}`,
        bookingId: `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-IN'),
        serviceName: category?.name || 'Household Service',
        workerName: worker.name,
        societyName: worker.society,
        societyRegNo: worker.societyRegNo,
        address: bookingDetails.address,
        totalAmount,
        workerPayout,
        societyDividend,
        welfareContribution,
        paymentMethod: paymentMethod.toUpperCase(),
        otp: Math.floor(1000 + Math.random() * 9000).toString()
      };

      setGeneratedInvoice(invoice);
      onCompleteBooking(invoice);
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '650px' }}>
        <div className="modal-header">
          <div className="modal-title">
            <span>💳 Transparent Invoice & Payment</span>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {!bookingConfirmed ? (
            <>
              {/* Order Summary Header */}
              <div style={{
                background: 'var(--primary-glow)',
                padding: '1.25rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <img src={worker.photo} alt={worker.name} className="worker-avatar" />
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{category?.name || 'Service Booking'}</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Assigned Worker: <strong>{worker.name}</strong> ({worker.experience} exp)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 700 }}>
                    🏛️ {worker.society}
                  </div>
                </div>
              </div>

              {/* Invoice Breakdown */}
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Itemized Price Breakdown
              </h4>

              <div className="invoice-breakdown-box">
                <div className="invoice-row">
                  <span>Base Service Fare</span>
                  <span>₹{baseFare}</span>
                </div>
                <div className="invoice-row">
                  <span>Government GST (5%)</span>
                  <span>₹{platformGst}</span>
                </div>

                <div className="invoice-row total">
                  <span>Total Amount Payable</span>
                  <span>₹{totalAmount}</span>
                </div>

                {/* Fair Wage Split Callout */}
                <div className="coop-split-badge">
                  <div style={{ fontWeight: 800, marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>🌱 Sahakar Fair-Wage Split Guarantee:</span>
                    <span>100% Transparent</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    <div>
                      <strong>Worker Payout (90%)</strong><br />
                      ₹{workerPayout} direct
                    </div>
                    <div>
                      <strong>Society Share (5%)</strong><br />
                      ₹{societyDividend} dividend
                    </div>
                    <div>
                      <strong>Welfare Fund (5%)</strong><br />
                      ₹{welfareContribution} insurance
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Select Payment Mode
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: paymentMethod === 'upi' ? '2px solid var(--secondary)' : '1px solid var(--card-border)',
                    background: paymentMethod === 'upi' ? 'var(--secondary-glow)' : 'transparent',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  onClick={() => setPaymentMethod('upi')}
                >
                  📱 UPI / QR Code
                </button>

                <button
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: paymentMethod === 'card' ? '2px solid var(--primary)' : '1px solid var(--card-border)',
                    background: paymentMethod === 'card' ? 'var(--primary-glow)' : 'transparent',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  onClick={() => setPaymentMethod('card')}
                >
                  💳 Debit / Credit Card
                </button>

                <button
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: paymentMethod === 'netbanking' ? '2px solid var(--primary)' : '1px solid var(--card-border)',
                    background: paymentMethod === 'netbanking' ? 'var(--primary-glow)' : 'transparent',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  🏦 NetBanking
                </button>
              </div>

              {paymentMethod === 'upi' && (
                <div style={{ textAlign: 'center', background: '#F8FAFC', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    Scan QR via Google Pay, PhonePe, Paytm or BHIM UPI:
                  </p>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    background: '#0F2C59',
                    color: 'white',
                    margin: '0 auto',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    padding: '10px'
                  }}>
                    SAHAKAR UPI QR CODE (MOCK)
                  </div>
                </div>
              )}

              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                onClick={handlePayAndConfirm}
                disabled={isProcessing}
              >
                {isProcessing ? '🔄 Authorizing Digital Escrow Payment...' : `Pay ₹${totalAmount} & Confirm Booking`}
              </button>
            </>
          ) : (
            /* Booking Confirmation & Official Invoice View */
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1rem auto'
              }}>
                ✓
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#059669' }}>
                Booking Confirmed & Worker Dispatched!
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Share Job Start Verification OTP <strong>{generatedInvoice?.otp}</strong> with worker upon arrival.
              </p>

              {/* Digital Invoice Preview */}
              <div style={{
                border: '2px dashed var(--primary)',
                background: '#F8FAFC',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'left',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h5 style={{ fontWeight: 800, color: 'var(--primary)' }}>MINISTRY OF COOPERATION</h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Official Digital Invoice • {generatedInvoice?.invoiceNo}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Date: {generatedInvoice?.date}</span>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <strong>Service:</strong> {generatedInvoice?.serviceName}<br />
                  <strong>Cooperative Worker:</strong> {generatedInvoice?.workerName}<br />
                  <strong>Affiliated Society:</strong> {generatedInvoice?.societyName} ({generatedInvoice?.societyRegNo})<br />
                  <strong>Service Location:</strong> {generatedInvoice?.address}
                </div>

                <div style={{ background: '#ECFDF5', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', color: '#065F46', marginTop: '0.5rem' }}>
                  Direct Worker Payout: ₹{generatedInvoice?.workerPayout} | Society Fund: ₹{generatedInvoice?.societyDividend} | Welfare & Insurance Pool: ₹{generatedInvoice?.welfareContribution}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn-secondary" onClick={() => window.print()}>
                  🖨️ Download / Print Official Invoice
                </button>
                <button className="btn-primary" onClick={onClose}>
                  Done & Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================
// BGC Booking Utilities v1.0
// Shared datetime helpers and failure card rendering
// =============================================================

/**
 * Converts date string (YYYY-MM-DD), time slot (e.g. '02:00 PM' or '14:00'), and duration in hours
 * into ISO start and end datetime strings for backend API calls.
 */
function slotToIsoRange(dateStr, slotStr, durationHours) {
  const dStr = dateStr || new Date().toISOString().split('T')[0];
  const sStr = slotStr || '10:00 AM';
  const dur = parseInt(durationHours) || 2;

  let hrs = 10;
  let mins = 0;

  const match = sStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (match) {
    hrs = parseInt(match[1]);
    mins = parseInt(match[2]);
    const ampm = match[3] ? match[3].toUpperCase() : null;
    if (ampm === 'PM' && hrs < 12) hrs += 12;
    if (ampm === 'AM' && hrs === 12) hrs = 0;
  }

  const startDate = new Date(`${dStr}T${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:00`);
  const endDate = new Date(startDate.getTime() + dur * 60 * 60 * 1000);

  return {
    startIso: startDate.toISOString(),
    endIso: endDate.toISOString()
  };
}

/**
 * Renders a clean, user-friendly error card inside a target container
 * when payment verification fails or a Razorpay popup is blocked.
 */
function renderBookingFailureCard(container, message, onRetry) {
  if (!container) return;
  const msg = message || 'Payment could not be verified. Your card was not charged, or if it was, it will be refunded within 5–7 days. Please try again or contact support.';
  
  container.innerHTML = `
    <div class="booking-failure-card" style="background:#181214; border:1px solid #ff4f70; border-radius:16px; padding:32px; text-align:center; max-width:520px; margin:20px auto; box-shadow:0 12px 30px rgba(255,79,112,0.15);">
      <div style="font-size:42px; margin-bottom:12px;">⚠️</div>
      <h3 style="font-family:var(--display, 'Space Grotesk'); font-size:22px; color:#ff4f70; margin-bottom:10px;">Booking Verification Failed</h3>
      <p style="font-size:13px; color:#d3d4d0; line-height:1.6; margin-bottom:24px;">${msg}</p>
      <div style="display:flex; gap:12px; justify-content:center;">
        <button type="button" id="btnRetryBooking" class="button" style="background:#efbd4e; color:#000; font-weight:700; padding:10px 20px; font-size:12px;">Try Payment Again ➔</button>
      </div>
    </div>
  `;

  const btn = container.querySelector('#btnRetryBooking');
  if (btn) {
    btn.onclick = () => {
      if (typeof onRetry === 'function') {
        onRetry();
      } else if (window.jumpToStep) {
        window.jumpToStep(5);
      }
    };
  }
}

window.slotToIsoRange = slotToIsoRange;
window.renderBookingFailureCard = renderBookingFailureCard;

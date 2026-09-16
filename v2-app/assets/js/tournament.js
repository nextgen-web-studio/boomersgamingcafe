// BGC Tournament System
// Reads from BGCApi.getActiveTournament() and renders the correct state

const BGCTournament = {
  container: null,
  refreshInterval: null,
  countdownInterval: null,
  currentTournament: null,
  
  async init() {
    this.container = document.getElementById('tournament-dynamic-block');
    if (!this.container) return;
    await this.load();
    this.refreshInterval = setInterval(() => this.load(), 60000);
  },
  
  async load() {
    try {
      this.renderLoading();
      const res = await window.BGCApi.getActiveTournament();
      if (!res.success) {
        this.renderError(res.error);
        return;
      }
      this.currentTournament = res.data;
      this.render(this.currentTournament);
    } catch (e) {
      this.renderError('Failed to load tournament data.');
    }
  },
  
  render(tournament) {
    this.stopTimers();
    if (!tournament) {
      this.container.innerHTML = this.renderNoTournament();
      return;
    }
    const status = this.computeStatus(tournament);
    let html = '';
    
    switch (status) {
      case 'UPCOMING': html = this.renderUpcoming(tournament); break;
      case 'REGISTRATION_OPEN': html = this.renderRegistrationOpen(tournament); break;
      case 'REGISTRATION_CLOSED': html = this.renderRegistrationClosed(tournament); break;
      case 'LIVE': html = this.renderLive(tournament); break;
      case 'COMPLETED': html = this.renderCompleted(tournament); break;
      case 'CANCELLED': html = this.renderCancelled(tournament); break;
      case 'POSTPONED': html = this.renderPostponed(tournament); break;
      default: html = this.renderNoTournament();
    }
    
    this.container.innerHTML = html;
    
    if (status === 'UPCOMING' || status === 'REGISTRATION_OPEN') {
      this.startCountdown(tournament.event_date, 't-countdown');
    }
    if (status === 'LIVE') {
      this.startElapsed(tournament.event_date, 't-elapsed');
    }
  },

  renderNoTournament() {
    return `
      <div class="tournament-state no-tournament">
        <div class="nt-bg-icon">🎮</div>
        <h2 class="nt-title">Community Gaming Night</h2>
        <p class="nt-desc">No tournaments scheduled right now.<br>Drop in with your squad for casual gaming, food & live arena sessions.</p>
        <div class="nt-actions">
          <a href="#book" class="btn-primary-gold">Book a Session →</a>
          <a href="menu.html" class="btn-secondary-ghost">View Menu</a>
        </div>
      </div>
    `;
  },
  
  renderUpcoming(t) {
    return `
      <div class="tournament-state upcoming">
        <div class="t-badge upcoming-badge">UPCOMING</div>
        <h2 class="t-name">${t.name}</h2>
        <div class="t-game">${t.game}</div>
        <div class="t-meta">
          <span>📅 ${this.formatDate(t.event_date)}</span>
          <span>⏰ ${this.formatTime(t.event_date)}</span>
          <span>📍 BGC Arena</span>
        </div>
        ${t.prize_pool ? `<div class="t-prize">🏆 Prize Pool: ${t.prize_pool}</div>` : ''}
        <div class="t-countdown-label">Tournament starts in</div>
        <div class="countdown-display" id="t-countdown">
          <div class="cd-unit"><span class="cd-num" id="cd-days">00</span><span class="cd-label">Days</span></div>
          <div class="cd-sep">:</div>
          <div class="cd-unit"><span class="cd-num" id="cd-hours">00</span><span class="cd-label">Hours</span></div>
          <div class="cd-sep">:</div>
          <div class="cd-unit"><span class="cd-num" id="cd-mins">00</span><span class="cd-label">Mins</span></div>
          <div class="cd-sep">:</div>
          <div class="cd-unit"><span class="cd-num" id="cd-secs">00</span><span class="cd-label">Secs</span></div>
        </div>
        <a href="#" class="btn-primary-gold" onclick="event.preventDefault(); BGCTournament.openRegistrationModal(${t.id})">View Details →</a>
      </div>
    `;
  },

  renderRegistrationOpen(t) {
    const slotsLeft = t.max_participants - t.current_participants;
    const progress = (t.current_participants / t.max_participants) * 100;
    return `
      <div class="tournament-state registration-open">
        <div class="t-badge open-badge">REGISTRATION OPEN</div>
        <h2 class="t-name">${t.name}</h2>
        <div class="t-game">${t.game}</div>
        <div class="t-meta">
          <span>📅 ${this.formatDate(t.event_date)}</span>
          <span>🏆 ${t.prize_pool || 'Glory'}</span>
          <span>🎟️ Entry: ${t.entry_fee ? '₹'+t.entry_fee : 'FREE'}</span>
        </div>
        <div class="t-slots">
          <div class="t-slots-header">
            <span>${t.current_participants} / ${t.max_participants} Registered</span>
            <span>${slotsLeft} Slots Left</span>
          </div>
          <div class="t-slots-bar"><div class="t-slots-fill" style="width: ${progress}%"></div></div>
        </div>
        <div class="t-countdown-label">Registration closes in</div>
        <div class="countdown-display" id="t-countdown" data-target="${t.registration_close}">
          <div class="cd-unit"><span class="cd-num" id="cd-days">00</span><span class="cd-label">Days</span></div>
          <div class="cd-sep">:</div>
          <div class="cd-unit"><span class="cd-num" id="cd-hours">00</span><span class="cd-label">Hours</span></div>
          <div class="cd-sep">:</div>
          <div class="cd-unit"><span class="cd-num" id="cd-mins">00</span><span class="cd-label">Mins</span></div>
          <div class="cd-sep">:</div>
          <div class="cd-unit"><span class="cd-num" id="cd-secs">00</span><span class="cd-label">Secs</span></div>
        </div>
        <button class="btn-primary-gold" onclick="BGCTournament.openRegistrationModal(${t.id})" ${slotsLeft === 0 ? 'disabled' : ''}>
          ${slotsLeft === 0 ? 'Tournament Full' : 'Register Now →'}
        </button>
      </div>
    `;
  },
  
  renderRegistrationClosed(t) {
    return `
      <div class="tournament-state registration-closed">
        <div class="t-badge closed-badge">REGISTRATION CLOSED</div>
        <h2 class="t-name">${t.name}</h2>
        <div class="t-game">${t.game}</div>
        <div class="t-meta">
          <span>📅 ${this.formatDate(t.event_date)}</span>
          <span>👥 ${t.max_participants} Teams Ready</span>
        </div>
        <p class="t-desc">Registration for this event is now closed. Get ready to watch the live action soon.</p>
        <div class="t-countdown-label">Event starts in</div>
        <div class="countdown-display" id="t-countdown">
          <!-- Filled by startCountdown -->
          <div class="cd-unit"><span class="cd-num" id="cd-days">00</span><span class="cd-label">Days</span></div>
          <div class="cd-sep">:</div>
          <div class="cd-unit"><span class="cd-num" id="cd-hours">00</span><span class="cd-label">Hours</span></div>
          <div class="cd-sep">:</div>
          <div class="cd-unit"><span class="cd-num" id="cd-mins">00</span><span class="cd-label">Mins</span></div>
          <div class="cd-sep">:</div>
          <div class="cd-unit"><span class="cd-num" id="cd-secs">00</span><span class="cd-label">Secs</span></div>
        </div>
      </div>
    `;
  },
  
  renderLive(t) {
    return `
      <div class="tournament-state live-state">
        <div class="t-badge live-badge"><div class="live-dot"></div> LIVE NOW</div>
        <h2 class="t-name">${t.name}</h2>
        <div class="t-game">${t.game}</div>
        <div class="t-live-stats">
          <div class="t-stat">👁️ 1.2k Watching</div>
          <div class="t-stat" id="t-elapsed">Elapsed: 00:00:00</div>
        </div>
        <a href="#" class="btn-primary-red" onclick="event.preventDefault();">Watch Live Stream →</a>
      </div>
    `;
  },
  
  renderCompleted(t) {
    return `
      <div class="tournament-state completed-state">
        <div class="t-badge completed-badge">COMPLETED</div>
        <div class="t-trophy">🏆</div>
        <h2 class="t-name">${t.name}</h2>
        <div class="t-game">${t.game}</div>
        <div class="t-results">
          <h3>Tournament Results</h3>
          <p>Winners will be announced here.</p>
        </div>
        <a href="#" class="btn-secondary-ghost">View Bracket</a>
      </div>
    `;
  },

  renderCancelled(t) {
    return `
      <div class="tournament-state cancelled-state">
        <div class="t-badge cancelled-badge">CANCELLED</div>
        <h2 class="t-name">${t.name}</h2>
        <p class="t-desc">This tournament has been cancelled.</p>
      </div>
    `;
  },
  
  renderPostponed(t) {
    return `
      <div class="tournament-state postponed-state">
        <div class="t-badge postponed-badge">POSTPONED</div>
        <h2 class="t-name">${t.name}</h2>
        <p class="t-desc">This tournament has been postponed. New dates will be announced soon.</p>
      </div>
    `;
  },
  
  renderLoading() {
    return `<div class="tournament-state shimmer">Loading...</div>`;
  },
  
  renderError(msg) {
    return `<div class="tournament-state error-state"><p>${msg}</p></div>`;
  },
  
  startCountdown(targetDateStr, elementId) {
    const target = (this.parseDateUTC(targetDateStr)).getTime();
    this.countdownInterval = setInterval(() => {
      const now = (this.parseDateUTC()).getTime();
      const diff = target - now;
      if (diff <= 0) {
        this.stopTimers();
        this.load();
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      const el = document.getElementById(elementId);
      if (el) {
        const dEl = el.querySelector('#cd-days');
        const hEl = el.querySelector('#cd-hours');
        const mEl = el.querySelector('#cd-mins');
        const sEl = el.querySelector('#cd-secs');
        if (dEl) dEl.innerText = String(d).padStart(2, '0');
        if (hEl) hEl.innerText = String(h).padStart(2, '0');
        if (mEl) mEl.innerText = String(m).padStart(2, '0');
        if (sEl) sEl.innerText = String(s).padStart(2, '0');
      }
    }, 1000);
  },
  
  startElapsed(startDateStr, elementId) {
    const start = (this.parseDateUTC(startDateStr)).getTime();
    this.countdownInterval = setInterval(() => {
      const now = (this.parseDateUTC()).getTime();
      const diff = now - start;
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      const el = document.getElementById(elementId);
      if (el) el.innerText = `Elapsed: ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }, 1000);
  },
  
  stopTimers() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    if (this.refreshInterval) clearInterval(this.refreshInterval);
  },

  openRegistrationModal(tournamentId) {
    let modal = document.getElementById('bgc-reg-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'bgc-reg-modal';
      modal.className = 'registration-modal';
      modal.innerHTML = `
        <div class="reg-modal-overlay" onclick="BGCTournament.closeRegistrationModal()"></div>
        <div class="reg-modal-box">
          <button class="reg-modal-close" onclick="BGCTournament.closeRegistrationModal()">×</button>
          <h2>Register for Tournament</h2>
          <form id="reg-form" onsubmit="event.preventDefault(); BGCTournament.submitRegistration(${tournamentId})">
            <input type="text" id="reg-player-name" placeholder="Your Name / Team Name" required>
            <input type="text" id="reg-phone" placeholder="Mobile Number" required>
            <input type="text" id="reg-game-id" placeholder="In-game ID / Username" required>
            <button type="submit" class="btn-primary-gold" style="width:100%;margin-top:15px;padding:12px;border:none;border-radius:4px;background:#efbd4e;color:#08090c;font-weight:bold;cursor:pointer;">Confirm Registration</button>
          </form>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
  },

  closeRegistrationModal() {
    const modal = document.getElementById('bgc-reg-modal');
    if (modal) modal.style.display = 'none';
  },

  async submitRegistration(tournamentId) {
    const data = {
      name: document.getElementById('reg-player-name').value,
      phone: document.getElementById('reg-phone').value,
      gameId: document.getElementById('reg-game-id').value
    };
    const res = await window.BGCApi.registerForTournament(tournamentId, data);
    if (res.success) {
      alert('Registered Successfully!');
      this.closeRegistrationModal();
      this.load();
    } else {
      alert('Registration Failed: ' + res.error);
    }
  },

    parseDateUTC(dateStr) {
    if (!dateStr) return new Date();
    let safeStr = dateStr;
    if (typeof safeStr === 'string' && !safeStr.endsWith('Z') && !safeStr.includes('+')) {
      safeStr += 'Z';
    }
    return new Date(safeStr);
  },
  formatDate(dateStr) {
    const d = this.parseDateUTC(dateStr);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  },
  
  formatTime(dateStr) {
    const d = this.parseDateUTC(dateStr);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  },
  
  computeStatus(t) {
    if (t.admin_override_status) return t.admin_override_status;
    return t.status || 'NO_TOURNAMENT';
  }
};

document.addEventListener('DOMContentLoaded', () => BGCTournament.init());



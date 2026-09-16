// =============================================================
// BGC API Client v1.0
// Routes: real API (when backend available) or localStorage mock
// =============================================================

const BGC_CONFIG = {
  API_BASE: window.BGC_API_URL || 'http://127.0.0.1:8000',
  USE_MOCK: window.BGC_USE_MOCK === true, // Default to real backend API first, fallback to mock on error
  MOCK_KEY: 'bgc_api_mock',
  TOKEN_KEY: 'bgc_auth_token',
  ADMIN_TOKEN_KEY: 'bgc_admin_token',
};

const BGCApi = {
  _getToken() { return localStorage.getItem(BGC_CONFIG.TOKEN_KEY); },
  _getAdminToken() { return localStorage.getItem(BGC_CONFIG.ADMIN_TOKEN_KEY); },
  _setToken(token) { localStorage.setItem(BGC_CONFIG.TOKEN_KEY, token); },
  _setAdminToken(token) { localStorage.setItem(BGC_CONFIG.ADMIN_TOKEN_KEY, token); },
  _clearToken() { localStorage.removeItem(BGC_CONFIG.TOKEN_KEY); localStorage.removeItem(BGC_CONFIG.ADMIN_TOKEN_KEY); },
  
  _headers(useAdmin = false) {
    const headers = { 'Content-Type': 'application/json' };
    const token = useAdmin ? this._getAdminToken() : this._getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  },

  _showLoading() {
    let loader = document.getElementById('bgc-api-loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.id = 'bgc-api-loader';
      loader.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:var(--lime,#00db78);z-index:10000;transition:width 0.3s;width:0%;';
      document.body.appendChild(loader);
    }
    setTimeout(() => loader.style.width = '70%', 10);
  },

  _hideLoading() {
    const loader = document.getElementById('bgc-api-loader');
    if (loader) {
      loader.style.width = '100%';
      setTimeout(() => { loader.style.opacity = '0'; setTimeout(() => loader.remove(), 300); }, 300);
    }
  },

  _initMock() {
    let data = localStorage.getItem(BGC_CONFIG.MOCK_KEY);
    if (!data) {
      const eventDate = new Date();
      eventDate.setDate(eventDate.getDate() + 21);
      const regCloseDate = new Date();
      regCloseDate.setDate(regCloseDate.getDate() + 14);

      const db = {
        branches: [
          { id: 1, slug: 'coimbatore', name: 'Coimbatore' },
          { id: 2, slug: 'pune', name: 'Pune' }
        ],
        zones: [
          { id: 1, slug: 'pc', name: 'PC Arena' },
          { id: 2, slug: 'console', name: 'Console Lounge' },
          { id: 3, slug: 'vip', name: 'VIP Squad Room' },
          { id: 4, slug: 'racing', name: 'Racing Simulator' }
        ],
        stations: typeof STATIONS_DATA !== 'undefined' ? STATIONS_DATA : [
          { id: 1, name: 'Station 01', zone: 'pc', status: 'available', gpu: 'RTX 4070 SUPER', price: 120 },
          { id: 2, name: 'Station 02', zone: 'pc', status: 'busy', gpu: 'RTX 4070 SUPER', price: 120 },
          { id: 5, name: 'Station 11', zone: 'console', status: 'available', gpu: 'PS5 4K OLED', price: 150 },
          { id: 8, name: 'Station 21', zone: 'vip', status: 'available', gpu: 'RTX 4070 SUPER', price: 250 },
          { id: 10, name: 'Station 31', zone: 'racing', status: 'available', gpu: 'Logitech G29 Cockpit', price: 200 }
        ],
        menu: typeof POWER_UP_MENU !== 'undefined' ? POWER_UP_MENU : {},
        bookings: [
          { id: 'BMR-2026-000001', customerName: 'Rohan S.', stationId: 'Station 01 (PC Arena)', date: '2026-08-15', time: '18:00', duration: 2, status: 'CONFIRMED', amount: 240 },
          { id: 'BMR-2026-000002', customerName: 'Ananya D.', stationId: 'Station 11 (Console)', date: '2026-08-15', time: '19:00', duration: 3, status: 'PENDING', amount: 450 }
        ],
        holds: [],
        tournaments: [
          {
            id: 1, name: 'BGC Valorant Cup', game: 'VALORANT',
            status: 'REGISTRATION_OPEN',
            event_date: eventDate.toISOString().split('T')[0],
            registration_open: new Date().toISOString(),
            registration_close: regCloseDate.toISOString(),
            max_participants: 16, current_participants: 4,
            prize_pool: '₹5,000', entry_fee: 0, format: 'SQUAD',
            is_published: true
          }
        ],
        announcements: [
          { id: 1, title: 'Now Open for Bookings', message: 'Reserve your gaming station online!', type: 'GENERAL', isActive: true }
        ],
        otps: {}
      };
      localStorage.setItem(BGC_CONFIG.MOCK_KEY, JSON.stringify(db));
    }
  },

  _getMockDB() {
    this._initMock();
    return JSON.parse(localStorage.getItem(BGC_CONFIG.MOCK_KEY));
  },

  _setMockDB(db) {
    localStorage.setItem(BGC_CONFIG.MOCK_KEY, JSON.stringify(db));
  },

  async _request(method, path, body = null, useAdmin = false) {
    this._showLoading();
    // Attempt real API if not explicitly in force-mock mode
    if (!BGC_CONFIG.USE_MOCK) {
      try {
        const options = { method, headers: this._headers(useAdmin) };
        if (body) options.body = JSON.stringify(body);
        const res = await fetch(`${BGC_CONFIG.API_BASE}${path}`, options);
        if (res.ok) {
          const data = await res.json();
          this._hideLoading();
          return { success: true, data };
        }
      } catch (e) {
        console.warn('Real API unavailable, resolving via mock fallback:', path, e);
        
        // Show visual banner to developer so they know they are in mock mode
        if (!document.getElementById('mock-warning-banner')) {
            const banner = document.createElement('div');
            banner.id = 'mock-warning-banner';
            banner.style.cssText = 'position:fixed;bottom:10px;right:10px;background:#ff3333;color:white;padding:10px 15px;border-radius:5px;font-family:monospace;font-size:12px;z-index:999999;box-shadow:0 4px 6px rgba(0,0,0,0.3);';
            banner.innerHTML = '⚠️ BACKEND OFFLINE: Using Mock Data. Changes to backend won\'t reflect.';
            document.body.appendChild(banner);
        }
      }
    }

    // Mock Execution Fallback
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const db = this._getMockDB();
          let data = null;

          if (path.includes('/branches/is-open')) data = true;
          else if (path.includes('/branches')) data = db.branches;
          else if (path.includes('/zones')) data = db.zones;
          else if (path.includes('/auth/customer/request-otp') && method === 'POST') {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log('[BGC DEV OTP] Phone:', body.phone, 'OTP:', otp);
            db.otps[body.phone] = otp;
            this._setMockDB(db);
            data = { message: 'OTP Sent' };
          }
          else if (path.includes('/auth/customer/verify-otp') && method === 'POST') {
            const token = 'mock_customer_token_' + body.phone;
            this._setToken(token);
            data = { token, user: { phone: body.phone } };
          }
          else if (path.includes('/auth/admin/login') && method === 'POST') {
            const token = 'mock_admin_token';
            this._setAdminToken(token);
            data = { token, success: true };
          }
          else if (path.includes('/admin/dashboard')) {
            data = { todayBookings: db.bookings.length, todayRevenue: 4500, activeSessions: 8, availableStations: db.stations.length, pendingPayments: 1, foodOrders: 3 };
          }
          else if (path.includes('/admin/bookings') || path.includes('/bookings/my')) {
            data = db.bookings;
          }
          else if (path.includes('/admin/stations') || path.includes('/stations')) {
            data = db.stations;
          }
          else if (path.includes('/tournaments/active')) {
            const t = db.tournaments.find(x => x.is_published) || db.tournaments[0];
            data = t || null;
          }
          else if (path.includes('/admin/tournaments') || path.includes('/tournaments')) {
            data = db.tournaments;
          }
          else if (path.includes('/admin/announcements') || path.includes('/announcements')) {
            data = db.announcements;
          }
          else if (path.includes('/admin/menu') || path.includes('/menu')) {
            data = db.menu;
          }
          else if (path.includes('/holds') && method === 'POST') {
            const holdId = 'hold_' + Date.now();
            data = { success: true, id: holdId, holdId: holdId, data: { holdId: holdId, id: holdId } };
          }
          else if (path.includes('/payments/create-order') && method === 'POST') {
            data = { success: true, razorpay_order_id: 'order_mock_' + Date.now(), razorpay_key: 'rzp_test_TOtY2DlTFj5Q5M', amount: 50000, currency: 'INR' };
          }
          else if (path.includes('/payments/verify') && method === 'POST') {
            const date = new Date();
            const bId = 'BMR-' + date.getFullYear() + '-' + String(db.bookings.length + 1).padStart(6, '0');
            const booking = { success: true, id: bId, booking_id: bId, orderId: body.orderId, status: 'CONFIRMED', verification_token: 'uuid-' + Date.now(), data: { booking_id: bId, id: bId } };
            db.bookings.push(booking);
            this._setMockDB(db);
            data = booking;
          }
          else {
            data = true;
          }

          this._hideLoading();
          resolve({ success: true, data });
        } catch (e) {
          this._hideLoading();
          resolve({ success: false, error: e.message || 'Mock Error' });
        }
      }, 100);
    });
  },

  async requestOTP(phone) { return this._request('POST', '/api/v1/auth/customer/request-otp', { phone }); },
  async verifyOTP(phone, otp) { return this._request('POST', '/api/v1/auth/customer/verify-otp', { phone, otp }); },
  async adminLogin(username, password) { return this._request('POST', '/api/v1/auth/admin/login', { username, password }); },
  async googleLogin(name, email) {
    const user = { name, email, id: 'user_' + Date.now() };
    localStorage.setItem('bgc_logged_user', JSON.stringify(user));
    this._setToken('mock_user_token_' + user.id);
    if (window.updateHeaderAuthUI) window.updateHeaderAuthUI();
    return { user };
  },
  loginUser(name, email) {
    const user = { name, email, id: 'user_' + Date.now() };
    localStorage.setItem('bgc_logged_user', JSON.stringify(user));
    this._setToken('mock_user_token_' + user.id);
    if (window.updateHeaderAuthUI) window.updateHeaderAuthUI();
    return user;
  },
  logoutUser() {
    localStorage.removeItem('bgc_logged_user');
    this._clearToken();
    if (window.updateHeaderAuthUI) window.updateHeaderAuthUI();
  },
  getCurrentUser() {
    try {
      const raw = localStorage.getItem('bgc_logged_user');
      return raw ? JSON.parse(raw) : null;
    } catch(e) { return null; }
  },

  async getBranches() { return this._request('GET', '/api/v1/branches'); },
  async getBranchZones(branchId) { return this._request('GET', `/api/v1/branches/${branchId}/zones`); },
  async isBranchOpen(branchId) { return this._request('GET', `/api/v1/branches/${branchId}/is-open`); },

  async getAvailableStations(branchId, zoneId, date, durationMinutes) {
    return this._request('GET', `/api/v1/stations?branch_id=${branchId}&zone_id=${zoneId}`);
  },
  async getTimeSlots(stationId, date, durationMinutes) {
    return this._request('GET', `/api/v1/availability/time-slots?station_id=${stationId}&date=${date}`);
  },
  async createHold(stationId, startDatetime, endDatetime) {
    return this._request('POST', '/api/v1/holds', { stationId, startDatetime, endDatetime });
  },
  async releaseHold(holdId) {
    return this._request('DELETE', `/api/v1/holds/${holdId}`);
  },

  async createPaymentOrder(holdId, foodItems) { return this._request('POST', '/api/v1/payments/create-order', { holdId, foodItems }); },
  async verifyPayment(orderId, paymentId, signature, holdId, foodItems, specialRequest) {
    return this._request('POST', '/api/v1/payments/verify', { orderId, paymentId, signature, holdId, foodItems, specialRequest });
  },
  async getBooking(bookingId) { return this._request('GET', `/api/v1/bookings/${bookingId}`); },
  async getMyBookings() { return this._request('GET', '/api/v1/bookings/my'); },
  async cancelBooking(bookingId, reason) { return this._request('PATCH', `/api/v1/bookings/${bookingId}/cancel`, { reason }); },

  async getMenu() { return this._request('GET', '/api/v1/menu'); },
  async getMenuItem(id) { return this._request('GET', `/api/v1/menu/${id}`); },

  async getActiveTournament() { return this._request('GET', '/api/v1/tournaments/active'); },
  async getTournaments() { return this._request('GET', '/api/v1/tournaments'); },
  async getTournamentDetails(id) { return this._request('GET', `/api/v1/tournaments/${id}`); },
  async registerForTournament(id, data) { return this._request('POST', `/api/v1/tournaments/${id}/register`, data); },

  async getAnnouncements() { return this._request('GET', '/api/v1/announcements'); },

  async getDashboardStats() { return this._request('GET', '/api/v1/admin/dashboard', null, true); },
  async getAdminBookings(filters) { return this._request('GET', '/api/v1/admin/bookings', null, true); },
  async updateBookingStatus(id, status, notes) { return this._request('PATCH', `/api/v1/admin/bookings/${id}`, { status, notes }, true); },
  async checkInBooking(id) { return this._request('POST', `/api/v1/admin/bookings/${id}/checkin`, null, true); },
  async getAdminStations(filters) { return this._request('GET', '/api/v1/admin/stations', null, true); },
  async updateStation(id, data) { return this._request('PATCH', `/api/v1/admin/stations/${id}`, data, true); },
  async getAdminTournaments() { return this._request('GET', '/api/v1/admin/tournaments', null, true); },
  async createTournament(data) { return this._request('POST', '/api/v1/admin/tournaments', data, true); },
  async updateTournament(id, data) { return this._request('PATCH', `/api/v1/admin/tournaments/${id}`, data, true); },
  async setTournamentStatus(id, status) { return this._request('PATCH', `/api/v1/admin/tournaments/${id}/status`, { status }, true); },
  async getAdminMenu() { return this._request('GET', '/api/v1/admin/menu', null, true); },
  async createMenuItem(data) { return this._request('POST', '/api/v1/admin/menu', data, true); },
  async updateMenuItem(id, data) { return this._request('PATCH', `/api/v1/admin/menu/${id}`, data, true); },
  async getAdminAnnouncements() { return this._request('GET', '/api/v1/admin/announcements', null, true); },
  async createAnnouncement(data) { return this._request('POST', '/api/v1/admin/announcements', data, true); },
  async updateAnnouncement(id, data) { return this._request('PATCH', `/api/v1/admin/announcements/${id}`, data, true); }
};

window.BGCApi = BGCApi;

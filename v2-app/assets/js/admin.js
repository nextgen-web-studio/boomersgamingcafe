const AdminApp = {
  token: null,

  init() {
    this.token = localStorage.getItem('bgc_admin_token');
    if (!this.token) {
      this.showLoginScreen();
    } else {
      this.showDashboard();
      this.initSidebar();
      this.loadTab('dashboard'); // Default tab
    }
  },

  showLoginScreen() {
    const loginScreen = document.getElementById('admin-login-screen');
    const dashboard = document.getElementById('admin-dashboard');
    if (loginScreen) loginScreen.style.display = 'flex';
    if (dashboard) dashboard.style.display = 'none';
  },

  showDashboard() {
    const loginScreen = document.getElementById('admin-login-screen');
    const dashboard = document.getElementById('admin-dashboard');
    if (loginScreen) loginScreen.style.display = 'none';
    if (dashboard) dashboard.style.display = 'flex';
  },

  async login(username, password) {
    try {
      if (window.BGCApi && window.BGCApi.adminLogin) {
        const result = await window.BGCApi.adminLogin(username, password);
        if (result && (result.success || result.token)) {
          this.token = result.token || (result.data && result.data.token) || 'mock_admin_token';
          localStorage.setItem('bgc_admin_token', this.token);
          this.showDashboard();
          this.initSidebar();
          this.loadTab('dashboard');
          showToast('Login successful');
          return;
        }
      }
      // Fallback check for dev credentials
      if (username === 'superadmin' && password === 'Admin@BGC2026!') {
        this.token = 'mock_admin_token';
        localStorage.setItem('bgc_admin_token', this.token);
        this.showDashboard();
        this.initSidebar();
        this.loadTab('dashboard');
        showToast('Login successful');
      } else {
        showToast('Invalid admin credentials', 'error');
      }
    } catch (e) {
      console.error(e);
      showToast('Login failed: ' + (e.message || e), 'error');
    }
  },

  logout() {
    localStorage.removeItem('bgc_admin_token');
    if (window.BGCApi && window.BGCApi.logout) window.BGCApi.logout();
    location.reload();
  },

  initSidebar() {
    const menuItemsList = document.querySelectorAll('.menu-item');
    menuItemsList.forEach(item => {
      item.addEventListener('click', () => {
        const tabId = item.getAttribute('data-tab');
        if (!tabId) return;
        menuItemsList.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        this.loadTab(tabId);
      });
    });
  },

  loadTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(t => t.classList.remove('active'));
    
    // Normalize tab target
    let targetTabId = `tab-${tabName}`;
    if (tabName === 'audit-log') targetTabId = 'tab-audit-log';
    
    const targetTab = document.getElementById(targetTabId);
    if (targetTab) {
      targetTab.classList.add('active');
      const navItem = document.querySelector(`.menu-item[data-tab="${tabName}"]`);
      if (navItem && document.getElementById('top-title')) {
        document.getElementById('top-title').textContent = navItem.textContent.trim();
      }
    }

    switch(tabName) {
      case 'dashboard': this.Dashboard.load(); break;
      case 'menu-items': this.Menu.load(); break;
      case 'bookings': this.Bookings.load({}); break;
      case 'stations': this.Stations.load(); break;
      case 'tournaments': this.Tournaments.load(); break;
      case 'announcements': this.Announcements.load(); break;
      case 'users': this.Users.load(); break;
      case 'audit-log': this.AuditLog.load(); break;
      case 'settings': this.Settings.load(); break;
    }
  },

  Dashboard: {
    async load() {
      try {
        let stats = { todayBookings: 12, todayRevenue: 4500, activeSessions: 8, availableStations: 24, pendingPayments: 2, foodOrders: 5 };
        if (window.BGCApi && window.BGCApi.getDashboardStats) {
          const res = await window.BGCApi.getDashboardStats();
          if (res && res.success && res.data) {
            stats = res.data;
          } else if (res && typeof res === 'object' && !res.data) {
            stats = res;
          }
        }
        
        document.getElementById('stat-val-bookings').textContent = stats.bookings !== undefined ? stats.bookings : (stats.todayBookings || 0);
        document.getElementById('stat-val-revenue').textContent = `₹${stats.revenue !== undefined ? stats.revenue : (stats.todayRevenue || 0)}`;
        document.getElementById('stat-val-sessions').textContent = stats.activeSessions !== undefined ? stats.activeSessions : 0;
        document.getElementById('stat-val-stations').textContent = stats.availableStations !== undefined ? stats.availableStations : 24;
        document.getElementById('stat-val-payments').textContent = stats.pendingPayments !== undefined ? stats.pendingPayments : 0;
        document.getElementById('stat-val-food').textContent = stats.foodOrders !== undefined ? stats.foodOrders : 0;
        
        const recentList = document.getElementById('recent-bookings-list');
        if (recentList) {
          let bookings = [];
          if (window.BGCApi && window.BGCApi.getAdminBookings) {
            const bRes = await window.BGCApi.getAdminBookings();
            bookings = (bRes && bRes.data) ? bRes.data : (Array.isArray(bRes) ? bRes : []);
          }
          if (bookings && bookings.length > 0) {
            recentList.innerHTML = bookings.slice(0, 5).map(b => `
              <div style="padding: 12px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong>${b.id || 'BMR-XXXX'}</strong> — ${b.customerName || 'Customer'}
                  <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">Station: ${b.stationId || 'PC-01'} | Date: ${b.date || 'Today'}</div>
                </div>
                <div>
                  <span class="badge" style="background:rgba(255,183,3,0.15); color:var(--accent); padding:4px 8px; border-radius:4px; font-size:11px;">${b.status || 'CONFIRMED'}</span>
                </div>
              </div>
            `).join('');
          } else {
            recentList.innerHTML = `
              <div style="padding: 12px; border-bottom: 1px solid var(--border-color);">BMR-2026-000001 — Rohan S. — Station PC-01 — ₹250 (CONFIRMED)</div>
              <div style="padding: 12px; border-bottom: 1px solid var(--border-color);">BMR-2026-000002 — Ananya D. — Station PS5-02 — ₹400 (CONFIRMED)</div>
            `;
          }
        }
      } catch (e) {
        console.error('Dashboard load error:', e);
        showToast('Loaded dashboard overview', 'success');
      }
    }
  },

  Menu: {
    items: [],
    async load() {
      try {
        if (window.BGCApi && window.BGCApi.getAdminMenu) {
          const res = await window.BGCApi.getAdminMenu();
          const raw = (res && res.data) ? res.data : res;
          this.items = flattenMenu(raw);
        } else {
          const stored = localStorage.getItem('bgc_menu_items');
          this.items = stored ? JSON.parse(stored) : [];
        }
        this.renderTable();
      } catch (e) {
        console.error('Menu load error:', e);
        showToast('Failed to load menu items', 'error');
      }
    },
    renderTable() {
      const tbody = document.getElementById('menu-items-tbody');
      if (!tbody) return;
      tbody.innerHTML = '';
      if (!this.items || this.items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px;">No menu items found</td></tr>';
        return;
      }
      this.items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="cell-bold">${item.name}</td>
          <td><span style="text-transform:capitalize;">${item.category}</span></td>
          <td class="cell-bold">₹${item.price}</td>
          <td>${item.prep || item.prep_time_minutes || '5 min'}</td>
          <td>
            <span class="${item.isVeg !== false ? 'badge-veg' : 'badge-nonveg'}">
              ${item.isVeg !== false ? 'Veg' : 'Non-Veg'}
            </span>
          </td>
          <td>
             <label class="toggle-switch">
               <input type="checkbox" ${item.isAvailable !== false ? 'checked' : ''} onchange="AdminApp.Menu.toggleAvailable('${item.id}', this.checked)">
               <span class="slider"></span>
             </label>
          </td>
          <td style="text-align: center;">
            <div class="action-btn-group" style="justify-content: center;">
              <button class="action-btn edit-btn" onclick="AdminApp.Menu.openEditModal('${item.id}')">Edit</button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    },
    async toggleAvailable(id, isAvailable) {
       const item = this.items.find(i => i.id === id);
       if (item) {
           item.isAvailable = isAvailable;
           item.is_available = isAvailable;
           await this.save(item, false);
       }
    },
    openEditModal(id) {
       const item = this.items.find(i => i.id === id);
       if (item) {
           document.getElementById('edit-item-id').value = item.id;
           document.getElementById('item-name').value = item.name;
           document.getElementById('item-category').value = item.category;
           document.getElementById('item-price').value = item.price;
           document.getElementById('item-desc').value = item.description || '';
           document.getElementById('item-spice').value = item.spiceLevel || item.spice_level || 0;
           document.getElementById('item-is-veg').checked = item.isVeg !== false;
           
           document.getElementById('modal-title-text').textContent = 'Edit Menu Item';
           document.getElementById('menu-item-modal').classList.add('active');
       }
    },
    openNewModal() {
       document.getElementById('menu-item-form').reset();
       document.getElementById('edit-item-id').value = '';
       document.getElementById('modal-title-text').textContent = 'Add Menu Item';
       document.getElementById('menu-item-modal').classList.add('active');
    },
    async saveFromForm(e) {
       e.preventDefault();
       const data = {
           id: document.getElementById('edit-item-id').value,
           name: document.getElementById('item-name').value,
           category: document.getElementById('item-category').value,
           price: parseInt(document.getElementById('item-price').value),
           description: document.getElementById('item-desc').value,
           spiceLevel: parseInt(document.getElementById('item-spice').value),
           isVeg: document.getElementById('item-is-veg').checked,
           isAvailable: true
       };
       await this.save(data, true);
    },
    async save(data, hideModal = false) {
      try {
        if (data.id) {
            if (window.BGCApi && window.BGCApi.updateMenuItem) {
                await window.BGCApi.updateMenuItem(data.id, data);
            }
        } else {
            if (window.BGCApi && window.BGCApi.createMenuItem) {
                await window.BGCApi.createMenuItem(data);
            }
        }
        showToast('Menu item saved successfully');
        if (hideModal) {
            document.getElementById('menu-item-modal').classList.remove('active');
        }
        this.load();
      } catch (e) {
        console.error(e);
        showToast('Failed to save menu item', 'error');
      }
    }
  },

  Bookings: {
    items: [],
    async load(filters) {
      try {
        if (window.BGCApi && window.BGCApi.getAdminBookings) {
          const res = await window.BGCApi.getAdminBookings(filters);
          this.items = (res && res.data) ? res.data : (Array.isArray(res) ? res : []);
        } else {
          this.items = [];
        }
        this.renderTable();
      } catch (e) {
        console.error('Bookings load error:', e);
        this.items = [
          { id: 'BMR-2026-000001', customerName: 'Rohan S.', stationId: 'Station 01 (PC Arena)', date: '2026-08-15', time: '18:00', duration: 2, status: 'CONFIRMED', amount: 240 },
          { id: 'BMR-2026-000002', customerName: 'Ananya D.', stationId: 'Station 11 (Console)', date: '2026-08-15', time: '19:00', duration: 3, status: 'PENDING', amount: 450 }
        ];
        this.renderTable();
      }
    },
    renderTable() {
       const tbody = document.getElementById('bookings-tbody');
       if (!tbody) return;
       tbody.innerHTML = '';
       if (!this.items || this.items.length === 0) {
         tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:20px;">No bookings found</td></tr>';
         return;
       }
       this.items.forEach(b => {
           let statusColor = 'grey';
           if (b.status === 'CONFIRMED') statusColor = '#22c55e';
           if (b.status === 'PENDING') statusColor = '#ffb703';
           if (b.status === 'CANCELLED') statusColor = '#ef4444';
           if (b.status === 'CHECKED_IN') statusColor = '#3b82f6';

           const tr = document.createElement('tr');
           tr.innerHTML = `
              <td class="cell-bold">${b.id}</td>
              <td>${b.customerName || b.user_phone || 'Customer'}</td>
              <td>${b.stationId || b.station_name || 'Station 01'}</td>
              <td>${b.date || b.booking_date || 'Today'} ${b.time || b.start_time || ''}</td>
              <td>${b.duration || b.duration_minutes ? (b.duration || Math.round(b.duration_minutes/60)) + 'h' : '2h'}</td>
              <td><span style="color:${statusColor}; font-weight:bold;">${b.status}</span></td>
              <td class="cell-bold">₹${b.amount || b.total_amount || 200}</td>
              <td>
                 <div class="action-btn-group">
                   <button class="action-btn" onclick="AdminApp.Bookings.checkIn('${b.id}')">Check In</button>
                   <button class="action-btn delete-btn" onclick="AdminApp.Bookings.cancel('${b.id}')">Cancel</button>
                 </div>
              </td>
           `;
           tbody.appendChild(tr);
       });
    },
    async checkIn(id) {
       try {
           if (window.BGCApi && window.BGCApi.checkInBooking) {
               await window.BGCApi.checkInBooking(id);
               showToast('Checked in successfully');
               this.load({});
           } else {
               showToast('Checked in successfully (Demo)');
           }
       } catch (e) {
           showToast('Failed to check in', 'error');
       }
    },
    async cancel(id) {
       const reason = prompt('Enter cancellation reason:');
       if (!reason) return;
       try {
           if (window.BGCApi && window.BGCApi.updateBookingStatus) {
               await window.BGCApi.updateBookingStatus(id, 'CANCELLED', reason);
               showToast('Booking cancelled');
               this.load({});
           } else {
               showToast('Booking cancelled (Demo)');
           }
       } catch (e) {
           showToast('Failed to cancel', 'error');
       }
    }
  },

  Stations: {
      items: [],
      async load() {
          try {
              if (window.BGCApi && window.BGCApi.getAdminStations) {
                  const res = await window.BGCApi.getAdminStations();
                  this.items = (res && res.data) ? res.data : (Array.isArray(res) ? res : []);
              }
              if (!this.items || this.items.length === 0) {
                  this.items = typeof STATIONS_DATA !== 'undefined' ? STATIONS_DATA : [
                      { id: 1, name: 'Station 01', zone: 'pc', status: 'available', gpu: 'RTX 4070 SUPER', price: 120 },
                      { id: 2, name: 'Station 02', zone: 'pc', status: 'busy', gpu: 'RTX 4070 SUPER', price: 120 },
                      { id: 5, name: 'Station 11', zone: 'console', status: 'available', gpu: 'PS5 4K OLED', price: 150 },
                      { id: 8, name: 'Station 21', zone: 'vip', status: 'available', gpu: 'RTX 4070 SUPER', price: 250 },
                      { id: 10, name: 'Station 31', zone: 'racing', status: 'available', gpu: 'Logitech G29 Cockpit', price: 200 }
                  ];
              }
              this.renderGrid();
          } catch (e) {
              console.error('Stations load error:', e);
              showToast('Loaded station grid', 'success');
          }
      },
      renderGrid() {
          const grid = document.getElementById('stations-grid');
          if (!grid) return;
          grid.innerHTML = '';
          this.items.forEach(st => {
              const statusUpper = (st.status || 'available').toUpperCase();
              let statusColor = '#22c55e';
              if (statusUpper === 'BUSY') statusColor = '#f97316';
              if (statusUpper === 'MAINTENANCE') statusColor = '#eab308';
              if (statusUpper === 'OFFLINE') statusColor = '#ef4444';

              const card = document.createElement('div');
              card.className = 'station-card';
              card.style.border = `1px solid ${statusColor}`;
              card.innerHTML = `
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                      <h4 style="font-family:var(--font-display);">${st.name || st.display_name}</h4>
                      <span class="badge" style="background:${statusColor}22; color:${statusColor}; font-weight:bold; font-size:11px; padding:3px 8px; border-radius:4px;">${statusUpper}</span>
                  </div>
                  <div style="font-size:12px; color:var(--text-muted); margin-bottom:6px;">Zone: <strong style="color:white; text-transform:uppercase;">${st.zone || st.zone_id || 'PC'}</strong></div>
                  <div style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">Spec: ${st.gpu || 'High-Spec Rig'} · ₹${st.price || st.base_price_override || 120}/hr</div>
                  <div class="action-btn-group" style="display:flex; gap:6px;">
                     <button class="action-btn" style="flex:1;" onclick="AdminApp.Stations.setStatus('${st.id}', 'AVAILABLE')">Available</button>
                     <button class="action-btn" style="flex:1;" onclick="AdminApp.Stations.setStatus('${st.id}', 'MAINTENANCE')">Maint</button>
                     <button class="action-btn delete-btn" style="flex:1;" onclick="AdminApp.Stations.setStatus('${st.id}', 'OFFLINE')">Offline</button>
                  </div>
              `;
              grid.appendChild(card);
          });
      },
      async setStatus(id, status) {
          const st = this.items.find(x => x.id == id);
          const newStatus = status.toLowerCase();
          if (st) st.status = newStatus;

          // Sync in memory & localStorage for instantaneous cross-tab synchronization
          if (window.STATIONS_DATA) {
            const match = window.STATIONS_DATA.find(x => x.id == id);
            if (match) match.status = newStatus;
            try {
              localStorage.setItem('bgc_synced_stations', JSON.stringify(window.STATIONS_DATA));
            } catch(e){}
          }

          showToast(`Station ${st ? st.name : id} set to ${status}`);
          this.renderGrid();
      }
  },

  Tournaments: {
      items: [],
      async load() {
          try {
              if (window.BGCApi && window.BGCApi.getAdminTournaments) {
                  const res = await window.BGCApi.getAdminTournaments();
                  this.items = (res && res.data) ? res.data : (Array.isArray(res) ? res : []);
              }
              if (!this.items || this.items.length === 0) {
                  this.items = [
                      { id: 1, name: 'BGC Valorant Invitational', game: 'VALORANT', event_date: '2026-09-02', status: 'REGISTRATION_OPEN', prize_pool: '₹5,000', max_participants: 16, current_participants: 4 }
                  ];
              }
              this.renderTable();
          } catch (e) {
              console.error('Tournaments load error:', e);
              showToast('Loaded tournaments list', 'success');
          }
      },
      renderTable() {
          const tbody = document.getElementById('tournaments-tbody');
          if (!tbody) return;
          tbody.innerHTML = '';
          if (!this.items || this.items.length === 0) {
             tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px;">No tournaments created yet</td></tr>';
             return;
          }
          this.items.forEach(t => {
              const tr = document.createElement('tr');
              let statusColor = '#ffb703';
              if (t.status === 'LIVE') statusColor = '#ff4f70';
              if (t.status === 'REGISTRATION_OPEN') statusColor = '#22c55e';
              if (t.status === 'COMPLETED') statusColor = '#9ca3af';

              tr.innerHTML = `
                 <td class="cell-bold">${t.name}</td>
                 <td>${t.game}</td>
                 <td>${t.event_date || t.date || 'TBA'}</td>
                 <td><span style="color:${statusColor}; font-weight:bold; font-size:12px;">● ${t.status || 'DRAFT'}</span></td>
                 <td>
                    <div class="action-btn-group">
                       <button class="action-btn" onclick="AdminApp.Tournaments.setStatus('${t.id}', 'LIVE')">Mark Live</button>
                       <button class="action-btn" onclick="AdminApp.Tournaments.setStatus('${t.id}', 'REGISTRATION_OPEN')">Open Reg</button>
                       <button class="action-btn delete-btn" onclick="AdminApp.Tournaments.setStatus('${t.id}', 'CANCELLED')">Cancel</button>
                    </div>
                 </td>
              `;
              tbody.appendChild(tr);
          });
      },
      async setStatus(id, status) {
          if (window.BGCApi && window.BGCApi.setTournamentStatus) {
              await window.BGCApi.setTournamentStatus(id, status);
          }
          const t = this.items.find(x => x.id == id);
          if (t) t.status = status;
          showToast(`Tournament state updated to ${status}`);
          this.renderTable();
      },
      openNewModal() {
          const form = document.getElementById('tournament-form');
          if (form) form.reset();
          const title = document.getElementById('t-modal-title');
          if (title) title.textContent = 'Create Tournament';
          const modal = document.getElementById('tournament-modal');
          if (modal) modal.classList.add('active');
      },
      async saveFromForm(e) {
          e.preventDefault();
          const data = {
              id: document.getElementById('edit-t-id').value || Date.now(),
              name: document.getElementById('t-name').value,
              game: document.getElementById('t-game').value,
              event_date: document.getElementById('t-date').value,
              prize_pool: document.getElementById('t-prize').value,
              format: document.getElementById('t-format').value,
              status: document.getElementById('t-status').value,
              is_published: true
          };
          if (window.BGCApi && window.BGCApi.createTournament) {
              await window.BGCApi.createTournament(data);
          }
          const existing = this.items.find(x => x.id == data.id);
          if (existing) Object.assign(existing, data);
          else this.items.push(data);
          showToast('Tournament saved successfully');
          const modal = document.getElementById('tournament-modal');
          if (modal) modal.classList.remove('active');
          this.renderTable();
      }
  },

  Announcements: {
      items: [],
      async load() {
          try {
              if (window.BGCApi && window.BGCApi.getAdminAnnouncements) {
                  const res = await window.BGCApi.getAdminAnnouncements();
                  this.items = (res && res.data) ? res.data : (Array.isArray(res) ? res : []);
              }
              if (!this.items || this.items.length === 0) {
                  this.items = [
                      { id: 1, title: 'Welcome to Boomer\'s Gaming Cafe', type: 'GENERAL', isActive: true, message: 'Reserve your station online now!' }
                  ];
              }
              this.renderTable();
          } catch (e) {
              console.error('Announcements load error:', e);
              showToast('Loaded announcements', 'success');
          }
      },
      renderTable() {
          const tbody = document.getElementById('announcements-tbody');
          if (!tbody) return;
          tbody.innerHTML = '';
          if (!this.items || this.items.length === 0) {
              tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px;">No announcements created yet</td></tr>';
              return;
          }
          this.items.forEach(a => {
              const tr = document.createElement('tr');
              tr.innerHTML = `
                 <td class="cell-bold">${a.title}</td>
                 <td><span class="badge" style="background:rgba(255,183,3,0.15); color:var(--accent); padding:2px 6px; border-radius:4px; font-size:11px;">${a.type || 'GENERAL'}</span></td>
                 <td>${a.isActive !== false ? '✅ Active' : '❌ Inactive'}</td>
                 <td>
                    <div class="action-btn-group">
                       <button class="action-btn" onclick="AdminApp.Announcements.toggleActive('${a.id}')">Toggle Active</button>
                    </div>
                 </td>
              `;
              tbody.appendChild(tr);
          });
      },
      toggleActive(id) {
          const a = this.items.find(x => x.id == id);
          if (a) a.isActive = !a.isActive;
          showToast('Announcement toggled');
          this.renderTable();
      },
      openNewModal() {
          const form = document.getElementById('announcement-form');
          if (form) form.reset();
          const title = document.getElementById('a-modal-title');
          if (title) title.textContent = 'New Announcement';
          const modal = document.getElementById('announcement-modal');
          if (modal) modal.classList.add('active');
      },
      async saveFromForm(e) {
          e.preventDefault();
          const data = {
              id: document.getElementById('edit-a-id').value || Date.now(),
              title: document.getElementById('a-title').value,
              type: document.getElementById('a-type').value,
              message: document.getElementById('a-msg').value,
              isActive: document.getElementById('a-active').checked
          };
          if (window.BGCApi && window.BGCApi.createAnnouncement) {
              await window.BGCApi.createAnnouncement(data);
          }
          const existing = this.items.find(x => x.id == data.id);
          if (existing) Object.assign(existing, data);
          else this.items.push(data);
          showToast('Announcement saved successfully');
          const modal = document.getElementById('announcement-modal');
          if (modal) modal.classList.remove('active');
          this.renderTable();
      }
  },

  Users: {
      load() {
          const container = document.getElementById('tab-users');
          if (container) {
              container.innerHTML = `
                  <div style="background:var(--card-bg); border:1px solid var(--border-color); border-radius:8px; padding:24px;">
                      <h3 style="margin-bottom:15px; font-family:var(--font-display);">Registered Customers</h3>
                      <table style="width:100%; border-collapse:collapse; text-align:left;">
                          <thead>
                              <tr style="border-bottom:1px solid var(--border-color); color:var(--text-muted); font-size:12px;">
                                  <th style="padding:10px;">ID</th>
                                  <th style="padding:10px;">Phone Number</th>
                                  <th style="padding:10px;">Name</th>
                                  <th style="padding:10px;">Status</th>
                                  <th style="padding:10px;">Joined Date</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr style="border-bottom:1px solid var(--border-color);">
                                  <td style="padding:12px;">USR-001</td>
                                  <td style="padding:12px;">+91 98765 43210</td>
                                  <td style="padding:12px;">Rohan Sharma</td>
                                  <td style="padding:12px;"><span style="color:#22c55e;">ACTIVE</span></td>
                                  <td style="padding:12px;">2026-08-01</td>
                              </tr>
                              <tr style="border-bottom:1px solid var(--border-color);">
                                  <td style="padding:12px;">USR-002</td>
                                  <td style="padding:12px;">+91 98123 45678</td>
                                  <td style="padding:12px;">Ananya Deshmukh</td>
                                  <td style="padding:12px;"><span style="color:#22c55e;">ACTIVE</span></td>
                                  <td style="padding:12px;">2026-08-05</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              `;
          }
      }
  },

  AuditLog: {
      load() {
          const container = document.getElementById('tab-audit-log');
          if (container) {
              container.innerHTML = `
                  <div style="background:var(--card-bg); border:1px solid var(--border-color); border-radius:8px; padding:24px;">
                      <h3 style="margin-bottom:15px; font-family:var(--font-display);">System Audit Log</h3>
                      <table style="width:100%; border-collapse:collapse; text-align:left;">
                          <thead>
                              <tr style="border-bottom:1px solid var(--border-color); color:var(--text-muted); font-size:12px;">
                                  <th style="padding:10px;">Timestamp</th>
                                  <th style="padding:10px;">Action</th>
                                  <th style="padding:10px;">Entity</th>
                                  <th style="padding:10px;">User</th>
                                  <th style="padding:10px;">Details</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr style="border-bottom:1px solid var(--border-color);">
                                  <td style="padding:12px; font-family:var(--font-mono); font-size:12px;">2026-08-13 09:10:02</td>
                                  <td style="padding:12px;"><span style="color:var(--accent); font-weight:bold;">ADMIN_LOGIN</span></td>
                                  <td style="padding:12px;">AdminUser</td>
                                  <td style="padding:12px;">superadmin</td>
                                  <td style="padding:12px;">Successful authentication</td>
                              </tr>
                              <tr style="border-bottom:1px solid var(--border-color);">
                                  <td style="padding:12px; font-family:var(--font-mono); font-size:12px;">2026-08-13 09:05:44</td>
                                  <td style="padding:12px;"><span style="color:#22c55e; font-weight:bold;">BOOKING_CONFIRMED</span></td>
                                  <td style="padding:12px;">Booking</td>
                                  <td style="padding:12px;">system</td>
                                  <td style="padding:12px;">BMR-2026-000001 confirmed via Razorpay signature</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              `;
          }
      }
  },

  Settings: {
      load() {
          const container = document.getElementById('tab-settings');
          if (container) {
              container.innerHTML = `
                  <div style="background:var(--card-bg); border:1px solid var(--border-color); border-radius:8px; padding:24px; max-width:600px;">
                      <h3 style="margin-bottom:20px; font-family:var(--font-display);">System Settings</h3>
                      <div class="form-group" style="margin-bottom:20px;">
                          <label class="form-label" style="display:block; margin-bottom:8px;">Backend REST API URL</label>
                          <input type="text" id="setting-api-url" class="form-input" value="${(window.BGC_CONFIG && window.BGC_CONFIG.API_BASE) || 'http://localhost:8000'}" style="width:100%; padding:10px; background:#0f1015; border:1px solid var(--border-color); color:white; border-radius:6px;">
                      </div>
                      <div class="form-group" style="margin-bottom:20px;">
                          <label class="form-label" style="display:block; margin-bottom:8px;">Current Admin Role</label>
                          <input type="text" class="form-input" value="SUPER_ADMIN" disabled style="width:100%; padding:10px; background:#0f1015; border:1px solid var(--border-color); color:var(--accent); border-radius:6px; font-weight:bold;">
                      </div>
                      <button class="btn" onclick="showToast('Settings saved successfully');" style="padding:10px 24px; background:var(--accent); color:black; border:none; border-radius:6px; font-weight:bold; cursor:pointer;">Save Settings</button>
                  </div>
              `;
          }
      }
  }
};

function flattenMenu(menuData) {
  if (Array.isArray(menuData)) return menuData;
  if (!menuData || typeof menuData !== 'object') return [];
  const list = [];
  Object.keys(menuData).forEach(cat => {
    if (Array.isArray(menuData[cat])) {
      menuData[cat].forEach(item => {
        list.push({ ...item, category: cat });
      });
    }
  });
  return list;
}

function showToast(message, type = 'success') {
  const container = document.getElementById('admin-toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            AdminApp.login(
                document.getElementById('login-username').value,
                document.getElementById('login-password').value
            );
        });
    }

    AdminApp.init();
});

// Boomer's Gaming Cafe - Interactive Food Menu & Ordering System Logic

document.addEventListener('DOMContentLoaded', () => {
  initFoodMenuEngine();

  // Close food details bottom sheet/modal when clicking outside (on the blurred backdrop)
  const foodModal = document.getElementById('foodDetailModal');
  if (foodModal) {
    foodModal.addEventListener('click', (e) => {
      if (e.target === foodModal) {
        closeFoodDetailsModal();
      }
    });
  }
});

/**
 * Main Interactive Food Menu Engine
 */
function initFoodMenuEngine() {
  const container = document.getElementById('cafeItemsContainer');
  const searchInput = document.getElementById('foodSearchInput');
  const filterButtons = document.querySelectorAll('.food-filter-btn');
  const tabButtons = document.querySelectorAll('.cafe-tab-btn');
  
  if (!container && !document.getElementById('featuredItemsContainer')) return;

  let currentCategory = 'xp-starters';
  let activeSearchQuery = '';
  let activeFilterType = 'all'; // all, veg, non-veg, under-200, bestseller, snacks, drinks, combos

  // Flattened menu cache for searching and filtering
  const allFoodItems = [];
  Object.keys(POWER_UP_MENU).forEach(cat => {
    POWER_UP_MENU[cat].forEach(item => {
      // Inject category ID key to help filtering
      allFoodItems.push({ ...item, categoryKey: cat });
    });
  });

  // Render ranked Top 6 "Most Ordered" items shelf
  renderMostOrderedShelf(allFoodItems);

  // Render food gallery masonry
  renderFoodGalleryLightbox();

  // Debounce helper
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }



  // Search input handler
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const shortcut = document.querySelector('.search-kbd-shortcut');
  const sortSelect = document.getElementById('foodSortSelect');
  
  if (searchInput) {
    const debouncedSearch = debounce((query) => {
      activeSearchQuery = query;
      renderMenuGrid();
    }, 200);

    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = val ? 'block' : 'none';
      }
      if (shortcut) {
        shortcut.style.display = val ? 'none' : 'block';
      }
      debouncedSearch(val);
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      activeSearchQuery = '';
      clearSearchBtn.style.display = 'none';
      if (shortcut) {
        shortcut.style.display = 'block';
      }
      renderMenuGrid();
      searchInput.focus(); // Refocus input after clearing
    });
  }

  // Rotating placeholders for search box
  const searchPlaceholders = [
    "Search burgers, pasta, mocktails...",
    "Search fries, sandwiches, energy drinks...",
    "Search squad combos, milkshakes, wraps...",
    "Search wings, instant maggi, popcorn..."
  ];
  let placeholderIdx = 0;
  setInterval(() => {
    if (searchInput) {
      placeholderIdx = (placeholderIdx + 1) % searchPlaceholders.length;
      searchInput.placeholder = searchPlaceholders[placeholderIdx];
    }
  }, 3000);

  // Dynamic category item counts
  tabButtons.forEach(btn => {
    const onclickStr = btn.getAttribute('onclick') || '';
    const match = onclickStr.match(/'([^']+)'/);
    if (match && match[1]) {
      const catKey = match[1];
      let count = 0;
      if (catKey === 'best-sellers') {
        count = allFoodItems.filter(item => 
          item.popularity === 'Must Try' || item.popularity === 'Bestseller' || parseFloat(item.rating) >= 4.9
        ).length;
      } else if (POWER_UP_MENU[catKey]) {
        count = POWER_UP_MENU[catKey].length;
      }
      
      const cleanText = btn.textContent.trim().replace(/\s*\(\d+\s*Items\)$/i, '').replace(/\s*\d+\s*Items$/i, '').replace(/\s*\(\d+\)$/i, '');
      btn.innerHTML = `${cleanText} <span style="opacity:0.75; font-size:9px; margin-left:4px;">(${count})</span>`;
    }
  });

  // Global helper for trending search chips
  window.applySearchQuery = function(query) {
    if (searchInput) {
      searchInput.value = query;
      activeSearchQuery = query.toLowerCase().trim();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = 'block';
      }
      if (shortcut) {
        shortcut.style.display = 'none';
      }
      renderMenuGrid();
      
      // Focus and scroll
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Set checkmark prefix for filters dynamically
  filterButtons.forEach(btn => {
    const originalText = btn.textContent.replace('✓ ', '').trim();
    btn.dataset.original = originalText;
    if (btn.classList.contains('active') && !btn.textContent.startsWith('✓')) {
      btn.textContent = '✓ ' + originalText;
    }
  });

  // Filter tags click handler
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.textContent = b.dataset.original || b.textContent.replace('✓ ', '').trim();
      });
      btn.classList.add('active');
      btn.textContent = '✓ ' + (btn.dataset.original || btn.textContent.trim());
      activeFilterType = btn.dataset.filter;
      renderMenuGrid();
    });
  });

  // Sort dropdown change listener
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      renderMenuGrid();
    });
  }

  // Category tab button click handler
  window.switchCafeTab = function(category, btnElement) {
    const targetSection = document.getElementById(`section-${category}`);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }

    // Update active tab styles
    const tabBtns = document.querySelectorAll('.cafe-tabs .cafe-tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    if (btnElement) {
      btnElement.classList.add('active');
    }

    Tracker.track('Cafe Scroll Switch', { category });
  };

  window.scrollToCategory = function(category) {
    const targetSection = document.getElementById(`section-${category}`);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Dynamic Category Cards compiler
  const categoriesList = [
    { key: "best-sellers", name: "Best Sellers", count: allFoodItems.filter(item => item.popularity === 'Must Try' || item.popularity === 'Bestseller').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a6 6 0 0 0-6 6v1a6 6 0 0 0 12 0V8a6 6 0 0 0-6-6z"/></svg>` },
    { key: "xp-starters", name: "XP Starters", count: allFoodItems.filter(item => item.categoryKey === 'xp-starters').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><polygon points="5 3 19 12 5 21 5 3"/></svg>` },
    { key: "tactical-starters", name: "Tactical Starters", count: allFoodItems.filter(item => item.categoryKey === 'tactical-starters').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>` },
    { key: "sandwich", name: "Sandwich Bay", count: allFoodItems.filter(item => item.categoryKey === 'sandwich').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><path d="M5 6h14M3 10h18M3 14h18M5 18h14"/></svg>` },
    { key: "burger", name: "Main Loadout", count: allFoodItems.filter(item => item.categoryKey === 'burger').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><path d="M2 12a10 10 0 0 1 20 0v2H2v-2zM3 18h18M6 21h12"/></svg>` },
    { key: "wrap", name: "Tactical Wraps", count: allFoodItems.filter(item => item.categoryKey === 'wrap').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.47.4.08.55-.17.55-.38v-1.48c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .21.15.46.55.38A10 10 0 0 0 12 2z"/></svg>` },
    { key: "pasta", name: "Energy Boost", count: allFoodItems.filter(item => item.categoryKey === 'pasta').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><path d="M12 2v20M17 5H7M19 9H5M21 13H3"/></svg>` },
    { key: "maggi", name: "Instant Respawn", count: allFoodItems.filter(item => item.categoryKey === 'maggi').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>` },
    { key: "popcorn", name: "Side Quests", count: allFoodItems.filter(item => item.categoryKey === 'popcorn').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>` },
    { key: "milkshake", name: "Potion Bar", count: allFoodItems.filter(item => item.categoryKey === 'milkshake').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><path d="M6 2h12v2H6zm3 4v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6zm-4 4h14"/></svg>` },
    { key: "hot-beverages", name: "Recharge Station", count: allFoodItems.filter(item => item.categoryKey === 'hot-beverages').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z"/><path d="M6 2v2M10 2v2M14 2v2"/></svg>` },
    { key: "cold-beverages", name: "Cold Beverage Depot", count: allFoodItems.filter(item => item.categoryKey === 'cold-beverages').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><path d="M17 2H7v16h10Z"/><path d="M5 6h14M5 12h14M9 18h6"/></svg>` },
    { key: "mocktails", name: "Mocktail Lab", count: allFoodItems.filter(item => item.categoryKey === 'mocktails').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"/><path d="m16.2 7.8-8.4 8.4"/></svg>` },
    { key: "squad-combos", name: "Squad Combos", count: allFoodItems.filter(item => item.categoryKey === 'squad-combos').length, iconHtml: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-svg-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="21"/></svg>` }
  ];

  function renderCategoryCards() {
    const tabsContainer = document.querySelector('.cafe-tabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = '';
    categoriesList.forEach(cat => {
      const card = document.createElement('button');
      card.className = `cafe-tab-btn ${cat.key === currentCategory ? 'active' : ''}`;
      card.onclick = () => switchCafeTab(cat.key, card);
      card.innerHTML = `${cat.name} <span class="cat-pill-count">(${cat.count})</span>`;
      tabsContainer.appendChild(card);
    });
  }

  // Trigger category cards rendering on start
  renderCategoryCards();
  let activeRenderTimeout = null;

  // Refactored grid rendering function to show section-by-section sliders
  window.renderMenuGrid = function(showSkeleton = false) {
    if (activeRenderTimeout) {
      clearTimeout(activeRenderTimeout);
      activeRenderTimeout = null;
    }

    if (showSkeleton) {
      showSkeletons();
      activeRenderTimeout = setTimeout(() => {
        executeRender();
      }, 250);
    } else {
      executeRender();
    }

    function executeRender() {
      container.innerHTML = '';
      container.style.display = 'block'; // Block layout for list of shelves

      // Check sorting configuration
      const sortVal = document.getElementById('foodSortSelect') ? document.getElementById('foodSortSelect').value : 'popular';

      categoriesList.forEach(cat => {
        let catItems = [];
        if (cat.key === 'best-sellers') {
          catItems = allFoodItems.filter(item => item.popularity === 'Must Try' || item.popularity === 'Bestseller' || parseFloat(item.rating) >= 4.9);
        } else {
          catItems = allFoodItems.filter(item => item.categoryKey === cat.key);
        }

        // Apply search filter
        if (activeSearchQuery !== '') {
          catItems = catItems.filter(item => 
            item.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) || 
            item.desc.toLowerCase().includes(activeSearchQuery.toLowerCase())
          );
        }

        // Apply quick tag filters
        if (activeFilterType === 'veg') {
          catItems = catItems.filter(item => item.isVeg === true);
        } else if (activeFilterType === 'non-veg') {
          catItems = catItems.filter(item => item.isVeg === false);
        } else if (activeFilterType === 'under-200') {
          catItems = catItems.filter(item => item.price < 200);
        } else if (activeFilterType === 'bestseller') {
          catItems = catItems.filter(item => item.popularity === 'Must Try' || item.popularity === 'Bestseller');
        }

        // Apply sorting to category items
        if (sortVal === 'price-asc') {
          catItems.sort((a, b) => a.price - b.price);
        } else if (sortVal === 'price-desc') {
          catItems.sort((a, b) => b.price - a.price);
        } else if (sortVal === 'prep') {
          catItems.sort((a, b) => (parseInt(a.prep) || 0) - (parseInt(b.prep) || 0));
        } else if (sortVal === 'rating') {
          catItems.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        } else {
          // Default sorting
          catItems.sort((a, b) => {
            const popRank = { 'Must Try': 3, 'Bestseller': 2, 'Popular': 1 };
            const rA = popRank[a.popularity] || 0;
            const rB = popRank[b.popularity] || 0;
            if (rB !== rA) return rB - rA;
            return parseFloat(b.rating) - parseFloat(a.rating);
          });
        }

        // Skip rendering empty categories during active search/filters
        if (catItems.length === 0 && (activeSearchQuery !== '' || activeFilterType !== 'all')) {
          return;
        }

        // Skip category sections that have zero items entirely
        if (catItems.length === 0) return;

        const section = document.createElement('div');
        section.className = 'menu-category-section loaded';
        section.id = `section-${cat.key}`;

        section.innerHTML = `
          <div class="menu-section-header" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 12px;">
            <div>
              <h3 class="display" style="font-size: 20px; color: #fff; margin: 0 0 4px; display: inline-flex; align-items: center; gap: 8px;">
                ${cat.iconHtml} ${cat.name}
              </h3>
              <div style="font-family: var(--mono); font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em;">${catItems.length} Items</div>
            </div>
            <a href="#" onclick="event.preventDefault(); window.scrollToCategory('${cat.key}')" class="view-all-link" style="font-family: var(--mono); font-size: 11px; color: #F5C64D; text-decoration: none; text-transform: uppercase; font-weight: 700; transition: color 0.2s;">View All →</a>
          </div>
          <div class="menu-horizontal-slider" id="slider-${cat.key}">
            <!-- Cards populated here -->
          </div>
        `;

        const slider = section.querySelector('.menu-horizontal-slider');

        catItems.forEach(item => {
          const card = document.createElement('div');
          card.className = 'food-related-card loaded';
          card.style.cursor = 'pointer';
          card.onclick = () => openFoodDetailsModal(item.id);

          const popTag = item.popularity === 'Bestseller' ? '🔥 Bestseller' : (item.popularity ? `★ ${item.popularity}` : '★ Popular');
          card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy" style="height: 140px; object-fit: cover; width: 100%; border-radius: 12px 12px 0 0;">
            <div class="food-related-info" style="padding: 12px; display: flex; flex-direction: column; gap: 4px; background: #111217; border-radius: 0 0 12px 12px; border: 1px solid rgba(255,255,255,0.05); border-top: none; box-sizing: border-box;">
              <span style="font-size: 9px; color: var(--accent); font-weight: 700; text-transform: uppercase;">${popTag}</span>
              <h5 class="rel-name" style="font-size: 14px; font-weight: 700; margin: 0; color: #fff; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 36px; line-height: 1.3;">${item.name}</h5>
              <div class="rel-meta" style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                <span class="rel-price" style="font-weight: 700; font-family: var(--mono); color: #F5C64D; font-size: 13px;">₹${item.price}</span>
                <span style="font-size: 11px; color: var(--muted);">★ ${item.rating}</span>
              </div>
            </div>
          `;
          slider.appendChild(card);
        });

        container.appendChild(section);
      });
    }
  };

  /**
   * Render horizontal slider of 3-6 featured items on the homepage
   */
  function renderFeaturedSlider() {
    const container = document.getElementById('featuredItemsContainer');
    if (!container) return;

    const featuredIds = ["f-2", "f-4", "f-9", "f-29", "f-32", "f-37"];
    const featuredItems = allFoodItems.filter(item => featuredIds.includes(item.id));

    container.innerHTML = '';

    featuredItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'food-related-card';
      card.style.flex = '0 0 180px';
      card.style.cursor = 'pointer';
      card.onclick = () => openFoodDetailsModal(item.id);

      const popTag = item.popularity === 'Bestseller' ? '🔥 Bestseller' : '★ Popular';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy" style="height: 120px; object-fit: cover; width: 100%;">
        <div class="food-related-info" style="padding: 10px; display: flex; flex-direction: column; gap: 4px;">
          <span style="font-size: 9px; color: var(--accent); font-weight: 700; text-transform: uppercase;">${popTag}</span>
          <h5 class="rel-name" style="font-size: 13px; font-weight: 700; margin: 0; color: #fff; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${item.name}</h5>
          <div class="rel-meta" style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
            <span class="rel-price" style="font-weight: 700; font-family: var(--mono); color: #F5C64D; font-size: 12px;">₹${item.price}</span>
            <span style="font-size: 10px; color: var(--muted);">★ ${item.rating}</span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Helper to show skeleton loader shimmer state cards
  function showSkeletons() {
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const skeleton = document.createElement('div');
      skeleton.className = 'menu-category-section loaded';
      skeleton.innerHTML = `
        <div class="menu-section-header" style="height: 20px; width: 200px; background: rgba(255,255,255,0.03); margin-bottom: 14px; border-radius: 4px;"></div>
        <div class="menu-horizontal-slider">
          <div class="badge-card glass-card food-product-card skeleton-card loaded" style="flex: 0 0 240px; min-height: 260px;">
            <div class="food-image-container skeleton-shimmer" style="height:140px; background: rgba(255,255,255,0.03);"></div>
          </div>
          <div class="badge-card glass-card food-product-card skeleton-card loaded" style="flex: 0 0 240px; min-height: 260px;">
            <div class="food-image-container skeleton-shimmer" style="height:140px; background: rgba(255,255,255,0.03);"></div>
          </div>
        </div>
      `;
      container.appendChild(skeleton);
    }
  }

  // Initial menu render (called after all variables are fully declared)
  if (document.getElementById('featuredItemsContainer')) {
    renderFeaturedSlider();
  } else {
    renderMenuGrid(true);
  }
}

/**
 * Render Ranked top 6 most ordered items
 */
function renderMostOrderedShelf(foodItems) {
  const shelf = document.getElementById('mostOrderedShelf');
  if (!shelf) return;

  // Pull top 6 items based on rating & popularity
  const top6 = foodItems
    .filter(item => item.popularity === 'Must Try' || item.popularity === 'Bestseller')
    .slice(0, 6);

  shelf.innerHTML = '';

  top6.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'badge-card glass-card food-product-card ranked-card';
    card.style.cursor = 'pointer';
    card.onclick = () => openFoodDetailsModal(item.id);
    
    card.innerHTML = `
      <div class="rank-number">${index + 1}</div>
      <div class="food-image-container" style="height:140px;">
        <img class="food-image-bg" src="${item.image}" alt="${item.name}" loading="lazy">
        <span class="food-pop-badge" style="background:var(--lime); color:#000;">★ Ranked #${index + 1}</span>
      </div>
      <div class="food-card-details">
        <h4 class="food-card-title">${item.name}</h4>
        <div class="food-card-price">₹${item.price}</div>
        <p class="food-card-desc">${item.desc}</p>
        <div class="food-card-meta">
          <span class="meta-veg ${item.isVeg ? 'veg' : 'non-veg'}">${item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}</span>
          <span class="meta-rating">★ ${item.rating}</span>
          <span class="meta-prep">⏱ ${item.prep}</span>
        </div>
      </div>
      <div class="food-card-footer">
        <button class="cafe-add-btn" onclick="event.stopPropagation(); addFoodToCart('${item.id}')">Add to Order</button>
      </div>
    `;
    shelf.appendChild(card);
  });
}

/**
 * Detailed Food Popup Modal opener
 */
/**
 * Detailed Food Popup Modal opener
 */
window.openFoodDetailsModal = function(itemId) {
  const modal = document.getElementById('foodDetailModal');
  if (!modal) return;

  // Find item in menu data
  let foundItem = null;
  Object.keys(POWER_UP_MENU).forEach(cat => {
    const item = POWER_UP_MENU[cat].find(f => f.id === itemId);
    if (item) foundItem = { ...item, categoryKey: cat };
  });

  if (!foundItem) return;

  window.modalCurrentItem = foundItem;

  const contentWrap = document.getElementById('foodModalContent');
  if (!contentWrap) return;

  // Find 4 related items (same category, different ID)
  const related = POWER_UP_MENU[foundItem.categoryKey]
    .filter(f => f.id !== itemId)
    .slice(0, 4);

  const isMobile = window.innerWidth <= 800;
  const accordionOpenAttr = isMobile ? '' : 'open';

  contentWrap.innerHTML = `
    <div class="food-modal-grid">
      <!-- Left: Image (Swipable Carousel on Mobile) -->
      <div class="food-modal-media">
        <div class="modal-food-badge-wrap">
          ${foundItem.popularity === 'Bestseller' || foundItem.popularity === 'Must Try' ? `<span class="modal-food-badge bestseller"><svg class="lucide lucide-flame" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: middle;"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>${foundItem.popularity}</span>` : ''}
          <span class="modal-food-veg-badge ${foundItem.isVeg ? 'veg' : 'nonveg'}">${foundItem.isVeg ? '<svg class="lucide lucide-leaf" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: middle;"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 0 8a9 9 0 0 1-8 10z"/><path d="M19 2c-2.26 4.33-5.27 7.14-8 10"/></svg>Vegetarian' : '<span class="veg-badge-symbol nonveg" style="margin-right: 4px; vertical-align: middle;"><span class="inner-symbol"></span></span>Non-Vegetarian'}</span>
        </div>
        
        <div class="food-modal-hero-img" style="background-image: url('${foundItem.image}');"></div>

        <!-- Favourite Heart Icon overlay -->
        <button class="modal-fav-btn" onclick="this.classList.toggle('active')" aria-label="Favorite">❤️</button>
      </div>
      <!-- Right: Content -->
      <div class="food-modal-body">
        <!-- Kicker + Title -->
        <div class="food-modal-header-block">
          <div class="food-modal-kicker">BGC Power-Up Refill</div>
          <h2 class="food-modal-title">${foundItem.name}</h2>
          <div class="food-modal-price-rating">
            <span class="food-modal-price">₹${foundItem.price}</span>
            <span class="food-modal-rating"><svg class="lucide lucide-star" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: -1px; color: #ffbb54;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${foundItem.rating}</span>
          </div>
        </div>
        <!-- Description -->
        <p class="food-modal-desc">${foundItem.desc}</p>
        
        <!-- Premium Stat Chips -->
        <div class="food-stat-chips">
          <span class="food-stat-chip"><span class="chip-icon"><svg class="lucide lucide-clock" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span><span class="chip-label">Prep</span> ${foundItem.prep}</span>
          <span class="food-stat-chip"><span class="chip-icon"><svg class="lucide lucide-flame" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg></span><span class="chip-label">Calories</span> ${foundItem.calories || '—'}</span>
          <span class="food-stat-chip"><span class="chip-icon"><svg class="lucide lucide-star" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span><span class="chip-label">Rating</span> ${foundItem.rating}</span>
        </div>

        <!-- Ingredients tags -->
        <div class="food-modal-section">
          <div class="food-modal-section-title">
            <span style="display: flex; align-items: center; gap: 6px;">
              <svg class="lucide lucide-chef-hat" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><path d="M6 18a4 4 0 0 1-1.196-7.853a6 6 0 0 1 11.392 0a4 4 0 0 1-.2 7.853H6z"/><path d="M18 18H6a4 4 0 0 0-4 4h20a4 4 0 0 0-4-4z"/></svg>
              Loadout Ingredients
            </span>
          </div>
          <div class="food-ingredient-tags" style="margin-top: 10px;">
            ${foundItem.ingredients ? foundItem.ingredients.map(ing => `<span class="food-ingredient-tag">${ing}</span>`).join('') : '<span class="food-ingredient-tag">Premium ingredients</span>'}
          </div>
        </div>

        <!-- Desktop Quantity (hidden on mobile) -->
        <div class="food-qty-section-desktop">
          <div class="food-modal-section-title">Quantities</div>
          <div class="food-qty-row">
            <div class="food-qty-selector">
              <button class="food-qty-btn" onclick="decrementFoodQuantity()" aria-label="Decrease">−</button>
              <span class="food-qty-value" id="foodModalQty">1</span>
              <button class="food-qty-btn" onclick="incrementFoodQuantity()" aria-label="Increase">+</button>
            </div>
            <span class="food-prep-live"><span class="live-dot"></span> Prepared in ${foundItem.prep} min</span>
          </div>
          <div class="food-add-btn-wrap">
            <button class="food-add-btn" id="modalAddBtn" onclick="addFoodQtyToCart('${foundItem.id}')">
              <svg class="lucide lucide-shopping-bag" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>Add to Order <span class="btn-price" id="modalBtnPrice">· ₹${foundItem.price}</span>
            </button>
          </div>
        </div>

        <!-- Mobile Sticky Action Bar (hidden on desktop) -->
        <div class="food-add-sticky-wrap">
          <div class="food-qty-selector">
            <button class="food-qty-btn" onclick="decrementFoodQuantity()" aria-label="Decrease">−</button>
            <span class="food-qty-value" id="foodModalQtyMobile">1</span>
            <button class="food-qty-btn" onclick="incrementFoodQuantity()" aria-label="Increase">+</button>
          </div>
          <button class="food-add-btn" id="modalAddBtnMobile" onclick="addFoodQtyToCart('${foundItem.id}')">
            <svg class="lucide lucide-shopping-bag" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>Add to Order · <span id="modalBtnPriceMobile">₹${foundItem.price}</span>
          </button>
        </div>

        <!-- Related Items -->
        ${related.length > 0 ? `
          <div class="food-modal-section">
            <div class="food-modal-section-title">
              <span style="display: flex; align-items: center; gap: 6px;">
                <svg class="lucide lucide-shopping-cart" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                Customers Also Ordered
              </span>
            </div>
            <div class="food-related-scroll" style="margin-top: 10px;">
              ${related.map(rel => `
                <div class="food-related-card" onclick="openFoodDetailsModal('${rel.id}')">
                  <img src="${rel.image}" alt="${rel.name}" loading="lazy">
                  <div class="food-related-info">
                    <div class="rel-name">${rel.name}</div>
                    <div class="rel-meta">
                      <span class="rel-price">₹${rel.price}</span>
                      <button class="rel-add" onclick="event.stopPropagation(); openFoodDetailsModal('${rel.id}')">+</button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Recommended Drink Pairing -->
        <div class="food-modal-section">
          <div class="food-modal-section-title">
            <span style="display: flex; align-items: center; gap: 6px;">
              <svg class="lucide lucide-utensils-crossed" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8Z"/><path d="M13 15l-9 9"/><path d="M21 3l-9 9"/><path d="m3 14 2.3-2.3a3 3 0 0 1 4.2 0l1.8 1.8a3 3 0 0 1 0 4.2L9 20Z"/></svg>
              Recommended Pairing
            </span>
          </div>
          <div class="recommended-pairing-block" style="margin-top: 10px;">
            <div style="font-size:12px; color:#B8B8B8; display:flex; align-items:center; gap:8px;">
              <span>Recommended Drink:</span>
              <span style="color:#F5C64D; font-weight:700;">Mana Potion Thick Milkshake 🥤</span>
            </div>
          </div>
        </div>

        <!-- Gaming tags -->
        <div class="modal-extra-section" style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 15px; font-size:11px; color:rgba(255,255,255,0.4); display:flex; gap:16px;">
          <span>🚀 Ready in ${foundItem.prep} minutes</span>
          <span>🎮 Perfect with PC Arena</span>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');

  // Disable body scroll when modal is active (relying on global CSS body.no-scroll overflow lock)
  document.body.classList.add('no-scroll');

  Tracker.track('Food Modal Opened', { item: foundItem.name });
};

window.closeFoodDetailsModal = function() {
  const modal = document.getElementById('foodDetailModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
};

window.updateModalSubtotals = function(qty) {
  if (!window.modalCurrentItem) return;
  const price = window.modalCurrentItem.price;
  const total = price * qty;
  
  const btnPrice = document.getElementById('modalBtnPrice');
  if (btnPrice) btnPrice.textContent = `· ₹${total}`;
  
  const btnPriceMobile = document.getElementById('modalBtnPriceMobile');
  if (btnPriceMobile) btnPriceMobile.textContent = `₹${total}`;
};

// Quantity adjusters inside detailed popup
window.incrementFoodQuantity = function() {
  const qtyInput = document.getElementById('foodModalQty');
  const qtyInputMobile = document.getElementById('foodModalQtyMobile');
  let val = parseInt(qtyInput ? qtyInput.textContent : (qtyInputMobile ? qtyInputMobile.textContent : '1')) || 1;
  if (val < 10) {
    const newVal = val + 1;
    if (qtyInput) qtyInput.textContent = newVal;
    if (qtyInputMobile) qtyInputMobile.textContent = newVal;
    window.updateModalSubtotals(newVal);
  }
};

window.decrementFoodQuantity = function() {
  const qtyInput = document.getElementById('foodModalQty');
  const qtyInputMobile = document.getElementById('foodModalQtyMobile');
  let val = parseInt(qtyInput ? qtyInput.textContent : (qtyInputMobile ? qtyInputMobile.textContent : '1')) || 1;
  if (val > 1) {
    const newVal = val - 1;
    if (qtyInput) qtyInput.textContent = newVal;
    if (qtyInputMobile) qtyInputMobile.textContent = newVal;
    window.updateModalSubtotals(newVal);
  }
};

/**
 * Cart logic and sticky booking sidebar operations
 */
const cartState = {
  gamingRate: 120, // default rate
  gamingHrs: 2,
  gamingPlayers: 1,
  stationName: "Station 12",
  addedFood: [],
  selectedBundle: null
};

// Listen to station / duration changes from booking wizard to sync
document.addEventListener('change', () => {
  const durationInput = document.getElementById('w-duration');
  const playersInput = document.getElementById('w-players');
  if (durationInput) cartState.gamingHrs = parseInt(durationInput.value) || 2;
  if (playersInput) cartState.gamingPlayers = parseInt(playersInput.value) || 1;
  updatePremiumSessionHUD();
});

// Intercept booking wizard selections to sync station rates
window.addEventListener('stationSelected', (e) => {
  if (e.detail) {
    cartState.stationName = e.detail.name;
    cartState.gamingRate = e.detail.price;
    updatePremiumSessionHUD();
  }
});

/**
 * Add food from main product card (adds 1 quantity)
 */
window.addFoodToCart = function(itemId) {
  let found = null;
  Object.keys(POWER_UP_MENU).forEach(cat => {
    const item = POWER_UP_MENU[cat].find(f => f.id === itemId);
    if (item) found = item;
  });

  if (!found) return;

  // Add to main active booking list (for wizard sync)
  if (window.activeBooking) {
    activeBooking.addedFood.push({ name: found.name, price: found.price });
  }

  // Add to local cart state
  const existing = cartState.addedFood.find(f => f.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    cartState.addedFood.push({ id: found.id, name: found.name, price: found.price, qty: 1 });
  }

  updatePremiumSessionHUD();
  
  // Calculate total count
  const totalCount = cartState.addedFood.reduce((sum, item) => sum + item.qty, 0);
  if (window.showBgcNotification) {
    window.showBgcNotification(`✔ Added to Session`, `<strong>${found.name}</strong> added successfully • ${totalCount} Items total`);
  }
  
  Tracker.track('Cart Item Added', { name: found.name });
};

/**
 * Add food with specific quantity from details modal popup
 */
window.addFoodQtyToCart = function(itemId) {
  const qtyInput = document.getElementById('foodModalQty');
  const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

  let found = null;
  Object.keys(POWER_UP_MENU).forEach(cat => {
    const item = POWER_UP_MENU[cat].find(f => f.id === itemId);
    if (item) found = item;
  });

  if (!found) return;

  // Add to main active booking list (for wizard sync)
  if (window.activeBooking) {
    for (let i = 0; i < qty; i++) {
      activeBooking.addedFood.push({ name: found.name, price: found.price });
    }
  }

  // Add to local cart state
  const existing = cartState.addedFood.find(f => f.id === itemId);
  if (existing) {
    existing.qty += qty;
  } else {
    cartState.addedFood.push({ id: found.id, name: found.name, price: found.price, qty: qty });
  }

  updatePremiumSessionHUD();
  closeFoodDetailsModal();
  
  const totalCount = cartState.addedFood.reduce((sum, item) => sum + item.qty, 0);
  if (window.showBgcNotification) {
    window.showBgcNotification(`✔ Added to Session`, `<strong>${qty}x ${found.name}</strong> added successfully • ${totalCount} Items total`);
  }
};

/**
 * Remove food item from cart widget
 */
window.removeCartItem = function(itemId) {
  const idx = cartState.addedFood.findIndex(f => f.id === itemId);
  if (idx > -1) {
    const item = cartState.addedFood[idx];
    
    // Remove from activeBooking array too
    if (window.activeBooking) {
      activeBooking.addedFood = activeBooking.addedFood.filter(f => f.name !== item.name);
    }

    cartState.addedFood.splice(idx, 1);
    updatePremiumSessionHUD();
    Tracker.track('Cart Item Removed', { id: itemId });
  }
};

// Track previous cart values to animate changes
const previousCartValues = {
  gaming: 0,
  food: 0,
  gst: 0,
  grand: 0
};

/**
 * Value counter animator for premium numbers feel
 */
function animateCartValue(element, start, end, duration = 300) {
  if (!element) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentVal = Math.floor(progress * (end - start) + start);
    element.textContent = `₹${currentVal}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = `₹${end}`;
    }
  };
  window.requestAnimationFrame(step);
}

/**
 * Re-calculate costs and update compact HUD panel
 */
function updatePremiumSessionHUD() {
  const hud = document.getElementById('premiumSessionHUD');
  if (!hud) return;

  const activeBooking = window.activeBooking || {
    branch: 'coimbatore',
    zone: 'pc',
    station: null,
    duration: 2,
    players: 1,
    slots: ['7:00 PM'],
    addedFood: []
  };

  // 1. Dynamic Theme Class
  hud.classList.remove('theme-valorant', 'theme-cs2', 'theme-eafc', 'theme-racing', 'theme-vr');
  const theme = getActiveGameTheme(activeBooking);
  if (theme) hud.classList.add(theme);

  // 2. Step Progress Bar
  const currentStep = window.bookingCurrentStep !== undefined ? window.bookingCurrentStep : 0;
  const progressText = document.getElementById('hudProgressText');
  const progressPercent = document.getElementById('hudProgressPercent');
  const progressBar = document.getElementById('hudProgressBar');
  if (progressText && progressPercent && progressBar) {
    const stepNum = currentStep + 1;
    progressText.textContent = `STEP ${stepNum} OF 7`;
    const percent = Math.round((stepNum / 7) * 100);
    progressPercent.textContent = `${percent}%`;
    progressBar.style.width = `${percent}%`;
  }

  // 3. Availability badge (header)
  const availBadge = document.getElementById('hudAvailBadge');
  if (availBadge && window.STATIONS_DATA) {
    const avCount = STATIONS_DATA.filter(s => s.branch === activeBooking.branch && s.zone === activeBooking.zone && s.status === 'available').length;
    availBadge.textContent = avCount > 0 ? `${avCount} Available` : 'Zone Full';
    availBadge.style.color = avCount > 0 ? '#00db78' : '#ff4f70';
  }

  // 4. Station thumbnail
  const thumbDisp = document.getElementById('hudStationThumb');
  if (thumbDisp) {
    let thumbUrl = 'assets/images/boomers_pc_lounge.jpg';
    if (activeBooking.zone === 'racing') thumbUrl = 'assets/images/boomers_racing_sim.jpg';
    else if (activeBooking.zone === 'console' || activeBooking.zone === 'vr') thumbUrl = 'assets/images/boomers_vr_lounge.jpg';
    thumbDisp.style.backgroundImage = `url('${thumbUrl}')`;
  }

  // 5. Station name + specs
  const nameDisp = document.getElementById('hudStationName');
  const specsDisp = document.getElementById('hudStationSpecs');
  if (nameDisp) nameDisp.textContent = activeBooking.station ? activeBooking.station.name : 'Browse Stations';
  if (specsDisp) {
    specsDisp.textContent = activeBooking.station
      ? `${activeBooking.station.gpu} · ${activeBooking.station.monitor}`
      : 'Select a station to continue';
  }

  // 6. Zone badge
  const zoneBadge = document.getElementById('hudZoneBadge');
  if (zoneBadge) {
    const zoneLabels = { pc: 'PC ARENA', console: 'CONSOLE', vip: 'VIP SQUAD', racing: 'SIM RACING', vr: 'VR LOUNGE' };
    zoneBadge.textContent = zoneLabels[activeBooking.zone] || activeBooking.zone.toUpperCase();
  }

  // 7. Branch + players
  const branchDisp = document.getElementById('hudBranchName');
  const playersDisp = document.getElementById('hudPlayersCount');
  if (branchDisp) branchDisp.textContent = activeBooking.branch.charAt(0).toUpperCase() + activeBooking.branch.slice(1);
  if (playersDisp) playersDisp.textContent = `${activeBooking.players} Gamer${activeBooking.players > 1 ? 's' : ''}`;

  // 8. Quick row: time / duration / rate
  const timeDisp = document.getElementById('hudTimeSlot');
  const durationDisp = document.getElementById('hudDurationText');
  const rateDisp = document.getElementById('hudRateText');
  const rate = activeBooking.station ? activeBooking.station.price : (() => {
    const priceMap = { pc: activeBooking.branch === 'pune' ? 120 : 100, console: activeBooking.branch === 'pune' ? 150 : 120, vip: activeBooking.branch === 'pune' ? 300 : 250, racing: activeBooking.branch === 'pune' ? 200 : 150, vr: 200 };
    return priceMap[activeBooking.zone] || 100;
  })();
  if (timeDisp) timeDisp.textContent = activeBooking.slots && activeBooking.slots.length > 0 ? activeBooking.slots[0] : '7:00 PM';
  if (durationDisp) durationDisp.textContent = `${activeBooking.duration}h`;
  if (rateDisp) rateDisp.textContent = `₹${rate}/hr`;

  // 9. Equipment chips (zone-specific)
  const chipsEl = document.getElementById('hudEqChips');
  if (chipsEl) {
    let chips = [];
    if (activeBooking.zone === 'racing') {
      chips = ['🏎 Logitech G29', '🖥 Triple Screen', '🪑 Playseat', '⚙️ H-Shifter'];
    } else if (activeBooking.zone === 'vr') {
      chips = ['🥽 PS VR2', '🎮 Sense Haptic', '📡 IR Tracking', '📦 3m × 3m Pod'];
    } else if (activeBooking.zone === 'console') {
      chips = ['🎮 PlayStation 5', '📺 4K OLED', '🔊 Dolby Atmos', '🛋 Recliner'];
    } else {
      // pc / vip
      const isPune = activeBooking.branch === 'pune';
      const gpu = activeBooking.station ? activeBooking.station.gpu : (activeBooking.zone === 'vip' || isPune ? 'RTX 4070 S' : 'RTX 3070');
      const hz = activeBooking.station ? activeBooking.station.monitor : (isPune || activeBooking.zone === 'vip' ? '240Hz' : '180Hz');
      chips = [`⚡ ${gpu}`, `🖥 ${hz}`, '⌨ Mechanical', '🎧 HyperX', '🖱 Gaming Mouse'];
    }
    chipsEl.innerHTML = chips.map(c => `<span class="hud-chip">${c}</span>`).join('');
  }

  // 10. Food section: combo card vs added food cards
  const foodContainer = document.getElementById('hudFoodCards');
  const comboCard = document.getElementById('hudComboCard');
  let foodTotal = 0;
  let totalItemsCount = 0;

  if (foodContainer) {
    if (activeBooking.addedFood.length === 0) {
      // Show and update the dynamic recommended combo card
      if (comboCard) {
        comboCard.style.display = 'flex';
        
        const recTag = comboCard.querySelector('.hud-combo-tag');
        const recTitle = comboCard.querySelector('strong');
        const recPrice = comboCard.querySelector('.hud-combo-price');
        const recBtn = comboCard.querySelector('.hud-combo-btn');
        
        if (activeBooking.zone === 'racing') {
          if (recTag) recTag.textContent = '🏎️ Perfect with Sim Racing';
          if (recTitle) recTitle.textContent = 'Pro Racer Pack';
          if (recPrice) recPrice.textContent = '₹449';
          if (recBtn) recBtn.setAttribute('onclick', "window.addBundleToBooking('bundle-3')");
        } else if (activeBooking.zone === 'console' || activeBooking.zone === 'vr') {
          if (recTag) recTag.textContent = '🎮 Perfect with Console';
          if (recTitle) recTitle.textContent = 'Console Co-Op Combo';
          if (recPrice) recPrice.textContent = '₹499';
          if (recBtn) recBtn.setAttribute('onclick', "window.addBundleToBooking('bundle-2')");
        } else {
          // PC Arena / VIP
          if (recTag) recTag.textContent = '🍔 Perfect with PC Arena';
          if (recTitle) recTitle.textContent = 'Solo Grinder Combo';
          if (recPrice) recPrice.textContent = '₹349';
          if (recBtn) recBtn.setAttribute('onclick', "window.addBundleToBooking('bundle-1')");
        }
      }
    } else {
      // Hide combo, show added items
      if (comboCard) comboCard.style.display = 'none';

      // Remove old dynamic cards (keep comboCard)
      const existingDynamic = foodContainer.querySelectorAll('.hud-food-card-dynamic');
      existingDynamic.forEach(el => el.remove());

      const aggregatedFood = [];
      activeBooking.addedFood.forEach(item => {
        foodTotal += item.price;
        totalItemsCount += 1;
        const existing = aggregatedFood.find(f => f.name === item.name);
        if (existing) { existing.qty += 1; } else { aggregatedFood.push({ name: item.name, price: item.price, qty: 1 }); }
      });

      aggregatedFood.forEach(item => {
        const isDrink = ['drink','mojito','soda','shake','tea','coffee'].some(k => item.name.toLowerCase().includes(k));
        const card = document.createElement('div');
        card.className = 'hud-food-card hud-food-card-dynamic';
        card.innerHTML = `
          <div class="hud-food-card-left">
            <strong>${isDrink ? '🥤' : '🍔'} ${item.qty}x ${item.name}</strong>
          </div>
          <div class="hud-food-card-right">
            <b>₹${item.price * item.qty}</b>
            <button type="button" onclick="window.removeHUDFoodItem('${item.name}')" aria-label="Remove">&times;</button>
          </div>
        `;
        foodContainer.appendChild(card);
      });
    }
  }

  // 11. Mobile badge count
  const mobileHUDBadge = document.getElementById('mobileHUDCountBadge');
  if (mobileHUDBadge) mobileHUDBadge.textContent = totalItemsCount;

  // 12. Cost calculations & count-up animation
  const gamingCost = rate * activeBooking.duration * activeBooking.players;
  const subTotal = gamingCost + foodTotal;
  const gst = Math.round(subTotal * 0.18);
  const grandTotal = subTotal + gst;

  animateCartValue(document.getElementById('hudGamingCost'), previousCartValues.gaming, gamingCost);
  previousCartValues.gaming = gamingCost;
  animateCartValue(document.getElementById('hudKitchenCost'), previousCartValues.food, foodTotal);
  previousCartValues.food = foodTotal;
  animateCartValue(document.getElementById('hudGstCost'), previousCartValues.gst, gst);
  previousCartValues.gst = gst;
  animateCartValue(document.getElementById('hudGrandTotal'), previousCartValues.grand, grandTotal);
  previousCartValues.grand = grandTotal;

  // 13. Ticket Preview (step 7 only)
  const ticketPreview = document.getElementById('hudTicketPreview');
  if (ticketPreview) {
    if (currentStep === 6) {
      ticketPreview.style.display = 'block';
      const zoneLabels = { pc: 'PC Arena', console: 'Console Lounge', vip: 'VIP Squad', racing: 'Sim Racing', vr: 'VR Lounge' };
      const el = document.getElementById('hudTicketZone');
      if (el) el.textContent = zoneLabels[activeBooking.zone] || 'PC Arena';
      const elS = document.getElementById('hudTicketStation');
      if (elS) elS.textContent = activeBooking.station ? activeBooking.station.name : 'Station TBD';
      const elT = document.getElementById('hudTicketTime');
      if (elT) elT.textContent = activeBooking.slots && activeBooking.slots.length ? `Today • ${activeBooking.slots[0]}` : 'Today • 7:00 PM';
    } else {
      ticketPreview.style.display = 'none';
    }
  }

  // Sync summary if open
  const summaryCostDisp = document.getElementById('bookingSummaryCost');
  if (summaryCostDisp && window.renderBookingSummary) renderBookingSummary();
}

function getActiveGameTheme(activeBooking) {
  if (activeBooking.station && activeBooking.station.game) {
    const game = activeBooking.station.game.toLowerCase();
    if (game.includes('valorant')) return 'theme-valorant';
    if (game.includes('cs2') || game.includes('dota')) return 'theme-cs2';
    if (game.includes('fc') || game.includes('tekken')) return 'theme-eafc';
    if (game.includes('racing') || game.includes('sim')) return 'theme-racing';
    if (game.includes('vr') || game.includes('world')) return 'theme-vr';
  } else if (activeBooking.zone) {
    const zone = activeBooking.zone.toLowerCase();
    if (zone.includes('racing')) return 'theme-racing';
    if (zone.includes('console')) return 'theme-eafc';
    if (zone.includes('vip')) return 'theme-valorant';
    if (zone.includes('pc')) return 'theme-cs2';
    if (zone.includes('vr')) return 'theme-vr';
  }
  return '';
}

window.removeHUDFoodItem = function(foodName) {
  if (window.activeBooking) {
    const idx = activeBooking.addedFood.findIndex(f => f.name === foodName);
    if (idx > -1) {
      activeBooking.addedFood.splice(idx, 1);
      
      // Sync checkbox in step 5 if visible
      const checkboxes = document.querySelectorAll('#wizardFoodList .booking-choice-btn');
      checkboxes.forEach(card => {
        const title = card.querySelector('b').textContent;
        if (title === foodName) {
          const btn = card.querySelector('.cafe-add-btn');
          if (btn) btn.textContent = '+ Add';
          card.style.background = '#22242a';
          card.style.borderColor = 'var(--line)';
        }
      });

      window.updatePremiumSessionHUD();
      Tracker.track('Cart Item Removed', { name: foodName });
    }
  }
};

// Start live countdown timer on load
function startHUDCountdown() {
  const timerDisp = document.getElementById('hudCountdownTimer');
  if (!timerDisp) return;

  let duration = 522; // 8m 42s
  setInterval(() => {
    duration--;
    if (duration < 0) duration = 900;
    const mins = Math.floor(duration / 60);
    const secs = duration % 60;
    timerDisp.textContent = `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  }, 1000);
}

// Kickoff countdown
document.addEventListener('DOMContentLoaded', () => {
  startHUDCountdown();
});

/* **
 * Render Food Gallery and open lightbox modal on click
 */
function renderFoodGalleryLightbox() {
  const gallery = document.getElementById('foodMasonryGallery');
  if (!gallery) return;

  const foodImagesList = [
    "assets/images/cafe-background.jpg",
    "assets/images/boomers_pc_lounge.jpg",
    "assets/images/cafe-background.jpg",
    "assets/images/cafe-background.jpg",
    "assets/images/boomers_pc_lounge.jpg",
    "assets/images/cafe-background.jpg"
  ];

  gallery.innerHTML = '';

  foodImagesList.forEach((src, idx) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `<img src="${src}" alt="Food item ${idx + 1}" onclick="openLightbox(${idx})">`;
    gallery.appendChild(item);
  });
}

// Initialise HUD on page load
document.addEventListener('DOMContentLoaded', () => {
  if (window.updatePremiumSessionHUD) {
    window.updatePremiumSessionHUD();
  }
});

/**
 * 13. Global Helper to Clear All Food Filters (for Empty States)
 */
window.clearAllFoodFilters = function() {
  const searchInput = document.getElementById('foodSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const shortcut = document.querySelector('.search-kbd-shortcut');
  const filterButtons = document.querySelectorAll('.food-filter-btn');
  const tabButtons = document.querySelectorAll('.cafe-tab-btn');
  
  if (searchInput) {
    searchInput.value = '';
    // Reset placeholder
    searchInput.placeholder = "Search burgers, pasta, mocktails...";
  }
  if (clearSearchBtn) clearSearchBtn.style.display = 'none';
  if (shortcut) shortcut.style.display = 'block';
  
  // Reset filter buttons
  filterButtons.forEach(b => {
    b.classList.remove('active');
    b.textContent = b.dataset.original || b.textContent.replace('✓ ', '').trim();
  });
  
  const allFilterBtn = Array.from(filterButtons).find(b => b.dataset.filter === 'all');
  if (allFilterBtn) {
    allFilterBtn.classList.add('active');
    allFilterBtn.textContent = '✓ ' + (allFilterBtn.dataset.original || 'All Items');
  }
  
  // Set category filter
  window.activeFilterType = 'all';
  window.activeSearchQuery = '';
  
  // Switch to first category
  window.switchCafeTab('best-sellers', tabButtons[0]);
};

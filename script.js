/* ============================================================
   LOVE WINGS CAFE & RESTRO — script.js
   ============================================================ */

'use strict';

/* ── THEME ────────────────────────────────────────────────── */
(function initTheme() {
  const stored = localStorage.getItem('lw-theme');
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = stored || preferred;
  document.documentElement.setAttribute('data-theme', theme);
})();

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('lw-theme', theme);
  const musicTitle = document.getElementById('musicTitle');
  if (musicTitle) {
    musicTitle.textContent = theme === 'dark' ? 'Lo-fi Piano Lounge' : 'Soft Café Jazz';
  }
}

document.getElementById('themeToggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});


/* ── NAVBAR ───────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backTop').classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

hamburgerBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburgerBtn.classList.toggle('open', isOpen);
  hamburgerBtn.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    mobileMenu.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

const observeSection = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => observeSection.observe(s));


/* ── SCROLL REVEAL ────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));


/* ── COUNTER ANIMATION ────────────────────────────────────── */
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      if (!isNaN(target)) animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));


/* ── BACK TO TOP ──────────────────────────────────────────── */
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ── MENU DATA ────────────────────────────────────────────── */
const menuItems = [
  {
    category: 'starters',
    name: 'Crispy Paneer Tikka',
    desc: 'Char-kissed cottage cheese marinated in house spices, served with mint chutney and slaw.',
    price: '₹220',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80',
    alt: 'Crispy paneer tikka on a slate board with green chutney'
  },
  {
    category: 'starters',
    name: 'Truffle Mushroom Bruschetta',
    desc: 'Toasted sourdough topped with sautéed wild mushrooms and a truffle oil drizzle.',
    price: '₹180',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80',
    alt: 'Mushroom bruschetta on toasted sourdough'
  },
  {
    category: 'mains',
    name: 'Dal Makhani Reserve',
    desc: 'Slow-cooked overnight black lentils in a velvety tomato-butter sauce — our most beloved dish.',
    price: '₹280',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80',
    alt: 'Dal makhani in a dark copper bowl with cream swirl'
  },
  {
    category: 'mains',
    name: 'Malai Kofta Royale',
    desc: 'Cashew-stuffed cottage cheese dumplings in a rich onion-tomato gravy with saffron notes.',
    price: '₹320',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&q=80',
    alt: 'Malai kofta curry with naan bread'
  },
  {
    category: 'mains',
    name: 'Stone Oven Naan Trio',
    desc: 'Three artisan flatbreads — garlic butter, stuffed onion, and classic plain — straight from the tandoor.',
    price: '₹120',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
    alt: 'Three varieties of freshly baked naan bread'
  },
  {
    category: 'desserts',
    name: 'Rose Gulab Jamun',
    desc: 'Cardamom-spiced milk dumplings soaked in rose-water syrup with pistachio crumble.',
    price: '₹150',
    image: 'https://images.unsplash.com/photo-1666471705154-43af8bf7e2a7?w=600&q=80',
    alt: 'Gulab jamun dessert with rose petals'
  },
  {
    category: 'desserts',
    name: 'Belgian Chocolate Kulfi',
    desc: 'House-churned ice cream blended with single-origin Belgian cocoa and crushed almonds.',
    price: '₹175',
    image: 'https://images.unsplash.com/photo-1633933358116-a27b902fad35?w=600&q=80',
    alt: 'Chocolate kulfi ice cream on a stick'
  },
  {
    category: 'drinks',
    name: 'Saffron Rose Lassi',
    desc: 'Thick hand-churned yoghurt blended with Kashmiri saffron, gulkand, and chilled rose water.',
    price: '₹120',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80',
    alt: 'Saffron lassi in a tall glass with rose petals'
  },
  {
    category: 'drinks',
    name: 'Cold Brew Chai',
    desc: 'Indian spiced tea cold-brewed for 12 hours, poured over ice with a splash of oat milk.',
    price: '₹110',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
    alt: 'Cold brew chai over ice in a glass'
  }
];

function renderMenu(category = 'all') {
  const grid = document.getElementById('menuGrid');
  const filtered = category === 'all' ? menuItems : menuItems.filter(m => m.category === category);

  grid.innerHTML = '';
  filtered.forEach((item, i) => {
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.setAttribute('aria-label', item.name);
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="menu-img-wrap">
        <img class="menu-img" src="${item.image}" alt="${item.alt}" loading="lazy" />
        <div class="menu-badge" aria-label="Chef's Pick">Chef's Pick</div>
        <div class="menu-veg" aria-label="Vegetarian"></div>
      </div>
      <div class="menu-body">
        <h3 class="menu-name">${item.name}</h3>
        <p class="menu-desc">${item.desc}</p>
        <div class="menu-footer">
          <span class="menu-price">${item.price}</span>
          <a href="https://wa.me/911234567890?text=I'd+like+to+order+${encodeURIComponent(item.name)}" 
             class="menu-order" target="_blank" rel="noopener noreferrer" aria-label="Order ${item.name}">Order →</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

renderMenu();

document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    renderMenu(tab.dataset.category);
  });
});


/* ── GALLERY ──────────────────────────────────────────────── */
const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    alt: 'Elegant romantic table setting with warm candles and flowers at Love Wings Cafe'
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    alt: 'Interior view of Love Wings Cafe dining area with warm ambient lighting'
  },
  {
    src: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80',
    alt: 'Chef\'s signature paneer tikka dish beautifully plated'
  },
  {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    alt: 'Restaurant bar area with premium beverages display'
  },
  {
    src: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80',
    alt: 'Private dining cabin setup for special occasions'
  },
  {
    src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
    alt: 'Chef preparing artisan dish in Love Wings kitchen'
  },
  {
    src: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&q=80',
    alt: 'Beautifully presented dessert with garnish'
  },
  {
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    alt: 'Event hall setup with floral decorations for celebrations'
  }
];

let lightboxIndex = 0;

function openLightbox(index) {
  lightboxIndex = index;
  updateLightbox();
  const lb = document.getElementById('lightbox');
  lb.hidden = false;
  lb.focus();
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').hidden = true;
  document.body.style.overflow = '';
}

function updateLightbox() {
  const img = document.getElementById('lbImg');
  const counter = document.getElementById('lbCounter');
  const item = galleryImages[lightboxIndex];
  img.src = item.src;
  img.alt = item.alt;
  counter.textContent = `${lightboxIndex + 1} / ${galleryImages.length}`;
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightbox();
}

function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
  updateLightbox();
}

// Build gallery
const galleryGrid = document.getElementById('galleryGrid');
galleryImages.forEach((img, i) => {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  item.setAttribute('role', 'listitem');
  item.setAttribute('tabindex', '0');
  item.setAttribute('aria-label', `View photo: ${img.alt}`);
  item.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy" />`;
  item.addEventListener('click', () => openLightbox(i));
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
  });
  galleryGrid.appendChild(item);
});

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', lightboxPrev);
document.getElementById('lbNext').addEventListener('click', lightboxNext);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (document.getElementById('lightbox').hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev();
  if (e.key === 'ArrowRight') lightboxNext();
});

// Touch swipe for lightbox
let touchStartX = 0;
const lightboxEl = document.getElementById('lightbox');
lightboxEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightboxEl.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) diff > 0 ? lightboxNext() : lightboxPrev();
});

// Click outside image to close
lightboxEl.addEventListener('click', (e) => {
  if (e.target === lightboxEl || e.target.classList.contains('lb-img-wrap')) closeLightbox();
});


/* ── REVIEWS ──────────────────────────────────────────────── */
const reviewsData = [
  {
    name: 'Priya Sharma',
    initials: 'PS',
    platform: 'Google Review',
    stars: 5,
    text: '"Came here for our anniversary and the private cabin experience was beyond magical. The staff set up rose petals without even being asked. The dal makhani alone is worth the trip!"'
  },
  {
    name: 'Rahul Verma',
    initials: 'RV',
    platform: 'Google Review',
    stars: 5,
    text: '"Love Wings is hands down the best vegetarian restaurant in Mathura. The ambiance feels like a luxury hotel, and the saffron lassi is something I dream about."'
  },
  {
    name: 'Ananya Gupta',
    initials: 'AG',
    platform: 'Google Review',
    stars: 4,
    text: '"Brought my parents here for their anniversary dinner. They were absolutely thrilled. The couple lounge gives you genuine privacy and the food quality is consistently excellent."'
  },
  {
    name: 'Vikram Singh',
    initials: 'VS',
    platform: 'Google Review',
    stars: 5,
    text: "Organized a birthday celebration in the event hall and the team went above and beyond. Customised décor, live paneer counter, and the most attentive service I've seen."
  },
  {
    name: 'Sneha Jain',
    initials: 'SJ',
    platform: 'Google Review',
    stars: 5,
    text: '"Every single dish here is made with love — you can taste it. The malai kofta has a depth of flavour that rivals upscale Delhi restaurants. Will return every month."'
  },
  {
    name: 'Arjun Mishra',
    initials: 'AM',
    platform: 'Google Review',
    stars: 4,
    text: '"Surprised my girlfriend here and she said it was the most romantic evening of her life. The dim lighting, the music, the food — everything perfectly curated."'
  }
];

const reviewsTrack = document.getElementById('reviewsTrack');
const reviewsDots = document.getElementById('reviewsDots');
let reviewIndex = 0;
let reviewTimer = null;

function buildReviews() {
  reviewsData.forEach((rev, i) => {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', `Review by ${rev.name}`);

    const stars = Array(5).fill(0).map((_, s) =>
      `<span aria-hidden="true">${s < rev.stars ? '★' : '☆'}</span>`
    ).join('');

    card.innerHTML = `
      <div class="review-header">
        <div class="review-avatar" aria-hidden="true">${rev.initials}</div>
        <div class="review-meta">
          <p class="review-name">${rev.name}</p>
          <p class="review-platform">${rev.platform}</p>
        </div>
      </div>
      <div class="review-stars" aria-label="${rev.stars} out of 5 stars">${stars}</div>
      <p class="review-text">${rev.text}</p>
    `;
    reviewsTrack.appendChild(card);

    const dot = document.createElement('button');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Review ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToReview(i));
    reviewsDots.appendChild(dot);
  });
}

function goToReview(index) {
  reviewIndex = index;
  const card = reviewsTrack.querySelector('.review-card');
  if (!card) return;
  const cardWidth = card.offsetWidth + 24; // gap
  reviewsTrack.style.transform = `translateX(-${index * cardWidth}px)`;

  document.querySelectorAll('.reviews-dots button').forEach((d, i) => {
    d.classList.toggle('active', i === index);
    d.setAttribute('aria-selected', i === index);
  });
}

function autoScroll() {
  reviewTimer = setInterval(() => {
    reviewIndex = (reviewIndex + 1) % reviewsData.length;
    goToReview(reviewIndex);
  }, 5000);
}

buildReviews();
autoScroll();

// Pause on hover
const reviewsSection = document.getElementById('reviews');
reviewsSection.addEventListener('mouseenter', () => clearInterval(reviewTimer));
reviewsSection.addEventListener('mouseleave', autoScroll);

// Touch swipe
let revTouchX = 0;
reviewsTrack.addEventListener('touchstart', e => { revTouchX = e.touches[0].clientX; }, { passive: true });
reviewsTrack.addEventListener('touchend', e => {
  const diff = revTouchX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    reviewIndex = diff > 0
      ? Math.min(reviewIndex + 1, reviewsData.length - 1)
      : Math.max(reviewIndex - 1, 0);
    goToReview(reviewIndex);
  }
});

// Update carousel on resize
window.addEventListener('resize', () => goToReview(reviewIndex), { passive: true });


/* ── RESERVATION WIZARD ───────────────────────────────────── */
let currentStep = 1;
const totalSteps = 4;
let guestCount = 2;

function updateProgress(step) {
  const wizard = document.querySelector('.wizard-wrap');
  wizard.setAttribute('data-step', step);
  document.querySelector('.wizard-progress').setAttribute('aria-valuenow', step);

  document.querySelectorAll('.progress-step').forEach((s, i) => {
    s.classList.remove('active', 'completed');
    if (i + 1 === step) s.classList.add('active');
    if (i + 1 < step) s.classList.add('completed');
  });

  document.getElementById('progressBar').setAttribute('data-step', step);
  const bar = document.getElementById('progressBar');
  bar.style.setProperty('--progress', `${(step / totalSteps) * 100}%`);
}

function showStep(step) {
  document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
  document.getElementById(`step${step}`).classList.add('active');
  updateProgress(step);
  currentStep = step;
}

window.wizardNext = function(step) {
  const errorEl = document.getElementById(`error${step}`);
  if (errorEl) errorEl.textContent = '';

  if (step === 1) {
    const chosen = document.querySelector('input[name="experience"]:checked');
    if (!chosen) {
      errorEl.textContent = 'Please select an experience to continue.';
      return;
    }
  }

  if (step === 2) {
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    if (!date || !time) {
      errorEl.textContent = 'Please select both a date and time.';
      return;
    }
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (selected < today) {
      errorEl.textContent = 'Please choose a future date.';
      return;
    }
  }

  showStep(step + 1);
};

window.wizardPrev = function(step) {
  showStep(step - 1);
};

// Guest counter
const guestCountEl = document.getElementById('guestCount');
document.getElementById('guestMinus').addEventListener('click', () => {
  if (guestCount > 1) { guestCount--; guestCountEl.textContent = guestCount; }
});
document.getElementById('guestPlus').addEventListener('click', () => {
  if (guestCount < 50) { guestCount++; guestCountEl.textContent = guestCount; }
});

window.submitReservation = function() {
  const name = document.getElementById('resName').value.trim();
  const phone = document.getElementById('resPhone').value.trim();
  const errorEl = document.getElementById('error4');
  errorEl.textContent = '';

  if (!name) { errorEl.textContent = 'Please enter your full name.'; return; }
  if (!phone || phone.length < 10) { errorEl.textContent = 'Please enter a valid phone number.'; return; }

  // Build WhatsApp message
  const exp = document.querySelector('input[name="experience"]:checked')?.value || '';
  const date = document.getElementById('resDate').value;
  const time = document.getElementById('resTime').value;
  const occasion = document.getElementById('occasion').value;
  const notes = document.getElementById('resNotes').value.trim();

  const message = [
    `*New Reservation — Love Wings Cafe*`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Experience: ${exp}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Guests: ${guestCount}`,
    occasion ? `Occasion: ${occasion}` : '',
    notes ? `Notes: ${notes}` : ''
  ].filter(Boolean).join('\n');

  // Show success
  showStep(5);

  // Open WhatsApp after a moment
  setTimeout(() => {
    const waLink = `https://wa.me/911234567890?text=${encodeURIComponent(message)}`;
    const successBtn = document.querySelector('#step5 .btn-primary');
    if (successBtn) successBtn.href = waLink;
  }, 100);
};

// Set min date for reservation
const dateInput = document.getElementById('resDate');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}


/* ── MUSIC PLAYER ─────────────────────────────────────────── */
const audio = document.getElementById('bgAudio');
const musicToggle = document.getElementById('musicToggle');
const musicPlayer = document.getElementById('musicPlayer');
const musicPlayBtn = document.getElementById('musicPlayBtn');
const volumeSlider = document.getElementById('volumeSlider');
const musicDisc = document.querySelector('.music-disc');

let musicPlaying = false;
let musicInitiated = false;

const savedVol = parseFloat(localStorage.getItem('lw-volume') || '0.4');
if (audio) audio.volume = savedVol;
if (volumeSlider) volumeSlider.value = savedVol;

function toggleMusic() {
  if (!musicInitiated) {
    musicInitiated = true;
    musicPlayer.hidden = false;
  }

  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    musicPlayBtn.textContent = '▶';
    musicToggle.setAttribute('aria-pressed', 'false');
    musicToggle.removeAttribute('data-playing');
    musicDisc && musicDisc.style.setProperty('animation-play-state', 'paused');
  } else {
    audio.play().catch(() => {});
    musicPlaying = true;
    musicPlayBtn.textContent = '⏸';
    musicToggle.setAttribute('aria-pressed', 'true');
    musicToggle.setAttribute('data-playing', 'true');
    musicDisc && musicDisc.style.setProperty('animation-play-state', 'running');
  }
}

musicToggle.addEventListener('click', toggleMusic);
musicPlayBtn.addEventListener('click', toggleMusic);

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
  localStorage.setItem('lw-volume', volumeSlider.value);
});

// Restore saved music pref
if (localStorage.getItem('lw-music') === 'on') {
  musicPlayer.hidden = false;
}


/* ── PARALLAX ─────────────────────────────────────────────── */
const parallaxEls = document.querySelectorAll('[data-parallax]');

if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - window.innerHeight / 2) * 0.08;
      el.style.transform = `translateY(${offset}px)`;
    });
  }, { passive: true });
}


/* ── BUTTON RIPPLE ────────────────────────────────────────── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size/2}px;
      top: ${e.clientY - rect.top - size/2}px;
      transform: scale(0);
      animation: ripple 0.6s ease-out forwards;
      pointer-events: none;
    `;
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `@keyframes ripple { to { transform: scale(2.5); opacity: 0; } }`;
      document.head.appendChild(style);
    }
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});


/* ── SMOOTH SCROLL OFFSET ─────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ── LAZY LOAD IMAGES ─────────────────────────────────────── */
if ('IntersectionObserver' in window) {
  const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        lazyObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px 0px' });
  lazyImgs.forEach(img => lazyObserver.observe(img));
}
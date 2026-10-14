/**
 * LifeFlow - Blood Donation Coordinator
 * Pure Vanilla JavaScript (script.js)
 * Clean, modular, zero external dependencies
 */

// --- Constants & Storage Keys ---
const STORAGE_KEYS = {
  DONORS: 'lifeflow_donors',
  REQUESTS: 'lifeflow_requests'
};

// Initial sample data seeded on first run for college evaluation & demo
const DEFAULT_SAMPLE_DONORS = [
  {
    id: 'donor-1',
    name: 'Rahul Sharma',
    age: 26,
    bloodGroup: 'O+',
    phone: '9876543210',
    city: 'Mumbai',
    isAvailable: true,
    createdAt: '2026-10-10'
  },
  {
    id: 'donor-2',
    name: 'Priya Patel',
    age: 23,
    bloodGroup: 'A+',
    phone: '9823456781',
    city: 'Pune',
    isAvailable: true,
    createdAt: '2026-10-11'
  },
  {
    id: 'donor-3',
    name: 'Amit Kumar',
    age: 31,
    bloodGroup: 'B+',
    phone: '9712345678',
    city: 'Delhi',
    isAvailable: false,
    createdAt: '2026-10-12'
  },
  {
    id: 'donor-4',
    name: 'Dr. Sarah Khan',
    age: 29,
    bloodGroup: 'AB+',
    phone: '9988776655',
    city: 'Bangalore',
    isAvailable: true,
    createdAt: '2026-10-12'
  },
  {
    id: 'donor-5',
    name: 'Vikramaditya Singh',
    age: 34,
    bloodGroup: 'O-',
    phone: '9123456789',
    city: 'Jaipur',
    isAvailable: true,
    createdAt: '2026-10-13'
  },
  {
    id: 'donor-6',
    name: 'Ananya Roy',
    age: 22,
    bloodGroup: 'A-',
    phone: '9345678901',
    city: 'Kolkata',
    isAvailable: true,
    createdAt: '2026-10-13'
  }
];

const DEFAULT_SAMPLE_REQUESTS = [
  {
    id: 'req-1',
    patientName: 'Ramesh Verma',
    bloodGroup: 'O+',
    units: 2,
    hospital: 'City Care Hospital',
    city: 'Mumbai',
    phone: '9890123456',
    urgency: 'Critical',
    notes: 'Emergency cardiac surgery scheduled for morning',
    status: 'pending',
    createdAt: '2026-10-13'
  },
  {
    id: 'req-2',
    patientName: 'Sunita Devi',
    bloodGroup: 'B+',
    units: 1,
    hospital: 'Apollo Medical Center',
    city: 'Delhi',
    phone: '9789012345',
    urgency: 'Urgent',
    notes: 'Thalassemia regular transfusion support',
    status: 'pending',
    createdAt: '2026-10-14'
  },
  {
    id: 'req-3',
    patientName: 'Arjun Mehta',
    bloodGroup: 'A+',
    units: 3,
    hospital: 'Manipal Hospital',
    city: 'Bangalore',
    phone: '9678901234',
    urgency: 'Standard',
    notes: 'Fulfilled by donor contact Priya Patel',
    status: 'fulfilled',
    createdAt: '2026-10-12'
  }
];

// --- State Management ---
let donorsList = [];
let requestsList = [];
let currentRequestFilter = 'all';

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupNavigation();
  setupForms();
  setupFilters();
  setupStorageControls();
  renderAll();
  setupChatbot();
});

// --- LocalStorage Operations ---
function loadData() {
  const storedDonors = localStorage.getItem(STORAGE_KEYS.DONORS);
  const storedRequests = localStorage.getItem(STORAGE_KEYS.REQUESTS);

  if (storedDonors) {
    try {
      donorsList = JSON.parse(storedDonors);
    } catch (e) {
      console.error('Error parsing donors from localStorage:', e);
      donorsList = [...DEFAULT_SAMPLE_DONORS];
      saveDonors();
    }
  } else {
    // Seed sample data on first visit
    donorsList = [...DEFAULT_SAMPLE_DONORS];
    saveDonors();
  }

  if (storedRequests) {
    try {
      requestsList = JSON.parse(storedRequests);
    } catch (e) {
      console.error('Error parsing requests from localStorage:', e);
      requestsList = [...DEFAULT_SAMPLE_REQUESTS];
      saveRequests();
    }
  } else {
    // Seed sample requests on first visit
    requestsList = [...DEFAULT_SAMPLE_REQUESTS];
    saveRequests();
  }
}

function saveDonors() {
  localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donorsList));
}

function saveRequests() {
  localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requestsList));
}

// --- Render Functions ---
function renderAll() {
  renderDashboard();
  renderDonors();
  renderRequests();
}

/**
 * Update Dashboard statistics cards with live counts
 */
function renderDashboard() {
  const totalDonors = donorsList.length;
  const availableDonors = donorsList.filter(d => d.isAvailable).length;
  const totalRequests = requestsList.length;
  const fulfilledRequests = requestsList.filter(r => r.status === 'fulfilled').length;
  const pendingRequests = requestsList.filter(r => r.status === 'pending').length;

  document.getElementById('statTotalDonors').textContent = totalDonors;
  document.getElementById('statAvailableDonors').textContent = availableDonors;
  document.getElementById('statTotalRequests').textContent = totalRequests;
  document.getElementById('statFulfilledRequests').textContent = fulfilledRequests;

  // Filter tab counts
  const countAllEl = document.getElementById('countAllReq');
  const countPendingEl = document.getElementById('countPendingReq');
  const countFulfilledEl = document.getElementById('countFulfilledReq');

  if (countAllEl) countAllEl.textContent = totalRequests;
  if (countPendingEl) countPendingEl.textContent = pendingRequests;
  if (countFulfilledEl) countFulfilledEl.textContent = fulfilledRequests;
}

/**
 * Render Donor Cards based on filters
 */
function renderDonors(filteredData = null) {
  const container = document.getElementById('donorsGrid');
  const countElement = document.getElementById('donorResultCount');
  const data = filteredData || donorsList;

  countElement.textContent = data.length;

  if (data.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No matching donors found</h3>
        <p>Try adjusting your search criteria, or be the first to register in this location!</p>
        <a href="#register-donor" class="btn btn-primary btn-sm">+ Register as a Donor</a>
      </div>
    `;
    return;
  }

  container.innerHTML = data.map(donor => `
    <div class="donor-card" id="donor-card-${donor.id}">
      <div class="donor-card-top">
        <div class="blood-badge">${escapeHTML(donor.bloodGroup)}</div>
        <span class="availability-pill ${donor.isAvailable ? 'available' : 'unavailable'}">
          ${donor.isAvailable ? '● Available' : '○ Unavailable'}
        </span>
      </div>

      <h3 class="donor-name">${escapeHTML(donor.name)}</h3>

      <div class="donor-meta">
        <div class="meta-item">
          <span class="meta-icon">🎂</span>
          <span>Age: <strong>${donor.age} yrs</strong></span>
        </div>
        <div class="meta-item">
          <span class="meta-icon">📍</span>
          <span>City: <strong>${escapeHTML(donor.city)}</strong></span>
        </div>
        <div class="meta-item">
          <span class="meta-icon">📞</span>
          <span>Contact: <a href="tel:${escapeHTML(donor.phone)}"><strong>${escapeHTML(donor.phone)}</strong></a></span>
        </div>
      </div>

      <div class="donor-card-actions">
        <button type="button" class="btn-sm btn-ghost" onclick="toggleDonorAvailability('${donor.id}')" title="Toggle current availability">
          ${donor.isAvailable ? 'Mark Busy' : 'Mark Available'}
        </button>
        <button type="button" class="btn-sm btn-danger-ghost" onclick="deleteDonor('${donor.id}')" title="Remove this donor record">
          🗑️ Delete
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Render Blood Requests cards based on tab filter & search query
 */
function renderRequests() {
  const container = document.getElementById('requestsGrid');
  const searchQuery = (document.getElementById('searchRequestsInput')?.value || '').trim().toLowerCase();

  let filtered = requestsList;

  // Filter by status tab
  if (currentRequestFilter === 'pending') {
    filtered = filtered.filter(r => r.status === 'pending');
  } else if (currentRequestFilter === 'fulfilled') {
    filtered = filtered.filter(r => r.status === 'fulfilled');
  }

  // Filter by search query
  if (searchQuery) {
    filtered = filtered.filter(r => 
      r.patientName.toLowerCase().includes(searchQuery) ||
      r.hospital.toLowerCase().includes(searchQuery) ||
      r.city.toLowerCase().includes(searchQuery) ||
      r.bloodGroup.toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>No blood requests found</h3>
        <p>${searchQuery || currentRequestFilter !== 'all' ? 'Try changing your search term or tab filter.' : 'There are currently no active blood requests in the system.'}</p>
        <a href="#new-request" class="btn btn-secondary btn-sm">+ Post a Blood Request</a>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(req => {
    const isFulfilled = req.status === 'fulfilled';
    const urgencyClass = req.urgency === 'Critical' 
      ? 'urgency-critical' 
      : req.urgency === 'Urgent' 
        ? 'urgency-urgent' 
        : 'urgency-standard';

    return `
      <div class="request-card status-${req.status}" id="req-card-${req.id}">
        <div class="req-card-top">
          <div class="req-blood-badge">
            <span>🩸</span> ${escapeHTML(req.bloodGroup)}
          </div>
          <div class="req-badges-right">
            <span class="urgency-badge ${urgencyClass}">${escapeHTML(req.urgency)}</span>
            <span class="status-badge ${req.status}">
              ${isFulfilled ? '✓ Fulfilled' : '⏳ Pending'}
            </span>
          </div>
        </div>

        <h3 class="req-patient-name">${escapeHTML(req.patientName)}</h3>
        <div class="req-hospital">
          <span>🏥</span> ${escapeHTML(req.hospital)}, ${escapeHTML(req.city)}
        </div>

        <div class="req-details-list">
          <div class="req-detail-row">
            <span class="req-detail-label">Units Needed:</span>
            <span class="req-detail-val">${req.units || 1} Unit(s)</span>
          </div>
          <div class="req-detail-row">
            <span class="req-detail-label">Attendant Contact:</span>
            <span class="req-detail-val"><a href="tel:${escapeHTML(req.phone)}">${escapeHTML(req.phone)}</a></span>
          </div>
          <div class="req-detail-row">
            <span class="req-detail-label">Posted Date:</span>
            <span class="req-detail-val">${req.createdAt || 'Recent'}</span>
          </div>
        </div>

        ${req.notes ? `<div class="req-notes">"${escapeHTML(req.notes)}"</div>` : ''}

        <div class="req-card-actions">
          <button type="button" 
                  class="btn-status-toggle ${isFulfilled ? 'mark-pending' : 'mark-fulfilled'}" 
                  onclick="toggleRequestStatus('${req.id}')">
            ${isFulfilled ? '↩️ Mark as Pending' : '✅ Mark as Fulfilled'}
          </button>
          <button type="button" class="btn-delete" onclick="deleteRequest('${req.id}')" title="Delete this request">
            🗑️ Delete
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// --- Navigation & Mobile Toggle ---
function setupNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close mobile menu on clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Highlight active link on scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    const sections = ['hero', 'dashboard', 'search-donors', 'register-donor', 'blood-requests', 'new-request'];

    sections.forEach(secId => {
      const sectionEl = document.getElementById(secId);
      if (sectionEl) {
        const top = sectionEl.offsetTop;
        const height = sectionEl.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(l => {
            if (l.getAttribute('href') === `#${secId}`) {
              l.classList.add('active');
            } else if (!l.classList.contains('nav-btn-cta')) {
              l.classList.remove('active');
            }
          });
        }
      }
    });
  });
}

// --- Form Submissions & Validations ---
function setupForms() {
  // Donor Registration Form
  const donorForm = document.getElementById('donorForm');
  if (donorForm) {
    donorForm.addEventListener('submit', handleDonorSubmit);

    // Live validation cleanups on input
    const inputs = ['donorName', 'donorAge', 'donorBloodGroup', 'donorPhone', 'donorCity', 'donorConsent'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => clearFieldError(id));
        el.addEventListener('change', () => clearFieldError(id));
      }
    });
  }

  // Blood Request Form
  const reqForm = document.getElementById('requestForm');
  if (reqForm) {
    reqForm.addEventListener('submit', handleRequestSubmit);

    const reqInputs = ['patientName', 'reqBloodGroup', 'hospitalName', 'hospitalCity', 'reqContactPhone'];
    reqInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => clearFieldError(id));
        el.addEventListener('change', () => clearFieldError(id));
      }
    });
  }
}

function handleDonorSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('donorName');
  const ageInput = document.getElementById('donorAge');
  const bloodGroupInput = document.getElementById('donorBloodGroup');
  const phoneInput = document.getElementById('donorPhone');
  const cityInput = document.getElementById('donorCity');
  const availInput = document.getElementById('donorAvailability');
  const consentInput = document.getElementById('donorConsent');

  const name = nameInput.value.trim();
  const age = parseInt(ageInput.value, 10);
  const bloodGroup = bloodGroupInput.value.trim();
  const phone = phoneInput.value.trim();
  const city = cityInput.value.trim();
  const isAvailable = availInput.value === 'true';
  const consent = consentInput.checked;

  let isValid = true;

  // Validation rules
  if (!name || name.length < 2) {
    setFieldError('donorName', 'Please enter a valid full name (minimum 2 letters)');
    isValid = false;
  }

  if (isNaN(age) || age < 18 || age > 65) {
    setFieldError('donorAge', 'Donor age must be between 18 and 65 years');
    isValid = false;
  }

  if (!bloodGroup) {
    setFieldError('donorBloodGroup', 'Please select your blood group');
    isValid = false;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone)) {
    setFieldError('donorPhone', 'Please enter a valid 10-digit mobile number');
    isValid = false;
  }

  if (!city || city.length < 2) {
    setFieldError('donorCity', 'Please enter your current city or location');
    isValid = false;
  }

  if (!consent) {
    setFieldError('donorConsent', 'You must agree to the voluntary donation criteria');
    isValid = false;
  }

  if (!isValid) {
    showToast('Please fix the errors highlighted in the donor form.', 'error');
    return;
  }

  // Create new donor object
  const newDonor = {
    id: 'donor-' + Date.now(),
    name,
    age,
    bloodGroup,
    phone,
    city,
    isAvailable,
    createdAt: new Date().toISOString().split('T')[0]
  };

  // Add to top of list
  donorsList.unshift(newDonor);
  saveDonors();

  // Reset form
  donorForm.reset();
  showToast(`Thank you, ${name}! You are now registered as a ${bloodGroup} voluntary donor.`, 'success');

  // Update UI
  renderAll();

  // Smooth scroll to newly added donor in list
  setTimeout(() => {
    const searchSection = document.getElementById('search-donors');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, 350);
}

function handleRequestSubmit(e) {
  e.preventDefault();

  const patientInput = document.getElementById('patientName');
  const bloodGroupInput = document.getElementById('reqBloodGroup');
  const unitsInput = document.getElementById('reqUnits');
  const hospitalInput = document.getElementById('hospitalName');
  const cityInput = document.getElementById('hospitalCity');
  const phoneInput = document.getElementById('reqContactPhone');
  const urgencyInput = document.getElementById('reqUrgency');
  const notesInput = document.getElementById('reqNotes');

  const patientName = patientInput.value.trim();
  const bloodGroup = bloodGroupInput.value.trim();
  const units = parseInt(unitsInput.value, 10) || 1;
  const hospital = hospitalInput.value.trim();
  const city = cityInput.value.trim();
  const phone = phoneInput.value.trim();
  const urgency = urgencyInput.value;
  const notes = notesInput.value.trim();

  let isValid = true;

  if (!patientName || patientName.length < 2) {
    setFieldError('patientName', 'Please enter patient name (minimum 2 letters)');
    isValid = false;
  }

  if (!bloodGroup) {
    setFieldError('reqBloodGroup', 'Please select the required blood group');
    isValid = false;
  }

  if (!hospital || hospital.length < 2) {
    setFieldError('hospitalName', 'Please enter hospital or clinic name');
    isValid = false;
  }

  if (!city || city.length < 2) {
    setFieldError('hospitalCity', 'Please enter city / location');
    isValid = false;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone)) {
    setFieldError('reqContactPhone', 'Please enter a valid 10-digit attendant phone number');
    isValid = false;
  }

  if (!isValid) {
    showToast('Please fix the errors in the blood request form.', 'error');
    return;
  }

  const newRequest = {
    id: 'req-' + Date.now(),
    patientName,
    bloodGroup,
    units,
    hospital,
    city,
    phone,
    urgency,
    notes,
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0]
  };

  requestsList.unshift(newRequest);
  saveRequests();

  document.getElementById('requestForm').reset();
  showToast(`Blood request for ${patientName} (${bloodGroup}) posted successfully!`, 'success');

  renderAll();

  // Scroll to request section
  setTimeout(() => {
    const reqSection = document.getElementById('blood-requests');
    if (reqSection) {
      reqSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, 350);
}

// --- Field Error Helpers ---
function setFieldError(fieldId, message) {
  const inputEl = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + 'Error');

  if (inputEl) {
    inputEl.classList.add('is-invalid');
  }
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function clearFieldError(fieldId) {
  const inputEl = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + 'Error');

  if (inputEl) {
    inputEl.classList.remove('is-invalid');
  }
  if (errorEl) {
    errorEl.textContent = '';
  }
}

// --- Search & Filters ---
function setupFilters() {
  const btnApply = document.getElementById('btnApplyFilter');
  const btnReset = document.getElementById('btnResetFilter');
  const filterBlood = document.getElementById('filterBloodGroup');
  const filterCity = document.getElementById('filterCity');
  const filterAvail = document.getElementById('filterAvailability');

  if (btnApply) {
    btnApply.addEventListener('click', applyDonorFilter);
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (filterBlood) filterBlood.value = '';
      if (filterCity) filterCity.value = '';
      if (filterAvail) filterAvail.value = 'all';
      renderDonors(donorsList);
      showToast('Filters reset to show all registered donors.', 'info');
    });
  }

  // Live filter on typing or select change
  [filterBlood, filterCity, filterAvail].forEach(el => {
    if (el) {
      el.addEventListener('input', applyDonorFilter);
      el.addEventListener('change', applyDonorFilter);
    }
  });

  // Request Tab Filters
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentRequestFilter = tab.getAttribute('data-filter') || 'all';
      renderRequests();
    });
  });

  // Request live search box
  const searchReqInput = document.getElementById('searchRequestsInput');
  if (searchReqInput) {
    searchReqInput.addEventListener('input', () => {
      renderRequests();
    });
  }
}

function applyDonorFilter() {
  const bloodVal = document.getElementById('filterBloodGroup').value;
  const cityVal = document.getElementById('filterCity').value.trim().toLowerCase();
  const availVal = document.getElementById('filterAvailability').value;

  const filtered = donorsList.filter(donor => {
    const matchBlood = !bloodVal || donor.bloodGroup === bloodVal;
    const matchCity = !cityVal || donor.city.toLowerCase().includes(cityVal);
    let matchAvail = true;
    if (availVal === 'available') matchAvail = donor.isAvailable === true;
    if (availVal === 'unavailable') matchAvail = donor.isAvailable === false;

    return matchBlood && matchCity && matchAvail;
  });

  renderDonors(filtered);
}

// --- Interactive Actions: Donors ---
window.toggleDonorAvailability = function(donorId) {
  const donor = donorsList.find(d => d.id === donorId);
  if (!donor) return;

  donor.isAvailable = !donor.isAvailable;
  saveDonors();
  renderAll();

  const statusText = donor.isAvailable ? 'now marked as Available' : 'marked as Currently Unavailable';
  showToast(`${donor.name} is ${statusText}.`, 'info');
};

window.deleteDonor = function(donorId) {
  const donor = donorsList.find(d => d.id === donorId);
  if (!donor) return;

  const confirmDelete = window.confirm(`Are you sure you want to remove donor "${donor.name}" (${donor.bloodGroup}) from the registry?`);
  if (!confirmDelete) return;

  donorsList = donorsList.filter(d => d.id !== donorId);
  saveDonors();
  renderAll();
  showToast(`Donor record for ${donor.name} has been removed.`, 'info');
};

// --- Interactive Actions: Requests ---
window.toggleRequestStatus = function(requestId) {
  const req = requestsList.find(r => r.id === requestId);
  if (!req) return;

  if (req.status === 'pending') {
    req.status = 'fulfilled';
    showToast(`Request for ${req.patientName} (${req.bloodGroup}) marked as Fulfilled! 🎉`, 'success');
  } else {
    req.status = 'pending';
    showToast(`Request for ${req.patientName} reopened as Pending.`, 'info');
  }

  saveRequests();
  renderAll();
};

window.deleteRequest = function(requestId) {
  const req = requestsList.find(r => r.id === requestId);
  if (!req) return;

  const confirmDelete = window.confirm(`Are you sure you want to delete the blood request for "${req.patientName}"?`);
  if (!confirmDelete) return;

  requestsList = requestsList.filter(r => r.id !== requestId);
  saveRequests();
  renderAll();
  showToast(`Blood request for ${req.patientName} was removed.`, 'info');
};

// --- Storage Controls (Reset & Clear) ---
function setupStorageControls() {
  const btnReset = document.getElementById('btnResetDemoData');
  const btnClear = document.getElementById('btnClearAllData');

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      const confirmReset = window.confirm('Reset all donors and requests to clean initial sample demonstration data?');
      if (!confirmReset) return;

      donorsList = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_DONORS));
      requestsList = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_REQUESTS));
      saveDonors();
      saveRequests();
      renderAll();
      showToast('Loaded fresh sample demonstration data successfully!', 'success');
    });
  }

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      const confirmClear = window.confirm('Are you sure you want to CLEAR ALL donors and blood requests? This will empty localStorage.');
      if (!confirmClear) return;

      donorsList = [];
      requestsList = [];
      saveDonors();
      saveRequests();
      renderAll();
      showToast('All local coordinator data cleared.', 'info');
    });
  }
}

// --- Toast Notification System ---
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconMap = {
    success: '✅',
    error: '⚠️',
    info: 'ℹ️'
  };

  toast.innerHTML = `
    <span class="toast-icon">${iconMap[type] || 'ℹ️'}</span>
    <span class="toast-message">${escapeHTML(message)}</span>
  `;

  container.appendChild(toast);

  // Auto-remove toast after 3.5 seconds
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

// --- Security Helper ---
function escapeHTML(str) {
  if (typeof str !== 'string') return String(str ?? '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ==========================================================================
// Chatbot Widget: Blood Donation Assistant Logic
// ==========================================================================

function setupChatbot() {
  const toggleBtn = document.getElementById('chatToggleBtn');
  const chatWindow = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatCloseBtn');
  const resetBtn = document.getElementById('chatResetBtn');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');
  const quickChips = document.querySelectorAll('.quick-chip');

  if (!toggleBtn || !chatWindow) return;

  // Toggle Chat Window
  toggleBtn.addEventListener('click', () => {
    const isOpen = chatWindow.classList.contains('open');
    if (isOpen) {
      closeChatbot();
    } else {
      openChatbot();
    }
  });

  // Close Button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeChatbot);
  }

  // Reset / Clear Chat History
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (chatBody) {
        chatBody.innerHTML = '';
        initChatbotWelcome();
        showToast('Chat assistant history reset.', 'info');
      }
    });
  }

  // Quick-Reply Chip Clicks
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const question = chip.getAttribute('data-question') || chip.textContent.trim();
      handleUserMessage(question);
    });
  });

  // Form Submit (Enter key or Send button)
  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';
      handleUserMessage(text);
    });
  }

  // Initial welcome message
  initChatbotWelcome();
}

function openChatbot() {
  const chatWindow = document.getElementById('chatWindow');
  const toggleBtn = document.getElementById('chatToggleBtn');
  const chatInput = document.getElementById('chatInput');

  if (chatWindow && toggleBtn) {
    chatWindow.classList.add('open');
    toggleBtn.classList.add('is-active');
    chatWindow.setAttribute('aria-hidden', 'false');

    // Focus input on open for quick keyboard entry
    setTimeout(() => {
      if (chatInput) chatInput.focus();
    }, 200);
  }
}

function closeChatbot() {
  const chatWindow = document.getElementById('chatWindow');
  const toggleBtn = document.getElementById('chatToggleBtn');

  if (chatWindow && toggleBtn) {
    chatWindow.classList.remove('open');
    toggleBtn.classList.remove('is-active');
    chatWindow.setAttribute('aria-hidden', 'true');
  }
}

function initChatbotWelcome() {
  const chatBody = document.getElementById('chatBody');
  if (!chatBody) return;

  chatBody.innerHTML = '';

  const welcomeHTML = `
    <p>Hi! 👋 I am your <strong>Blood Donation Assistant</strong>. How can I help you today?</p>
    <p>You can choose from the suggested questions below or type your question about donation eligibility, blood requests, or compatibility.</p>
  `;

  appendAssistantMessage(welcomeHTML);
}

function handleUserMessage(userText) {
  if (!userText) return;

  // Append user message bubble
  appendUserMessage(userText);

  // Generate rule-based response
  const responseData = getChatbotResponse(userText);

  // Small delay for natural conversational feel
  setTimeout(() => {
    appendAssistantMessage(responseData.html);
  }, 300);
}

function appendUserMessage(text) {
  const chatBody = document.getElementById('chatBody');
  if (!chatBody) return;

  const timeStr = getCurrentTimeFormatted();

  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg msg-user';
  msgDiv.innerHTML = `
    <div class="msg-bubble">
      ${escapeHTML(text)}
    </div>
    <span class="msg-time">${timeStr}</span>
  `;

  chatBody.appendChild(msgDiv);
  scrollChatToBottom();
}

function appendAssistantMessage(htmlContent) {
  const chatBody = document.getElementById('chatBody');
  if (!chatBody) return;

  const timeStr = getCurrentTimeFormatted();

  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg msg-assistant';
  msgDiv.innerHTML = `
    <div class="msg-bubble">
      ${htmlContent}
    </div>
    <span class="msg-time">${timeStr}</span>
  `;

  chatBody.appendChild(msgDiv);
  scrollChatToBottom();
}

function scrollChatToBottom() {
  const chatBody = document.getElementById('chatBody');
  if (chatBody) {
    setTimeout(() => {
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 50);
  }
}

function getCurrentTimeFormatted() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

// Global section scroll helper with mobile-friendly auto-collapse
window.scrollToSection = function(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });

    // Minimize chat window on small screens so the user can easily see the form
    if (window.innerWidth <= 768) {
      closeChatbot();
    }
  }
};

/**
 * Keyword-based response engine
 */
function getChatbotResponse(rawText) {
  const text = rawText.toLowerCase().trim();

  // 1. Emergency Blood Request
  if (
    text.includes('emergency') || 
    text.includes('urgent') || 
    text.includes('critical') || 
    text.includes('immediate') || 
    text.includes('icu') || 
    text.includes('accident') || 
    text.includes('sos')
  ) {
    return {
      html: `
        <p>🚨 <strong>CRITICAL EMERGENCY BLOOD NOTICE:</strong></p>
        <p>If this is an acute or life-threatening medical emergency:</p>
        <ul>
          <li><strong>Emergency Medical Helpline:</strong> Call <strong>112</strong> or <strong>108</strong> immediately.</li>
          <li><strong>National Blood Helpline:</strong> Call <strong>104</strong> or <strong>1910</strong>.</li>
          <li>Directly alert the in-house blood bank at your hospital or visit the nearest government blood center.</li>
        </ul>
        <p>You can also post an immediate request on this site with urgency set to <strong>Critical</strong>.</p>
        <a href="#new-request" class="chat-in-msg-btn" onclick="scrollToSection('new-request')">🚨 Post Critical Blood Request ➔</a>
      `
    };
  }

  // 2. How to register as a donor
  if (
    text.includes('register') || 
    text.includes('become a donor') || 
    text.includes('become donor') || 
    text.includes('how to register') || 
    text.includes('sign up') || 
    text.includes('volunteer') || 
    text.includes('donor form')
  ) {
    return {
      html: `
        <p>❤️ <strong>How to Register as a Voluntary Donor:</strong></p>
        <ol>
          <li>Navigate to the <strong>Register as a Donor</strong> section.</li>
          <li>Enter your <strong>Full Name</strong>, <strong>Age</strong> (must be 18 to 65), and <strong>Blood Group</strong>.</li>
          <li>Provide a valid <strong>10-digit Phone Number</strong> and your <strong>City</strong>.</li>
          <li>Confirm the health declaration checkbox and click <strong>Complete Donor Registration</strong>.</li>
        </ol>
        <p>Your details will be stored securely in your browser and visible for matching requests!</p>
        <a href="#register-donor" class="chat-in-msg-btn" onclick="scrollToSection('register-donor')">❤️ Go to Donor Registration Form ➔</a>
      `
    };
  }

  // 3. How to request blood
  if (
    text.includes('request') || 
    text.includes('need blood') || 
    text.includes('how to request') || 
    text.includes('patient') || 
    text.includes('hospital') || 
    text.includes('units') || 
    text.includes('require blood') || 
    text.includes('post request')
  ) {
    return {
      html: `
        <p>📋 <strong>How to Post a Blood Request:</strong></p>
        <ol>
          <li>Navigate to the <strong>Post a Blood Request</strong> section.</li>
          <li>Provide the <strong>Patient Name</strong>, <strong>Required Blood Group</strong>, and <strong>Units Needed</strong>.</li>
          <li>Fill in the <strong>Hospital Name</strong>, <strong>City</strong>, and <strong>Attendant Contact Number</strong>.</li>
          <li>Choose an urgency level (<em>Critical</em>, <em>Urgent</em>, or <em>Standard</em>).</li>
          <li>Click <strong>Post Blood Request</strong> to list it immediately under Active Requests.</li>
        </ol>
        <a href="#new-request" class="chat-in-msg-btn" onclick="scrollToSection('new-request')">📢 Post a Blood Request Now ➔</a>
      `
    };
  }

  // 4. Who can donate blood / Eligibility
  if (
    text.includes('who can donate') || 
    text.includes('eligib') || 
    text.includes('criteria') || 
    text.includes('can i donate') || 
    text.includes('age limit') || 
    text.includes('weight') || 
    text.includes('hemoglobin') || 
    text.includes('qualif') || 
    text.includes('rules')
  ) {
    return {
      html: `
        <p>🩺 <strong>General Blood Donation Eligibility Guidelines:</strong></p>
        <ul>
          <li><strong>Age:</strong> Between 18 and 65 years.</li>
          <li><strong>Weight:</strong> Minimum 45–50 kg.</li>
          <li><strong>Health:</strong> Free from active fever, cold, infection, or chronic illness.</li>
          <li><strong>Hemoglobin:</strong> Minimum 12.5 g/dL.</li>
          <li><strong>Donation Gap:</strong> At least 3 months for men, and 4 months for women.</li>
          <li><strong>Temporary Restrictions:</strong> Wait 6–12 months after major surgery, tattoos, or body piercings.</li>
        </ul>
        <p><em>Note: Actual medical eligibility is strictly confirmed by healthcare professionals before donation.</em></p>
      `
    };
  }

  // 5. Blood groups and compatibility
  if (
    text.includes('blood group') || 
    text.includes('blood type') || 
    text.includes('groups') || 
    text.includes('types') || 
    text.includes('compatib') || 
    text.includes('universal') || 
    text.includes('o-') || 
    text.includes('o+') || 
    text.includes('ab+') || 
    text.includes('ab-') || 
    text.includes('a+') || 
    text.includes('b+')
  ) {
    return {
      html: `
        <p>🩸 <strong>Blood Groups & Compatibility:</strong></p>
        <p>There are 8 major blood groups: <strong>A+, A-, B+, B-, AB+, AB-, O+, O-</strong>.</p>
        <ul>
          <li><strong>O- (O Negative):</strong> <em>Universal Red Cell Donor</em> — can donate to all blood types.</li>
          <li><strong>AB+ (AB Positive):</strong> <em>Universal Recipient</em> — can safely receive red blood cells of any type.</li>
          <li><strong>O+ & B+:</strong> Highly common and frequently needed for trauma and surgeries.</li>
        </ul>
        <a href="#disclaimer" class="chat-in-msg-btn" onclick="scrollToSection('disclaimer')">📊 View Full Compatibility Table ➔</a>
      `
    };
  }

  // 6. Search & find donors
  if (
    text.includes('search') || 
    text.includes('find') || 
    text.includes('directory') || 
    text.includes('available donor') || 
    text.includes('contact donor') || 
    text.includes('city')
  ) {
    return {
      html: `
        <p>🔍 <strong>Searching for Registered Donors:</strong></p>
        <p>You can use the <strong>Find Blood Donors</strong> directory on this page:</p>
        <ul>
          <li>Select your required blood group.</li>
          <li>Type your city name (e.g. Mumbai, Delhi, Bangalore).</li>
          <li>Filter by <em>Available Only</em> to find active donors ready to donate.</li>
        </ul>
        <a href="#search-donors" class="chat-in-msg-btn" onclick="scrollToSection('search-donors')">🔍 Search Donors Directory ➔</a>
      `
    };
  }

  // 7. Greetings
  if (
    text === 'hi' || 
    text === 'hello' || 
    text === 'hey' || 
    text.startsWith('hi ') || 
    text.startsWith('hello ') || 
    text.includes('good morning') || 
    text.includes('good afternoon') || 
    text.includes('good evening') || 
    text.includes('namaste') || 
    text === 'help' || 
    text === 'start'
  ) {
    return {
      html: `
        <p>Hello! 👋 I am your <strong>Blood Donation Assistant</strong>.</p>
        <p>I can answer questions regarding:</p>
        <ul>
          <li>How to register as a voluntary donor</li>
          <li>How to request blood for patients</li>
          <li>Who can donate blood (eligibility rules)</li>
          <li>Blood group compatibility guide</li>
          <li>Emergency helpline numbers</li>
        </ul>
        <p>How can I assist you right now?</p>
      `
    };
  }

  // 8. Gratitude / Farewell
  if (
    text.includes('thank') || 
    text.includes('thanks') || 
    text.includes('great') || 
    text.includes('awesome') || 
    text.includes('bye') || 
    text.includes('goodbye') || 
    text === 'ok' || 
    text === 'okay'
  ) {
    return {
      html: `
        <p>You're very welcome! ❤️ Every voluntary donation saves lives. Feel free to ask anytime if you need more assistance!</p>
      `
    };
  }

  // 9. Fallback / Default response
  return {
    html: `
      <p>I am a basic rule-based assistant and couldn't match your query: "<em>${escapeHTML(rawText)}</em>". 🤔</p>
      <p>Here are common topics you can ask me about:</p>
      <ul>
        <li><strong>How to register as a donor?</strong></li>
        <li><strong>How to request blood?</strong></li>
        <li><strong>What are the blood groups?</strong></li>
        <li><strong>Who can donate blood?</strong></li>
        <li><strong>Emergency blood request</strong></li>
      </ul>
      <p>Click any suggested question below or rephrase your question!</p>
    `
  };
}


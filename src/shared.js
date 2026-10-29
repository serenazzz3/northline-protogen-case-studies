const SESSION_KEY = 'northline-review-access';
const REVIEW_PASSCODE = 'protogen2026';

function hasAccess() {
  try { return sessionStorage.getItem(SESSION_KEY) === 'granted'; }
  catch { return false; }
}

function unlock() {
  document.body.classList.remove('locked');
  document.querySelector('.gate')?.remove();
}

if (hasAccess()) {
  unlock();
} else {
  const gate = document.createElement('div');
  gate.className = 'gate';
  gate.innerHTML = `<div class="gate-card"><div class="brand"><span class="brand-mark" aria-hidden="true">N<span>·</span></span><span>Northline <strong>Works</strong></span></div><p class="eyebrow">PRIVATE COHORT REVIEW</p><h1>Welcome to the work.</h1><p>Enter the review passcode to explore three fictional manufacturing case studies.</p><form id="gate-form"><label for="gate-password">Passcode</label><input id="gate-password" type="password" autocomplete="current-password" required><button class="button button-dark" type="submit">Enter case studies <span aria-hidden="true">→</span></button><p class="gate-error" id="gate-error" role="alert"></p></form><p class="gate-foot">NORTHLINE WORKS / PROTOGEN PORTFOLIO</p></div>`;
  document.body.prepend(gate);
  gate.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const value = gate.querySelector('input').value;
    if (value === REVIEW_PASSCODE) {
      try { sessionStorage.setItem(SESSION_KEY, 'granted'); } catch { /* current page still unlocks */ }
      unlock();
    } else {
      gate.querySelector('#gate-error').textContent = 'That passcode is not correct. Please try again.';
      gate.querySelector('input').select();
    }
  });
}

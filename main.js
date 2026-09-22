const revealedElements = document.querySelectorAll('.reveal');

const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -20px' }
);

if ('IntersectionObserver' in window) {
  revealedElements.forEach((element) => revealOnScroll.observe(element));
} else {
  revealedElements.forEach((element) => element.classList.add('is-visible'));
}

const nav = document.querySelector('.nav-wrap');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 16);
  }, { passive: true });
}

const clock = document.querySelector('#chile-clock');
const date = document.querySelector('#chile-date');
const chileFormatter = new Intl.DateTimeFormat('es-CL', {
  timeZone: 'America/Santiago',
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});
const clockFormatter = new Intl.DateTimeFormat('es-CL', {
  timeZone: 'America/Santiago',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

function updateChileTime() {
  const now = new Date();
  date.textContent = chileFormatter.format(now).toUpperCase().replaceAll('.', '');
  clock.textContent = `${clockFormatter.format(now)} CLT`;
}

updateChileTime();
setInterval(updateChileTime, 1000);

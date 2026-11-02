const themeButton = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('light');
function updateTheme() {
  const light = document.body.classList.contains('light');
  themeIcon.textContent = light ? '☾' : '☼';
  themeButton.setAttribute('aria-label', light ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng');
  document.querySelector('meta[name="theme-color"]').content = light ? '#f3f3f4' : '#111115';
}
updateTheme();
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  updateTheme();
});
const studentCard = document.querySelector('#student-card');
studentCard.addEventListener('click', () => {
  studentCard.classList.toggle('is-active');
  studentCard.classList.remove('is-swinging');
  void studentCard.offsetWidth;
  studentCard.classList.add('is-swinging');
  studentCard.setAttribute('aria-pressed', String(studentCard.classList.contains('is-active')));
});
studentCard.addEventListener('animationend', (event) => {
  if (event.animationName === 'card-swing') studentCard.classList.remove('is-swinging');
});
const revealItems = document.querySelectorAll('.section, .contact-section, .skill-panel, .education-item, .recognition-card');
revealItems.forEach((item) => item.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => revealObserver.observe(item));
const sectionLinks = document.querySelectorAll('.main-nav a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      sectionLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });
document.querySelectorAll('main > section[id]').forEach((section) => sectionObserver.observe(section));

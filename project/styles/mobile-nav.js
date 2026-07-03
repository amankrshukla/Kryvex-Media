(function () {
  var nav = document.querySelector('.nav, #main-nav');
  var links = nav && nav.querySelector('.nav-links');
  if (!nav || !links) return;

  var btn = document.createElement('button');
  btn.className = 'mobile-menu-toggle';
  btn.setAttribute('aria-label', 'Toggle menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';

  var logo = nav.querySelector('.nav-logo');
  if (logo && logo.nextSibling) {
    nav.insertBefore(btn, logo.nextSibling);
  } else {
    nav.insertBefore(btn, links);
  }

  function closeMenu() {
    links.classList.remove('mobile-open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = links.classList.toggle('mobile-open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) closeMenu();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeMenu();
  });
})();

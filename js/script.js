
(function () {
  var nav = document.getElementById('nav'),
      menu = document.querySelector('.menu'),
      dds = Array.prototype.slice.call(document.querySelectorAll('.dd'));

  var isDesktop = function () { return window.matchMedia('(min-width:998px)').matches; };
  var canHover = function () { return window.matchMedia('(hover:hover)').matches; };

  function setDD(dd, open) {
    dd.classList.toggle('open', open);
    dd.querySelector('.dd-btn').setAttribute('aria-expanded', open);
  }
  function closeAll(except) {
    dds.forEach(function (d) { if (d !== except) setDD(d, false); });
  }

  dds.forEach(function (dd) {
    var btn = dd.querySelector('.dd-btn');

    // caret: click / tap / Enter / Space toggles
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !dd.classList.contains('open');
      closeAll(dd);
      setDD(dd, willOpen);
    });

    // desktop mouse: open on hover
    dd.addEventListener('mouseenter', function () {
      if (isDesktop() && canHover()) { closeAll(dd); setDD(dd, true); }
    });
    dd.addEventListener('mouseleave', function () {
      if (isDesktop() && canHover()) setDD(dd, false);
    });

    // desktop keyboard: close when focus leaves this dropdown
    dd.addEventListener('focusout', function (e) {
      if (isDesktop() && !dd.contains(e.relatedTarget)) setDD(dd, false);
    });
  });

  // mobile menu button
  menu.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (!open) closeAll();
  });

  // choosing any link closes the mobile menu
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', false);
      menu.setAttribute('aria-label', 'Open menu');
      closeAll();
    });
  });

  // click outside closes dropdowns
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dd')) closeAll();
  });

  // Esc closes dropdowns and returns focus to the caret
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var openDD = dds.filter(function (d) { return d.classList.contains('open'); })[0];
    closeAll();
    if (openDD) openDD.querySelector('.dd-btn').focus();
  });

  // reset when resizing between mobile and desktop
  window.matchMedia('(min-width:998px)').addEventListener('change', function () {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', false);
    closeAll();
  });
})();

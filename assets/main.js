/* Chef Jackie — site interactions */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     Nutrition gallery data
     Macros are per serving as plated. To use real photos, drop a file
     in assets/img/ and set `img` on the dish (e.g. img: 'moqueca.jpg').
     Cards fall back to the illustrated gradient if the file is missing.
  --------------------------------------------------------------- */
  var DISHES = [
    { name: 'Moqueca de Peixe', pt: 'Bahian coconut fish stew', emoji: '🍲',
      desc: 'Sea bass simmered in coconut milk, dendê, peppers and lime. Served over a small scoop of jasmine rice.',
      kcal: 512, p: 41, c: 18, f: 30, tags: ['high-protein', 'gluten-free', 'classic'], grad: ['#e8813f', '#c9613f'] },

    { name: 'Frango Grelhado com Farofa de Quinoa', pt: 'Grilled chicken, quinoa farofa', emoji: '🍗',
      desc: 'Marinated chicken thigh over toasted quinoa farofa with couve and a squeeze of orange.',
      kcal: 468, p: 45, c: 34, f: 15, tags: ['high-protein', 'gluten-free'], grad: ['#a8c957', '#2f7d55'] },

    { name: 'Feijoada Leve', pt: 'Lighter black bean stew', emoji: '🥘',
      desc: 'Sunday feijoada rebuilt with lean pork loin and turkey sausage. Same depth, half the fat.',
      kcal: 540, p: 38, c: 48, f: 20, tags: ['high-protein', 'classic'], grad: ['#3d2a20', '#14301f'] },

    { name: 'Picanha com Chimichurri', pt: 'Grilled picanha, herb sauce', emoji: '🥩',
      desc: 'Coarse-salt picanha sliced against the grain, charred cherry tomatoes, no starch on the plate.',
      kcal: 495, p: 44, c: 5, f: 33, tags: ['high-protein', 'low-carb', 'gluten-free', 'classic'], grad: ['#c9613f', '#7a2f22'] },

    { name: 'Strogonoff de Frango Low Carb', pt: 'Chicken stroganoff, cauliflower rice', emoji: '🍛',
      desc: 'Creamy chicken stroganoff built on cashew cream instead of heavy cream, over cauliflower rice.',
      kcal: 410, p: 42, c: 12, f: 22, tags: ['high-protein', 'low-carb', 'gluten-free'], grad: ['#f2c14e', '#c9613f'] },

    { name: 'Salmão com Purê de Mandioquinha', pt: 'Salmon, Peruvian potato purée', emoji: '🐟',
      desc: 'Seared salmon on silky mandioquinha purée with grilled asparagus and lemon oil.',
      kcal: 520, p: 40, c: 30, f: 26, tags: ['high-protein', 'gluten-free'], grad: ['#f0a08a', '#c9613f'] },

    { name: 'Bobó de Camarão', pt: 'Shrimp in yuca cream', emoji: '🦐',
      desc: 'Gulf shrimp folded into a velvety yuca and coconut base, finished with cilantro and dendê.',
      kcal: 465, p: 33, c: 34, f: 22, tags: ['gluten-free', 'classic'], grad: ['#f2c14e', '#e8813f'] },

    { name: 'Escondidinho de Abóbora', pt: 'Squash & shredded beef bake', emoji: '🥧',
      desc: 'Roasted kabocha purée over slow-shredded carne seca, browned under the broiler.',
      kcal: 430, p: 32, c: 40, f: 15, tags: ['high-protein', 'gluten-free', 'classic'], grad: ['#e8a33f', '#a8541f'] },

    { name: 'Tapioca de Frango', pt: 'Tapioca crêpe, chicken & requeijão', emoji: '🌯',
      desc: 'Warm tapioca crêpe filled with shredded chicken, light requeijão and rocket. Breakfast or post-training.',
      kcal: 355, p: 32, c: 36, f: 8, tags: ['high-protein', 'gluten-free'], grad: ['#f6efe0', '#d9c9a3'] },

    { name: 'Feijão Tropeiro Vegano', pt: 'Plant-based tropeiro beans', emoji: '🫘',
      desc: 'Beans, smoked tofu, collards and cassava farofa. All the smoke, none of the pork.',
      kcal: 410, p: 19, c: 55, f: 12, tags: ['vegan', 'classic'], grad: ['#5b8c3f', '#1d5137'] },

    { name: 'Salada de Palmito e Grão-de-Bico', pt: 'Heart of palm & chickpea salad', emoji: '🥗',
      desc: 'Hearts of palm, chickpeas, mango, red onion and mint in a passion fruit vinaigrette.',
      kcal: 380, p: 15, c: 42, f: 17, tags: ['vegan', 'gluten-free'], grad: ['#a8c957', '#4e8c4a'] },

    { name: 'Açaí Bowl Proteico', pt: 'Protein açaí bowl', emoji: '🫐',
      desc: 'Unsweetened açaí blended with banana and plant protein, topped with granola and cacao nibs.',
      kcal: 340, p: 24, c: 45, f: 8, tags: ['vegan', 'gluten-free'], grad: ['#6b4a8f', '#2e1b4d'] },

    { name: 'Pão de Queijo', pt: 'Cheese bread · 2 pieces', emoji: '🧀',
      desc: 'Tapioca-flour cheese bread baked to order. The one thing nobody lets me take off the menu.',
      kcal: 190, p: 7, c: 18, f: 10, tags: ['gluten-free', 'classic'], grad: ['#f2c14e', '#e0a33f'] },

    { name: 'Brigadeiro de Castanha', pt: 'Cashew brigadeiro · 2 pieces', emoji: '🍫',
      desc: 'Dates, cashew butter and 70% cacao rolled by hand. Dessert that does not undo the week.',
      kcal: 145, p: 3, c: 16, f: 8, tags: ['vegan', 'gluten-free'], grad: ['#5b3a29', '#2b1a12'] }
  ];

  var TAG_LABELS = {
    'high-protein': 'High protein',
    'low-carb': 'Low carb',
    'vegan': 'Plant-based',
    'gluten-free': 'Gluten free',
    'classic': 'Classic'
  };

  /* ---------------- gallery rendering ---------------- */
  var grid = document.getElementById('galleryGrid');
  var empty = document.getElementById('galleryEmpty');

  function macroSplit(d) {
    var pk = d.p * 4, ck = d.c * 4, fk = d.f * 9;
    var total = pk + ck + fk || 1;
    return {
      p: Math.round((pk / total) * 100),
      c: Math.round((ck / total) * 100),
      f: Math.round((fk / total) * 100)
    };
  }

  function buildCard(d) {
    var el = document.createElement('article');
    el.className = 'dish reveal';
    el.dataset.tags = d.tags.join(' ');

    var split = macroSplit(d);
    var media = d.img
      ? '<img src="assets/img/' + d.img + '" alt="' + d.name + '" loading="lazy" onerror="this.remove()">'
      : '';

    el.innerHTML =
      '<div class="dish-media" style="background:linear-gradient(150deg,' + d.grad[0] + ',' + d.grad[1] + ')">' +
        media +
        '<span aria-hidden="true">' + d.emoji + '</span>' +
        '<span class="dish-kcal">' + d.kcal + ' kcal</span>' +
      '</div>' +
      '<div class="dish-body">' +
        '<h3>' + d.name + '</h3>' +
        '<p class="dish-pt">' + d.pt + '</p>' +
        '<p class="dish-desc">' + d.desc + '</p>' +
        '<div class="macros">' +
          '<div class="macro"><b>' + d.p + 'g</b><span>Protein</span></div>' +
          '<div class="macro"><b>' + d.c + 'g</b><span>Carbs</span></div>' +
          '<div class="macro"><b>' + d.f + 'g</b><span>Fat</span></div>' +
        '</div>' +
        '<div class="macro-bar" role="img" aria-label="Calories from protein ' + split.p +
          '%, carbs ' + split.c + '%, fat ' + split.f + '%">' +
          '<i class="mb-p" style="width:' + split.p + '%"></i>' +
          '<i class="mb-c" style="width:' + split.c + '%"></i>' +
          '<i class="mb-f" style="width:' + split.f + '%"></i>' +
        '</div>' +
        '<ul class="dish-tags">' +
          d.tags.map(function (t) { return '<li>' + (TAG_LABELS[t] || t) + '</li>'; }).join('') +
        '</ul>' +
      '</div>';
    return el;
  }

  if (grid) {
    var frag = document.createDocumentFragment();
    DISHES.forEach(function (d) { frag.appendChild(buildCard(d)); });
    grid.appendChild(frag);
  }

  /* ---------------- filters ---------------- */
  var chips = document.querySelectorAll('.chip');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');

      var filter = chip.dataset.filter;
      var shown = 0;

      grid.querySelectorAll('.dish').forEach(function (card) {
        var match = filter === 'all' || card.dataset.tags.split(' ').indexOf(filter) > -1;
        card.classList.toggle('is-hidden', !match);
        if (match) { shown++; card.classList.add('is-visible'); }
      });

      if (empty) { empty.hidden = shown > 0; }
    });
  });

  /* ---------------- mobile nav ---------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------- sticky header shadow ---------------- */
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (header) { header.classList.toggle('is-stuck', window.scrollY > 12); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- reveal on scroll ---------------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------- contact form ---------------- */
  var form = document.getElementById('bookingForm');
  var note = document.getElementById('formNote');

  function setError(field, message) {
    var wrap = field.closest('.field');
    var existing = wrap.querySelector('.err');
    if (existing) { existing.remove(); }
    wrap.classList.toggle('has-error', Boolean(message));
    if (message) {
      var span = document.createElement('span');
      span.className = 'err';
      span.textContent = message;
      wrap.appendChild(span);
    }
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var ok = true;

      if (!name.value.trim()) { setError(name, 'Please add your name.'); ok = false; }
      else { setError(name, ''); }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        setError(email, 'Please add a valid email.'); ok = false;
      } else { setError(email, ''); }

      if (!ok) { note.textContent = ''; return; }

      /* No backend yet — hand the inquiry off to email so nothing is lost.
         Swap this for a form endpoint (Formspree, Netlify Forms, etc.) when ready. */
      var subject = encodeURIComponent('Inquiry: ' + document.getElementById('service').value);
      var body = encodeURIComponent(
        'Name: ' + name.value.trim() + '\n' +
        'Email: ' + email.value.trim() + '\n' +
        'Service: ' + document.getElementById('service').value + '\n\n' +
        document.getElementById('notes').value.trim()
      );
      window.location.href = 'mailto:hello@chefjackie.com?subject=' + subject + '&body=' + body;
      note.textContent = 'Opening your email app — hit send and I’ll reply within 24 hours.';
      form.reset();
    });
  }

  /* ---------------- footer year ---------------- */
  var year = document.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }
})();

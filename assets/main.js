/* Meals by Chef Jackie — site interactions */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     Nutrition gallery data
     Macros are per serving as plated. To use real photos, drop a file
     in assets/img/ and set `img` on the dish (e.g. img: 'moqueca.jpg').
     Cards fall back to the illustrated gradient if the file is missing.
  --------------------------------------------------------------- */
  var DISHES = [
    { name: 'Stuffed Bell Peppers', pt: 'Peppers, seasoned beef & rice, baked', emoji: '🫑',
      img: 'stuffed-peppers.jpg',
      desc: 'Red and yellow peppers filled with seasoned beef and rice, baked until the tops brown. Reheats better than almost anything else I make.',
      kcal: 385, p: 28, c: 26, f: 18, tags: ['high-protein', 'gluten-free', 'family'], grad: ['#d8642a', '#a83c17'] },

    { name: 'Eggplant Parmesan Boats', pt: 'Roasted eggplant, tomato, mozzarella', emoji: '🍆',
      img: 'eggplant.jpg',
      desc: 'Halved eggplant roasted soft, layered with tomato and melted mozzarella, finished with parsley.',
      kcal: 310, p: 18, c: 20, f: 17, tags: ['veg', 'gluten-free', 'family'], grad: ['#6b4a8f', '#33224a'] },

    { name: 'Beef & Potato Stir-Fry', pt: 'Steak strips, peanuts, scallion', emoji: '🥩',
      img: 'beef-stirfry.jpg',
      desc: 'Steak strips seared with potatoes, carrots and zucchini, tossed with peanuts and fresh scallion.',
      kcal: 470, p: 34, c: 32, f: 22, tags: ['high-protein', 'gluten-free', 'family'], grad: ['#a8541f', '#5c2a10'] },

    { name: 'Chicken Pasta Salad', pt: 'Cold pasta, chicken, peas, herbs', emoji: '🥗',
      img: 'pasta-salad.jpg',
      desc: 'Cold pasta with shredded chicken, peas and scallion in a light dressing. A good lunch to take out the door.',
      kcal: 420, p: 30, c: 40, f: 15, tags: ['high-protein', 'family'], grad: ['#c9a24a', '#8a6a22'] },

    { name: 'Grilled Chicken & Roasted Vegetables', pt: 'Simple, seasonal, endlessly repeatable', emoji: '🍗',
      desc: 'Marinated chicken breast with whatever is best that week — squash, broccolini, peppers — roasted hard.',
      kcal: 445, p: 46, c: 18, f: 20, tags: ['high-protein', 'low-carb', 'gluten-free'], grad: ['#3a6553', '#12241d'] },

    { name: 'Salmon, Quinoa & Greens', pt: 'Seared salmon, lemon, herbs', emoji: '🐟',
      desc: 'Seared salmon over quinoa with sautéed greens and lemon. The dish clients ask me to put back on every month.',
      kcal: 505, p: 38, c: 32, f: 24, tags: ['high-protein', 'gluten-free'], grad: ['#e08a6a', '#a8451f'] },

    { name: 'Feijão com Arroz', pt: 'Brazilian black beans and rice', emoji: '🫘',
      desc: 'The plate I grew up on. Slow-cooked black beans with garlic and bay, over rice. Nothing complicated, nothing left over.',
      kcal: 390, p: 17, c: 62, f: 7, tags: ['veg', 'gluten-free', 'family'], grad: ['#3d2a20', '#12241d'] },

    { name: 'Turkey Meatballs in Tomato Sugo', pt: 'Slow tomato sauce, basil', emoji: '🍅',
      desc: 'Turkey meatballs simmered in tomato sugo. Serve over pasta for the kids, over greens for everyone else.',
      kcal: 380, p: 35, c: 16, f: 20, tags: ['high-protein', 'low-carb', 'gluten-free', 'family'], grad: ['#c2452a', '#7a2114'] },

    { name: 'Chicken Pesto & Zucchini Noodles', pt: 'Herb pesto, spiralized zucchini', emoji: '🌿',
      desc: 'Grilled chicken with basil pesto over zucchini noodles. Light, and it holds up three days in the fridge.',
      kcal: 355, p: 33, c: 12, f: 20, tags: ['high-protein', 'low-carb', 'gluten-free'], grad: ['#4f8b46', '#22421f'] },

    { name: 'Roasted Vegetable & Chickpea Bowl', pt: 'Seasonal vegetables, tahini', emoji: '🥕',
      desc: 'Whatever roasts well that week with chickpeas, herbs and a lemon-tahini dressing.',
      kcal: 400, p: 16, c: 48, f: 16, tags: ['veg', 'gluten-free'], grad: ['#d99a3c', '#8a5511'] },

    { name: 'Garlic Lime Shrimp', pt: 'Shrimp, cauliflower rice, cilantro', emoji: '🦐',
      desc: 'Shrimp cooked fast with garlic, lime and cilantro over cauliflower rice.',
      kcal: 330, p: 34, c: 11, f: 15, tags: ['high-protein', 'low-carb', 'gluten-free'], grad: ['#f0a08a', '#c2452a'] },

    { name: 'Overnight Oats with Fruit', pt: 'Breakfast, ready in the fridge', emoji: '🥣',
      desc: 'Oats soaked with milk or a plant alternative, topped with seasonal fruit. Made in jars so mornings take ten seconds.',
      kcal: 320, p: 14, c: 46, f: 9, tags: ['veg', 'family'], grad: ['#c9b18a', '#8a7048'] }
  ];

  var TAG_LABELS = {
    'high-protein': 'High protein',
    'low-carb': 'Low carb',
    'veg': 'Vegetarian',
    'gluten-free': 'Gluten free',
    'family': 'Family favorite'
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
      ? '<img src="assets/img/' + d.img + '" alt="' + d.name + '" loading="lazy" onerror="this.remove()">' +
        '<span class="dish-real">Jackie\'s kitchen</span>'
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
      window.location.href = 'mailto:jaquelvalenca@icloud.com?subject=' + subject + '&body=' + body;
      note.textContent = 'Opening your email app — hit send and I’ll reply within 24 hours.';
      form.reset();
    });
  }

  /* ---------------- footer year ---------------- */
  var year = document.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }
})();

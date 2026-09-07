/* Chef Jackie — site interactions: menu gallery, filters, EN/PT toggle, form */
(function () {
  'use strict';

  /* ---------------- translations (English lives in the HTML) ---------------- */
  var PT = {
    'skip': 'Pular para o conteúdo',
    'nav.about': 'Sobre a Jackie', 'nav.services': 'O que está incluído',
    'nav.menu': 'A comida', 'nav.contact': 'Fale comigo',

    'hero.eyebrow': 'Chef particular · Santa Monica',
    'hero.h1': 'A comida fresca e saudável da sua família — feita na <em>sua</em> cozinha.',
    'hero.lede': 'Comida brasileira, o clássico americano do dia a dia, e comida que as crianças comem de verdade. Eu planejo a semana do jeito que a sua casa come, faço as compras na manhã do dia, cozinho na sua cozinha e deixo tudo porcionado, etiquetado e guardado.',
    'hero.call': 'Ligue (310) 425-6872', 'hero.menu': 'Ver a comida',
    'hero.s1t': 'Bacharel em Nutrição', 'hero.s1d': 'Ciência de Alimentos e Nutrição, São Paulo, Brasil',
    'hero.s2t': 'Na sua cozinha', 'hero.s2d': 'Feito na hora, não entregue pronto',
    'hero.s3t': 'LA e Orange County', 'hero.s3d': 'Casas particulares e eventos',
    'hero.badge': 'Chef particular · Bacharel em Ciência de Alimentos e Nutrição',

    'strip.1': 'Marmitas da semana', 'strip.2': 'Brasileira e americana',
    'strip.3': 'Comida para as crianças', 'strip.4': 'Jantares e eventos',
    'strip.5': 'Referências disponíveis',

    'about.caption': 'Jackie Wheeler · São Paulo → Santa Monica',
    'about.eyebrow': 'Oi, eu sou a Jackie',
    'about.h2': 'Brasileira de formação, mas eu cozinho o que a sua família ama.',
    'about.p1': 'Sou a Jackie Wheeler. Me formei no Brasil e sou bacharel em Ciência de Alimentos e Nutrição pela Universidade Anhembi Morumbi, em São Paulo, com curso de gestão da qualidade e controle de higiene de alimentos.',
    'about.p2': 'Cresci com feijão, moqueca e pão de queijo, e faço tudo isso. Mas na maioria das semanas é frango assado com legumes, pimentão recheado, massa, lancheira para a escola e algo doce na sexta — comida americana do dia a dia tanto quanto brasileira, o que a casa come de verdade.',
    'about.p3': 'Hoje eu cozinho toda semana para famílias particulares em Los Angeles e Orange County — incluindo atletas profissionais e pessoas públicas — e atendo jantares, festas e eventos quando a casa recebe.',
    'about.c1': 'Cozinho para a família inteira — inclusive as crianças, inclusive quem é enjoado',
    'about.c1b': 'Cardápios adaptados a restrições, alergias e preferências',
    'about.c2': 'Tudo porcionado em potes individuais e etiquetado',
    'about.c3': 'Acompanho a geladeira e a despensa para desperdiçar menos',
    'about.c4': 'Formada em cozinha vegana e licenciada em manipulação de alimentos',

    'cred.eyebrow': 'Formação', 'cred.h2': 'De onde vem a parte nutricional',
    'cred.1t': 'Bacharel em Ciência de Alimentos e Nutrição',
    'cred.1d': 'Universidade Anhembi Morumbi, São Paulo, Brasil',
    'cred.2y': 'Curso', 'cred.2t': 'Gestão da Qualidade e Controle de Higiene',
    'cred.2d': 'Manipulação, armazenamento e rotulagem seguros em cozinha doméstica',
    'cred.3y': 'Concluído', 'cred.3t': 'Cozinha Vegana',
    'cred.3d': 'Cardápios vegetais sem achismo',
    'cred.5y': 'Licenciada', 'cred.5t': 'Licença de Manipulação de Alimentos',
    'cred.5d': 'Certificada em manipulação, armazenamento e preparo seguros',
    'cred.4y': 'Também', 'cred.4t': 'Vinho e café',
    'cred.4d': 'Del Vino Wine Club School · Best Coffee Xperience, barista',

    'svc.eyebrow': 'O que está incluído', 'svc.h2': 'Um dia de cozinha, uma semana de comida',
    'svc.lede': 'A maioria das famílias marca uma sessão por semana. Cada casa é diferente, então o orçamento sai depois da nossa conversa — me ligue e diga para quantas pessoas eu vou cozinhar.',
    'svc.1k': 'O mais procurado', 'svc.1t': 'Marmitas da semana',
    'svc.1p': 'Uma sessão na sua cozinha cobre a semana inteira. É exatamente assim:',
    'svc.1a': 'Sugiro um cardápio equilibrado para a semana da sua casa',
    'svc.1b': 'Faço as compras na manhã do dia, escolhendo os ingredientes',
    'svc.1c': 'Cozinho as refeições da semana na sua cozinha',
    'svc.1d': 'Tudo porcionado em potes individuais e etiquetado',
    'svc.1e': 'Organizo tudo na geladeira, fácil de achar',
    'svc.1f': 'Deixo a cozinha limpa antes de ir embora',
    'svc.2k': 'Ocasiões', 'svc.2t': 'Jantares, festas e eventos',
    'svc.2p': 'Quando você recebe, eu monto o cardápio, cozinho, empratado, e cuido do serviço para você ficar com os convidados.',
    'svc.2a': 'Cardápio pensado para a ocasião e para os convidados',
    'svc.2b': 'Brasileira, americana, ou o que combinar com a noite',
    'svc.2c': 'Sobremesas feitas do zero',
    'svc.2d': 'Empratamento, serviço à mesa e sugestões de vinho',
    'svc.3k': 'A parte nutricional', 'svc.3t': 'Comer com um objetivo',
    'svc.3p': 'Treino, uma condição de saúde, crianças em fase de crescimento, ou só cansaço de pensar nisso — o cardápio se ajusta ao objetivo.',
    'svc.3a': 'Alergias e restrições tratadas de verdade, não contornadas',
    'svc.3b': 'Porções do tamanho de quem vai comer, adultos e crianças',
    'svc.3c': 'Informação nutricional de qualquer prato, quando pedir',
    'svc.3d': 'Produtos da estação e orgânicos onde faz diferença',

    'food.eyebrow': 'A comida', 'food.h2': 'Das cozinhas dela neste mês',
    'food.lede': 'Cada semana é montada em cima do que a sua família come de verdade, então nenhuma é igual à outra. Aqui está um pouco do que saiu das cozinhas dos clientes ultimamente.',

    'how.eyebrow': 'Como funciona', 'how.h2': 'Da primeira ligação à geladeira cheia',
    'how.1t': 'A gente conversa', 'how.1p': 'Quantas pessoas, do que gostam, o que não podem comer, quais dias pesam mais.',
    'how.2t': 'Eu mando o cardápio', 'how.2p': 'Uma proposta de semana para a sua casa. Troque o que quiser antes de eu ir às compras.',
    'how.3t': 'Dia de cozinhar', 'how.3p': 'Faço as compras de manhã, cozinho na sua cozinha, etiqueto tudo e limpo.',
    'how.4t': 'A gente ajusta', 'how.4p': 'Porções, temperos, repetições — me diga o que funcionou e a próxima semana muda.',

    'ref.eyebrow': 'Referências', 'ref.h2': 'Pergunte às famílias para quem eu cozinho',
    'ref.lede': 'Cozinho toda semana para casas particulares em Los Angeles e Orange County desde 2024, e atendi jantares e eventos particulares em West Hollywood.',
    'ref.n1': '<strong>Tenho várias referências.</strong> Se quiser falar com uma família para quem eu cozinho hoje, é só pedir na nossa conversa que eu coloco vocês em contato.',
    'ref.n2': 'A melhor forma de saber se combina é conversando — me conte sobre a sua casa e eu digo com sinceridade se sou a chef certa para ela.',

    'contact.eyebrow': 'Fale comigo', 'contact.h2': 'Vamos planejar a sua primeira semana',
    'contact.lede': 'Ligue ou mande mensagem — costuma ser o mais rápido. Ou deixe seus dados que eu retorno.',
    'contact.area': 'Baseada em Santa Monica — cozinhando por Los Angeles e Orange County',

    'form.name': 'Nome', 'form.email': 'E-mail', 'form.service': 'Do que você precisa?',
    'form.o1': 'Marmitas da semana', 'form.o2': 'Um jantar ou festa', 'form.o3': 'Os dois',
    'form.o4': 'Ainda não sei', 'form.notes': 'Me conte sobre a sua casa',
    'form.ph': 'Quantas pessoas, alergias ou restrições, seu bairro…', 'form.send': 'Enviar',

    'footer.tag': 'Chef particular · Santa Monica, Los Angeles e Orange County',
    'footer.about': 'Sobre', 'footer.svc': 'O que está incluído', 'footer.menu': 'A comida',
    'footer.love': 'Feito com carinho.'
  };

  var lang = 'en';

  /* ---------------- language ---------------- */
  function setLang(next) {
    lang = next === 'pt' ? 'pt' : 'en';
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-ph]').forEach(function (el) {
      var key = el.dataset.i18n || el.dataset.i18nHtml || el.dataset.i18nPh;
      if (!el.dataset.en) {
        el.dataset.en = el.dataset.i18nPh ? el.getAttribute('placeholder') : el.innerHTML;
      }
      var value = lang === 'pt' ? PT[key] : el.dataset.en;
      if (value === undefined) { return; }
      if (el.dataset.i18nPh) { el.setAttribute('placeholder', value); }
      else { el.innerHTML = value; }
    });

    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });

    try { localStorage.setItem('cj-lang', lang); } catch (err) { /* private mode */ }
  }

  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  var saved = null;
  try { saved = localStorage.getItem('cj-lang'); } catch (err) { /* private mode */ }
  setLang(saved === 'pt' ? 'pt' : 'en');

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

  /* ---------------- sticky header ---------------- */
  var header = document.querySelector('.site-header');
  var onScroll = function () { if (header) { header.classList.toggle('is-stuck', window.scrollY > 12); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- reveal on scroll ---------------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  }

  /* ---------------- contact form ---------------- */
  var form = document.getElementById('bookingForm');
  var note = document.getElementById('formNote');
  var FORM_MSG = {
    en: { name: 'Please add your name.', email: 'Please add a valid email.',
          sent: 'Thanks — sending this to jaquelvalenca@icloud.com. If your email app did not open, write to that address directly.' },
    pt: { name: 'Por favor, escreva seu nome.', email: 'Por favor, use um e-mail válido.',
          sent: 'Obrigada — enviando para jaquelvalenca@icloud.com. Se o seu aplicativo de e-mail não abrir, escreva direto para esse endereço.' }
  };

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
      var msg = FORM_MSG[lang];
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var ok = true;

      if (!name.value.trim()) { setError(name, msg.name); ok = false; } else { setError(name, ''); }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError(email, msg.email); ok = false; }
      else { setError(email, ''); }
      if (!ok) { note.textContent = ''; return; }

      /* No backend yet — hand the inquiry to email so nothing is lost.
         Swap this for a form endpoint (Formspree, Netlify Forms, etc.) when ready. */
      var subject = encodeURIComponent('Website inquiry: ' + document.getElementById('service').value);
      var body = encodeURIComponent(
        'Name: ' + name.value.trim() + '\n' +
        'Email: ' + email.value.trim() + '\n' +
        'Service: ' + document.getElementById('service').value + '\n\n' +
        document.getElementById('notes').value.trim()
      );
      try { window.location.href = 'mailto:jaquelvalenca@icloud.com?subject=' + subject + '&body=' + body; }
      catch (err) { /* sandboxed preview blocks navigation */ }
      note.textContent = msg.sent;
      form.reset();
    });
  }

  var year = document.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }
})();

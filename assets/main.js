/* Chef Jackie — site interactions: menu gallery, filters, EN/PT toggle, form */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     Menu data. Macros are estimates per serving (see the note under
     the gallery). To use a real photo, drop a file in assets/img/ and
     set `img` on the dish; cards fall back to the illustrated tile.
  --------------------------------------------------------------- */
  var DISHES = [
    { img: 'stuffed-peppers.jpg', emoji: '🫑', kcal: 385, p: 28, c: 26, f: 18,
      tags: ['high-protein', 'gluten-free', 'family'],
      en: { name: 'Stuffed Bell Peppers', sub: 'Peppers, seasoned beef & rice, baked',
            desc: 'Red and yellow peppers filled with seasoned beef and rice, baked until the tops brown. Reheats better than almost anything else I make.' },
      pt: { name: 'Pimentões Recheados', sub: 'Pimentão, carne temperada e arroz, ao forno',
            desc: 'Pimentões vermelhos e amarelos recheados com carne temperada e arroz, assados até dourar por cima. Reaquece melhor que quase tudo que eu faço.' },
      grad: ['#d8642a', '#a83c17'] },

    { img: 'eggplant.jpg', emoji: '🍆', kcal: 310, p: 18, c: 20, f: 17,
      tags: ['veg', 'gluten-free', 'family'],
      en: { name: 'Eggplant Parmesan Boats', sub: 'Roasted eggplant, tomato, mozzarella',
            desc: 'Halved eggplant roasted soft, layered with tomato and melted mozzarella, finished with parsley.' },
      pt: { name: 'Berinjela à Parmegiana', sub: 'Berinjela assada, tomate, mussarela',
            desc: 'Berinjela cortada ao meio e assada até ficar macia, com tomate e mussarela derretida, finalizada com salsinha.' },
      grad: ['#6b4a8f', '#33224a'] },

    { img: 'beef-stirfry.jpg', emoji: '🥩', kcal: 470, p: 34, c: 32, f: 22,
      tags: ['high-protein', 'gluten-free', 'family'],
      en: { name: 'Beef & Potato Stir-Fry', sub: 'Steak strips, peanuts, scallion',
            desc: 'Steak strips seared with potatoes, carrots and zucchini, tossed with peanuts and fresh scallion.' },
      pt: { name: 'Carne Salteada com Batata', sub: 'Tiras de carne, amendoim, cebolinha',
            desc: 'Tiras de carne seladas com batata, cenoura e abobrinha, finalizadas com amendoim e cebolinha fresca.' },
      grad: ['#a8541f', '#5c2a10'] },

    { img: 'pasta-salad.jpg', emoji: '🥗', kcal: 420, p: 30, c: 40, f: 15,
      tags: ['high-protein', 'family'],
      en: { name: 'Chicken Pasta Salad', sub: 'Cold pasta, chicken, peas, herbs',
            desc: 'Cold pasta with shredded chicken, peas and scallion in a light dressing. A good lunch to take out the door.' },
      pt: { name: 'Salpicão de Frango com Macarrão', sub: 'Macarrão frio, frango, ervilha, ervas',
            desc: 'Macarrão frio com frango desfiado, ervilha e cebolinha em molho leve. Um bom almoço para levar.' },
      grad: ['#c9a24a', '#8a6a22'] },

    { emoji: '🍗', kcal: 445, p: 46, c: 18, f: 20,
      tags: ['high-protein', 'low-carb', 'gluten-free'],
      en: { name: 'Grilled Chicken & Roasted Vegetables', sub: 'Simple, seasonal, endlessly repeatable',
            desc: 'Marinated chicken breast with whatever is best that week — squash, broccolini, peppers — roasted hard.' },
      pt: { name: 'Frango Grelhado com Legumes Assados', sub: 'Simples, da estação, nunca enjoa',
            desc: 'Peito de frango marinado com o que estiver melhor na semana — abóbora, brócolis, pimentão — bem assados.' },
      grad: ['#3a6553', '#12241d'] },

    { emoji: '🐟', kcal: 505, p: 38, c: 32, f: 24,
      tags: ['high-protein', 'gluten-free'],
      en: { name: 'Salmon, Quinoa & Greens', sub: 'Seared salmon, lemon, herbs',
            desc: 'Seared salmon over quinoa with sautéed greens and lemon. The dish clients ask me to put back on every month.' },
      pt: { name: 'Salmão com Quinoa e Verduras', sub: 'Salmão selado, limão, ervas',
            desc: 'Salmão selado sobre quinoa com verduras refogadas e limão. O prato que os clientes pedem de volta todo mês.' },
      grad: ['#e08a6a', '#a8451f'] },

    { emoji: '🫘', kcal: 390, p: 17, c: 62, f: 7,
      tags: ['veg', 'gluten-free', 'brazilian', 'family'],
      en: { name: 'Feijão com Arroz', sub: 'Brazilian black beans and rice',
            desc: 'The plate I grew up on. Slow-cooked black beans with garlic and bay, over rice. Nothing complicated, nothing left over.' },
      pt: { name: 'Feijão com Arroz', sub: 'Feijão preto e arroz, do jeito brasileiro',
            desc: 'O prato em que eu cresci. Feijão preto cozido devagar com alho e louro, sobre arroz. Nada complicado, e nunca sobra.' },
      grad: ['#3d2a20', '#12241d'] },

    { emoji: '🥥', kcal: 480, p: 36, c: 20, f: 28,
      tags: ['high-protein', 'gluten-free', 'brazilian'],
      en: { name: 'Moqueca de Peixe', sub: 'Bahian coconut fish stew',
            desc: 'White fish simmered with coconut milk, peppers, tomato and lime. Brazil in one pot, and it travels well to a dinner party.' },
      pt: { name: 'Moqueca de Peixe', sub: 'Moqueca baiana com leite de coco',
            desc: 'Peixe branco cozido com leite de coco, pimentão, tomate e limão. O Brasil numa panela só — e ótima para um jantar.' },
      grad: ['#e8a33f', '#c2452a'] },

    { emoji: '🍅', kcal: 380, p: 35, c: 16, f: 20,
      tags: ['high-protein', 'low-carb', 'gluten-free', 'family'],
      en: { name: 'Turkey Meatballs in Tomato Sugo', sub: 'Slow tomato sauce, basil',
            desc: 'Turkey meatballs simmered in tomato sugo. Serve over pasta for the kids, over greens for everyone else.' },
      pt: { name: 'Almôndegas de Peru ao Sugo', sub: 'Molho de tomate lento, manjericão',
            desc: 'Almôndegas de peru cozidas no molho de tomate. Com macarrão para as crianças, com folhas para os adultos.' },
      grad: ['#c2452a', '#7a2114'] },

    { emoji: '🌿', kcal: 355, p: 33, c: 12, f: 20,
      tags: ['high-protein', 'low-carb', 'gluten-free'],
      en: { name: 'Chicken Pesto & Zucchini Noodles', sub: 'Herb pesto, spiralized zucchini',
            desc: 'Grilled chicken with basil pesto over zucchini noodles. Light, and it holds up three days in the fridge.' },
      pt: { name: 'Frango ao Pesto com Espaguete de Abobrinha', sub: 'Pesto de manjericão, abobrinha',
            desc: 'Frango grelhado com pesto de manjericão sobre espaguete de abobrinha. Leve, e aguenta três dias na geladeira.' },
      grad: ['#4f8b46', '#22421f'] },

    { emoji: '🥕', kcal: 400, p: 16, c: 48, f: 16,
      tags: ['veg', 'gluten-free'],
      en: { name: 'Roasted Vegetable & Chickpea Bowl', sub: 'Seasonal vegetables, tahini',
            desc: 'Whatever roasts well that week with chickpeas, herbs and a lemon-tahini dressing.' },
      pt: { name: 'Bowl de Legumes Assados com Grão-de-Bico', sub: 'Legumes da estação, tahine',
            desc: 'O que estiver bom para assar na semana, com grão-de-bico, ervas e molho de tahine com limão.' },
      grad: ['#d99a3c', '#8a5511'] },

    { emoji: '🦐', kcal: 330, p: 34, c: 11, f: 15,
      tags: ['high-protein', 'low-carb', 'gluten-free'],
      en: { name: 'Garlic Lime Shrimp', sub: 'Shrimp, cauliflower rice, cilantro',
            desc: 'Shrimp cooked fast with garlic, lime and cilantro over cauliflower rice.' },
      pt: { name: 'Camarão ao Alho e Limão', sub: 'Camarão, arroz de couve-flor, coentro',
            desc: 'Camarão salteado rápido com alho, limão e coentro sobre arroz de couve-flor.' },
      grad: ['#f0a08a', '#c2452a'] },

    { emoji: '🍫', kcal: 145, p: 3, c: 20, f: 6,
      tags: ['dessert', 'brazilian', 'veg', 'gluten-free', 'family'],
      en: { name: 'Brigadeiro', sub: 'The Brazilian chocolate truffle',
            desc: 'Rolled by hand the way every Brazilian birthday requires. Two pieces, and nobody asks for anything else.' },
      pt: { name: 'Brigadeiro', sub: 'O docinho brasileiro de sempre',
            desc: 'Enrolado à mão, como todo aniversário brasileiro exige. Dois docinhos e ninguém pede mais nada.' },
      grad: ['#5b3a29', '#2b1a12'] },

    { emoji: '🍮', kcal: 265, p: 7, c: 38, f: 9,
      tags: ['dessert', 'brazilian', 'veg', 'gluten-free'],
      en: { name: 'Pudim de Leite', sub: 'Brazilian caramel flan',
            desc: 'Condensed milk flan with a dark caramel top. Made the night before, because it needs to sit.' },
      pt: { name: 'Pudim de Leite', sub: 'Pudim de leite condensado com calda',
            desc: 'Pudim de leite condensado com calda escura. Feito na véspera, porque precisa descansar.' },
      grad: ['#e0a940', '#a06a12'] },

    { emoji: '🍎', kcal: 290, p: 4, c: 44, f: 11,
      tags: ['dessert', 'veg', 'family'],
      en: { name: 'Fruit Crumble', sub: 'Seasonal fruit, oat topping',
            desc: 'Whatever fruit is best that week under an oat and butter crumble. Dessert that also works for breakfast.' },
      pt: { name: 'Crumble de Frutas', sub: 'Fruta da estação, farofa de aveia',
            desc: 'A fruta que estiver melhor na semana sob uma farofa de aveia e manteiga. Sobremesa que também serve de café da manhã.' },
      grad: ['#c9713f', '#8a4418'] },

    { emoji: '🥣', kcal: 320, p: 14, c: 46, f: 9,
      tags: ['veg', 'family'],
      en: { name: 'Overnight Oats with Fruit', sub: 'Breakfast, ready in the fridge',
            desc: 'Oats soaked with milk or a plant alternative, topped with seasonal fruit. Made in jars so mornings take ten seconds.' },
      pt: { name: 'Aveia de Um Dia para o Outro', sub: 'Café da manhã pronto na geladeira',
            desc: 'Aveia hidratada em leite ou bebida vegetal, com fruta da estação. Em potinhos, para a manhã levar dez segundos.' },
      grad: ['#c9b18a', '#8a7048'] }
  ];

  /* ---------------- translations (English lives in the HTML) ---------------- */
  var PT = {
    'skip': 'Pular para o conteúdo',
    'nav.about': 'Sobre a Jackie', 'nav.services': 'O que está incluído',
    'nav.menu': 'Cardápio e nutrição', 'nav.contact': 'Fale comigo',

    'hero.eyebrow': 'Chef particular · Santa Monica',
    'hero.h1': 'A comida fresca e saudável da sua família — feita na <em>sua</em> cozinha.',
    'hero.lede': 'Comida brasileira, mediterrânea, o dia a dia da família e sobremesas que valem ficar à mesa. Eu planejo a semana do jeito que a sua casa come de verdade, faço as compras na manhã do dia, cozinho na sua cozinha e deixo tudo porcionado, etiquetado e guardado.',
    'hero.call': 'Ligue (310) 425-6872', 'hero.menu': 'Ver o cardápio',
    'hero.s1t': 'Bacharel em Nutrição', 'hero.s1d': 'Ciência de Alimentos e Nutrição, São Paulo',
    'hero.s2t': 'Na sua cozinha', 'hero.s2d': 'Feito na hora, não entregue pronto',
    'hero.s3t': 'LA e Orange County', 'hero.s3d': 'Casas particulares e eventos',
    'hero.badge': 'Chef particular · Bacharel em Ciência de Alimentos e Nutrição',

    'strip.1': 'Marmitas da semana', 'strip.2': 'Brasileira e internacional',
    'strip.3': 'Do prato à sobremesa', 'strip.4': 'Jantares e eventos',
    'strip.5': 'Referências disponíveis',

    'about.caption': 'Jackie Wheeler · São Paulo → Santa Monica',
    'about.eyebrow': 'Oi, eu sou a Jackie',
    'about.h2': 'Brasileira de formação, mas eu cozinho o que a sua família ama.',
    'about.p1': 'Sou a Jackie Wheeler. Me formei no Brasil e sou bacharel em Ciência de Alimentos e Nutrição pela Universidade Anhembi Morumbi, em São Paulo, com curso de gestão da qualidade e controle de higiene de alimentos.',
    'about.p2': 'Cresci com feijão, moqueca e pão de queijo, e faço tudo isso. Mas na maioria das semanas eu estou fazendo pratos mediterrâneos, frango assado com legumes, massa que as crianças realmente comem e sobremesa na sexta. Do prato principal à sobremesa, o que a casa estiver a fim.',
    'about.p3': 'Hoje eu cozinho toda semana para famílias particulares em Los Angeles e Orange County — incluindo atletas profissionais e pessoas públicas — e atendo jantares, festas e eventos quando a casa recebe.',
    'about.c1': 'Cardápios adaptados a restrições, alergias e preferências',
    'about.c2': 'Tudo porcionado em potes individuais e etiquetado',
    'about.c3': 'Acompanho a geladeira e a despensa para desperdiçar menos',
    'about.c4': 'Cursando formação complementar em cozinha vegana',

    'cred.eyebrow': 'Formação', 'cred.h2': 'De onde vem a parte nutricional',
    'cred.1t': 'Bacharel em Ciência de Alimentos e Nutrição',
    'cred.1d': 'Universidade Anhembi Morumbi, São Paulo, Brasil',
    'cred.2y': 'Curso', 'cred.2t': 'Gestão da Qualidade e Controle de Higiene',
    'cred.2d': 'Manipulação, armazenamento e rotulagem seguros em cozinha doméstica',
    'cred.3y': 'Em andamento', 'cred.3t': 'Cozinha Vegana',
    'cred.3d': 'Cursando agora — cardápios vegetais sem achismo',
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
    'svc.2b': 'Brasileira, mediterrânea, ou o que combinar com a noite',
    'svc.2c': 'Sobremesas feitas do zero',
    'svc.2d': 'Empratamento, serviço à mesa e sugestões de vinho',
    'svc.3k': 'A parte nutricional', 'svc.3t': 'Comer com um objetivo',
    'svc.3p': 'Treino, uma condição de saúde, crianças em fase de crescimento, ou só cansaço de pensar nisso — o cardápio se ajusta ao objetivo.',
    'svc.3a': 'Alergias e restrições tratadas de verdade, não contornadas',
    'svc.3b': 'Porções do tamanho de quem realmente vai comer',
    'svc.3c': 'Informação nutricional de qualquer prato, quando pedir',
    'svc.3d': 'Produtos da estação e orgânicos onde faz diferença',

    'menu.eyebrow': 'Cardápio e nutrição', 'menu.h2': 'Uma semana de exemplo, com os números',
    'menu.lede': 'Pratos que eu faço com frequência, brasileiros e não brasileiros. Filtre pelo jeito que a sua casa come — cada prato mostra o que tem em uma porção.',
    'menu.empty': 'Nada corresponde a esse filtro — tente outro.',
    'menu.fineprint': '<strong>Sobre estes números:</strong> os valores nutricionais são estimativas por porção, calculadas a partir de pesos de receita padrão e arredondadas. Suas porções exatas são definidas quando planejamos a sua semana, e a Jackie fornece valores precisos e a lista completa de ingredientes de qualquer prato que ela cozinhar para você.',

    'filter.all': 'Tudo', 'filter.high-protein': 'Rico em proteína', 'filter.low-carb': 'Baixo carboidrato',
    'filter.veg': 'Vegetariano', 'filter.brazilian': 'Brasileiro', 'filter.dessert': 'Sobremesas',
    'filter.family': 'Favoritos da família',

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
    'footer.about': 'Sobre', 'footer.svc': 'O que está incluído', 'footer.menu': 'Cardápio',
    'footer.love': 'Feito com carinho.'
  };

  var TAG_LABELS = {
    en: { 'high-protein': 'High protein', 'low-carb': 'Low carb', 'veg': 'Vegetarian',
          'gluten-free': 'Gluten free', 'brazilian': 'Brazilian', 'dessert': 'Dessert',
          'family': 'Family favorite' },
    pt: { 'high-protein': 'Rico em proteína', 'low-carb': 'Baixo carboidrato', 'veg': 'Vegetariano',
          'gluten-free': 'Sem glúten', 'brazilian': 'Brasileiro', 'dessert': 'Sobremesa',
          'family': 'Favorito da família' }
  };

  var MACRO_LABELS = {
    en: { p: 'Protein', c: 'Carbs', f: 'Fat', mine: "Jackie's kitchen" },
    pt: { p: 'Proteína', c: 'Carboidrato', f: 'Gordura', mine: 'Cozinha da Jackie' }
  };

  var lang = 'en';
  var grid = document.getElementById('galleryGrid');
  var empty = document.getElementById('galleryEmpty');
  var activeFilter = 'all';

  /* ---------------- gallery ---------------- */
  function macroSplit(d) {
    var pk = d.p * 4, ck = d.c * 4, fk = d.f * 9;
    var total = pk + ck + fk || 1;
    return { p: Math.round(pk / total * 100), c: Math.round(ck / total * 100), f: Math.round(fk / total * 100) };
  }

  function buildCard(d) {
    var el = document.createElement('article');
    el.className = 'dish reveal';
    el.dataset.tags = d.tags.join(' ');

    var t = d[lang];
    var split = macroSplit(d);
    var ml = MACRO_LABELS[lang];
    var media = d.img
      ? '<img src="assets/img/' + d.img + '" alt="' + t.name + '" loading="lazy" onerror="this.remove()">' +
        '<span class="dish-real">' + ml.mine + '</span>'
      : '';

    el.innerHTML =
      '<div class="dish-media" style="background:linear-gradient(150deg,' + d.grad[0] + ',' + d.grad[1] + ')">' +
        media +
        '<span aria-hidden="true">' + d.emoji + '</span>' +
        '<span class="dish-kcal">' + d.kcal + ' kcal</span>' +
      '</div>' +
      '<div class="dish-body">' +
        '<h3>' + t.name + '</h3>' +
        '<p class="dish-pt">' + t.sub + '</p>' +
        '<p class="dish-desc">' + t.desc + '</p>' +
        '<div class="macros">' +
          '<div class="macro"><b>' + d.p + 'g</b><span>' + ml.p + '</span></div>' +
          '<div class="macro"><b>' + d.c + 'g</b><span>' + ml.c + '</span></div>' +
          '<div class="macro"><b>' + d.f + 'g</b><span>' + ml.f + '</span></div>' +
        '</div>' +
        '<div class="macro-bar" role="img" aria-label="' + ml.p + ' ' + split.p + '%, ' +
          ml.c + ' ' + split.c + '%, ' + ml.f + ' ' + split.f + '%">' +
          '<i class="mb-p" style="width:' + split.p + '%"></i>' +
          '<i class="mb-c" style="width:' + split.c + '%"></i>' +
          '<i class="mb-f" style="width:' + split.f + '%"></i>' +
        '</div>' +
        '<ul class="dish-tags">' +
          d.tags.map(function (tag) { return '<li>' + (TAG_LABELS[lang][tag] || tag) + '</li>'; }).join('') +
        '</ul>' +
      '</div>';
    return el;
  }

  function renderGallery() {
    if (!grid) { return; }
    grid.innerHTML = '';
    var frag = document.createDocumentFragment();
    DISHES.forEach(function (d) { frag.appendChild(buildCard(d)); });
    grid.appendChild(frag);
    applyFilter(activeFilter);
  }

  function applyFilter(filter) {
    activeFilter = filter;
    var shown = 0;
    grid.querySelectorAll('.dish').forEach(function (card) {
      var match = filter === 'all' || card.dataset.tags.split(' ').indexOf(filter) > -1;
      card.classList.toggle('is-hidden', !match);
      if (match) { shown++; }
    });
    if (empty) { empty.hidden = shown > 0; }
  }

  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      applyFilter(chip.dataset.filter);
    });
  });

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
    renderGallery();
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

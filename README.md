# Chef Jackie

Marketing site for a Brazilian personal chef in Los Angeles, with a filterable
**nutrition gallery** — every dish shows calories and a protein / carb / fat
breakdown per serving.

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run it

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` in a browser.

## Structure

```
index.html          all page content
assets/styles.css   design system + layout
assets/main.js      gallery data, filters, nav, form
assets/img/         photos (see below)
```

## Editing the nutrition gallery

Dishes live in the `DISHES` array at the top of `assets/main.js`:

```js
{ name: 'Moqueca de Peixe', pt: 'Bahian coconut fish stew', emoji: '🍲',
  desc: 'Sea bass simmered in coconut milk…',
  kcal: 512, p: 41, c: 30, f: 18,
  tags: ['high-protein', 'gluten-free', 'classic'],
  grad: ['#e8813f', '#c9613f'] }
```

- `p` / `c` / `f` are grams of protein, carbs and fat per serving. The colored
  bar under the macros is calculated from these (4/4/9 kcal per gram), so it
  stays correct on its own.
- `tags` drive the filter chips. Valid values: `high-protein`, `low-carb`,
  `vegan`, `gluten-free`, `classic`. Adding a new tag means adding a matching
  chip in `index.html` and a label in `TAG_LABELS`.
- `grad` is the two-color illustrated background used when there is no photo.

### Using real photos

Drop a file into `assets/img/` and add `img: 'moqueca.jpg'` to that dish. If the
file is missing the card falls back to the gradient, so nothing breaks
mid-shoot. The About portrait works the same way — add `assets/img/jackie.jpg`.

## Before going live

- Replace the placeholder email, phone and Instagram handle in `index.html`.
- Swap the testimonials for real ones (names and neighborhoods included).
- Confirm the prices in the Services section.
- The contact form currently opens the visitor's email client. To collect
  submissions properly, point it at a form service (Formspree, Netlify Forms,
  Basin) — see the comment in the submit handler in `assets/main.js`.

## Deploying

Any static host works. For GitHub Pages: repo **Settings → Pages → Deploy from
a branch**, pick the branch and `/ (root)`.

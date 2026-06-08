# JM Autoškola — web (ukázka)

Modernizovaná jednostránková ukázka webu pro **JM Autoškolu, provozovna Brno**.
Statický web: HTML + CSS + vanilla JS, bez frameworku a bez build kroku.

## Živá ukázka (GitHub Pages)

Po zapnutí Pages bude web na:
**https://thomas-wilson-ce.github.io/JMAutoskola/**

## Lokální spuštění

```bash
python serve.py
# nebo
python -m http.server 5050
```

Pak otevři <http://localhost:5050>.

## Struktura

- `index.html` — domovská stránka
- `assets/css/styles.css` — styly
- `assets/js/main.js` — interakce (navigace, mobilní menu)
- `assets/img/` — obrázky (logo, vozový park)

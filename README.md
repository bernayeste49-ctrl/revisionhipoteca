# revisionhipoteca.es

Calculadoras de hipoteca con el euríbor oficial (Banco de España, BOE). Astro estático en GitHub Pages.

- `node scripts/update-euribor.mjs` descarga los valores mensuales oficiales del euríbor a 1 año (cuadro 19.1 del Boletín Estadístico) a `src/data/euribor.json`.
- GitHub Actions actualiza los datos dos veces al día y publica la web.

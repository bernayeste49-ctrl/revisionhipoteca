// Descarga del Banco de España los valores mensuales OFICIALES del euríbor a un año
// (tipo de referencia oficial del mercado hipotecario, publicado en el BOE) y los guarda en src/data/euribor.json
import { writeFile, readFile } from 'node:fs/promises';

const URL_BDE = 'https://www.bde.es/webbe/es/estadisticas/compartido/datos/csv/be1901.csv';
const FILE = new URL('../src/data/euribor.json', import.meta.url);
const MESES = { ENE: '01', FEB: '02', MAR: '03', ABR: '04', MAY: '05', JUN: '06', JUL: '07', AGO: '08', SEP: '09', OCT: '10', NOV: '11', DIC: '12' };

const res = await fetch(URL_BDE);
if (!res.ok) throw new Error(`Banco de España respondió ${res.status}`);
const text = new TextDecoder('latin1').decode(await res.arrayBuffer());
const rows = text.split(/\r?\n/).map((l) => l.match(/("([^"]*)"|[^,]*)(,|$)/g)?.map((c) => c.replace(/,$/, '').replace(/^"|"$/g, '')) ?? []);
const desc = rows.find((r) => r[0] === 'DESCRIPCIÓN DE LA SERIE');
const col = desc.findIndex((d) => /Euríbor\. A 12 meses/i.test(d));
if (col < 1) throw new Error('No encuentro la columna del euríbor a 12 meses');

const data = {};
for (const r of rows) {
  const m = r[0]?.match(/^([A-Z]{3}) (\d{4})$/);
  if (!m || !MESES[m[1]]) continue;
  const v = parseFloat(r[col]);
  if (!Number.isNaN(v)) data[`${m[2]}-${MESES[m[1]]}`] = v;
}
const keys = Object.keys(data).sort();
if (keys.length < 300) throw new Error(`Muy pocos datos (${keys.length})`);
const out = Object.fromEntries(keys.map((k) => [k, data[k]]));
const old = await readFile(FILE, 'utf8').catch(() => '');
const json = JSON.stringify(out, null, 0).replace(/,"/g, ',\n"') + '\n';
if (old !== json) { await writeFile(FILE, json); console.log(`Actualizado: ${keys.length} meses, último ${keys.at(-1)} = ${out[keys.at(-1)]}`); }
else console.log('Sin cambios.');

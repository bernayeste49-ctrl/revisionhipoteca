import data from '../data/euribor.json';

export const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
export const months = Object.keys(data).sort(); // antiguo → reciente
export const latestYm = months.at(-1);
export const value = (ym) => data[ym];
export const series = () => months.map((ym) => ({ ym, v: data[ym] }));
export const monthLabel = (ym) => { const [y, m] = ym.split('-'); return `${MESES[+m - 1]} de ${y}`; };
export const monthShort = (ym) => { const [y, m] = ym.split('-'); return `${MESES[+m - 1].slice(0, 3)} ${y.slice(2)}`; };
export const shiftYm = (ym, n) => { const [y, m] = ym.split('-').map(Number); const d = new Date(Date.UTC(y, m - 1 + n, 1)); return d.toISOString().slice(0, 7); };
export const years = () => [...new Set(months.map((ym) => ym.slice(0, 4)))];
export const yearData = (y) => months.filter((ym) => ym.startsWith(y)).map((ym) => ({ ym, v: data[ym] }));
export const pct = (v, d = 3) => v.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }) + ' %';
export const signed = (v, d = 3) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });
export const eur = (v, d = 2) => v.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }) + ' €';

/** Cuota mensual de un préstamo francés */
export function cuota(capital, tasaAnualPct, meses) {
  const r = tasaAnualPct / 100 / 12;
  if (r === 0) return capital / meses;
  return (capital * r) / (1 - Math.pow(1 + r, -meses));
}
export const raw = data;

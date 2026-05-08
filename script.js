const v = document.getElementById('cv'), ctx = v.getContext('2d');
let e = 0;

// FUNCIÓN 1: Trazado de líneas y viewport
function dr(x1, y1, x2, y2, c, w = 1) {
  ctx.beginPath(); ctx.strokeStyle = c; ctx.lineWidth = w;
  ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}
const [I, L, R, B, T] = [0, 1, 2, 4, 8];
const gC = (x, y, xm, ym, xM, yM) => {
  let c = I;
  if (x < xm) c |= L; else if (x > xM) c |= R;
  if (y < ym) c |= B; else if (y > yM) c |= T;
  return c;
};

// FUNCIÓN 2: Procesa recorte y retorna datos
function cp(x1, y1, x2, y2, xm, ym, xM, yM) {
  let c1 = gC(x1, y1, xm, ym, xM, yM), c2 = gC(x2, y2, xm, ym, xM, yM), ok = 0;
  while (1) {
    if (!(c1 | c2)) { ok = 1; break; }
    if (c1 & c2) break;
    let out = c1 || c2, nx, ny;
    if (out & T) { nx = x1 + (x2 - x1) * (yM - y1) / (y2 - y1); ny = yM; }
    else if (out & B) { nx = x1 + (x2 - x1) * (ym - y1) / (y2 - y1); ny = ym; }
    else if (out & R) { ny = y1 + (y2 - y1) * (xM - x1) / (x2 - x1); nx = xM; }
    else { ny = y1 + (y2 - y1) * (xm - x1) / (x2 - x1); nx = xm; }
    if (out == c1) { x1 = nx; y1 = ny; c1 = gC(x1, y1, xm, ym, xM, yM); }
    else { x2 = nx; y2 = ny; c2 = gC(x2, y2, xm, ym, xM, yM); }
  }
  return { x1, y1, x2, y2, ok };
}
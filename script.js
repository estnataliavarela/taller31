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
const cs = [
  {p:[10,5,10,90]}, {p:[50,50,400,300]}, 
  {p:[0,150,500,150]}, {p:[200,0,200,400]}, {p:[350,20,450,100]}
];

function nv(n) { e = Math.max(0, Math.min(4, n)); rd(); }
function rd() {
  ctx.clearRect(0, 0, 400, 300);
  const [xm, ym, xM, yM] = ['x1','y1','x2','y2'].map(id => +document.getElementById(id).value);
  
  // Dibujar Ventana
  [[xm,ym,xM,ym],[xM,ym,xM,yM],[xM,yM,xm,yM],[xm,yM,xm,ym]].forEach(b => dr(...b, 'blue', 2));

  const {p} = cs[e];
  dr(...p, '#eee'); // Original

  const r = cp(...p, xm, ym, xM, yM);
  if (r.ok) dr(r.x1, r.y1, r.x2, r.y2, 'red', 2);

  document.getElementById('i').innerHTML = `<b>Línea:</b><br>p1:(${p[0]},${p[1]}) p2:(${p[2]},${p[3]})<br><b>Recorte:</b><br>pc1:(${Math.round(r.x1)},${Math.round(r.y1)})<br>pc2:(${Math.round(r.x2)},${Math.round(r.y2)})`;
}
rd();
ctx.fillStyle = 'black'; ctx.fillText('(0,0)', 5, 290);
  ctx.fillText('x1,y1', xm, ym-5); ctx.fillText('x2,y2', xM, yM+15);
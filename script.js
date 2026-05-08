const v = document.getElementById('cv'), ctx = v.getContext('2d');
let e = 0;

// FUNCIÓN 1: Trazado de líneas y viewport
function dr(x1, y1, x2, y2, c, w = 1) {
  ctx.beginPath(); ctx.strokeStyle = c; ctx.lineWidth = w;
  ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
}
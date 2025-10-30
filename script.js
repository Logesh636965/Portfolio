function toggleMenu(){
  const m = document.getElementById('menu');
  if(!m) return; m.classList.toggle('open');
}

function submitForm(e){
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  alert('Thanks, ' + (data.name || 'there') + '! I will get back to you.');
  e.target.reset();
  return false;
}

document.addEventListener('DOMContentLoaded', ()=>{
  const y = document.getElementById('year');
  if(y) y.textContent = String(new Date().getFullYear());

  // Static entries are set in HTML per your CV; skipping auto‑parse from PDF
});




function toggleMenu(){
  const m = document.getElementById('menu');
  if(!m) return; m.classList.toggle('open');
}

function submitForm(e){
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());

  const submitBtn = e.target.querySelector('button[type="submit"]');
  if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

  // Configure your EmailJS credentials here
  // 1) Create an account at https://www.emailjs.com/
  // 2) Create a Service (Gmail/SMTP), a Template with variables: name, email, phone, message
  // 3) Get: PUBLIC KEY, SERVICE ID, TEMPLATE ID and fill below
  const EMAILJS_PUBLIC_KEY = 'GlanF-sqR5l1W_N_T';
  const EMAILJS_SERVICE_ID = 'service_wmjq1ua';
  const EMAILJS_TEMPLATE_ID = 'template_ipwnto2';

  const isConfigured = EMAILJS_PUBLIC_KEY.indexOf('YOUR_') !== 0 && EMAILJS_SERVICE_ID.indexOf('YOUR_') !== 0 && EMAILJS_TEMPLATE_ID.indexOf('YOUR_') !== 0;

  const restoreBtn = ()=>{ if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = 'Send Now'; } };

  if(typeof emailjs === 'undefined'){
    alert('Email service not loaded. Please check your internet connection and reload the page.');
    restoreBtn();
    return false;
  }

  try{
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }catch(err){
    // init may throw if key is invalid; handle gracefully
  }

  if(!isConfigured){
    alert('Thanks, ' + (data.name || 'there') + '! The contact service is not configured yet. Please reach me at your-email@example.com or WhatsApp me at +91XXXXXXXXXX.');
    restoreBtn();
    return false;
  }

  const payload = {
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    message: data.message || ''
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload)
    .then(function(){
      alert('Thanks, ' + (data.name || 'there') + '! Your message has been sent.');
      e.target.reset();
      restoreBtn();
    })
    .catch(function(err){
      console.error('EmailJS send failed', err);
      alert('Sorry, there was a problem sending your message. Please try again later or email me directly at your-email@example.com.');
      restoreBtn();
    });

  return false;
}

document.addEventListener('DOMContentLoaded', ()=>{
  const y = document.getElementById('year');
  if(y) y.textContent = String(new Date().getFullYear());

  // Static entries are set in HTML per your CV; skipping auto‑parse from PDF
});




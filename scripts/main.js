// utilities
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('year').textContent = new Date().getFullYear();
  attachUI();
  renderSafaris();
});

function attachUI(){
  // video modal
  const videoModal = document.getElementById('video-modal');
  const watchBtn = document.getElementById('watch-video');
  const closeVideo = document.getElementById('close-video');
  const heroVideo = document.getElementById('hero-video');
  const defaultVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0";

  watchBtn && watchBtn.addEventListener('click', () => {
    heroVideo.src = defaultVideoUrl;
    videoModal.classList.add('active');
  });
  closeVideo && closeVideo.addEventListener('click', () => {
    heroVideo.src = "";
    videoModal.classList.remove('active');
  });

  // booking modal
  const bookingModal = document.getElementById('booking-modal');
  const closeBooking = document.getElementById('close-booking');
  closeBooking && closeBooking.addEventListener('click', ()=> bookingModal.classList.remove('active'));

  // whatsapp send
  const whatsappBtn = document.getElementById('whatsapp-send');
  whatsappBtn && whatsappBtn.addEventListener('click', () => {
    const form = document.getElementById('booking-form');
    const name = form.querySelector('[name="name"]').value || '';
    const whatsapp = form.querySelector('[name="whatsapp"]').value || '';
    const pkg = form.querySelector('[name="package"]').value || '';
    const dates = form.querySelector('[name="dates"]').value || '';
    const guests = form.querySelector('[name="guests"]').value || '';
    const msg = `Hello, I would like to book the ${pkg} for ${dates} for ${guests} guests. Name: ${name}.`;
    const phone = whatsapp.replace(/[^0-9+]/g, '') || '';
    const url = phone ? `https://wa.me/${phone.replace('+','') }?text=${encodeURIComponent(msg)}` :
             `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });

  // netlify form submit feedback
  const bookingForm = document.getElementById('booking-form');
  bookingForm && bookingForm.addEventListener('submit', function(e){
    setTimeout(()=> {
      alert('Thanks! Your booking request has been submitted. We will contact you shortly.');
      document.getElementById('booking-modal').classList.remove('active');
      this.reset();
    }, 500);
  });
}

// example safaris data and render
const exampleSafaris = [
  {"title":"Chobe National Park Adventure","img":"images/hero.jpg","desc":"Experience incredible elephant encounters, river cruises and guided game drives.","duration":"4 days / 3 nights","price":"$1,450"},
  {"title":"Okavango Delta Explorer","img":"images/hero.jpg","desc":"Mokoro rides and walking safaris in the delta.","duration":"5 days / 4 nights","price":"$1,850"}
];

function renderSafaris(){
  const container = document.getElementById('safari-cards') || document.getElementById('safaris-grid');
  if(!container) return;
  container.innerHTML = '';
  exampleSafaris.forEach(s => {
    const card = document.createElement('article');
    card.className = 'safari-card';
    card.innerHTML = `
      <img src="${s.img}" alt="${s.title}">
      <div class="card-body">
        <h3>${s.title}</h3>
        <p class="meta">${s.duration}</p>
        <p class="desc">${s.desc}</p>
        <div class="card-footer">
          <div class="price">${s.price}</div>
          <div class="actions">
            <button class="btn small book-btn" data-package="${s.title}">Book Safari</button>
          </div>
        </div>
      </div>`;
    container.appendChild(card);
  });
  // attach booking buttons
  document.querySelectorAll('.book-btn').forEach(b=>{
    b.addEventListener('click', (e)=>{
      const bookingPackage = document.getElementById('booking-package');
      bookingPackage && (bookingPackage.value = e.currentTarget.dataset.package);
      const bookingModal = document.getElementById('booking-modal');
      bookingModal && bookingModal.classList.add('active');
    });
  });
}

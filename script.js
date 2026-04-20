// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
    document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('show')));
}

// Active nav link based on current page
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
function revealOnScroll() { reveals.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight - 120) el.classList.add('active'); }); }
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Counters (only on homepage if metrics exist)
if (document.querySelector('.metric-number')) {
    const counters = document.querySelectorAll('.metric-number');
    let counted = false;
    function startCounters() { if (counted) return; counted = true; counters.forEach(counter => { let target = parseInt(counter.dataset.target); let current = 0; let increment = Math.ceil(target / 50); function update() { current += increment; if (current < target) { counter.innerText = current; requestAnimationFrame(update); } else counter.innerText = target; } update(); }); }
    window.addEventListener('scroll', () => { if (document.getElementById('metrics') && document.getElementById('metrics').getBoundingClientRect().top < window.innerHeight - 100 && !counted) startCounters(); });
}

// Telegram proxy integration (only on admission page)
const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
    const TELEGRAM_BOT_TOKEN = '8673348746:AAEZL-lYauwuGcZKz9abptnqHoiPJ1YrMhM';
    const TELEGRAM_CHAT_ID = '7059197576';
    const TELEGRAM_PROXY_URL = 'https://telegram-bot-proxy.umarofficial404.workers.dev/';
    function sendToTelegram(data) {
        const text = `🎓 NEW QURAN ACADEMY ADMISSION 🎓\n\n👤 Student: ${data.studentName}\n👪 Parent: ${data.parentName}\n📞 WhatsApp: ${data.whatsapp}\n📧 Email: ${data.email}\n📚 Course: ${data.course}\n🌍 Country: ${data.country}\n⏰ Time: ${data.preferredTime || 'Not specified'}\n💬 Message: ${data.message || 'None'}\n\n🕋 Free 3-Day Trial Request\nTime: ${new Date().toLocaleString()}`;
        fetch(TELEGRAM_PROXY_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ botToken: TELEGRAM_BOT_TOKEN, chatId: TELEGRAM_CHAT_ID, message: text }) }).catch(console.error);
    }
    admissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const studentName = document.getElementById('studentName').value.trim();
        const parentName = document.getElementById('parentName').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const email = document.getElementById('email').value.trim();
        const course = document.getElementById('course').value;
        const country = document.getElementById('country').value.trim();
        const preferredTime = document.getElementById('preferredTime').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!studentName || !parentName || !whatsapp || !email || !course || !country) { alert("Please fill all required fields."); return; }
        sendToTelegram({ studentName, parentName, whatsapp, email, course, country, preferredTime, message });
        alert("✅ Jazakallah! Your request has been submitted. We will contact you within 24 hours.");
        admissionForm.reset();
    });
                                            }

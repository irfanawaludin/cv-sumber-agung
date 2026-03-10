/**
 * CV SUMBER AGUNG - Premium Rent Car
 * Optimized Script v3.1
 */

// 1. Inisialisasi AOS (Optimasi untuk Mobile)
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    disable: 'mobile' // Menonaktifkan AOS di mobile sangat meningkatkan FPS (kelancaran)
});

// 2. Sticky Navbar Effect (Throttled)
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 3. Mobile Menu Logic
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Mencegah scroll body saat menu terbuka (mengurangi lag)
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
});

// Klik di luar menu untuk menutup
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// Tutup menu saat link diklik
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// 4. Data Armada & Render
const dataArmada = [
    { 
        nama: "Mitsubishi Pajero", 
        tipe: "Sport Luxury", 
        harga: "5.500k", 
        gambar: "img/pajero.png"
    },
    { 
        nama: "Brio", 
        tipe: "Family VIP", 
        harga: "2.800k", 
        gambar: "img/brio.png"
    },
    { 
        nama: "Xenia", 
        tipe: "SUV Premium", 
        harga: "8.000k", 
        gambar: "img/xenia.png"
    },
    { 
        nama: "Hyundai IONIQ 6", 
        tipe: "Electric Future", 
        harga: "1.900k", 
        gambar: "img/ioniq.png"
    }
];

const containerMobil = document.getElementById('carDisplay');
const selectMobil = document.getElementById('carUnit');

if (containerMobil) {
    const fragment = document.createDocumentFragment(); // Gunakan Fragment untuk performa render
    dataArmada.forEach((mobil, i) => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', i * 50);
        card.innerHTML = `
            <img src="${mobil.gambar}" class="car-img" alt="${mobil.nama}" loading="lazy">
            <div class="car-info">
                <span class="badge" style="background:var(--primary); color:white; border:none">${mobil.tipe}</span>
                <h3 style="margin:10px 0">${mobil.nama}</h3>
                <div class="car-price" style="color:var(--accent); font-weight:800">Rp ${mobil.harga} <span style="font-size:12px; color:#94a3b8">/ hari</span></div>
                <button onclick="bookingWaras('${mobil.nama}')" class="btn-main" style="width:100%; margin-top:20px; font-size:14px; background:var(--primary); color:white; cursor:pointer">Booking Now</button>
            </div>
        `;
        fragment.appendChild(card);

        // Fill Select Form
        const option = document.createElement('option');
        option.value = mobil.nama;
        option.textContent = mobil.nama;
        selectMobil.appendChild(option);
    });
    containerMobil.appendChild(fragment);
}

// 5. Booking Logic
function bookingWaras(nama) {
    selectMobil.value = nama;
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// 6. WA Integration
document.getElementById('waForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = document.getElementById('custName').value;
    const unit = document.getElementById('carUnit').value;
    const tgl = document.getElementById('rentDate').value;
    const pesan = `Halo CV Sumber Agung,\n\nSaya *${nama}* ingin reservasi unit *${unit}* untuk tanggal *${tgl}*.`;
    window.open(`https://wa.me/628123456789?text=${encodeURIComponent(pesan)}`, '_blank');
});

const hero = document.querySelector(".hero-section")

hero.style.backgroundImage =
"linear-gradient(rgba(5,7,10,0.6),rgba(5,7,10,0.9)), url('img/background.jpg')"

// COUNTER ANIMATION
const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const speed = target / 120;

    const update = () => {
        count += speed;

        if (count < target) {
            counter.innerText = Math.floor(count);
            requestAnimationFrame(update);
        } else {
            counter.innerText = target;
        }
    };

    update();
};

// jalankan saat muncul di layar
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.7 });

counters.forEach(counter => {
    observer.observe(counter);
});
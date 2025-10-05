// Wedding data
const weddingData = {
    date: '2025-10-05T19:30:00+07:00', // Senin, 5 Oktober 2025, pukul 19:30 WIB
    locations: {
        ceremony: {
            name: 'Masjid Al-Ikhlas',
            address: 'Jl. Merdeka No. 123, Jakarta Pusat',
            coordinates: '-6.2088,106.8456'
        },
        reception: {
            name: 'Grand Ballroom Hotel Mulia',
            address: 'Jl. Asia Afrika No. 8, Jakarta Selatan',
            coordinates: '-6.2297,106.8253'
        }
    },
    photos: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop'
    ]
};

// Music control
let isMusicPlaying = false;
const backgroundMusic = document.getElementById('backgroundMusic');
const musicIcon = document.getElementById('musicIcon');

function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicIcon.className = 'fas fa-volume-mute';
        isMusicPlaying = false;
    } else {
        backgroundMusic.play().catch(e => {
            console.log('Audio play failed:', e);
        });
        musicIcon.className = 'fas fa-volume-up';
        isMusicPlaying = true;
    }
}

// Auto-play music when user interacts with the page
document.addEventListener('click', function() {
    if (!isMusicPlaying) {
        backgroundMusic.play().catch(e => {
            console.log('Audio play failed:', e);
        });
        musicIcon.className = 'fas fa-volume-up';
        isMusicPlaying = true;
    }
}, { once: true });

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date(weddingData.date);
    const now = new Date();
    const difference = weddingDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // Wedding day has arrived
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Map functions
function openMap(type) {
    const location = weddingData.locations[type];
    const url = `https://www.google.com/maps/search/?api=1&query=${location.coordinates}&query_place_id=${encodeURIComponent(location.address)}`;
    window.open(url, '_blank');
}

// Gallery lightbox
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    lightboxImage.src = weddingData.photos[index];
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % weddingData.photos.length;
    document.getElementById('lightbox-image').src = weddingData.photos[currentImageIndex];
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + weddingData.photos.length) % weddingData.photos.length;
    document.getElementById('lightbox-image').src = weddingData.photos[currentImageIndex];
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// Share functions
function shareWhatsApp() {
    const text = `Anda diundang ke pernikahan Sarah Amanda & Michael Johnson! 💕\n\nSabtu, 15 Desember 2024\n\nLihat undangan lengkap: ${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

function shareFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
}

function shareTwitter() {
    const text = `Anda diundang ke pernikahan Sarah Amanda & Michael Johnson! 💕 Sabtu, 15 Desember 2024`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
}

function shareInstagram() {
    const text = `Anda diundang ke pernikahan Sarah Amanda & Michael Johnson! 💕\n\nSabtu, 15 Desember 2024\n\nLink: ${window.location.href}`;
    
    // Copy to clipboard for Instagram
    navigator.clipboard.writeText(text).then(() => {
        alert('Teks telah disalin! Buka Instagram dan tempel di story atau post Anda.');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Teks telah disalin! Buka Instagram dan tempel di story atau post Anda.');
    });
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link undangan telah disalin ke clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link undangan telah disalin ke clipboard!');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.event-card, .gallery-item, .time-unit');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.event-card, .gallery-item, .time-unit');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Preload images for better performance
function preloadImages() {
    weddingData.photos.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    preloadImages();
    animateOnScroll();
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add some interactive effects
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add click effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
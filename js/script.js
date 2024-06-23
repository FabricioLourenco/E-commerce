let slideIndex = 0;
const slides = document.querySelectorAll('.carrosel-slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    if (n < 0) {
        slideIndex = slides.length - 1;
    } else if (n >= slides.length) {
        slideIndex = 0;
    }
    slides[slideIndex].classList.add('active');
}

function prevSlide() {
    showSlide(slideIndex -= 1);
}

function nextSlide() {
    showSlide(slideIndex += 1);
}

// Automatic slideshow
setInterval(nextSlide, 5000);

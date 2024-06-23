let currentSlide = 0;
const slides = document.querySelectorAll('.carrosel-slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Mostrar o primeiro slide ao carregar a página
showSlide(currentSlide);

// Trocar de slide a cada 7 segundos
setInterval(nextSlide, 7000);
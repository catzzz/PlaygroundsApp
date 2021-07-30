var currentSlide = 1;
function nextSlide() {
    showSlide(currentSlide += 1);
}

function previousSlide() {
    showSlide(currentSlide -= 1);
}
function showSlide(slideIndex) {
    
    const slides = document.getElementsByClassName('carouselImgs');
    
    if (slideIndex > slides.length) { currentSlide = 1 }
    if (slideIndex < 1) { currentSlide = slides.length }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
    }
    slides[currentSlide - 1].style.display = 'flex'
}
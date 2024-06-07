let _galleryImages = galleryData;

function drawGallery() {
    _galleryImages.forEach(imagePath => {
        imagePath = `assets/img/gallery/${imagePath}`;
        let menuItem = drawGalleryItem(imagePath);
        $("#gallery-section-items").append(menuItem);
    });
}
function drawGalleryItem(imagePath) {
    let slider = `<div class="swiper-slide">
                    <a class="glightbox" data-gallery="images-gallery" href="${imagePath}">
                        <img class="img-fluid" src="${imagePath}" alt="Image">
                    </a>
                  </div>`;

    return slider;
}
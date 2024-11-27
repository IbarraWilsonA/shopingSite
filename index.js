const mobileOpen = document.getElementById('mobile-open');
const mobileClose = document.getElementById('mobile-close');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.getElementById('overlay');
const body = document.body;
mobileOpen.addEventListener('click', () => { 
    mobileMenu.style.left = '0';
    overlay.style.display = 'block';
    body.classList.add('no-scroll');
});
mobileClose.addEventListener('click', () => {
    mobileMenu.style.left = '-100%';
    overlay.style.display = 'none';
    body.classList.remove('no-scroll');
});


let currentQuantity = 0;
const cartBtn = document.getElementById('cart-btn');
const cartDisplay = document.getElementById('cart-display');
const cartEmpty = document.getElementById('cart-empty');
const cartFilled = document.getElementById('cart-filled');
const deleteBtn = document.getElementById('delete-btn');
const currentCartQuantityDisplay = document.getElementById('current-cart-quantity-display');
function updateCartDisplay() {
    if(currentQuantity === 0) {
        cartEmpty.style.display = 'block';
        cartFilled.style.display = 'none';
        currentCartQuantityDisplay.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartFilled.style.display = 'block';
        currentCartQuantityDisplay.textContent = currentQuantity;
        currentCartQuantityDisplay.style.display = 'block';
        const priceDisplay = cartFilled.querySelector('.price');
        priceDisplay.innerHTML = `$125.00 x ${currentQuantity} <b>$${(currentQuantity * 125).toFixed(2)}</b>`;
    }
}
cartBtn.addEventListener('click', () => {
    if(cartDisplay.style.display === 'block') {
        cartDisplay.style.display = 'none';
        return;
    }

    cartDisplay.style.display = 'block';
    updateCartDisplay();
});
deleteBtn.addEventListener('click', () => {
    currentQuantity = 0;
    updateCartDisplay();
});


const addToCartBtn = document.getElementById('add-to-cart')
const quantityDisplay = document.getElementById('quantity-display');
const reduceBtn = document.getElementById('reduce-btn');
const increaseBtn = document.getElementById('increase-btn');
let quantity = 0;
reduceBtn.addEventListener('click', () => {
    if(quantity === 0) return;
    quantity--;
    quantityDisplay.textContent = quantity;
});
increaseBtn.addEventListener('click', () => {
    quantity++;
    quantityDisplay.textContent = quantity;
});
addToCartBtn.addEventListener('click', () => {
    if(quantity === 0) return;
    currentQuantity = quantity;
    quantity = 0;
    quantityDisplay.textContent = quantity;
    updateCartDisplay();
});


// if any part of the screen is clicked that is not the cart display and the cart display is open, close the cart display
document.addEventListener('click', (e) => {
    if(cartDisplay.style.display === 'block' && !e.target.closest('#cart-display') && !e.target.closest('#cart-btn')) {
        cartDisplay.style.display = 'none';
    }
});


const productImageUrls = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
]
const mobileThumbnailsImgs = document.querySelectorAll('.mobile img');
const mobileProductDisplay = document.getElementById('mobile-product-display');
const mobilePrevArrow = document.getElementById('mobile-prev-arrow');
const mobileNextArrow = document.getElementById('mobile-next-arrow');
let currentImageMobileIndex = 0;
mobileThumbnailsImgs.forEach((thumbnail, index) => { 
    thumbnail.addEventListener('click', () => {
        currentImageMobileIndex = index;
        mobileProductDisplay.src = productImageUrls[currentImageMobileIndex];
        highlightThumnail(mobileThumbnailsImgs, currentImageMobileIndex)
    });
});
function highlightThumnail(thumbnails, currentImageIndex) { 
    thumbnails.forEach((thumbnail, index) => {
        if(index === currentImageIndex) {
            thumbnail.classList.add('active');
        } else {
            thumbnail.classList.remove('active');
        }
    });
}
mobilePrevArrow.addEventListener('click', () => {
    currentImageMobileIndex--;
    if(currentImageMobileIndex < 0) currentImageMobileIndex = productImageUrls.length - 1;
    mobileProductDisplay.src = productImageUrls[currentImageMobileIndex];
    highlightThumnail(mobileThumbnailsImgs, currentImageMobileIndex)
});
mobileNextArrow.addEventListener('click', () => {
    currentImageMobileIndex++;
    if(currentImageMobileIndex >= productImageUrls.length) currentImageMobileIndex = 0;
    mobileProductDisplay.src = productImageUrls[currentImageMobileIndex];
    highlightThumnail(mobileThumbnailsImgs, currentImageMobileIndex)
});


const desktopThumbnailsImgs = document.querySelectorAll('.lightbox .product-thumbnails img');
const desktopPrevArrow = document.getElementById('desktop-prev-arrow');
const desktopNextArrow = document.getElementById('desktop-next-arrow');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-btn');
let currentDesktopImageIndex = currentImageMobileIndex;
mobileProductDisplay.addEventListener('click', () => {
    //check if the window width is greater than 920px
    if(window.innerWidth <= 920) return;
    lightbox.style.display = 'flex';
    lightboxImg.src = mobileProductDisplay.src;
});
desktopThumbnailsImgs.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        lightboxImg.src = productImageUrls[index];
        highlightThumnail(desktopThumbnailsImgs, index);
    });
});
desktopPrevArrow.addEventListener('click', () => {
    currentDesktopImageIndex--;
    if (currentDesktopImageIndex < 0) currentDesktopImageIndex = productImageUrls.length - 1;
    lightboxImg.src = productImageUrls[currentDesktopImageIndex];
    highlightThumnail(desktopThumbnailsImgs, currentDesktopImageIndex);
});
desktopNextArrow.addEventListener('click', () => {
    currentDesktopImageIndex++;
    if (currentDesktopImageIndex >= productImageUrls.length) currentDesktopImageIndex = 0;
    lightboxImg.src = productImageUrls[currentDesktopImageIndex];
    highlightThumnail(desktopThumbnailsImgs, currentDesktopImageIndex);
});
closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});
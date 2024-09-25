
const carousel = document.querySelector('#carousel');
let isDragging = false;
let startX;
let scrollLeft;
let velocity = 0;
let dragSpeedMultiplier = 0.6;  

const cloneItems = () => {
  const items = [...document.querySelectorAll('.carousel-item')];
  items.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone);  
    const cloneStart = item.cloneNode(true);
    carousel.prepend(cloneStart);  
  });
};

const initializeCarousel = () => {
  cloneItems();
  carousel.scrollLeft = carousel.scrollWidth / 2 - carousel.offsetWidth / 2;
};

carousel.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  scrollLeft = carousel.scrollLeft;
  carousel.style.cursor = 'grabbing';
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - startX;
  carousel.scrollLeft = scrollLeft - x * dragSpeedMultiplier;

  if (carousel.scrollLeft <= 0) {
    carousel.scrollLeft = carousel.scrollWidth / 2 - carousel.offsetWidth / 2;
  }
  if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
    carousel.scrollLeft = carousel.scrollWidth / 2 - carousel.offsetWidth / 2;
  }
});

const stopDragging = () => {
  isDragging = false;
  carousel.style.cursor = 'grab';
};
carousel.addEventListener('mouseup', stopDragging);
carousel.addEventListener('mouseleave', stopDragging);

initializeCarousel();




// cards


function renderProducts(type) {
  const mensProducts = data.products[0][type];
  const container = document.getElementById("products");

  const productCards = mensProducts
    .map(
      (product) => `
      <a href="productpage.html?id=${product.id}&type=${type}" class="card" style="text-decoration: none; color: black">
          <img src="${product.thumbnail}" height="350px" alt="${product.title}" style="width: 100%; border-radius: 15px" />
          <div class="container" style="display: flex; justify-content: space-between">
            <div>
            <h4><b>${product.title}</b></h4>
            <p>${product.category}</p></div>
            <p>$${product.price}</p>
          </div>
        </a>
    `
    )
    .join("");

  container.innerHTML = productCards; 
}



  
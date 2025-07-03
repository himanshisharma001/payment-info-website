//  ---------------Navbar------------------------
(() => {
  const openNav = document.querySelector(".open-menu"),
    closeNav = document.querySelector(".close-menu"),
    navMenu = document.querySelector(".nav-link-container"),
    background = document.querySelector(".background"),
    mediaSize = 992;

  let currentlyOpenDropdown = null;

  openNav?.addEventListener("click", toggleMenu);
  closeNav?.addEventListener("click", toggleMenu);
  background?.addEventListener("click", toggleMenu);

  function toggleMenu() {
    navMenu.classList.toggle("open");
    background.classList.toggle("active");
  }

  navMenu?.addEventListener("click", (event) => {
    const toggleBtn = event.target.closest("[data-toggle='dropdown-menu']");

    if (toggleBtn && window.innerWidth <= mediaSize) {
      event.preventDefault(); // Stop button default
      event.stopPropagation(); // Stop bubbling to <a>

      const dropdownMenuBranch = toggleBtn.closest(".dropdown-menu-branch");

      if (currentlyOpenDropdown === dropdownMenuBranch) {
        collapseDropdownMenu(currentlyOpenDropdown);
        currentlyOpenDropdown = null;
      } else {
        if (currentlyOpenDropdown) {
          collapseDropdownMenu(currentlyOpenDropdown);
        }
        openDropdownMenu(dropdownMenuBranch);
        currentlyOpenDropdown = dropdownMenuBranch;
      }
    }
  });

  function openDropdownMenu(branch) {
    branch.classList.add("active");
    const dropdownMenu = branch.querySelector(".dropdown-main-menu");
    dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
  }

  function collapseDropdownMenu(branch) {
    if (!branch) return;
    const dropdownMenu = branch.querySelector(".dropdown-main-menu");
    dropdownMenu.style.maxHeight = null;
    branch.classList.remove("active");
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > mediaSize) {
      if (navMenu.classList.contains("open")) {
        toggleMenu();
      }
      if (currentlyOpenDropdown) {
        collapseDropdownMenu(currentlyOpenDropdown);
        currentlyOpenDropdown = null;
      }
    }
  });
})();
// --------------------Counter------------------------

function animateCounter(el, target, duration = 3000) {

  let start = 0;

  const increment = target / (duration / 16);



  clearInterval(el._counterInterval); // Clear any existing animation



  el._counterInterval = setInterval(() => {

    start += increment;

    if (start >= target) {

      el.textContent = `${target}+`;

      clearInterval(el._counterInterval);

    } else {

      el.textContent = `${Math.floor(start)}+`;

    }

  }, 16);

}



const counters = document.querySelectorAll('.solution-counter-box h4');



const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      const el = entry.target;

      const target = parseInt(el.getAttribute('data-target'));

      animateCounter(el, target);

    }

  });

}, {

  threshold: 0.5 // triggers when 50% visible

});



document.addEventListener("DOMContentLoaded", () => {

  counters.forEach(counter => observer.observe(counter));

});

// -----------------------Home Services Slider-------------------------------

const swiper = new Swiper('.our-services-slider', {
  slidesPerView: 3,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  grid: {
    rows: 2,
    fill: 'row',
  },
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 3,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      grid: {
        rows: 1,
      },
    },
    768: {
      slidesPerView: 2,
      grid: {
        rows: 2,
      },
    },
    1024: {
      slidesPerView: 3,
    }
  }
});

// Get the swiper container element
const sliderEl = document.querySelector('.our-services-slider');

// Pause on mouse enter
sliderEl.addEventListener('mouseenter', () => {
  swiper.autoplay.stop();
});

// Resume on mouse leave
sliderEl.addEventListener('mouseleave', () => {
  swiper.autoplay.start();
});


//   -----------------About us Slider---------------------------

const aboutSlider = new Swiper(".home-aboutus-slider", {

  slidesPerView: 1,

  spaceBetween: 10,

  autoplay: {

    delay: 5000, // 3 seconds

    disableOnInteraction: false,

  },

  navigation: {

    nextEl: ".swiper-button-next",

    prevEl: ".swiper-button-prev",

  },



  breakpoints: {

    0: {

      slidesPerView: 1,

    },

    1024: {

      slidesPerView: 1,

    }

  }

});



//   -----------------Testimonial Slider---------------------------

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".testimonial-slider", {
    slidesPerView: 3,
    spaceBetween: 10,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });


});


// ------------------------Hero Section Animation-----------------------------
const divs = [
  document.getElementById('firstDiv'),
  document.getElementById('secondDiv'),
  document.getElementById('thirdDiv'),
  document.getElementById('fourthDiv')
];

let currentIndex = 0;
let intervalId;

function showNextDiv() {
  const currentDiv = divs[currentIndex];
  const nextIndex = (currentIndex + 1) % divs.length;
  const nextDiv = divs[nextIndex];

  // Hide current
  currentDiv.classList.remove('animate__bounceIn', 'animate__zoomIn');
  currentDiv.classList.add('animate__fadeOut');

  currentDiv.addEventListener('animationend', () => {
    currentDiv.style.display = 'none';
    currentDiv.classList.remove('animate__fadeOut');

    // Show next
    nextDiv.style.display = 'block';
    nextDiv.classList.remove('animate__fadeOut', 'animate__bounceIn', 'animate__zoomIn');
    void nextDiv.offsetWidth; // reflow to restart animation
    nextDiv.classList.add('animate__bounceIn', 'animate__zoomIn');

    currentIndex = nextIndex;
  }, { once: true });
}

// Start the interval
function startRotation() {
  intervalId = setInterval(showNextDiv, 6000);
}

// Stop the interval
function stopRotation() {
  clearInterval(intervalId);
}

// Start initially
startRotation();

// Pause on hover
const container = document.querySelector('.container');
container.addEventListener('mouseenter', stopRotation);
container.addEventListener('mouseleave', startRotation);
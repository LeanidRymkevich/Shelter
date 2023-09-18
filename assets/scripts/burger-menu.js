function openMenu(burger, menu) {
  menu.classList.add('header__menu_active');
  document.body.classList.add('_locked');
  burger.classList.add('burger_active');
}

function closeMenu(burger, menu) {
  menu.classList.remove('header__menu_active');
  document.body.classList.remove('_locked');
  burger.classList.remove('burger_active');
}

function burgerClickHandler(burger, menu) {
  burger.addEventListener('click', () => {
    if(burger.classList.contains('burger_active')){
      closeMenu(burger, menu);
    } else {
      openMenu(burger, menu);
    }
  })
}

function menuClickHandler(burger, menu) {
  menu.addEventListener('click', (event) => {
    const target = event.target;
    if(target.closest('.menu__link') || target === event.currentTarget) {
      closeMenu(burger, menu);
    }
  })
}

function smoothScroll(){
  const anchors = document.querySelectorAll('a[href*="#"]');

  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      
      const link = anchor.getAttribute('href');
      const link_parts = link.split('#');
      let blockID;
      if(link_parts[0] === ''){ 
        blockID = link.substring(1);
        e.preventDefault();
      } else { // if it is a link to the other page, not an anchor
        return;
      }
      
      if(blockID !== 'no_scroll'){
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    });
  });
  }

// the burger menu behavior ________________________________
const burger_button = document.querySelector('.header__burger');
const header_menu = document.querySelector('.header__menu');


burgerClickHandler(burger_button, header_menu);
menuClickHandler(burger_button, header_menu);
smoothScroll();
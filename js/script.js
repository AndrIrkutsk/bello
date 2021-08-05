(function(){
  "use strict";

  new WOW().init();
  
  const body = document.querySelector('.body');
  const mobileMenuBurger = document.querySelector('.mobile-menu__burger');
  const mobileMenuCont = document.querySelector('.mobile-menu__cont');
  const menuList = document.querySelectorAll('.header__nav-link');
  const mobileList = document.querySelectorAll('.mobile-menu__link');
  const subheaderCart = document.querySelector('.login-btn');
  const cartOverlay = document.querySelector('.modal-overlay');
  const butCloseModal = document.querySelector('.close-modal');
  const modal = document.querySelector('.modal');
  const inputSubmit = document.querySelector('.input-submit');
  const one = document.getElementById('modal-container');
  const planList = document.querySelectorAll('.plan');
  const mobileMenuLogin = document.querySelector('.mobile-menu__login');
  const mobileMenuPrice = document.querySelector('.mobile-menu__price');

  const SPEED = 0.5;
  
  /* menu active */
  menuList.forEach(item => {

    item.addEventListener('click', () => {
      for(let i = 0; i < menuList.length; i++) menuList[i].classList.remove('header__nav-link_active');

      item.classList.add('header__nav-link_active');
    });
  });

  /* menu active mobile */
  mobileList.forEach(item => {

    item.addEventListener('click', () => {
      for(let i = 0; i < mobileList.length; i++) mobileList[i].classList.remove('mobile-menu__link_active');

      item.classList.add('mobile-menu__link_active');
    });
  });



  // блокировка скрола
  const disableScroll = () => {
    if(document.disableScroll) return;

    const widthScroll = window.innerWidth - document.body.offsetWidth;

    document.disableScroll = true;

    document.body.dbScrollY = window.scrollY;
    
    document.body.style.cssText = `
      position: fixed;
      top: ${-window.scrollY}px;
      left: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      padding-right: ${widthScroll}px;
    `;
  };

  const enableScroll = () => {
    document.disableScroll = false;

    document.body.style.cssText = '';

    window.scroll({
      top: document.body.dbScrollY,
    });
  };

  // модальное окно
  const cartModalOpen = overlay => {
    modal.style.display = 'block';

    overlay.classList.add('modal-overlay-open');
    disableScroll();
  };

  const cartModalClose = overlay => {
    overlay.classList.remove('modal-overlay-open');
    enableScroll();

    setTimeout(()=>{
      modal.style.display = 'none';
    }, 600);
  };

  subheaderCart.addEventListener('click', cartModalOpen.bind(null, cartOverlay));


  function modalClose(addEvent, classClose){
    addEvent.addEventListener('click', event => {
      const target = event.target;
  
      if(target.classList.contains(classClose)){
        cartModalClose(cartOverlay);
      }
    });
  }

  modalClose(cartOverlay , 'modal-overlay');
  modalClose(butCloseModal, 'close-modal');
  modalClose(inputSubmit, 'input-submit');
  // блокировка скрола конец


  // scroll
  const scrolled = event => {

    const target = event.target;

    if(target.matches('[href^="#"]')){
      
      event.preventDefault();
      let start = 0;
      const pageY = window.pageYOffset;
      // const hash = target.href.replace(/[^#]*(.*)/, "$1");
      const hash = target.getAttribute('href');

      if(hash === "#") return;

      const elem = document.querySelector(hash);
      const coordinateElem = elem.getBoundingClientRect().top;

      const step = time => {
        if(!start) start = time;
        const progress = time - start;

        const r = (coordinateElem < 0 ? 
          Math.max(pageY - progress/SPEED, pageY + coordinateElem) : 
          Math.min(pageY + progress/SPEED, pageY + coordinateElem));
        
        window.scrollTo(0, r);
        
        if(r < pageY + coordinateElem) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);

    }
  };

  /* open sign in and close mobile menu */
  const cartModalOpenMob = overlay => {
    body.classList.remove('lock');
    mobileMenuBurger.classList.remove('active');
    mobileMenuCont.classList.remove('active');

    setTimeout(() => {
      modal.style = 'display: block; transform: translate3d(0px, 0%, 0px);';
      
      overlay.classList.add('modal-overlay-open');
      overlay.style = 'opacity: 1; visibility: inherit';

      disableScroll();
    }, 600);
  };

  /* close mobile menu and scroll page */
  const closeMobileMenu = overlay => {
    body.classList.remove('lock');
    mobileMenuBurger.classList.remove('active');
    mobileMenuCont.classList.remove('active');

    setTimeout(() => {
      document.body.addEventListener('click', scrolled);
    }, 400);
  };


  document.body.addEventListener('click', scrolled);
  
  /* close price modal */
  one.addEventListener('click', (event) => {
    const target = event.target;

    if(target.classList.contains("modal-background") || 
      target.classList.contains("modal-close-price")){
        one.classList.add('out');
        $('body').removeClass('modal-active');
      }
  });

  /* price active */
  planList.forEach(item => {
    item.addEventListener('click', (e) => {
      
      for(let i = 0; i < planList.length; i++) { planList[i].removeAttribute('id'); } 
      let target = e.target, 
          elm = target.closest('.plan');

      //target = e.target;
      //elm = target.closest('.plan');
      elm.setAttribute('id', 'most-popular');

    });
  });
  
  mobileMenuLogin.addEventListener('click', cartModalOpenMob.bind(null, cartOverlay));
  mobileMenuPrice.addEventListener('click', closeMobileMenu.bind(null, cartOverlay));



}());
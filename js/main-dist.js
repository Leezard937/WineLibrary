"use strict";

function ibg(){

    let ibg=document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
            if(ibg[i].querySelector('.ibg-image')){
                ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('.ibg-image').getAttribute('src')+')';
            }
        }
    }
    
    ibg();

    //позиция скролла
    let scrollPos;
    //оверлей для бургера и лого
    let overlay = document.querySelector('.nav-wrap');
    //оверлей для элементов навигации
    let navOverlay = document.querySelector('.main-nav__overlay');

    //при скролле передаем позицию скролла в функцию overlayHandler
    window.onscroll = function() {
        scrollPos = window.scrollY;
        overlayHandler(scrollPos);
    };

    //добавляем оверлей
    function overlayHandler(scrollPos) {
        if(scrollPos >= 200) {
            overlay.classList.add('nav-wrap__scrolled');
            navOverlay.style.height = 'calc(100vh - 80px)';
            navOverlay.style.marginTop = '80px';
        } else if (scrollPos < 200) {
            overlay.classList.remove('nav-wrap__scrolled');
            navOverlay.style.height = '';
            navOverlay.style.marginTop = '';
        }
    }

    let navToggle = document.querySelector('.main-nav__toggle');
    let navList = document.querySelector('.main-nav__list');

        navToggle.addEventListener('click', navClassHandler);

        function navClassHandler() {
            navToggle.classList.toggle('main-nav__toggle-active');
            navList.classList.toggle('main-nav__list-active');
            navOverlay.classList.toggle('main-nav__overlay-active');
            document.body.classList.toggle('body-overlayed');
        }

//закрываем меню при клике на оверлей
    document.body.addEventListener('click', function(){
        if(event.target.classList.contains('body-overlayed')) {
            navClassHandler();
        }
    });


    function replaceLogo() {
        var source = document.querySelector(".logo-link");
        document.querySelector(".main-nav").insertBefore(source, document.querySelector('.main-nav__list'));
      }

    function replaceLogoInverse() {
        var source = document.querySelector(".logo-link");
        document.querySelector(".main-nav__item-logo").appendChild(source);
    }
    
    let replacedLogo = false;

    if(document.body.clientWidth <= 1100) {
        replaceLogo();
        replacedLogo = true;
    } 

    window.addEventListener('resize', function() {
        let viewSize = document.body.clientWidth;
        if(viewSize <= 1100 && !replacedLogo) {
            replaceLogo();
            replacedLogo = true;
        } else if (viewSize > 1100 && replacedLogo) {
            replaceLogoInverse();
            replacedLogo = false;
        }
    });

//--------------Закрываем мобильную навигацию при нажатии на ссылку или логотип
//--------------Осуществляем переход по ссылке после того, как скроется бургер-меню (0.3с)
let navListItems = Array.from(document.querySelectorAll('.main-nav__item a'));
let logoLink = document.querySelector('.logo-link');

    for (let i = 0; i < navListItems.length; i++) {
        navListItems[i].addEventListener('click', function(e) {
            if(document.querySelector('.main-nav__list-active')) {
                navClassHandler();
                e.preventDefault();
                let targetLink = this.getAttribute('href');
                setTimeout(function () {
                        window.location.replace(targetLink) 
                    }, 300
                );
            }
        });
    }
            
    logoLink.addEventListener('click', function(e) {
        if(document.querySelector('.main-nav__list-active')) {
            navClassHandler();
            e.preventDefault();
            let targetLink = this.getAttribute('href');
            setTimeout(function () {
                    window.location.replace(targetLink)
                 }, 300
            );
        }
     });
            


     let eventButtons = Array.from(document.querySelectorAll('.events__buttons'));
     let eventButtonsTarget = Array.from(document.querySelectorAll('.events__item'));
     let eventButtonsBackTarget = Array.from(document.querySelectorAll('.events__right'));
     let viewport = document.body.clientWidth;
     window.onresize = function() {
        viewport = document.body.clientWidth;
        if (viewport < 598) {
            for(let i = 0; i < eventButtons.length; i++) {
                eventButtonsTarget[i].appendChild(eventButtons[i]);
            }
        } else if (viewport >= 598) {
            for(let i = 0; i < eventButtons.length; i++) {
                eventButtonsBackTarget[i].appendChild(eventButtons[i]);
            }
        }
     };
//EVENTS PAGE   

let hidePassedEvents = document.querySelector('.hide-passed-checkbox');
let passedEvents = Array.from(document.querySelectorAll('.events__item-passed'));
let currentEvents = Array.from(document.querySelectorAll('.events__item:not(.events__item-passed)'));


//скрываем прошедшие ивенты по клику на чекбокс
    hidePassedEvents.addEventListener('change', (e) => {
        if(hidePassedEvents.checked) {
            passedEvents.forEach(element => element.style.display = "none");
        } else if (!hidePassedEvents.checked) {
            passedEvents.forEach(element => element.style.display = "");
        }
    });
//--------------------------------------------

let rEvents = [];

    let eDay;
    let eMonth;
    let eYear;
    let eType;

    currentEvents.forEach(element => {
        eDay = element.querySelector('.day').innerText;
        eMonth = element.querySelector('.month').innerText;
        eYear = element.querySelector('.year').innerText;
        eType = element.querySelector('.events__header-header').innerText;
        rEvents.push({link: element, type: eType, day: eDay, month: eMonth, year: eYear});
    });

function eventTypeDescription(arr) {
    arr.forEach(element => {
        if(element.type == 'Дегустація' && element.link.querySelector('.events__header-tip')) {
            element.link.querySelector('.events__header-tip').innerText = "Описание ивента 'Дегустація', в котором клиент найдет информацию о том, как проводится соответствующий ивент.";
        } else if (element.type == 'Винний тур' && element.link.querySelector('.events__header-tip')) {
            element.link.querySelector('.events__header-tip').innerText = "Описание ивента 'Винний тур', в котором клиент найдет информацию о том, как проводится соответствующий ивент.";
        }
    });
}

eventTypeDescription(rEvents);

//сортировка ивентов по дате проведения
function sortByDate() {
    function sortFunc(arr) {
        arr.sort((a, b) => {
            let sortedDay = a.day - b.day;
            let sortedMonth = a.month - b.month;
            if (sortedDay < 0 && sortedMonth < 0) {
                return -1;
            } else if (sortedDay == 0 && sortedMonth < 0) {
                return -1;
            } else if (sortedDay < 0 && sortedMonth == 0) {
                return -1;
            }
        });
    }

    sortFunc(rEvents);
    
    rEvents.forEach(element => document.querySelector('.events').appendChild(element.link));
//прошедшие ивенты отображаем после текущих при сортировке по дате
passedEvents.forEach(element => document.querySelector('.events').appendChild(element));
//-----------------------------------------
}
//---------------------------------------------------------

//прошедшие ивенты отображаем после текущих при загрузке страницы
passedEvents.forEach(element => document.querySelector('.events').appendChild(element));
//-----------------------------------------

let eventsSortList = document.querySelector('.events__sort-select');

    eventsSortList.addEventListener('change', (e) => {
        if(eventsSortList.selectedIndex == 1) {
            sortByDate();
        }
    });
!function t(e,n,r){function a(c,i){if(!n[c]){if(!e[c]){var s="function"==typeof require&&require;if(!i&&s)return s(c,!0);if(o)return o(c,!0);var l=new Error("Cannot find module '"+c+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[c]={exports:{}};e[c][0].call(u.exports,(function(t){return a(e[c][1][t]||t)}),u,u.exports,t,e,n,r)}return n[c].exports}for(var o="function"==typeof require&&require,c=0;c<r.length;c++)a(r[c]);return a}({1:[function(t,e,n){"use strict";var r=t("@babel/runtime/helpers/interopRequireDefault"),a=r(t("@babel/runtime/regenerator")),o=r(t("@babel/runtime/helpers/asyncToGenerator"));function c(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,s=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){s=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(s)throw o}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function s(){var t=window.scrollY;document.body.classList.add("scroll-lock"),document.body.dataset.position=t,document.body.style.top=-t+"px"}function l(){var t=parseInt(document.body.dataset.position,10);document.body.style.top="",document.body.classList.remove("scroll-lock"),window.scroll({top:t,left:0}),document.body.removeAttribute("data-position")}window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach);var u=function(t){t.forEach((function(t){t.value=""}));var e=lt.querySelectorAll(".custom-checkbox__input");if(e.length>0)for(var n=0;n<e.length;n++){e[n].checked=!1}};window.noZensmooth=!0,document.querySelectorAll(".scroll").forEach((function(t){t.addEventListener("click",(function(t){t.preventDefault();var e=this.getAttribute("href").replace("#",""),n=document.querySelector("."+e);zenscroll.to(n)}))}));var d=document.querySelector(".pageup");window.addEventListener("scroll",(function(){(window.pageYOffset||document.documentElement.scrollTop)>1300?d.classList.add("active"):d.classList.remove("active")})),document.querySelectorAll(".accordion").forEach((function(t){t.addEventListener("click",(function(t){var e=t.currentTarget,n=e.querySelector(".accordion__control"),r=e.querySelector(".accordion__content");e.classList.toggle("open"),e.classList.contains("open")?(n.setAttribute("aria-expanded",!0),r.setAttribute("aria-hidden",!1),r.setAttribute("tabindex","0"),r.style.maxHeight=r.scrollHeight+"px"):(n.setAttribute("aria-expanded",!1),r.setAttribute("aria-hidden",!0),r.setAttribute("tabindex","-1"),r.style.maxHeight=null)}))}));var f=document.querySelector(".menu"),m=document.querySelectorAll(".menu__link"),v=document.querySelector(".hamburger");v.addEventListener("click",(function(){v.classList.toggle("active"),f.classList.toggle("active"),v.classList.contains("active")?(v.setAttribute("aria-label","закрыть навигацию"),s()):(v.setAttribute("aria-label","открыть навигацию"),l()),setTimeout((function(){f.focus()}),600)})),m.forEach((function(t){t.addEventListener("click",(function(t){t.preventDefault(),v.classList.contains("active")&&(v.classList.remove("active"),f.classList.remove("active"),v.setAttribute("aria-label","открыть навигацию"),l())}))}));var p=document.querySelector(".catalog__filters"),h=document.querySelector(".catalog__btn"),g=document.querySelector(".catalog-hamburger");g.addEventListener("click",(function(){g.classList.toggle("active"),p.classList.toggle("active"),g.classList.contains("active")?g.setAttribute("aria-label","закрыть фильтр"):g.setAttribute("aria-label","открыть фильтр"),setTimeout((function(){p.focus()}),600)})),h.addEventListener("click",(function(t){t.preventDefault(),g.classList.contains("active")&&(g.classList.remove("active"),p.classList.remove("active"),g.setAttribute("aria-label","открыть фильтр"))})),document.querySelectorAll(".catalog-checkbox__label, .custom-checkbox__text").forEach((function(t){t.addEventListener("keydown",(function(t){if("Enter"===t.code||"NumpadEnter"===t.code||"Space"===t.code){var e=t.target.previousElementSibling;"radio"==e.type?!1===e.checked&&(e.checked=!0):"checkbox"==e.type&&(!1===e.checked?e.checked=!0:e.checked=!1)}}))}));var y=document.querySelector(".catalog__wrap"),_=document.querySelector(".catalog__more"),b=document.querySelector(".modal-prod__content"),L=b.querySelector(".slider-main__wrapper"),x=b.querySelector(".slider-min__wrapper"),S=b.querySelector(".modal-info__wrapper"),w=b.querySelector(".modal-descr__text"),E=b.querySelector(".modal-char__items"),q=b.querySelector(".modal-video"),k=6,A=function(t){return String(t).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,"$1 ")},T=function(){document.querySelectorAll(".mini-cart__item").forEach((function(t){var e=t.dataset.id;setTimeout((function(){var t=document.querySelector('.add-to-cart-btn[data-id="'.concat(e,'"]'));t&&t.setAttribute("disabled","disabled")}),100)}))},C=function(){var t=new Swiper(".slider-min",{grabCursor:!0,slidesPerView:6,initialSlide:0,spaceBetween:20,freeMode:!0});new Swiper(".slider-main",{grabCursor:!0,spaceBetween:20,slidesPerView:1,initialSlide:0,simulateTouch:!1,effect:"fade",fadeEffect:{crossFade:!0},thumbs:{swiper:t}})};if(y){var j=function(){var t=(0,o.default)(a.default.mark((function t(){var e,n,r,o,c,i;return a.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("../data/data.json");case 2:if(!(e=t.sent).ok){t.next=17;break}return t.next=6,e.json();case 6:for(n=t.sent,r=n.length,y.innerHTML="",o=function(t){y.innerHTML+='\n\t\t\t\t\t<article class="catalog-item">\n\t\t\t\t\t\t<div class="catalog-item__img">\n\t\t\t\t\t\t\t<img src="'.concat(t.mainImage,'" loading="lazy" alt="').concat(t.title,'">\n\t\t\t\t\t\t\t<div class="catalog-item__btns">\n\t\t\t\t\t\t\t\t<button class="catalog-item__btn btn-reset modal-btn" data-id="').concat(t.id,'" data-btn="modal-prod" aria-label="Показать информацию о товаре">\n\t\t\t\t\t\t\t\t\t<svg><use xlink:href="img/sprite.svg#show"></use></svg>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<button class="catalog-item__btn btn-reset add-to-cart-btn" data-id="').concat(t.id,'" aria-label="Добавить товар в корзину">\n\t\t\t\t\t\t\t\t\t<svg><use xlink:href="img/sprite.svg#cart"></use></svg>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<h3 class="catalog-item__title">').concat(t.title,'</h3>\n\t\t\t\t\t\t<span class="catalog-item__price">').concat(A(t.price)," р</span>\n\t\t\t\t\t</article>\n\t\t\t\t")},c=0;c<r;c++)c<k&&(i=n[c],o(i));st(I),document.querySelectorAll(".catalog-item__btn").forEach((function(t){t.addEventListener("focus",(function(t){t.currentTarget.closest(".catalog-item__btns").classList.add("catalog-item__btns--focus")}),!0),t.addEventListener("blur",(function(t){t.currentTarget.closest(".catalog-item__btns").classList.remove("catalog-item__btns--focus")}),!0)})),_.addEventListener("click",(function(t){var e=k;k+=3;for(var a=e;a<r;a++)if(a<k){var c=n[a];o(c)}_.style.display=k>=r?"none":"block",T(),st(I)})),t.next=18;break;case 17:console.log(e.status);case 18:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();j();var I=function(){var t=(0,o.default)(a.default.mark((function t(){var e,n,r,o,i,s,l,u,d=arguments;return a.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=d.length>0&&void 0!==d[0]?d[0]:1,t.next=3,fetch("../data/data.json");case 3:if(!(n=t.sent).ok){t.next=24;break}return t.next=7,n.json();case 7:r=t.sent,L.innerHTML="",x.innerHTML="",S.innerHTML="",w.textContent="",E.innerHTML="",q.innerHTML="",q.style.display="none",o=c(r);try{for(s=function(){var t=i.value;if(t.id==e){var n=t.gallery.map((function(t){return'\n\t\t\t\t\t\t\t<div class="slider-min__item swiper-slide">\n\t\t\t\t\t\t\t\t<img src="'.concat(t,'" alt="изображение">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t')})),r=t.gallery.map((function(t){return'\n\t\t\t\t\t\t\t<div class="slider-main__item swiper-slide">\n\t\t\t\t\t\t\t\t<img src="'.concat(t,'" alt="изображение">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t')}));x.innerHTML=n.join(""),L.innerHTML=r.join("");var a=t.sizes.map((function(t){return'\n\t\t\t\t\t\t\t<li class="modal-info__item-size">\n\t\t\t\t\t\t\t\t<button class="btn-reset modal-info__size">'.concat(t,"</button>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t")}));S.innerHTML='\n\t\t\t\t\t\t<h3 class="modal-info__title">'.concat(t.title,'</h3>\n\t\t\t\t\t\t<div class="modal-info__rate">\n\t\t\t\t\t\t\t<img src="img/star.svg" alt="Рейтинг 5 из 5">\n\t\t\t\t\t\t\t<img src="img/star.svg" alt="">\n\t\t\t\t\t\t\t<img src="img/star.svg" alt="">\n\t\t\t\t\t\t\t<img src="img/star.svg" alt="">\n\t\t\t\t\t\t\t<img src="img/star.svg" alt="">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="modal-info__sizes">\n\t\t\t\t\t\t\t<span class="modal-info__subtitle">Выберите размер</span>\n\t\t\t\t\t\t\t<ul class="modal-info__sizes-list list-reset">\n\t\t\t\t\t\t\t\t').concat(a.join(""),'\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="modal-info__price">\n\t\t\t\t\t\t\t<span class="modal-info__current-price">').concat(t.price,' р</span>\n\t\t\t\t\t\t\t<span class="modal-info__old-price">').concat(t.oldPrice?t.oldPrice+" р":"","</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t  "),w.textContent=t.description;var o="";Object.keys(t.chars).forEach((function(e){o+='<p class="modal-char__item">'.concat(e,": ").concat(t.chars[e],"</p>")})),E.innerHTML=o,t.video&&(q.style.display="block",q.innerHTML='\n\t\t\t\t\t\t\t<iframe src="'.concat(t.video,'"\n\t\t\t\t\t\t\tallow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"\n\t\t\t\t\t\t\tallowfullscreen></iframe>\n\t\t\t\t\t\t'))}},o.s();!(i=o.n()).done;)s()}catch(t){o.e(t)}finally{o.f()}C(),l=document.querySelector('.add-to-cart-btn[data-id="'.concat(e,'"]')),(u=document.querySelector(".modal-info__order")).setAttribute("data-id","".concat(e)),l.disabled?u.setAttribute("disabled","disabled"):u.removeAttribute("disabled"),t.next=25;break;case 24:console.log(n.status);case 25:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),H=!1;y.addEventListener("touchend",(function(t){if(t.target.closest(".catalog-item__img")){var e=t.target.closest(".catalog-item__btns"),n=e.querySelectorAll(".catalog-item__btn");H?!H||t.target.classList.contains("catalog-item__btn")||t.target.classList.contains("add-to-cart-btn")||(e.classList.remove("catalog-item__btns--touch"),setTimeout((function(){n.forEach((function(t){t.style.pointerEvents="none"}))}),100),H=!1):(e.classList.add("catalog-item__btns--touch"),setTimeout((function(){n.forEach((function(t){t.style.pointerEvents="auto"}))}),100),H=!0)}}))}var O=document.querySelector(".mini-cart__list"),M=document.querySelector(".mini-cart__summ"),z=document.querySelector(".cart__count"),D=function(t){return t.replace(/\s/g,"")},P=function(){var t=(0,o.default)(a.default.mark((function t(e,n){var r,o,i,s,l,u;return a.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("../data/data.json");case 2:if(!(r=t.sent).ok){t.next=16;break}return t.next=6,r.json();case 6:o=t.sent,i=c(o);try{for(i.s();!(s=i.n()).done;)(l=s.value).id==e&&(O.insertAdjacentHTML("afterbegin",'\n\t\t\t\t\t<li class="mini-cart__item" data-id="'.concat(l.id,'">\n\t\t\t\t\t\t<div class="mini-cart__image">\n\t\t\t\t\t\t\t<img src="').concat(l.mainImage,'" alt="').concat(l.title,'" width="100" height="100">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="mini-cart__content">\n\t\t\t\t\t\t\t<h3 class="mini-cart__title">').concat(l.title,'</h3>\n\t\t\t\t\t\t\t<span class="mini-cart__price">').concat(A(l.price),' p</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button class="mini-cart__delete btn-reset"></button>\n\t\t\t\t\t</li>\n\t\t\t\t')),n+=l.price,M.textContent="".concat(A(n)," р"))}catch(t){i.e(t)}finally{i.f()}(u=document.querySelectorAll(".mini-cart__item").length)>0&&z.classList.add("cart__count--active"),z.textContent=u,document.querySelector(".cart").removeAttribute("disabled"),U(),t.next=17;break;case 16:console.log(r.status);case 17:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}();y.addEventListener("click",(function(t){if(t.target.classList.contains("add-to-cart-btn")){var e=t.target.dataset.id,n=parseInt(D(M.textContent));P(e,n),t.target.setAttribute("disabled","disabled")}})),b.addEventListener("click",(function(t){if(t.target.classList.contains("modal-info__order")){var e=t.target.dataset.id,n=parseInt(D(M.textContent));P(e,n),document.querySelector('.add-to-cart-btn[data-id="'.concat(e,'"]')).setAttribute("disabled","disabled"),t.target.setAttribute("disabled","disabled")}})),O.addEventListener("click",(function(t){var e=parseInt(D(M.textContent));if(t.target.classList.contains("mini-cart__delete")){var n=t.target.closest(".mini-cart__item"),r=parseInt(D(n.querySelector(".mini-cart__price").textContent)),a=n.dataset.id,o=document.querySelector('.add-to-cart-btn[data-id="'.concat(a,'"]'));o&&o.removeAttribute("disabled"),n.remove(),e-=r,M.textContent="".concat(A(e)," р");var c=document.querySelectorAll(".mini-cart__list .mini-cart__item").length;0==c&&(z.classList.remove("cart__count--active"),Q.classList.remove("mini-cart--open"),document.querySelector(".cart").setAttribute("disabled","disabled")),z.textContent=c,U()}else if(t.target.closest(".mini-cart__item")){var i=t.target.closest(".mini-cart__item");document.querySelectorAll(".mini-cart__list .mini-cart__item").forEach((function(e){e.contains(t.target)||e.classList.remove("mini-cart__item--active")})),i.classList.add("mini-cart__item--active")}}));var R=document.querySelector(".mini-cart__btn"),N=document.querySelector(".modal-cart-order__list"),F=document.querySelector(".modal-cart-order__quantity span"),G=document.querySelector(".modal-cart-order__summ span"),Y=document.querySelector(".modal-cart-order__show");R.addEventListener("click",(function(){var t=document.querySelectorAll(".mini-cart__item"),e=t.length;N.innerHTML="",t.forEach((function(t){var e=t.dataset.id;B(e)})),N.classList.contains("modal-cart-order__list--open")&&(Y.classList.remove("modal-cart-order__show--active"),N.classList.remove("modal-cart-order__list--open"),N.style.maxHeight=null),document.querySelector(".modal-cart-form__submit").removeAttribute("disabled","disabled"),F.textContent="".concat(e," шт"),G.textContent=M.textContent})),Y.addEventListener("click",(function(){N.classList.contains("modal-cart-order__list--open")?(Y.classList.remove("modal-cart-order__show--active"),N.classList.remove("modal-cart-order__list--open"),N.style.maxHeight=null):(Y.classList.add("modal-cart-order__show--active"),N.classList.add("modal-cart-order__list--open"),N.style.maxHeight=N.scrollHeight+"px")})),N.addEventListener("click",(function(t){if(t.target.classList.contains("modal-cart-product__delete")){var e=t.target.closest(".modal-cart-product"),n=parseInt(D(e.querySelector(".modal-cart-product__price").textContent)),r=parseInt(D(M.textContent)),a=e.dataset.id;e.remove(),document.querySelector('.mini-cart__item[data-id="'.concat(a,'"]')).remove();var o=document.querySelector('.add-to-cart-btn[data-id="'.concat(a,'"]'));o&&o.removeAttribute("disabled"),r-=n,G.textContent="".concat(A(r)," р"),M.textContent="".concat(A(r)," р");var c=document.querySelectorAll(".modal-cart-product").length;0==c&&(z.classList.remove("cart__count--active"),document.querySelector(".cart").setAttribute("disabled","disabled"),document.querySelector(".modal-cart-form__submit").setAttribute("disabled","disabled"),Y.classList.remove("modal-cart-order__show--active")),z.textContent=c,F.textContent="".concat(c," шт"),U()}}));var B=function(){var t=(0,o.default)(a.default.mark((function t(e){var n,r,o,i,s;return a.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("../data/data.json");case 2:if(!(n=t.sent).ok){t.next=11;break}return t.next=6,n.json();case 6:r=t.sent,o=c(r);try{for(o.s();!(i=o.n()).done;)(s=i.value).id==e&&N.insertAdjacentHTML("afterbegin",'\n\t\t\t\t\t<li class="modal-cart-product" data-id="'.concat(s.id,'">\n\t\t\t\t\t\t<div class="modal-cart-product__image">\n\t\t\t\t\t\t\t<img src="').concat(s.mainImage,'" alt="').concat(s.title,'" width="80" height="80">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="modal-cart-product__content">\n\t\t\t\t\t\t\t<h3 class="modal-cart-product__title">').concat(s.title,'</h3>\n\t\t\t\t\t\t\t<span class="modal-cart-product__price">').concat(A(s.price),' p</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button class="modal-cart-product__delete btn-reset">Удалить</button>\n\t\t\t\t\t</li>\n\t\t\t\t'))}catch(t){o.e(t)}finally{o.f()}t.next=12;break;case 11:console.log(n.status);case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();!function(){if(null!==localStorage.getItem("products")){O.innerHTML=localStorage.getItem("products");var t=document.querySelectorAll(".mini-cart__item").length;z.classList.add("cart__count--active"),z.textContent=t,document.querySelector(".cart").removeAttribute("disabled"),e=0,document.querySelectorAll(".mini-cart__price").forEach((function(t){var n=parseInt(D(t.textContent));e+=n,M.textContent="".concat(A(e)," р")})),T()}var e}();var U=function(){var t=O.innerHTML;(t=t.trim()).length?localStorage.setItem("products",t):localStorage.removeItem("products")},$=document.querySelectorAll("form");$.length>0&&$.forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault();var n=e.target;n.querySelectorAll("input");if(0===bt(n)&&_t(n)){xt(n);var r=n.querySelector(".form-message");r&&(r.textContent="Загрузка...",r.classList.add("active"));var c=new FormData(t);n.classList.contains("modal-cart-form")&&(document.querySelectorAll(".modal-cart-product").forEach((function(t,e){var n=t.querySelector(".modal-cart-product__title").textContent,r=t.querySelector(".modal-cart-product__price").textContent;c.append("product-".concat(e+1),"".concat(n,", ").concat(r))})),c.append("summ","".concat(document.querySelector(".modal-cart-order__summ span").textContent)));var i=function(){var t=(0,o.default)(a.default.mark((function t(e,o){var c;return a.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(e,{method:"POST",body:o});case 2:if(!(c=t.sent).ok){t.next=12;break}return t.next=6,c.text();case 6:t.sent,r&&(r.textContent="Спасибо, скоро мы с вами свяжимся!",r.classList.add("active")),n.reset(),setTimeout((function(){r&&r.classList.remove("active")}),5e3),t.next=14;break;case 12:r&&(r.textContent="Что-то пошло не так...",r.classList.add("active")),setTimeout((function(){r&&r.classList.remove("active")}),5e3);case 14:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}();i("../server.php",c)}}))}));var K=document.querySelectorAll("img[data-src],source[data-srcset]");document.querySelector(".load-map");window.addEventListener("scroll",(function(){var t=window.scrollY;K.length>0&&K.forEach((function(e){var n=e.getBoundingClientRect().top+pageYOffset;t>=n-1e3&&(e.dataset.src?(e.src=e.dataset.src,e.removeAttribute("data-src")):e.dataset.srcset&&(e.srcset=e.dataset.srcset,e.removeAttribute("data-srcset")))}))}));var V=0;window.addEventListener("scroll",(function(){if(window.scrollY>=document.querySelector("#map").offsetTop-500&&0==V){ymaps.ready((function(){var t=new ymaps.Map("map",{center:[59.830481,30.142197],zoom:10,controls:[]}),e=new ymaps.Placemark([59.830481,30.142197],{},{iconLayout:"default#image",iconImageHref:"img/placemark.png",iconImageSize:[25,34],iconImageOffset:[-19,-44]});t.geoObjects.add(e),t.behaviors.disable(["scrollZoom"])})),V=1}}));var W=function(t,e){if(e.focus(),e.setSelectionRange)e.setSelectionRange(t,t);else if(e.createTextRange){var n=e.createTextRange();n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",t),n.select()}};function Z(t){var e="+7 (___) ___ __ __",n=0,r=e.replace(/\D/g,""),a=this.value.replace(/\D/g,"");if(r.length>=a.length&&(a=r),this.value=e.replace(/./g,(function(t){return/[_\d]/.test(t)&&n<a.length?a.charAt(n++):n>=a.length?"":t})),"blur"===t.type)(2==this.value.length||this.value.length<e.length)&&(this.value="");else if("keyup"===t.type||"mouseup"===t.type){"0"==this.selectionStart&&W(this.value.length,this)}else W(this.value.length,this)}document.querySelectorAll(".tel").forEach((function(t){t.addEventListener("input",Z),t.addEventListener("focus",Z),t.addEventListener("blur",Z),t.addEventListener("keyup",Z),t.addEventListener("mouseup",Z)}));var J=document.querySelector(".cart"),Q=document.querySelector(".mini-cart");J.addEventListener("click",(function(){Q.classList.toggle("mini-cart--open")})),document.addEventListener("click",(function(t){(t.target.classList.contains("mini-cart")||t.target.closest(".mini-cart")||t.target.classList.contains("cart")||t.target.classList.contains("mini-cart__delete"))&&!t.target.classList.contains("mini-cart__btn")||Q.classList.remove("mini-cart--open")}));var X,tt=document.querySelector(".modal-overlay"),et=document.querySelectorAll("[data-modal]"),nt=document.querySelectorAll(".block-fix "),rt=document.querySelectorAll(".small-fix"),at=window.innerWidth-document.body.offsetWidth,ot=["a[href]","input","select","textarea","button","iframe","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],ct=!1,it=500,st=function(t){var e=document.querySelectorAll("[data-btn]");function n(){et.forEach((function(t){t.classList.remove("modal-open"),t.setAttribute("aria-hidden",!0)})),l(),document.body.style.paddingRight="0px",nt.length>0&&nt.forEach((function(t){t.style.paddingRight="0px"})),rt.length>0&&rt.forEach((function(t){t.style.marginRight="0px"})),tt.classList.remove("is-open"),tt.setAttribute("tabindex","-1"),r()}function r(){tt.classList.contains("is-open")?tt.focus():ct.focus()}tt&&(e.forEach((function(e){e.addEventListener("click",(function(e){var n=e.currentTarget;if(n){e.preventDefault();var a=n.dataset.btn;X=document.querySelector(".".concat(a));var o=n.dataset.speed;it=o?parseInt(o):500,function(e){e.closest("[data-inside]")||(ct=document.activeElement);et.forEach((function(t){t.classList.remove("modal-open"),t.setAttribute("aria-hidden",!0)})),tt.classList.contains("is-open")||s();if(t&&X.classList.contains("modal-prod")){var n=ct.dataset.id;t(n)}tt.classList.add("is-open"),tt.setAttribute("tabindex","0"),document.body.style.paddingRight="".concat(at,"px"),nt.length>0&&nt.forEach((function(t){t.style.paddingRight="".concat(at,"px")}));rt.length>0&&rt.forEach((function(t){t.style.marginRight="".concat(at,"px")}));X.classList.add("modal-open"),X.setAttribute("aria-hidden",!1),setTimeout((function(){r()}),it)}(n)}}))})),document.addEventListener("click",(function(t){t.target.classList.contains("modal-overlay")&&t.target.classList.contains("is-open")&&n(),t.target.classList.contains("modal__close")&&t.target.closest(".modal-open")&&n()})),document.addEventListener("keydown",(function(t){"Escape"===t.code&&tt.classList.contains("is-open")&&n(),"Tab"===t.code&&tt.classList.contains("is-open")&&function(t){var e=X.querySelectorAll(ot),n=Array.prototype.slice.call(e),r=n.indexOf(document.activeElement);t.shiftKey&&0===r&&(n[n.length-1].focus(),t.preventDefault());t.shiftKey||r!==n.length-1||(n[0].focus(),t.preventDefault())}(t)})))};st();var lt=document.querySelector(".quiz-form"),ut=lt.querySelectorAll("input"),dt=lt.querySelectorAll(".quiz-block"),ft={},mt=0;function vt(){dt.forEach((function(t){return t.style.display="none"})),dt[mt].style.display="block"}function pt(t,e){var n="",r=t.querySelectorAll("input"),a=t.querySelectorAll("textarea");if(r.length>0)for(var o=0;o<r.length;o++){var c=r[o];"checkbox"!=c.type&&"radio"!=c.type&&c.value||"radio"==c.type&&c.checked?e[c.name]=c.value:"checkbox"==c.type&&c.checked&&(n+=c.value+",",e[c.name]=n)}else if(a.length>0)for(var i=0;i<a.length;i++){var s=a[i];s.value&&(e[s.name]=s.value)}}vt(),ut.forEach((function(t){"checkbox"!=t.type&&"radio"!=t.type||(t.value=t.nextElementSibling.textContent)})),lt.addEventListener("click",(function(t){var e=t.target,n=e.closest(".quiz-block");lt.querySelectorAll("[data-next]").forEach((function(r){var a;e==r&&(t.preventDefault(),pt(n,ft),0===bt(a=n)&&_t(a)&&vt(mt+=1))})),e==document.querySelector("[data-send]")&&(t.preventDefault(),pt(n,ft),function(t){if(0===bt(t)&&_t(t)){xt(lt);var e=t.querySelector(".quiz-send__ok"),n=t.querySelector(".quiz-message");n&&(n.textContent="Загрузка...",n.classList.add("active"));var r=new FormData;for(var c in ft)r.append(c,ft[c]);var i=function(){var t=(0,o.default)(a.default.mark((function t(r,o){var c;return a.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch(r,{method:"POST",body:o});case 2:if(!(c=t.sent).ok){t.next=13;break}return t.next=6,c.text();case 6:t.sent,n&&(n.textContent="Ok!",n.classList.add("active")),e.classList.add("active"),u(ut),setTimeout((function(){n&&n.classList.remove("active"),e.classList.remove("active")}),5e3),t.next=16;break;case 13:alert("Ошибка HTTP: "+c.status),n&&(n.textContent="Что-то пошло не так...",n.classList.add("active")),setTimeout((function(){n&&n.classList.remove("active")}),5e3);case 16:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}();i("../server.php",r)}}(n))}));var ht=document.getElementById("range-slider");if(ht){noUiSlider.create(ht,{start:[500,999999],connect:!0,step:1,range:{min:[500],max:[999999]}});var gt=[document.getElementById("input-0"),document.getElementById("input-1")];ht.noUiSlider.on("update",(function(t,e){gt[e].value=Math.round(t[e])}));gt.forEach((function(t,e){t.addEventListener("change",(function(t){var n,r,a;n=e,r=t.currentTarget.value,(a=[null,null])[n]=r,ht.noUiSlider.set(a)}))}))}var yt=document.querySelectorAll(".catalog-sizes td");function _t(t){var e=t.querySelectorAll("input"),n=!1;if(e.length>0)for(var r=0;r<e.length;r++){var a=e[r];!a.classList.contains("not-valid")&&"checkbox"===a.getAttribute("type")||"radio"===a.getAttribute("type")?a.checked?n=!0:Lt(a):n=!0}else n=!0;return n}function bt(t){var e=t.querySelectorAll("input"),n=0;if(e.length>0)for(var r=0;r<e.length;r++){var a=e[r],o=a.getAttribute("placeholder");a.classList.contains("not-valid")||(a.classList.contains("email")?/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(a.value)&&a.value!=o||(Lt(a),n++):""!=a.value&&a.value!=o||(Lt(a),n++))}return n}function Lt(t){if(t.parentElement.classList.add("error"),t.classList.add("error"),t.closest(".quiz-form")){var e=t.closest(".quiz-block").querySelector(".quiz-message");e&&e.classList.add("active")}else{var n=t.parentElement.querySelector(".form-message");n&&n.classList.add("active")}}function xt(t){var e=t.querySelectorAll("input, textarea");if(e.length>0)for(var n=0;n<e.length;n++){var r=e[n];r.classList.contains("not-valid")||(r.parentElement.classList.remove("error"),r.classList.remove("error"))}var a=t.querySelectorAll(".form-message");if(a.length>0)for(var o=0;o<a.length;o++){a[o].classList.remove("active")}}yt.forEach((function(t){t.addEventListener("click",(function(e){var n=e.currentTarget;t.style.backgroundColor="#dbbba9",yt.forEach((function(t){t!==n&&(t.style.backgroundColor="transparent")}))}))})),document.querySelectorAll(".check").forEach((function(t){t.addEventListener("keypress",(function(t){t.key.match(/[^а-яё 0-9]/gi)&&t.preventDefault()})),t.addEventListener("keyup",(function(){this.value=this.value.replace(/[^\а-яё 0-9]/gi,"")}))}))},{"@babel/runtime/helpers/asyncToGenerator":2,"@babel/runtime/helpers/interopRequireDefault":3,"@babel/runtime/regenerator":4}],2:[function(t,e,n){function r(t,e,n,r,a,o,c){try{var i=t[o](c),s=i.value}catch(t){return void n(t)}i.done?e(s):Promise.resolve(s).then(r,a)}e.exports=function(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var c=t.apply(e,n);function i(t){r(c,a,o,i,s,"next",t)}function s(t){r(c,a,o,i,s,"throw",t)}i(void 0)}))}},e.exports.__esModule=!0,e.exports.default=e.exports},{}],3:[function(t,e,n){e.exports=function(t){return t&&t.__esModule?t:{default:t}},e.exports.__esModule=!0,e.exports.default=e.exports},{}],4:[function(t,e,n){e.exports=t("regenerator-runtime")},{"regenerator-runtime":5}],5:[function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",i=a.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function l(t,e,n,r){var a=e&&e.prototype instanceof h?e:h,o=Object.create(a.prototype),c=new A(r||[]);return o._invoke=function(t,e,n){var r=d;return function(a,o){if(r===m)throw new Error("Generator is already running");if(r===v){if("throw"===a)throw o;return C()}for(n.method=a,n.arg=o;;){var c=n.delegate;if(c){var i=E(c,n);if(i){if(i===p)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===d)throw r=v,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=m;var s=u(t,e,n);if("normal"===s.type){if(r=n.done?v:f,s.arg===p)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=v,n.method="throw",n.arg=s.arg)}}}(t,n,c),o}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var d="suspendedStart",f="suspendedYield",m="executing",v="completed",p={};function h(){}function g(){}function y(){}var _={};s(_,o,(function(){return this}));var b=Object.getPrototypeOf,L=b&&b(b(T([])));L&&L!==n&&r.call(L,o)&&(_=L);var x=y.prototype=h.prototype=Object.create(_);function S(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function n(a,o,c,i){var s=u(t[a],t,o);if("throw"!==s.type){var l=s.arg,d=l.value;return d&&"object"==typeof d&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,c,i)}),(function(t){n("throw",t,c,i)})):e.resolve(d).then((function(t){l.value=t,c(l)}),(function(t){return n("throw",t,c,i)}))}i(s.arg)}var a;this._invoke=function(t,r){function o(){return new e((function(e,a){n(t,r,e,a)}))}return a=a?a.then(o,o):o()}}function E(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,E(t,n),"throw"===n.method))return p;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var a=u(r,t.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,p;var o=a.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,p):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,p)}function q(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(q,this),this.reset(!0)}function T(t){if(t){var n=t[o];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var a=-1,c=function n(){for(;++a<t.length;)if(r.call(t,a))return n.value=t[a],n.done=!1,n;return n.value=e,n.done=!0,n};return c.next=c}}return{next:C}}function C(){return{value:e,done:!0}}return g.prototype=y,s(x,"constructor",y),s(y,"constructor",g),g.displayName=s(y,i,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s(t,i,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},S(w.prototype),s(w.prototype,c,(function(){return this})),t.AsyncIterator=w,t.async=function(e,n,r,a,o){void 0===o&&(o=Promise);var c=new w(l(e,n,r,a),o);return t.isGeneratorFunction(n)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},S(x),s(x,i,"Generator"),s(x,o,(function(){return this})),s(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=T,A.prototype={constructor:A,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(k),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function a(r,a){return i.type="throw",i.arg=t,n.next=r,a&&(n.method="next",n.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var c=this.tryEntries[o],i=c.completion;if("root"===c.tryLoc)return a("end");if(c.tryLoc<=this.prev){var s=r.call(c,"catchLoc"),l=r.call(c,"finallyLoc");if(s&&l){if(this.prev<c.catchLoc)return a(c.catchLoc,!0);if(this.prev<c.finallyLoc)return a(c.finallyLoc)}else if(s){if(this.prev<c.catchLoc)return a(c.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return a(c.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=t,c.arg=e,o?(this.method="next",this.next=o.finallyLoc,p):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),k(n),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;k(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:T(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),p}},t}("object"==typeof e?e.exports:{});try{regeneratorRuntime=r}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=r:Function("r","regeneratorRuntime = r")(r)}},{}]},{},[1]);
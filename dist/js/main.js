// forEach Polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// lock scroll
function disableScroll() {
	let pagePosition = window.scrollY;
	document.body.classList.add('scroll-lock');
	document.body.dataset.position = pagePosition;
	document.body.style.top = -pagePosition + 'px';
}

function enableScroll() {
	let pagePosition = parseInt(document.body.dataset.position, 10);
	document.body.style.top = '';
	document.body.classList.remove('scroll-lock');
	window.scroll({ top: pagePosition, left: 0 });
	document.body.removeAttribute('data-position');
}


const clearInputs = (selector) => {
	selector.forEach(item => {
		item.value = '';
	});
	let checkboxes = quizForm.querySelectorAll('.custom-checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
};

window.noZensmooth = true;

let links = document.querySelectorAll('.scroll');


links.forEach(link => {

	link.addEventListener('click', function(event) {
		event.preventDefault();

		let hash = this.getAttribute('href').replace('#', '');
		let toBlock = document.querySelector('.' + hash);

		zenscroll.to(toBlock);

		// zenscroll.to(toBlock, 500); // 500ms == время прокрутки
	});
});

const upElem = document.querySelector('.pageup');

window.addEventListener('scroll', () => {
	let scrolled = window.pageYOffset || document.documentElement.scrollTop;
	if (scrolled > 1300) {
		upElem.classList.add('active');
	} else {
		upElem.classList.remove('active');
	}
});


const accordions = document.querySelectorAll('.accordion');

accordions.forEach(el => {
	el.addEventListener('click', (e) => {
		const self = e.currentTarget;
		const control = self.querySelector('.accordion__control');
		const content = self.querySelector('.accordion__content');

		//* если необходимо чтобы все блоки закрывались при открытии блока - просто раскоментировать эту часть!
		// accordions.forEach(btn => {
		// 	const control = btn.querySelector('.accordion__control');
		// 	const content = btn.querySelector('.accordion__content');
		// 	if (btn !== self) {
		// 		btn.classList.remove('open');
		// 		control.setAttribute('aria-expanded', false);
		// 		content.setAttribute('aria-hidden', true);
		// 		content.style.maxHeight = null;
		// 	}
		// });

		self.classList.toggle('open');

		// если открыт аккордеон
		if (self.classList.contains('open')) {
			control.setAttribute('aria-expanded', true);
			content.setAttribute('aria-hidden', false);
			content.setAttribute('tabindex', '0');
			content.style.maxHeight = content.scrollHeight + 'px';
		} else {
			control.setAttribute('aria-expanded', false);
			content.setAttribute('aria-hidden', true);
			content.setAttribute('tabindex', '-1');
			content.style.maxHeight = null;
		}
	});
});
let menuBody = document.querySelector('.menu');
let menuItem = document.querySelectorAll('.menu__link');
let hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {    
    hamburger.classList.toggle('active');
    menuBody.classList.toggle('active');

    if (hamburger.classList.contains('active')) {
        hamburger.setAttribute('aria-label', 'закрыть навигацию');
        disableScroll();
    } else {
        hamburger.setAttribute('aria-label', 'открыть навигацию');
        enableScroll();
    }

    setTimeout(() => {
        menuBody.focus();
    }, 600);
});

menuItem.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            menuBody.classList.remove('active');
            hamburger.setAttribute('aria-label', 'открыть навигацию');
            enableScroll();
        }
    })
})

let filter = document.querySelector('.catalog__filters');
let filterBtn = document.querySelector('.catalog__btn');
let filterBurger = document.querySelector('.catalog-hamburger');

filterBurger.addEventListener('click', () => {    
    filterBurger.classList.toggle('active');
    filter.classList.toggle('active');
    if (filterBurger.classList.contains('active')) {
        filterBurger.setAttribute('aria-label', 'закрыть фильтр');
    } else {
        filterBurger.setAttribute('aria-label', 'открыть фильтр');
    }
    setTimeout(() => {
        filter.focus();
    }, 600);
});

filterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (filterBurger.classList.contains('active')) {
        filterBurger.classList.remove('active');
        filter.classList.remove('active');
        filterBurger.setAttribute('aria-label', 'открыть фильтр'); 
    }
})

const checkBox = document.querySelectorAll('.catalog-checkbox__label, .custom-checkbox__text');

checkBox.forEach(item => {
	item.addEventListener('keydown', (e) => {
		if (e.code === 'Enter' || e.code === 'NumpadEnter' || e.code === 'Space') {
			let check = e.target.previousElementSibling;
			if (check.type == 'radio') {
				if (check.checked === false) {
					check.checked = true;
				} 
			} else if (check.type == 'checkbox') {
				if (check.checked === false) {
					check.checked = true;
				} else {
					check.checked = false;
				}
			}

		}
	});
});
const catalogProducts = document.querySelector('.catalog__wrap');
const catalogMore = document.querySelector('.catalog__more');
const prodModal = document.querySelector('.modal-prod__content');
const prodModalSlider = prodModal.querySelector('.slider-main__wrapper');
const prodModalPreview = prodModal.querySelector('.slider-min__wrapper');
const prodModalInfo = prodModal.querySelector('.modal-info__wrapper');
const prodModalDescr = prodModal.querySelector('.modal-descr__text');
const prodModalChars = prodModal.querySelector('.modal-char__items');
const prodModalVideo = prodModal.querySelector('.modal-video');
let prodQuantity = 6; // количество карточек на странице изначально
let addQuantity = 3; // количество добавляемых карточек при клике на кнопку "Показать ещё"

// функция вставляет пробел между разрядами
const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

// блокирование кнопок добавления в корзину
const btnBlock = () =>  {
	document.querySelectorAll('.mini-cart__item').forEach(el => {
		let id = el.dataset.id;
		setTimeout(() => {
			let btn = document.querySelector(`.add-to-cart-btn[data-id="${id}"]`);
			if (btn) {
				btn.setAttribute("disabled", "disabled");
			}
		}, 100);
	});
}

// если есть слайдер в модальном окне - инициировать слайдеры в функции modalSlider и объявлять после создания окна
// функция инициализации слайдера
const modalSlider = () => {
	const minSlider = new Swiper('.slider-min', {
		grabCursor: true,
		slidesPerView: 6,
		initialSlide: 0,
		spaceBetween: 20,
		freeMode: true,
	});
	
	const mainSlider = new Swiper('.slider-main', {
		grabCursor: true,
		spaceBetween: 20,
		slidesPerView: 1,
		initialSlide: 0,
		simulateTouch: false,
		effect: 'fade',
		fadeEffect: {
		  crossFade: true
		},
		thumbs: {
			swiper: minSlider,
		}
	});
};

if (catalogProducts) {
	//* функция создания карточек в каталоге товаров
	const loadProducts = async function() {
		let response = await fetch('../data/data.json');
		if (response.ok) {
			let data = await response.json();
			let dataLength = data.length;
			catalogProducts.innerHTML = '';

			// функция строит карточку товара
			const innerProd = function(item) {
				catalogProducts.innerHTML += `
					<article class="catalog-item">
						<div class="catalog-item__img">
							<img src="${item.mainImage}" loading="lazy" alt="${item.title}">
							<div class="catalog-item__btns">
								<button class="catalog-item__btn btn-reset modal-btn" data-id="${item.id}" aria-label="Показать информацию о товаре">
									<svg><use xlink:href="img/sprite.svg#show"></use></svg>
								</button>
								<button class="catalog-item__btn btn-reset add-to-cart-btn" data-id="${item.id}" aria-label="Добавить товар в корзину">
									<svg><use xlink:href="img/sprite.svg#cart"></use></svg>
								</button>
							</div>
						</div>
						<h3 class="catalog-item__title">${item.title}</h3>
						<span class="catalog-item__price">${normalPrice(item.price)} р</span>
					</article>
				`;
			}

			// формируем сетку из 6 карточек товаров на странице (6 - это число prodQuantity)
			for (let i = 0; i < dataLength; i++) {
				if (i < prodQuantity) {
				let itemProd = data[i];
					innerProd(itemProd);
				}
			}
			// функция модального окна
			// bindModal(loadModalData);


			// делаем видимыми кнопки товара при фокусе (по умолчанию они скрыты)
			const productsBtns = document.querySelectorAll('.catalog-item__btn');
			productsBtns.forEach(el => {
				el.addEventListener('focus', (e) => {
					let parent = e.currentTarget.closest('.catalog-item__btns');
					parent.classList.add('catalog-item__btns--focus');
				}, true);
	  
				el.addEventListener('blur', (e) => {
					let parent = e.currentTarget.closest('.catalog-item__btns');
					parent.classList.remove('catalog-item__btns--focus');
				}, true);
			});

			// добавление карточек товара при нажатии кнопки "показать еще"
			catalogMore.addEventListener('click', function(e) {
				let a = prodQuantity;
				prodQuantity = prodQuantity + addQuantity;
				for (let i = a; i < dataLength; i++) {
					if (i < prodQuantity) {
					let itemProd = data[i];
						innerProd(itemProd);
					}
				}
				if (prodQuantity >= dataLength) {
					catalogMore.style.display = 'none';
				} else {
					catalogMore.style.display = 'block';
				}

				btnBlock(); // блокирование кнопок добавления в корзину

				// при добавлении новых товаров перезапускается функция модального окна
				// bindModal(loadModalData);
			});
			
		} else {
			console.log(('error', response.status));
		}
	};

	loadProducts();

	//* открытие модального окна
	//todo - добавить аргумент func в функцию openModal(func)
	//todo - вставить этот код в функцию openModal (модальное окно) в момент открытия окна (после disableScroll)
	// получение id кнопки
	// if (modalContent.classList.contains('modal-prod')) {
	// 	let openBtnId = lastFocus.dataset.id;
	// 	func(openBtnId);
	// }
	catalogProducts.addEventListener('click', function(e) {
		if (e.target.classList.contains('modal-btn')) {
			e.preventDefault();
			modalContent = document.querySelector('.modal-prod');
			openModal(loadModalData);
		}
	});

	//* функция создания окна товара
	const loadModalData = async function(id = 1) {
		let response = await fetch('../data/data.json');
		if (response.ok) {
			let data = await response.json();
			// очищаем блоки
			prodModalSlider.innerHTML = '';
			prodModalPreview.innerHTML = '';
			prodModalInfo.innerHTML = '';
			prodModalDescr.textContent = '';
			prodModalChars.innerHTML = '';
			prodModalVideo.innerHTML = '';
			prodModalVideo.style.display = 'none';

			for (let dataItem of data) {
				if (dataItem.id == id) {
					
					// Слайдер с фото товара
					const preview = dataItem.gallery.map((image) => {
						return `
							<div class="slider-min__item swiper-slide">
								<img src="${image}" alt="изображение">
							</div>
						`;
					});
					const slides = dataItem.gallery.map((image) => {
						return `
							<div class="slider-main__item swiper-slide">
								<img src="${image}" alt="изображение">
							</div>
						`;
					});

					prodModalPreview.innerHTML = preview.join('');
					prodModalSlider.innerHTML = slides.join('');

					// Информация о товаре
					const sizes = dataItem.sizes.map((size) => {
						return `
							<li class="modal-info__item-size">
								<button class="btn-reset modal-info__size">${size}</button>
							</li>
						`;
					});

					prodModalInfo.innerHTML = `
						<h3 class="modal-info__title">${dataItem.title}</h3>
						<div class="modal-info__rate">
							<img src="img/star.svg" alt="Рейтинг 5 из 5">
							<img src="img/star.svg" alt="">
							<img src="img/star.svg" alt="">
							<img src="img/star.svg" alt="">
							<img src="img/star.svg" alt="">
						</div>
						<div class="modal-info__sizes">
							<span class="modal-info__subtitle">Выберите размер</span>
							<ul class="modal-info__sizes-list list-reset">
								${sizes.join('')}
							</ul>
						</div>
						<div class="modal-info__price">
							<span class="modal-info__current-price">${dataItem.price} р</span>
							<span class="modal-info__old-price">${dataItem.oldPrice ? dataItem.oldPrice + ' р' : ''}</span>
						</div>
					  `;

					// Описание
					prodModalDescr.textContent = dataItem.description;

					// Характеристики
					let charsItems = '';

					Object.keys(dataItem.chars).forEach(function eachKey(key) {
						charsItems += `<p class="modal-char__item">${key}: ${dataItem.chars[key]}</p>`
					});
					prodModalChars.innerHTML = charsItems;

					// Видео
					if (dataItem.video) {
						prodModalVideo.style.display = 'block';
						prodModalVideo.innerHTML = `
							<iframe src="${dataItem.video}"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen></iframe>
						`;
					}
				}
			}
			modalSlider();

			let btncartProd = document.querySelector(`.add-to-cart-btn[data-id="${id}"]`);
			let btnOrder = document.querySelector('.modal-info__order');
			// при открытии окна передаем кнопке id
			btnOrder.setAttribute("data-id", `${id}`);
			// отключаем кнопку, если у карточки товара она отключена
			if(btncartProd.disabled) {
				btnOrder.setAttribute("disabled", "disabled");
			} else {
				btnOrder.removeAttribute('disabled');
			}

		} else {
			console.log(('error', response.status));
		}

	};

	//* по тачу появляются кнопки товара
	let isOpen = false;
	catalogProducts.addEventListener('touchend', function(e) {
		if (e.target.closest('.catalog-item__img')) {
			let btns = e.target.closest('.catalog-item__btns');
			let btn = btns.querySelectorAll('.catalog-item__btn');
			if (!isOpen) {
				btns.classList.add('catalog-item__btns--touch');
				setTimeout(() => {
					btn.forEach(el => {
						el.style.pointerEvents = 'auto';
					});
				}, 100);
				isOpen = true;
		 	} else if (isOpen && !e.target.classList.contains('catalog-item__btn') && !e.target.classList.contains('add-to-cart-btn')) {
				btns.classList.remove('catalog-item__btns--touch');
				setTimeout(() => {
					btn.forEach(el => {
						el.style.pointerEvents = 'none';
					});
				}, 100);
				isOpen = false;
			}
		}
	});

}
//* работа мини-корзины
const miniCartList = document.querySelector('.mini-cart__list');
const fullPrice = document.querySelector('.mini-cart__summ');
const cartCount = document.querySelector('.cart__count');

// функция удаляет пробел между разрядами
const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};
// функция создает единицу товара в корзине
const createCart = async function(idSelector, priceSelector) {
	let response = await fetch('../data/data.json');
	if (response.ok) {
		let data = await response.json();
		for (let dataItem of data) {
			if (dataItem.id == idSelector) {
				miniCartList.insertAdjacentHTML('afterbegin', `
					<li class="mini-cart__item" data-id="${dataItem.id}">
						<div class="mini-cart__image">
							<img src="${dataItem.mainImage}" alt="${dataItem.title}" width="100" height="100">
						</div>
						<div class="mini-cart__content">
							<h3 class="mini-cart__title">${dataItem.title}</h3>
							<span class="mini-cart__price">${normalPrice(dataItem.price)} p</span>
						</div>
						<button class="mini-cart__delete btn-reset"></button>
					</li>
				`);
				// прибавляем цену товара к общей сумме и выводим общую сумму
				priceSelector += dataItem.price;
				fullPrice.textContent = `${normalPrice(priceSelector)} р`;	
			}
		}
		// получаем количество товара, добавляем его в показаель количества и делаем активным кружочек с количеством
		let num = document.querySelectorAll('.mini-cart__item').length;
		if (num > 0) {
			cartCount.classList.add('cart__count--active');
		}
		cartCount.textContent = num;
		// делаем значек корзины доступным для клика
		document.querySelector('.cart').removeAttribute('disabled');
		updateStorage();
	}  else {
		console.log(('error', response.status));
	}
}
// при нажатии на кнопку "добавить в корзину" - товар добавляется в корзину
catalogProducts.addEventListener('click', (e) => {
	if (e.target.classList.contains('add-to-cart-btn')) {
		let id = e.target.dataset.id;
		let price = parseInt(priceWithoutSpaces(fullPrice.textContent));
		createCart(id, price);
		// знак добавления в корзину на товаре делаем недоступным
		e.target.setAttribute("disabled", "disabled");
		// updateStorage();
	}
});

// при нажатии на кнопку "заказать" в модальном окне корзины - товар добавляется в корзину
prodModal.addEventListener('click', (e) => {
	if (e.target.classList.contains('modal-info__order')) {
		let id = e.target.dataset.id;	
		let price = parseInt(priceWithoutSpaces(fullPrice.textContent));
		createCart(id, price);
		// кнопку добавления в корзину на товаре делаем недоступным
		document.querySelector(`.add-to-cart-btn[data-id="${id}"]`).setAttribute("disabled", "disabled");
		e.target.setAttribute("disabled", "disabled");
	}
});

miniCartList.addEventListener('click', (e) => {
	let price = parseInt(priceWithoutSpaces(fullPrice.textContent));
	// при клике на кнопку "удалить товар из корзины" удаляем единицу товара, меняем сумму и количество
	if (e.target.classList.contains('mini-cart__delete')) {
		const self = e.target;
		const parent = self.closest('.mini-cart__item');
		let priceDel = parseInt(priceWithoutSpaces(parent.querySelector('.mini-cart__price').textContent));
		const id = parent.dataset.id;
		let btnProd = document.querySelector(`.add-to-cart-btn[data-id="${id}"]`);
		if (btnProd) {
			btnProd.removeAttribute('disabled');
		}
		parent.remove();

		price -= priceDel;
		fullPrice.textContent = `${normalPrice(price)} р`;

		// если товаров в корзине нет:
		// закрываем окно корзины, делаем значек корзины недоступным, убираем кружек количества
		let num = document.querySelectorAll('.mini-cart__list .mini-cart__item').length;
		if (num == 0) {
			cartCount.classList.remove('cart__count--active');
			miniCart.classList.remove('mini-cart--open');
			document.querySelector('.cart').setAttribute("disabled", "disabled");
		}
		cartCount.textContent = num;

		updateStorage();

	} else if (e.target.closest('.mini-cart__item')) {
		// выделяем товары в корзине при клике на них
		const parent = e.target.closest('.mini-cart__item');
		const cartItems = document.querySelectorAll('.mini-cart__list .mini-cart__item');
		cartItems.forEach(btn => {
			if (!btn.contains(e.target)) {
				btn.classList.remove('mini-cart__item--active');
			}
		});	

		parent.classList.add('mini-cart__item--active');
	}
});

//* работа корзины в модальном окне
const openOrderModal = document.querySelector('.mini-cart__btn');
const orderModalList = document.querySelector('.modal-cart-order__list');
const orderModalQuantity = document.querySelector('.modal-cart-order__quantity span');
const orderModalSumm = document.querySelector('.modal-cart-order__summ span');
const orderModalShow = document.querySelector('.modal-cart-order__show');


// при клике на кнопку "перейти в корзину" модальное окно корзины заполняется товаром из мини-корзины
// заполняются сумма и количество из мини-корзины
openOrderModal.addEventListener('click', () => {
	const productsMiniCart = document.querySelectorAll('.mini-cart__item');
	const productsQuantity = productsMiniCart.length;
	orderModalList.innerHTML = '';
	productsMiniCart.forEach(el => {
		let productId = el.dataset.id;
		modalCartLoad(productId);
	});

	// закрывать список товаров при открытии окна корзины
	if (orderModalList.classList.contains('modal-cart-order__list--open')) {
		orderModalShow.classList.remove('modal-cart-order__show--active');
		orderModalList.classList.remove('modal-cart-order__list--open');
		orderModalList.style.maxHeight = null;
	}

	// или увеличивать maxHeight - если список должен оставаться закрытым
	// setTimeout(() => {
	// 	if (orderModalList.classList.contains('modal-cart-order__list--open')) {
	// 		orderModalList.style.maxHeight = orderModalList.scrollHeight + 'px';
	// 	}
	// }, 100);

	document.querySelector('.modal-cart-form__submit').removeAttribute("disabled", "disabled");

	orderModalQuantity.textContent = `${productsQuantity} шт`;
	orderModalSumm.textContent = fullPrice.textContent;

});

// кнопка открытия-закрытия списка товаров в корзине
orderModalShow.addEventListener('click', () => {
	if (orderModalList.classList.contains('modal-cart-order__list--open')) {
		orderModalShow.classList.remove('modal-cart-order__show--active');
		orderModalList.classList.remove('modal-cart-order__list--open');
		orderModalList.style.maxHeight = null;
	} else {
		orderModalShow.classList.add('modal-cart-order__show--active');
		orderModalList.classList.add('modal-cart-order__list--open');
		orderModalList.style.maxHeight = orderModalList.scrollHeight + 'px';
	}
});

// удаление товаров из окна корзины
orderModalList.addEventListener('click', (e) => {
	if (e.target.classList.contains('modal-cart-product__delete')) {
		const self = e.target;
		const parent = self.closest('.modal-cart-product');
		const priceItrm = parseInt(priceWithoutSpaces(parent.querySelector('.modal-cart-product__price').textContent));
		let priseFull = parseInt(priceWithoutSpaces(fullPrice.textContent));
		const id = parent.dataset.id;
		
		parent.style.opacity = '0';
		setTimeout(() => {
			parent.style.marginBottom = '0px';
			parent.style.maxHeight = '0px';
			orderModalList.style.maxHeight = orderModalList.scrollHeight + 'px';
		}, 100);

		document.querySelector(`.mini-cart__item[data-id="${id}"]`).remove();

		let btnProd = document.querySelector(`.add-to-cart-btn[data-id="${id}"]`);
		if (btnProd) {
			btnProd.removeAttribute('disabled');
		}

		// изменяем общую стоимость товаров в окне и в мини-корзине
		priseFull -= priceItrm;
		fullPrice.textContent = `${normalPrice(priseFull)} р`;

		// удаляем товары в окне и в мини-корзине
		setTimeout(() => {
			parent.remove();
			// изменяем количество товаров в окне, мини-корзине	и кружке с количеством
			let num = document.querySelectorAll('.modal-cart-product').length;
			if (num == 0) {
				cartCount.classList.remove('cart__count--active');
				document.querySelector('.cart').setAttribute("disabled", "disabled");
				document.querySelector('.modal-cart-form__submit').setAttribute("disabled", "disabled");
				orderModalShow.classList.remove('modal-cart-order__show--active');
			}
			cartCount.textContent = num; 
			orderModalSumm.textContent = `${normalPrice(priseFull)} р`;
			orderModalQuantity.textContent = `${num} шт`;
		}, 300);
		updateStorage();
	}
});

// очищение корзины после нажатия кнопки "заказать" (используется в форме заказа)
const allDel = function() {
	orderModalShow.classList.remove('modal-cart-order__show--active');
	orderModalList.classList.remove('modal-cart-order__list--open');
	orderModalList.style.maxHeight = null;

	orderModalShow.classList.remove('modal-cart-order__show--active')
	orderModalSumm.textContent = '0 р';
	orderModalQuantity.textContent = '0 шт';
	document.querySelector('.modal-cart-form__submit').setAttribute("disabled", "disabled");

	let products =  document.querySelectorAll('.modal-cart-product');
	products.forEach(function(el) {
		el.remove();
	});

	cartCount.classList.remove('cart__count--active');
	cartCount.textContent = '0';
	document.querySelector('.cart').setAttribute("disabled", "disabled"); 

	let miniCartItems = document.querySelectorAll('.mini-cart__item');
	miniCartItems.forEach(function(el) {
		el.remove();
	});
	fullPrice.textContent = '0 р';
	let btnDisabled = document.querySelectorAll('.add-to-cart-btn[disabled="disabled"]');
	btnDisabled.forEach(function(el) {
		el.removeAttribute('disabled');
	});
	updateStorage();
}

// функция заполнения модального окна товароми из мини-корзины
const modalCartLoad = async (id) => {
	let response = await fetch('../data/data.json');
	if (response.ok) {
		let data = await response.json();	
		for (let dataItem of data) {
			if (dataItem.id == id) {
				orderModalList.insertAdjacentHTML('afterbegin', `
					<li class="modal-cart-product" data-id="${dataItem.id}">
						<div class="modal-cart-product__image">
							<img src="${dataItem.mainImage}" alt="${dataItem.title}" width="80" height="80">
						</div>
						<div class="modal-cart-product__content">
							<h3 class="modal-cart-product__title">${dataItem.title}</h3>
							<span class="modal-cart-product__price">${normalPrice(dataItem.price)} p</span>
						</div>
						<button class="modal-cart-product__delete btn-reset">Удалить</button>
					</li>
				`);
			}
		}


	}  else {
		console.log(('error', response.status));
	}
};

//* корзина в localStorage

// засчет суммы товаров после обновления страницы
const countSumm = () => {
	let price = 0;
	document.querySelectorAll('.mini-cart__price').forEach(el => {
		let itemPrice = parseInt(priceWithoutSpaces(el.textContent));
		price += itemPrice;
		fullPrice.textContent = `${normalPrice(price)} р`;
	});
};

// добавление информации в корзину из localStorage
const initialState = () => {
	if (localStorage.getItem('products') !== null) {
		miniCartList.innerHTML = localStorage.getItem('products');
		let num = document.querySelectorAll('.mini-cart__item').length;
		cartCount.classList.add('cart__count--active');
		cartCount.textContent = num;
		document.querySelector('.cart').removeAttribute('disabled');
		countSumm();
		btnBlock(); // блокирование кнопок добавления в корзину (функция в файле создания карточер)

	}
};

initialState();

// обновление localStorage
const updateStorage = () => {
	let html = miniCartList.innerHTML;
	html = html.trim();

	if (html.length) {
		localStorage.setItem('products', html);
	} else {
		localStorage.removeItem('products');
	}
};
const forms = document.querySelectorAll('form');

if (forms.length > 0) {
	forms.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();
			let form = e.target;	
			let inputs = form.querySelectorAll('input');
			// let fileName = target.querySelector('.file__name'); // если есть загрузка файла (в атрибут добавить file)
			let valid = validInput(form);
			if (valid === 0 && validCheck(form)) {
				formRemoveError(form);

				//* ======== Сообщение об отправке ============
				let textMessage = form.querySelector('.form-message');
				if (textMessage) {
					textMessage.textContent = 'Загрузка...';
					textMessage.classList.add('active');
				}

				//* Запись названия чекбокса в value инпута чекбокса (если есть чекбоксы)
				// inputs.forEach(input => {
				// 	if (input.type == 'checkbox' || input.type == 'radio') {
				// 		input.value = input.nextElementSibling.textContent;
				// 	}
				// });

				//*========= FormData =========================
				const formData = new FormData(item);
				// formData.append('image', formImage.files[0]);
				if (form.classList.contains('modal-cart-form')) {
					document.querySelectorAll('.modal-cart-product').forEach((el, idx) => {
						let title = el.querySelector('.modal-cart-product__title').textContent;
						let price = el.querySelector('.modal-cart-product__price').textContent;
						formData.append(`product-${idx + 1}`, `${title}, ${price}`);
					});
			  
					formData.append(`summ`, `${document.querySelector('.modal-cart-order__summ span').textContent}`);
				}

				//* ===== Проверка формы =====
				// for(var pair of formData.entries()) {
				// 	console.log(pair[0]+ ', '+ pair[1]);
				// }

				//*========= Отправка данных ===============
				const postData = async (url, data) => {
					let response = await fetch(url, {
						method: "POST",
						body: data
					});	
					if (response.ok) {

						// let result = await response.json(); // json() - для вывода сообщения;
						// alert(result.message);

						let result = await response.text(); // text() - для проверки на сервере, подключить server.php)
						// console.log(result); // это для проверки на сервере

						if (textMessage) {
							textMessage.textContent = 'Спасибо, скоро мы с вами свяжимся!';
							textMessage.classList.add('active');
						}
						// clearInputs(inputs);
						if (item.classList.contains('modal-cart-form')) {
							allDel();
						}
						form.reset();
						setTimeout(() => {
							if (textMessage) {
								textMessage.classList.remove('active');
							}
						}, 5000);
					} else {
						// alert("Ошибка");
						if (textMessage) {
							textMessage.textContent = 'Что-то пошло не так...';
							textMessage.classList.add('active');
						}
						setTimeout(() => {
							// form.reset();
							if (textMessage) {
								textMessage.classList.remove('active');
							}
						}, 5000);
					}
				};
				// postData('../sendmail.php', formData);
				postData('../server.php', formData) //! убрать (это для проверки на сервере)
			}
		});
	});
}
const lazyImages = document.querySelectorAll('img[data-src],source[data-srcset]');
const loadMap = document.querySelector('.load-map');

window.addEventListener("scroll", () => {
	let scrollY = window.scrollY;
	if (lazyImages.length > 0) {
		lazyImages.forEach(img => {
			let imgOffset = img.getBoundingClientRect().top + pageYOffset;
			
			if (scrollY >= imgOffset - 1000) {
				if (img.dataset.src) {
					img.src = img.dataset.src;
					img.removeAttribute('data-src');
				} else if (img.dataset.srcset) {
					img.srcset = img.dataset.srcset;
					img.removeAttribute('data-srcset');
				}
			}
		});
	}
	//Map
	// if (!loadMap.classList.contains('loaded')) {
	// 	let mapOffset = loadMap.offsetTop;
	// 	if (scrollY >= mapOffset - 200) {
	// 		const loadMapUrl = loadMap.dataset.map;
	// 		if (loadMapUrl) {
	// 			loadMap.insertAdjacentHTML(
	// 				"beforeend",
	// 				`<iframe src="${loadMapUrl}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
	// 			);
	// 			loadMap.classList.add('loaded');
	// 		}
	// 	}
	// }
});
let flag = 0;

window.addEventListener('scroll', function(){
	let scrollY = window.scrollY;
	let mapOffset = document.querySelector("#map").offsetTop;

	if ((scrollY >= mapOffset - 500) && (flag == 0)) {
		ymaps.ready(init);

		function init(){
			const myMap = new ymaps.Map("map", {
				center: [59.830481, 30.142197],
				zoom: 10,
				controls: []
		
			});
			let myPlacemark  = new ymaps.Placemark([59.830481, 30.142197], {}, {
				iconLayout: 'default#image',
				iconImageHref: 'img/placemark.png',
				iconImageSize: [25, 34],
				iconImageOffset: [-19, -44]
			});			
			myMap.geoObjects.add(myPlacemark);
			myMap.behaviors.disable(['scrollZoom']);
		}

		flag = 1;
	}
});
let setCursorPosition = (pos, elem) => {
    elem.focus();
    if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};
function createMask(event) {
    let matrix = '+7 (___) ___ __ __',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
    if (def.length >= val.length) {
        val = def;
    }
    this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
    if (event.type ==='blur') {
        if (this.value.length == 2 || this.value.length < matrix.length) {
            this.value = '';
        }
    } else if (event.type ==='keyup' || event.type ==='mouseup') {
        let cur = this.selectionStart;
        if (cur == '0') {
            setCursorPosition(this.value.length, this);
        }
    } else {
        setCursorPosition(this.value.length, this);        
    }
}
let tel = document.querySelectorAll('.tel');
tel.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
    input.addEventListener('keyup', createMask);
    input.addEventListener('mouseup', createMask);
});
const cartBtn = document.querySelector('.cart');
const miniCart = document.querySelector('.mini-cart');
// const miniCartItem = document.querySelectorAll('.mini-cart__item');

cartBtn.addEventListener('click', () => {
	miniCart.classList.toggle('mini-cart--open');
});

document.addEventListener('click', (e) => {
	if (!e.target.classList.contains('mini-cart') && !e.target.closest('.mini-cart') && !e.target.classList.contains('cart') && !e.target.classList.contains('mini-cart__delete')
	|| e.target.classList.contains('mini-cart__btn')) {
		miniCart.classList.remove('mini-cart--open');
	}
});
//TODO Добавить классы:
//* data-btn="modal-name" - добавить кнопкам открытия модального окна (modal-name - имя окна, которое должно открыться)
//* data-modal - добавить всем модальным окнам (modal-name) (если их несколько)
//* block-fix - добавить класс для блоков с position: absolute или fixed (добавится padding)
//* small-fix - добавить класс для маленьких блоков с position: absolute или fixed (добавится margin)
//* data-inside - добавить кнопкам внутри модального окна, которые открывают следующее модальное окно (что бы сохранить фокус на кнопке вне окна)

//? эти параметры указывать, если они разные для разных окон - если одинаковые - меняем speedTime и modalAnimation
//* data-speed="300" - добавить время выполнения, по умолчанию 500 (ставится в соответствии с $transition-time)
//* data-animation="fadeInUp"  - добавить анимацию при открытии модального окна (контента внутри оболочки), по умолчанию 'fade'

const modal = document.querySelector('.modal-overlay');
const modalBtn = document.querySelectorAll('[data-btn]');
const openWindows = document.querySelectorAll('[data-modal]');
const fixBlocks = document.querySelectorAll('.block-fix ');
const fixSmall = document.querySelectorAll('.small-fix');
const modalScroll = window.innerWidth - document.body.offsetWidth;
const focusElements = [
	'a[href]',
	'input',
	'select',
	'textarea',
	'button',
	'iframe',
	'[contenteditable]',
	'[tabindex]:not([tabindex^="-"])'
];
let modalContent;
let lastFocus = false;
let speedTime = 500;
// let modalAnimation = 'fade';
if (modal) {
	modalBtn.forEach(function(item) {
		item.addEventListener('click', function(e) {
			let target = e.currentTarget;
			if (target) {
				e.preventDefault();
				let modalName = target.dataset.btn;
				modalContent = document.querySelector(`.${modalName}`);
				// скорость и анимация - если добавлены в аргумент data
				let speed = target.dataset.speed;
				// let animation = target.dataset.animation;
				speedTime = speed ? parseInt(speed) : 500;
				// modalAnimation = animation ? animation : 'fade';
				openModal();

				// todo если есть кнопки внутри модального окна, которые открывают следующее модальное окно (data-inside), передаем аргумент target
				// openModal(target);
			}
		});
	});

	document.addEventListener('click', (e) => {
		if (e.target.classList.contains('modal-overlay') && e.target.classList.contains("is-open")) {
			closeModal();			
		}

		if (e.target.classList.contains('modal__close') && e.target.closest('.modal-open')) {
			closeModal();			
		}
	});
	

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains("is-open")) {
			closeModal();
		}

		if (e.code === 'Tab' && modal.classList.contains("is-open")) {
			focusCatch(e);
		}
	});
}

function openModal(func) {
	lastFocus = document.activeElement;
	// todo если есть кнопки внутри модального окна, которые открывают следующее модальное окно (data-inside), lastFocus получаем так (обычный убрать):
	// if (!btn.closest(`[data-inside]`)) {
	// 	lastFocus = document.activeElement;
	// }

	openWindows.forEach(item => {
		item.classList.remove('modal-open');
		item.setAttribute('aria-hidden', true);
		// item.classList.remove('animate-open');
		// item.classList.remove(modalAnimation);
	});

	if (!modal.classList.contains('is-open')){
		disableScroll();
	}

	if (func && modalContent.classList.contains('modal-prod')) {
		let openBtnId = lastFocus.dataset.id;	
		func(openBtnId);
	}

	modal.classList.add('is-open');
	modal.setAttribute('tabindex', '0');

	document.body.style.paddingRight = `${modalScroll}px`;
	if (fixBlocks.length > 0) {
		fixBlocks.forEach(item => {
			item.style.paddingRight = `${modalScroll}px`;
		})
	}
	if (fixSmall.length > 0) {
		fixSmall.forEach(item => {
			item.style.marginRight = `${modalScroll}px`;
		})
	}

	modalContent.classList.add('modal-open');
	modalContent.setAttribute('aria-hidden', false);
	// modalContent.classList.add(modalAnimation);

	setTimeout(() => {
		// modalContent.classList.add('animate-open');
		focusTrap();
	}, speedTime);
}

function closeModal() {
	openWindows.forEach(item => {
		item.classList.remove('modal-open');
		item.setAttribute('aria-hidden', true);
		// item.classList.remove('animate-open');
		// item.classList.remove(modalAnimation);
	});

	enableScroll();

	document.body.style.paddingRight = `0px`;
	if (fixBlocks.length > 0) {
		fixBlocks.forEach(item => {
			item.style.paddingRight = `0px`;
		})
	}
	if (fixSmall.length > 0) {
		fixSmall.forEach(item => {
			item.style.marginRight = `0px`;
		})
	}

	modal.classList.remove('is-open');
	modal.setAttribute('tabindex', '-1');

	focusTrap();
}

function focusTrap() {
	// const nodes = this.modalContainer.querySelectorAll(this._focusElements); //* для фокуса на первом элементе окна
	if (modal.classList.contains("is-open")) {
		modal.focus();
		// if (nodes.length) nodes[0].focus(); //* для фокуса на первом элементе окна
	} else {
		lastFocus.focus();	
	}
}

function focusCatch(e) {
	const focusable = modalContent.querySelectorAll(focusElements);
	const focusArray = Array.prototype.slice.call(focusable);
	const focusedIndex = focusArray.indexOf(document.activeElement);

	if (e.shiftKey && focusedIndex === 0) {
		focusArray[focusArray.length - 1].focus();
		e.preventDefault();
	}

	if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
		focusArray[0].focus();
		e.preventDefault();
	}
}
const quizForm = document.querySelector('.quiz-form');
const quizInputs = quizForm.querySelectorAll('input');
const quizBlocks = quizForm.querySelectorAll('.quiz-block');

let textareaText = null;
let quizReply  = {};
let blockIndex = 0;

// функция показа только первого блока квиза
showBlocks(blockIndex);

function showBlocks() {
	quizBlocks.forEach((item) => item.style.display = 'none');
	quizBlocks[blockIndex].style.display = 'block';
	quizBlocks[blockIndex].classList.add('fadeIn');
}

// запись названия чекбокса в value инпута чекбокса
quizInputs.forEach(input => {
	if (input.type == 'checkbox' || input.type == 'radio') {
		input.value = input.nextElementSibling.textContent;
	}
});

quizForm.addEventListener('click', (e) => {
	let target = e.target;
	let block = target.closest('.quiz-block');
	let nextBtn = quizForm.querySelectorAll('[data-next]');
	nextBtn.forEach(btn => {
		if (target == btn) {
			e.preventDefault();
			addToSend(block, quizReply);
			nextQuestion(block);
		}
	});
	if (target == document.querySelector('[data-send]')) {
		e.preventDefault();
		addToSend(block, quizReply);
		send(block);
	}
});

function nextQuestion(form) {
	let valid = validInput(form);
	if (valid === 0 && validCheck(form)) {
		showBlocks(blockIndex += 1);
	}
}

function send(form) {
	let valid = validInput(form);
	if (valid === 0 && validCheck(form)) {
		formRemoveError(quizForm);

		//* ======== Сообщение об отправке ============
		let ok = form.querySelector('.quiz-send__ok');
		let textMessage = form.querySelector('.quiz-message');
		if (textMessage) {
			textMessage.textContent = 'Загрузка...';
			textMessage.classList.add('active');
		}

		//*========= FormData ===============
		const quizFormData = new FormData();
		for (let key in quizReply) {
			quizFormData.append(key, quizReply[key]);
		}
		// formData.append('image', formImage.files[0]);
		//* Проверка FormData
		// for(var pair of quizFormData.entries()) {
		// 	console.log(pair[0]+ ': '+ pair[1]);
		// }

		//*========= Отправка данных ===============
		const quizData = async (url, data) => {
			let response = await fetch(url, {
				method: "POST",
				body: data
			});	
			if (response.ok) {

				// let result = await response.json(); // json() - для вывода сообщения;
				// alert(result.message);

				let result = await response.text(); // text() - для проверки на сервере, подключить server.php)
				// console.log(result); // это для проверки на сервере

				if (textMessage) {
					textMessage.textContent = 'Ok!';
					textMessage.classList.add('active');
				}
				ok.classList.add('active');
				clearInputs(quizInputs);
				setTimeout(() => {
					if (textMessage) {
						textMessage.classList.remove('active');
					}
					ok.classList.remove('active');
				}, 5000);
			} else {
				alert("Ошибка HTTP: " + response.status);
				if (textMessage) {
					textMessage.textContent = 'Что-то пошло не так...';
					textMessage.classList.add('active');
				}
				setTimeout(() => {
					if (textMessage) {
						textMessage.classList.remove('active');
					}
				}, 5000);
			}
		};
		// quizData('../sendmail.php', quizFormData);
		quizData('../server.php', quizFormData) //! убрать (это для проверки на сервере)

	}
}

function addToSend(form, obj) {
	let valueString = '';
	let inputs = form.querySelectorAll('input');
	let textarea = form.querySelectorAll('textarea');
	if (inputs.length > 0) {
		for (let i = 0; i < inputs.length; i++) {
			let field = inputs[i];
			if (field.type != 'checkbox' && field.type != 'radio' && field.value) {
				obj[field.name] = field.value;
			} else if (field.type == 'radio' && field.checked) {
				obj[field.name] = field.value;
			} else if (field.type == 'checkbox' && field.checked) {
				valueString += field.value + ',';		
				obj[field.name] = valueString;
			}
		}
	} else if (textarea.length > 0) {
		for (let i = 0; i < textarea.length; i++) {
			let text = textarea[i];
			if (text.value) {
				obj[text.name] = text.value;	
			}
		}
	}
}
// const rangeSlider = document.getElementById('range-slider');

// if (rangeSlider) {
// 	noUiSlider.create(rangeSlider, {
//     start: [500, 999999],
// 		connect: true,
// 		step: 1,
//     range: {
// 			'min': [500],
// 			'max': [999999]
//     }
// 	});

// 	const input0 = document.getElementById('input-0');
// 	const input1 = document.getElementById('input-1');
// 	const inputs = [input0, input1];

// 	rangeSlider.noUiSlider.on('update', function(values, handle){
// 		inputs[handle].value = Math.round(values[handle]);
// 	});

// 	const setRangeSlider = (i, value) => {
// 		let arr = [null, null];
// 		arr[i] = value;
// 		rangeSlider.noUiSlider.set(arr);
// 	};

// 	inputs.forEach((el, index) => {
// 		el.addEventListener('change', (e) => {
// 			setRangeSlider(index, e.currentTarget.value);
// 		});
// 	});
// }
let td = document.querySelectorAll('.catalog-sizes td');

td.forEach(item => {
	item.addEventListener('click', (e) => {
		let self = e.currentTarget;
		item.style.backgroundColor = '#dbbba9';
		td.forEach(btn => {
			if (btn !== self) {
				btn.style.backgroundColor = 'transparent';
			}
		});
	});
});
//* Валидация формы (если чекбоксы и инпуты в одной форме)
function validCheck(form) {
	let elements = form.querySelectorAll('input');
	let isValid = false;
	if (elements.length > 0) {
		for (let index = 0; index < elements.length; index++) {
			let input = elements[index];
			if (!input.classList.contains('not-valid') && input.getAttribute("type") === "checkbox" || input.getAttribute("type") === "radio") {
					if (input.checked) {
						isValid = true;
					} else {
						formAddError(input);
					}
			} else {isValid = true;}
		}
	} else {isValid = true;}

	return isValid;
}
function validInput(form) {
	let elements = form.querySelectorAll('input');
	let error = 0;
	if (elements.length > 0) {
		for (let index = 0; index < elements.length; index++) {
			let input = elements[index];
			let placeholder = input.getAttribute('placeholder');
			if (!input.classList.contains('not-valid')) {
				if (input.classList.contains('email')) {
					if (emailTest(input) || input.value == placeholder) {
						formAddError(input);
						error++;
					}
				} else {
					if (input.value == '' || input.value == placeholder) {
						formAddError(input);
						error++;
					}
				}
			}
		}
	}

	return error;
}

function formAddError(item) {
	item.parentElement.classList.add('error');
	item.classList.add('error');

	if (item.closest('.quiz-form')) {
		let quizError = item.closest('.quiz-block').querySelector('.quiz-message');
		if (quizError) {
			quizError.classList.add('active');
		}
	} else {
		let formError = item.parentElement.querySelector('.form-message');
		if (formError) {
			formError.classList.add('active');
		}
	}
}

function formRemoveError(form) {
	let inputs = form.querySelectorAll('input, textarea');
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			let input = inputs[index];
			if (!input.classList.contains('not-valid')) {
				input.parentElement.classList.remove('error');
				input.classList.remove('error');
			}
		}
	}
	
	let formError = form.querySelectorAll('.form-message');
	if (formError.length > 0) {
		for (let index = 0; index < formError.length; index++) {
			const error = formError[index];
			error.classList.remove('active');
		}
	}
}

function emailTest(selector) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(selector.value);
}

const textInputs = document.querySelectorAll('.check');   
textInputs.forEach(input => {
	input.addEventListener('keypress', function(e) {
		if (e.key.match(/[^а-яё 0-9]/ig)) {
			e.preventDefault();
		}
	});
	input.addEventListener('keyup', function() {
		this.value=this.value.replace(/[^\а-яё 0-9]/ig,"");
	});
});
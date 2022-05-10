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
		orderModalSumm.textContent = `${normalPrice(priseFull)} р`;
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

			orderModalQuantity.textContent = `${num} шт`;
		}, 300);



		updateStorage();
	}
});

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
const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
	noUiSlider.create(rangeSlider, {
    start: [500, 999999],
		connect: true,
		step: 1,
    range: {
			'min': [500],
			'max': [999999]
    }
	});

	const input0 = document.getElementById('input-0');
	const input1 = document.getElementById('input-1');
	const inputs = [input0, input1];

	rangeSlider.noUiSlider.on('update', function(values, handle){
		inputs[handle].value = Math.round(values[handle]);
	});

	const setRangeSlider = (i, value) => {
		let arr = [null, null];
		arr[i] = value;
		rangeSlider.noUiSlider.set(arr);
	};

	inputs.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			setRangeSlider(index, e.currentTarget.value);
		});
	});
}
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJhY2NvcmRpb24uanMiLCJidXJnZXIuanMiLCJjaGVja2JveC5qcyIsImNyZWF0ZS1jYXJkcy5qcyIsImNyZWF0ZS1jYXJ0LmpzIiwiZm9ybS5qcyIsImxhenkuanMiLCJtYXAuanMiLCJtYXNrLXRlbC5qcyIsIm1pbmktY2FydC5qcyIsIm1vZGFsLmpzIiwicXVpei5qcyIsInJhbmdlLXNsaWRlci5qcyIsInNpemVzLmpzIiwidmFsaWRhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBmb3JFYWNoIFBvbHlmaWxsXHJcbmlmICh3aW5kb3cuTm9kZUxpc3QgJiYgIU5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoKSB7XHJcbiAgICBOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xyXG59XHJcblxyXG4vLyBsb2NrIHNjcm9sbFxyXG5mdW5jdGlvbiBkaXNhYmxlU2Nyb2xsKCkge1xyXG5cdGxldCBwYWdlUG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWTtcclxuXHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbC1sb2NrJyk7XHJcblx0ZG9jdW1lbnQuYm9keS5kYXRhc2V0LnBvc2l0aW9uID0gcGFnZVBvc2l0aW9uO1xyXG5cdGRvY3VtZW50LmJvZHkuc3R5bGUudG9wID0gLXBhZ2VQb3NpdGlvbiArICdweCc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVuYWJsZVNjcm9sbCgpIHtcclxuXHRsZXQgcGFnZVBvc2l0aW9uID0gcGFyc2VJbnQoZG9jdW1lbnQuYm9keS5kYXRhc2V0LnBvc2l0aW9uLCAxMCk7XHJcblx0ZG9jdW1lbnQuYm9keS5zdHlsZS50b3AgPSAnJztcclxuXHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbC1sb2NrJyk7XHJcblx0d2luZG93LnNjcm9sbCh7IHRvcDogcGFnZVBvc2l0aW9uLCBsZWZ0OiAwIH0pO1xyXG5cdGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXBvc2l0aW9uJyk7XHJcbn1cclxuXHJcblxyXG5jb25zdCBjbGVhcklucHV0cyA9IChzZWxlY3RvcikgPT4ge1xyXG5cdHNlbGVjdG9yLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRpdGVtLnZhbHVlID0gJyc7XHJcblx0fSk7XHJcblx0bGV0IGNoZWNrYm94ZXMgPSBxdWl6Rm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcuY3VzdG9tLWNoZWNrYm94X19pbnB1dCcpO1xyXG5cdGlmIChjaGVja2JveGVzLmxlbmd0aCA+IDApIHtcclxuXHRcdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjaGVja2JveGVzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cdFx0XHRjb25zdCBjaGVja2JveCA9IGNoZWNrYm94ZXNbaW5kZXhdO1xyXG5cdFx0XHRjaGVja2JveC5jaGVja2VkID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxud2luZG93Lm5vWmVuc21vb3RoID0gdHJ1ZTtcclxuXHJcbmxldCBsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zY3JvbGwnKTtcclxuXHJcblxyXG5saW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xyXG5cclxuXHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0bGV0IGhhc2ggPSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpLnJlcGxhY2UoJyMnLCAnJyk7XHJcblx0XHRsZXQgdG9CbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgaGFzaCk7XHJcblxyXG5cdFx0emVuc2Nyb2xsLnRvKHRvQmxvY2spO1xyXG5cclxuXHRcdC8vIHplbnNjcm9sbC50byh0b0Jsb2NrLCA1MDApOyAvLyA1MDBtcyA9PSDQstGA0LXQvNGPINC/0YDQvtC60YDRg9GC0LrQuFxyXG5cdH0pO1xyXG59KTtcclxuXHJcbmNvbnN0IHVwRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdldXAnKTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcblx0bGV0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcblx0aWYgKHNjcm9sbGVkID4gMTMwMCkge1xyXG5cdFx0dXBFbGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR1cEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0fVxyXG59KTtcclxuXHJcbiIsImNvbnN0IGFjY29yZGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uJyk7XG5cbmFjY29yZGlvbnMuZm9yRWFjaChlbCA9PiB7XG5cdGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRjb25zdCBzZWxmID0gZS5jdXJyZW50VGFyZ2V0O1xuXHRcdGNvbnN0IGNvbnRyb2wgPSBzZWxmLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb25fX2NvbnRyb2wnKTtcblx0XHRjb25zdCBjb250ZW50ID0gc2VsZi5xdWVyeVNlbGVjdG9yKCcuYWNjb3JkaW9uX19jb250ZW50Jyk7XG5cblx0XHQvLyog0LXRgdC70Lgg0L3QtdC+0LHRhdC+0LTQuNC80L4g0YfRgtC+0LHRiyDQstGB0LUg0LHQu9C+0LrQuCDQt9Cw0LrRgNGL0LLQsNC70LjRgdGMINC/0YDQuCDQvtGC0LrRgNGL0YLQuNC4INCx0LvQvtC60LAgLSDQv9GA0L7RgdGC0L4g0YDQsNGB0LrQvtC80LXQvdGC0LjRgNC+0LLQsNGC0Ywg0Y3RgtGDINGH0LDRgdGC0YwhXG5cdFx0Ly8gYWNjb3JkaW9ucy5mb3JFYWNoKGJ0biA9PiB7XG5cdFx0Ly8gXHRjb25zdCBjb250cm9sID0gYnRuLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb25fX2NvbnRyb2wnKTtcblx0XHQvLyBcdGNvbnN0IGNvbnRlbnQgPSBidG4ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9fY29udGVudCcpO1xuXHRcdC8vIFx0aWYgKGJ0biAhPT0gc2VsZikge1xuXHRcdC8vIFx0XHRidG4uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuXHRcdC8vIFx0XHRjb250cm9sLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcblx0XHQvLyBcdFx0Y29udGVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG5cdFx0Ly8gXHRcdGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcblx0XHQvLyBcdH1cblx0XHQvLyB9KTtcblxuXHRcdHNlbGYuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xuXG5cdFx0Ly8g0LXRgdC70Lgg0L7RgtC60YDRi9GCINCw0LrQutC+0YDQtNC10L7QvVxuXHRcdGlmIChzZWxmLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XG5cdFx0XHRjb250cm9sLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuXHRcdFx0Y29udGVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgZmFsc2UpO1xuXHRcdFx0Y29udGVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcblx0XHRcdGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gY29udGVudC5zY3JvbGxIZWlnaHQgKyAncHgnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb250cm9sLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcblx0XHRcdGNvbnRlbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXHRcdFx0Y29udGVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG5cdFx0XHRjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGw7XG5cdFx0fVxuXHR9KTtcbn0pOyIsImxldCBtZW51Qm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XHJcbmxldCBtZW51SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51X19saW5rJyk7XHJcbmxldCBoYW1idXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyJyk7XHJcblxyXG5oYW1idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7ICAgIFxyXG4gICAgaGFtYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gICAgbWVudUJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgaWYgKGhhbWJ1cmdlci5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgaGFtYnVyZ2VyLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICfQt9Cw0LrRgNGL0YLRjCDQvdCw0LLQuNCz0LDRhtC40Y4nKTtcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhhbWJ1cmdlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAn0L7RgtC60YDRi9GC0Ywg0L3QsNCy0LjQs9Cw0YbQuNGOJyk7XHJcbiAgICAgICAgZW5hYmxlU2Nyb2xsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbWVudUJvZHkuZm9jdXMoKTtcclxuICAgIH0sIDYwMCk7XHJcbn0pO1xyXG5cclxubWVudUl0ZW0uZm9yRWFjaChpdGVtID0+IHtcclxuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAoaGFtYnVyZ2VyLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgaGFtYnVyZ2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBtZW51Qm9keS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgaGFtYnVyZ2VyLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICfQvtGC0LrRgNGL0YLRjCDQvdCw0LLQuNCz0LDRhtC40Y4nKTtcclxuICAgICAgICAgICAgZW5hYmxlU2Nyb2xsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSlcclxuXHJcbmxldCBmaWx0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ19fZmlsdGVycycpO1xyXG5sZXQgZmlsdGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2dfX2J0bicpO1xyXG5sZXQgZmlsdGVyQnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2ctaGFtYnVyZ2VyJyk7XHJcblxyXG5maWx0ZXJCdXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7ICAgIFxyXG4gICAgZmlsdGVyQnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gICAgZmlsdGVyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gICAgaWYgKGZpbHRlckJ1cmdlci5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgZmlsdGVyQnVyZ2VyLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICfQt9Cw0LrRgNGL0YLRjCDRhNC40LvRjNGC0YAnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmlsdGVyQnVyZ2VyLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICfQvtGC0LrRgNGL0YLRjCDRhNC40LvRjNGC0YAnKTtcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGZpbHRlci5mb2N1cygpO1xyXG4gICAgfSwgNjAwKTtcclxufSk7XHJcblxyXG5maWx0ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKGZpbHRlckJ1cmdlci5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgZmlsdGVyQnVyZ2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGZpbHRlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICBmaWx0ZXJCdXJnZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ9C+0YLQutGA0YvRgtGMINGE0LjQu9GM0YLRgCcpOyBcclxuICAgIH1cclxufSlcclxuIiwiY29uc3QgY2hlY2tCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0YWxvZy1jaGVja2JveF9fbGFiZWwsIC5jdXN0b20tY2hlY2tib3hfX3RleHQnKTtcclxuXHJcbmNoZWNrQm94LmZvckVhY2goaXRlbSA9PiB7XHJcblx0aXRlbS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuXHRcdGlmIChlLmNvZGUgPT09ICdFbnRlcicgfHwgZS5jb2RlID09PSAnTnVtcGFkRW50ZXInIHx8IGUuY29kZSA9PT0gJ1NwYWNlJykge1xyXG5cdFx0XHRsZXQgY2hlY2sgPSBlLnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG5cdFx0XHRpZiAoY2hlY2sudHlwZSA9PSAncmFkaW8nKSB7XHJcblx0XHRcdFx0aWYgKGNoZWNrLmNoZWNrZWQgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRjaGVjay5jaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0XHR9IFxyXG5cdFx0XHR9IGVsc2UgaWYgKGNoZWNrLnR5cGUgPT0gJ2NoZWNrYm94Jykge1xyXG5cdFx0XHRcdGlmIChjaGVjay5jaGVja2VkID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0Y2hlY2suY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNoZWNrLmNoZWNrZWQgPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0fSk7XHJcbn0pOyIsImNvbnN0IGNhdGFsb2dQcm9kdWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRhbG9nX193cmFwJyk7XHJcbmNvbnN0IGNhdGFsb2dNb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2dfX21vcmUnKTtcclxuY29uc3QgcHJvZE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXByb2RfX2NvbnRlbnQnKTtcclxuY29uc3QgcHJvZE1vZGFsU2xpZGVyID0gcHJvZE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItbWFpbl9fd3JhcHBlcicpO1xyXG5jb25zdCBwcm9kTW9kYWxQcmV2aWV3ID0gcHJvZE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItbWluX193cmFwcGVyJyk7XHJcbmNvbnN0IHByb2RNb2RhbEluZm8gPSBwcm9kTW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWluZm9fX3dyYXBwZXInKTtcclxuY29uc3QgcHJvZE1vZGFsRGVzY3IgPSBwcm9kTW9kYWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWRlc2NyX190ZXh0Jyk7XHJcbmNvbnN0IHByb2RNb2RhbENoYXJzID0gcHJvZE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jaGFyX19pdGVtcycpO1xyXG5jb25zdCBwcm9kTW9kYWxWaWRlbyA9IHByb2RNb2RhbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdmlkZW8nKTtcclxubGV0IHByb2RRdWFudGl0eSA9IDY7IC8vINC60L7Qu9C40YfQtdGB0YLQstC+INC60LDRgNGC0L7Rh9C10Log0L3QsCDRgdGC0YDQsNC90LjRhtC1INC40LfQvdCw0YfQsNC70YzQvdC+XHJcbmxldCBhZGRRdWFudGl0eSA9IDM7IC8vINC60L7Qu9C40YfQtdGB0YLQstC+INC00L7QsdCw0LLQu9GP0LXQvNGL0YUg0LrQsNGA0YLQvtGH0LXQuiDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyBcItCf0L7QutCw0LfQsNGC0Ywg0LXRidGRXCJcclxuXHJcbi8vINGE0YPQvdC60YbQuNGPINCy0YHRgtCw0LLQu9GP0LXRgiDQv9GA0L7QsdC10Lsg0LzQtdC20LTRgyDRgNCw0LfRgNGP0LTQsNC80LhcclxuY29uc3Qgbm9ybWFsUHJpY2UgPSAoc3RyKSA9PiB7XHJcblx0cmV0dXJuIFN0cmluZyhzdHIpLnJlcGxhY2UoLyhcXGQpKD89KFxcZFxcZFxcZCkrKFteXFxkXXwkKSkvZywgJyQxICcpO1xyXG59O1xyXG5cclxuLy8g0LHQu9C+0LrQuNGA0L7QstCw0L3QuNC1INC60L3QvtC/0L7QuiDQtNC+0LHQsNCy0LvQtdC90LjRjyDQsiDQutC+0YDQt9C40L3Rg1xyXG5jb25zdCBidG5CbG9jayA9ICgpID0+ICB7XHJcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1pbmktY2FydF9faXRlbScpLmZvckVhY2goZWwgPT4ge1xyXG5cdFx0bGV0IGlkID0gZWwuZGF0YXNldC5pZDtcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmFkZC10by1jYXJ0LWJ0bltkYXRhLWlkPVwiJHtpZH1cIl1gKTtcclxuXHRcdFx0aWYgKGJ0bikge1xyXG5cdFx0XHRcdGJ0bi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCAxMDApO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vLyDQtdGB0LvQuCDQtdGB0YLRjCDRgdC70LDQudC00LXRgCDQsiDQvNC+0LTQsNC70YzQvdC+0Lwg0L7QutC90LUgLSDQuNC90LjRhtC40LjRgNC+0LLQsNGC0Ywg0YHQu9Cw0LnQtNC10YDRiyDQsiDRhNGD0L3QutGG0LjQuCBtb2RhbFNsaWRlciDQuCDQvtCx0YrRj9Cy0LvRj9GC0Ywg0L/QvtGB0LvQtSDRgdC+0LfQtNCw0L3QuNGPINC+0LrQvdCwXHJcbi8vINGE0YPQvdC60YbQuNGPINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INGB0LvQsNC50LTQtdGA0LBcclxuY29uc3QgbW9kYWxTbGlkZXIgPSAoKSA9PiB7XHJcblx0Y29uc3QgbWluU2xpZGVyID0gbmV3IFN3aXBlcignLnNsaWRlci1taW4nLCB7XHJcblx0XHRncmFiQ3Vyc29yOiB0cnVlLFxyXG5cdFx0c2xpZGVzUGVyVmlldzogNixcclxuXHRcdGluaXRpYWxTbGlkZTogMCxcclxuXHRcdHNwYWNlQmV0d2VlbjogMjAsXHJcblx0XHRmcmVlTW9kZTogdHJ1ZSxcclxuXHR9KTtcclxuXHRcclxuXHRjb25zdCBtYWluU2xpZGVyID0gbmV3IFN3aXBlcignLnNsaWRlci1tYWluJywge1xyXG5cdFx0Z3JhYkN1cnNvcjogdHJ1ZSxcclxuXHRcdHNwYWNlQmV0d2VlbjogMjAsXHJcblx0XHRzbGlkZXNQZXJWaWV3OiAxLFxyXG5cdFx0aW5pdGlhbFNsaWRlOiAwLFxyXG5cdFx0c2ltdWxhdGVUb3VjaDogZmFsc2UsXHJcblx0XHRlZmZlY3Q6ICdmYWRlJyxcclxuXHRcdGZhZGVFZmZlY3Q6IHtcclxuXHRcdCAgY3Jvc3NGYWRlOiB0cnVlXHJcblx0XHR9LFxyXG5cdFx0dGh1bWJzOiB7XHJcblx0XHRcdHN3aXBlcjogbWluU2xpZGVyLFxyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuaWYgKGNhdGFsb2dQcm9kdWN0cykge1xyXG5cdC8vKiDRhNGD0L3QutGG0LjRjyDRgdC+0LfQtNCw0L3QuNGPINC60LDRgNGC0L7Rh9C10Log0LIg0LrQsNGC0LDQu9C+0LPQtSDRgtC+0LLQsNGA0L7QslxyXG5cdGNvbnN0IGxvYWRQcm9kdWN0cyA9IGFzeW5jIGZ1bmN0aW9uKCkge1xyXG5cdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy4uL2RhdGEvZGF0YS5qc29uJyk7XHJcblx0XHRpZiAocmVzcG9uc2Uub2spIHtcclxuXHRcdFx0bGV0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblx0XHRcdGxldCBkYXRhTGVuZ3RoID0gZGF0YS5sZW5ndGg7XHJcblx0XHRcdGNhdGFsb2dQcm9kdWN0cy5pbm5lckhUTUwgPSAnJztcclxuXHJcblx0XHRcdC8vINGE0YPQvdC60YbQuNGPINGB0YLRgNC+0LjRgiDQutCw0YDRgtC+0YfQutGDINGC0L7QstCw0YDQsFxyXG5cdFx0XHRjb25zdCBpbm5lclByb2QgPSBmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdFx0Y2F0YWxvZ1Byb2R1Y3RzLmlubmVySFRNTCArPSBgXHJcblx0XHRcdFx0XHQ8YXJ0aWNsZSBjbGFzcz1cImNhdGFsb2ctaXRlbVwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2F0YWxvZy1pdGVtX19pbWdcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIiR7aXRlbS5tYWluSW1hZ2V9XCIgbG9hZGluZz1cImxhenlcIiBhbHQ9XCIke2l0ZW0udGl0bGV9XCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNhdGFsb2ctaXRlbV9fYnRuc1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cImNhdGFsb2ctaXRlbV9fYnRuIGJ0bi1yZXNldCBtb2RhbC1idG5cIiBkYXRhLWlkPVwiJHtpdGVtLmlkfVwiIGFyaWEtbGFiZWw9XCLQn9C+0LrQsNC30LDRgtGMINC40L3RhNC+0YDQvNCw0YbQuNGOINC+INGC0L7QstCw0YDQtVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3ZnPjx1c2UgeGxpbms6aHJlZj1cImltZy9zcHJpdGUuc3ZnI3Nob3dcIj48L3VzZT48L3N2Zz5cclxuXHRcdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cImNhdGFsb2ctaXRlbV9fYnRuIGJ0bi1yZXNldCBhZGQtdG8tY2FydC1idG5cIiBkYXRhLWlkPVwiJHtpdGVtLmlkfVwiIGFyaWEtbGFiZWw9XCLQlNC+0LHQsNCy0LjRgtGMINGC0L7QstCw0YAg0LIg0LrQvtGA0LfQuNC90YNcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHN2Zz48dXNlIHhsaW5rOmhyZWY9XCJpbWcvc3ByaXRlLnN2ZyNjYXJ0XCI+PC91c2U+PC9zdmc+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxoMyBjbGFzcz1cImNhdGFsb2ctaXRlbV9fdGl0bGVcIj4ke2l0ZW0udGl0bGV9PC9oMz5cclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJjYXRhbG9nLWl0ZW1fX3ByaWNlXCI+JHtub3JtYWxQcmljZShpdGVtLnByaWNlKX0g0YA8L3NwYW4+XHJcblx0XHRcdFx0XHQ8L2FydGljbGU+XHJcblx0XHRcdFx0YDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8g0YTQvtGA0LzQuNGA0YPQtdC8INGB0LXRgtC60YMg0LjQtyA2INC60LDRgNGC0L7Rh9C10Log0YLQvtCy0LDRgNC+0LIg0L3QsCDRgdGC0YDQsNC90LjRhtC1ICg2IC0g0Y3RgtC+INGH0LjRgdC70L4gcHJvZFF1YW50aXR5KVxyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFMZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmIChpIDwgcHJvZFF1YW50aXR5KSB7XHJcblx0XHRcdFx0bGV0IGl0ZW1Qcm9kID0gZGF0YVtpXTtcclxuXHRcdFx0XHRcdGlubmVyUHJvZChpdGVtUHJvZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdC8vINGE0YPQvdC60YbQuNGPINC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwXHJcblx0XHRcdC8vIGJpbmRNb2RhbChsb2FkTW9kYWxEYXRhKTtcclxuXHJcblxyXG5cdFx0XHQvLyDQtNC10LvQsNC10Lwg0LLQuNC00LjQvNGL0LzQuCDQutC90L7Qv9C60Lgg0YLQvtCy0LDRgNCwINC/0YDQuCDRhNC+0LrRg9GB0LUgKNC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC+0L3QuCDRgdC60YDRi9GC0YspXHJcblx0XHRcdGNvbnN0IHByb2R1Y3RzQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRhbG9nLWl0ZW1fX2J0bicpO1xyXG5cdFx0XHRwcm9kdWN0c0J0bnMuZm9yRWFjaChlbCA9PiB7XHJcblx0XHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoZSkgPT4ge1xyXG5cdFx0XHRcdFx0bGV0IHBhcmVudCA9IGUuY3VycmVudFRhcmdldC5jbG9zZXN0KCcuY2F0YWxvZy1pdGVtX19idG5zJyk7XHJcblx0XHRcdFx0XHRwYXJlbnQuY2xhc3NMaXN0LmFkZCgnY2F0YWxvZy1pdGVtX19idG5zLS1mb2N1cycpO1xyXG5cdFx0XHRcdH0sIHRydWUpO1xyXG5cdCAgXHJcblx0XHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChlKSA9PiB7XHJcblx0XHRcdFx0XHRsZXQgcGFyZW50ID0gZS5jdXJyZW50VGFyZ2V0LmNsb3Nlc3QoJy5jYXRhbG9nLWl0ZW1fX2J0bnMnKTtcclxuXHRcdFx0XHRcdHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdjYXRhbG9nLWl0ZW1fX2J0bnMtLWZvY3VzJyk7XHJcblx0XHRcdFx0fSwgdHJ1ZSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8g0LTQvtCx0LDQstC70LXQvdC40LUg0LrQsNGA0YLQvtGH0LXQuiDRgtC+0LLQsNGA0LAg0L/RgNC4INC90LDQttCw0YLQuNC4INC60L3QvtC/0LrQuCBcItC/0L7QutCw0LfQsNGC0Ywg0LXRidC1XCJcclxuXHRcdFx0Y2F0YWxvZ01vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0bGV0IGEgPSBwcm9kUXVhbnRpdHk7XHJcblx0XHRcdFx0cHJvZFF1YW50aXR5ID0gcHJvZFF1YW50aXR5ICsgYWRkUXVhbnRpdHk7XHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IGE7IGkgPCBkYXRhTGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdGlmIChpIDwgcHJvZFF1YW50aXR5KSB7XHJcblx0XHRcdFx0XHRsZXQgaXRlbVByb2QgPSBkYXRhW2ldO1xyXG5cdFx0XHRcdFx0XHRpbm5lclByb2QoaXRlbVByb2QpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAocHJvZFF1YW50aXR5ID49IGRhdGFMZW5ndGgpIHtcclxuXHRcdFx0XHRcdGNhdGFsb2dNb3JlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNhdGFsb2dNb3JlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0YnRuQmxvY2soKTsgLy8g0LHQu9C+0LrQuNGA0L7QstCw0L3QuNC1INC60L3QvtC/0L7QuiDQtNC+0LHQsNCy0LvQtdC90LjRjyDQsiDQutC+0YDQt9C40L3Rg1xyXG5cclxuXHRcdFx0XHQvLyDQv9GA0Lgg0LTQvtCx0LDQstC70LXQvdC40Lgg0L3QvtCy0YvRhSDRgtC+0LLQsNGA0L7QsiDQv9C10YDQtdC30LDQv9GD0YHQutCw0LXRgtGB0Y8g0YTRg9C90LrRhtC40Y8g0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuXHRcdFx0XHQvLyBiaW5kTW9kYWwobG9hZE1vZGFsRGF0YSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCgnZXJyb3InLCByZXNwb25zZS5zdGF0dXMpKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRsb2FkUHJvZHVjdHMoKTtcclxuXHJcblx0Ly8qINC+0YLQutGA0YvRgtC40LUg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LBcclxuXHQvL3RvZG8gLSDQtNC+0LHQsNCy0LjRgtGMINCw0YDQs9GD0LzQtdC90YIgZnVuYyDQsiDRhNGD0L3QutGG0LjRjiBvcGVuTW9kYWwoZnVuYylcclxuXHQvL3RvZG8gLSDQstGB0YLQsNCy0LjRgtGMINGN0YLQvtGCINC60L7QtCDQsiDRhNGD0L3QutGG0LjRjiBvcGVuTW9kYWwgKNC80L7QtNCw0LvRjNC90L7QtSDQvtC60L3Qvikg0LIg0LzQvtC80LXQvdGCINC+0YLQutGA0YvRgtC40Y8g0L7QutC90LAgKNC/0L7RgdC70LUgZGlzYWJsZVNjcm9sbClcclxuXHQvLyDQv9C+0LvRg9GH0LXQvdC40LUgaWQg0LrQvdC+0L/QutC4XHJcblx0Ly8gaWYgKG1vZGFsQ29udGVudC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsLXByb2QnKSkge1xyXG5cdC8vIFx0bGV0IG9wZW5CdG5JZCA9IGxhc3RGb2N1cy5kYXRhc2V0LmlkO1xyXG5cdC8vIFx0ZnVuYyhvcGVuQnRuSWQpO1xyXG5cdC8vIH1cclxuXHRjYXRhbG9nUHJvZHVjdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb2RhbC1idG4nKSkge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdG1vZGFsQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1wcm9kJyk7XHJcblx0XHRcdG9wZW5Nb2RhbChsb2FkTW9kYWxEYXRhKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8qINGE0YPQvdC60YbQuNGPINGB0L7Qt9C00LDQvdC40Y8g0L7QutC90LAg0YLQvtCy0LDRgNCwXHJcblx0Y29uc3QgbG9hZE1vZGFsRGF0YSA9IGFzeW5jIGZ1bmN0aW9uKGlkID0gMSkge1xyXG5cdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy4uL2RhdGEvZGF0YS5qc29uJyk7XHJcblx0XHRpZiAocmVzcG9uc2Uub2spIHtcclxuXHRcdFx0bGV0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblx0XHRcdC8vINC+0YfQuNGJ0LDQtdC8INCx0LvQvtC60LhcclxuXHRcdFx0cHJvZE1vZGFsU2xpZGVyLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0XHRwcm9kTW9kYWxQcmV2aWV3LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0XHRwcm9kTW9kYWxJbmZvLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0XHRwcm9kTW9kYWxEZXNjci50ZXh0Q29udGVudCA9ICcnO1xyXG5cdFx0XHRwcm9kTW9kYWxDaGFycy5pbm5lckhUTUwgPSAnJztcclxuXHRcdFx0cHJvZE1vZGFsVmlkZW8uaW5uZXJIVE1MID0gJyc7XHJcblx0XHRcdHByb2RNb2RhbFZpZGVvLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG5cdFx0XHRmb3IgKGxldCBkYXRhSXRlbSBvZiBkYXRhKSB7XHJcblx0XHRcdFx0aWYgKGRhdGFJdGVtLmlkID09IGlkKSB7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vINCh0LvQsNC50LTQtdGAINGBINGE0L7RgtC+INGC0L7QstCw0YDQsFxyXG5cdFx0XHRcdFx0Y29uc3QgcHJldmlldyA9IGRhdGFJdGVtLmdhbGxlcnkubWFwKChpbWFnZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYFxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJzbGlkZXItbWluX19pdGVtIHN3aXBlci1zbGlkZVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCIke2ltYWdlfVwiIGFsdD1cItC40LfQvtCx0YDQsNC20LXQvdC40LVcIj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0YDtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0Y29uc3Qgc2xpZGVzID0gZGF0YUl0ZW0uZ2FsbGVyeS5tYXAoKGltYWdlKSA9PiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBgXHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInNsaWRlci1tYWluX19pdGVtIHN3aXBlci1zbGlkZVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCIke2ltYWdlfVwiIGFsdD1cItC40LfQvtCx0YDQsNC20LXQvdC40LVcIj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0YDtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdHByb2RNb2RhbFByZXZpZXcuaW5uZXJIVE1MID0gcHJldmlldy5qb2luKCcnKTtcclxuXHRcdFx0XHRcdHByb2RNb2RhbFNsaWRlci5pbm5lckhUTUwgPSBzbGlkZXMuam9pbignJyk7XHJcblxyXG5cdFx0XHRcdFx0Ly8g0JjQvdGE0L7RgNC80LDRhtC40Y8g0L4g0YLQvtCy0LDRgNC1XHJcblx0XHRcdFx0XHRjb25zdCBzaXplcyA9IGRhdGFJdGVtLnNpemVzLm1hcCgoc2l6ZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYFxyXG5cdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cIm1vZGFsLWluZm9fX2l0ZW0tc2l6ZVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cImJ0bi1yZXNldCBtb2RhbC1pbmZvX19zaXplXCI+JHtzaXplfTwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdGA7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRwcm9kTW9kYWxJbmZvLmlubmVySFRNTCA9IGBcclxuXHRcdFx0XHRcdFx0PGgzIGNsYXNzPVwibW9kYWwtaW5mb19fdGl0bGVcIj4ke2RhdGFJdGVtLnRpdGxlfTwvaDM+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1pbmZvX19yYXRlXCI+XHJcblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvc3Rhci5zdmdcIiBhbHQ9XCLQoNC10LnRgtC40L3QsyA1INC40LcgNVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL3N0YXIuc3ZnXCIgYWx0PVwiXCI+XHJcblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCJpbWcvc3Rhci5zdmdcIiBhbHQ9XCJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cImltZy9zdGFyLnN2Z1wiIGFsdD1cIlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiaW1nL3N0YXIuc3ZnXCIgYWx0PVwiXCI+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtaW5mb19fc2l6ZXNcIj5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIm1vZGFsLWluZm9fX3N1YnRpdGxlXCI+0JLRi9Cx0LXRgNC40YLQtSDRgNCw0LfQvNC10YA8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PHVsIGNsYXNzPVwibW9kYWwtaW5mb19fc2l6ZXMtbGlzdCBsaXN0LXJlc2V0XCI+XHJcblx0XHRcdFx0XHRcdFx0XHQke3NpemVzLmpvaW4oJycpfVxyXG5cdFx0XHRcdFx0XHRcdDwvdWw+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtaW5mb19fcHJpY2VcIj5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIm1vZGFsLWluZm9fX2N1cnJlbnQtcHJpY2VcIj4ke2RhdGFJdGVtLnByaWNlfSDRgDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIm1vZGFsLWluZm9fX29sZC1wcmljZVwiPiR7ZGF0YUl0ZW0ub2xkUHJpY2UgPyBkYXRhSXRlbS5vbGRQcmljZSArICcg0YAnIDogJyd9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdCAgYDtcclxuXHJcblx0XHRcdFx0XHQvLyDQntC/0LjRgdCw0L3QuNC1XHJcblx0XHRcdFx0XHRwcm9kTW9kYWxEZXNjci50ZXh0Q29udGVudCA9IGRhdGFJdGVtLmRlc2NyaXB0aW9uO1xyXG5cclxuXHRcdFx0XHRcdC8vINCl0LDRgNCw0LrRgtC10YDQuNGB0YLQuNC60LhcclxuXHRcdFx0XHRcdGxldCBjaGFyc0l0ZW1zID0gJyc7XHJcblxyXG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoZGF0YUl0ZW0uY2hhcnMpLmZvckVhY2goZnVuY3Rpb24gZWFjaEtleShrZXkpIHtcclxuXHRcdFx0XHRcdFx0Y2hhcnNJdGVtcyArPSBgPHAgY2xhc3M9XCJtb2RhbC1jaGFyX19pdGVtXCI+JHtrZXl9OiAke2RhdGFJdGVtLmNoYXJzW2tleV19PC9wPmBcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0cHJvZE1vZGFsQ2hhcnMuaW5uZXJIVE1MID0gY2hhcnNJdGVtcztcclxuXHJcblx0XHRcdFx0XHQvLyDQktC40LTQtdC+XHJcblx0XHRcdFx0XHRpZiAoZGF0YUl0ZW0udmlkZW8pIHtcclxuXHRcdFx0XHRcdFx0cHJvZE1vZGFsVmlkZW8uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0XHRcdFx0XHRcdHByb2RNb2RhbFZpZGVvLmlubmVySFRNTCA9IGBcclxuXHRcdFx0XHRcdFx0XHQ8aWZyYW1lIHNyYz1cIiR7ZGF0YUl0ZW0udmlkZW99XCJcclxuXHRcdFx0XHRcdFx0XHRhbGxvdz1cImFjY2VsZXJvbWV0ZXI7IGF1dG9wbGF5OyBjbGlwYm9hcmQtd3JpdGU7IGVuY3J5cHRlZC1tZWRpYTsgZ3lyb3Njb3BlOyBwaWN0dXJlLWluLXBpY3R1cmVcIlxyXG5cdFx0XHRcdFx0XHRcdGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT5cclxuXHRcdFx0XHRcdFx0YDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0bW9kYWxTbGlkZXIoKTtcclxuXHJcblx0XHRcdGxldCBidG5jYXJ0UHJvZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hZGQtdG8tY2FydC1idG5bZGF0YS1pZD1cIiR7aWR9XCJdYCk7XHJcblx0XHRcdGxldCBidG5PcmRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1pbmZvX19vcmRlcicpO1xyXG5cdFx0XHQvLyDQv9GA0Lgg0L7RgtC60YDRi9GC0LjQuCDQvtC60L3QsCDQv9C10YDQtdC00LDQtdC8INC60L3QvtC/0LrQtSBpZFxyXG5cdFx0XHRidG5PcmRlci5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGAke2lkfWApO1xyXG5cdFx0XHQvLyDQvtGC0LrQu9GO0YfQsNC10Lwg0LrQvdC+0L/QutGDLCDQtdGB0LvQuCDRgyDQutCw0YDRgtC+0YfQutC4INGC0L7QstCw0YDQsCDQvtC90LAg0L7RgtC60LvRjtGH0LXQvdCwXHJcblx0XHRcdGlmKGJ0bmNhcnRQcm9kLmRpc2FibGVkKSB7XHJcblx0XHRcdFx0YnRuT3JkZXIuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRidG5PcmRlci5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLmxvZygoJ2Vycm9yJywgcmVzcG9uc2Uuc3RhdHVzKSk7XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8vKiDQv9C+INGC0LDRh9GDINC/0L7Rj9Cy0LvRj9GO0YLRgdGPINC60L3QvtC/0LrQuCDRgtC+0LLQsNGA0LBcclxuXHRsZXQgaXNPcGVuID0gZmFsc2U7XHJcblx0Y2F0YWxvZ1Byb2R1Y3RzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0aWYgKGUudGFyZ2V0LmNsb3Nlc3QoJy5jYXRhbG9nLWl0ZW1fX2ltZycpKSB7XHJcblx0XHRcdGxldCBidG5zID0gZS50YXJnZXQuY2xvc2VzdCgnLmNhdGFsb2ctaXRlbV9fYnRucycpO1xyXG5cdFx0XHRsZXQgYnRuID0gYnRucy5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0YWxvZy1pdGVtX19idG4nKTtcclxuXHRcdFx0aWYgKCFpc09wZW4pIHtcclxuXHRcdFx0XHRidG5zLmNsYXNzTGlzdC5hZGQoJ2NhdGFsb2ctaXRlbV9fYnRucy0tdG91Y2gnKTtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdGJ0bi5mb3JFYWNoKGVsID0+IHtcclxuXHRcdFx0XHRcdFx0ZWwuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sIDEwMCk7XHJcblx0XHRcdFx0aXNPcGVuID0gdHJ1ZTtcclxuXHRcdCBcdH0gZWxzZSBpZiAoaXNPcGVuICYmICFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhdGFsb2ctaXRlbV9fYnRuJykgJiYgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXRvLWNhcnQtYnRuJykpIHtcclxuXHRcdFx0XHRidG5zLmNsYXNzTGlzdC5yZW1vdmUoJ2NhdGFsb2ctaXRlbV9fYnRucy0tdG91Y2gnKTtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdGJ0bi5mb3JFYWNoKGVsID0+IHtcclxuXHRcdFx0XHRcdFx0ZWwuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sIDEwMCk7XHJcblx0XHRcdFx0aXNPcGVuID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcbn0iLCIvLyog0YDQsNCx0L7RgtCwINC80LjQvdC4LdC60L7RgNC30LjQvdGLXHJcbmNvbnN0IG1pbmlDYXJ0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5taW5pLWNhcnRfX2xpc3QnKTtcclxuY29uc3QgZnVsbFByaWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pbmktY2FydF9fc3VtbScpO1xyXG5jb25zdCBjYXJ0Q291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FydF9fY291bnQnKTtcclxuXHJcbi8vINGE0YPQvdC60YbQuNGPINGD0LTQsNC70Y/QtdGCINC/0YDQvtCx0LXQuyDQvNC10LbQtNGDINGA0LDQt9GA0Y/QtNCw0LzQuFxyXG5jb25zdCBwcmljZVdpdGhvdXRTcGFjZXMgPSAoc3RyKSA9PiB7XHJcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMvZywgJycpO1xyXG59O1xyXG4vLyDRhNGD0L3QutGG0LjRjyDRgdC+0LfQtNCw0LXRgiDQtdC00LjQvdC40YbRgyDRgtC+0LLQsNGA0LAg0LIg0LrQvtGA0LfQuNC90LVcclxuY29uc3QgY3JlYXRlQ2FydCA9IGFzeW5jIGZ1bmN0aW9uKGlkU2VsZWN0b3IsIHByaWNlU2VsZWN0b3IpIHtcclxuXHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnLi4vZGF0YS9kYXRhLmpzb24nKTtcclxuXHRpZiAocmVzcG9uc2Uub2spIHtcclxuXHRcdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0Zm9yIChsZXQgZGF0YUl0ZW0gb2YgZGF0YSkge1xyXG5cdFx0XHRpZiAoZGF0YUl0ZW0uaWQgPT0gaWRTZWxlY3Rvcikge1xyXG5cdFx0XHRcdG1pbmlDYXJ0TGlzdC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBgXHJcblx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJtaW5pLWNhcnRfX2l0ZW1cIiBkYXRhLWlkPVwiJHtkYXRhSXRlbS5pZH1cIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1pbmktY2FydF9faW1hZ2VcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz1cIiR7ZGF0YUl0ZW0ubWFpbkltYWdlfVwiIGFsdD1cIiR7ZGF0YUl0ZW0udGl0bGV9XCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtaW5pLWNhcnRfX2NvbnRlbnRcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aDMgY2xhc3M9XCJtaW5pLWNhcnRfX3RpdGxlXCI+JHtkYXRhSXRlbS50aXRsZX08L2gzPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwibWluaS1jYXJ0X19wcmljZVwiPiR7bm9ybWFsUHJpY2UoZGF0YUl0ZW0ucHJpY2UpfSBwPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cIm1pbmktY2FydF9fZGVsZXRlIGJ0bi1yZXNldFwiPjwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRgKTtcclxuXHRcdFx0XHQvLyDQv9GA0LjQsdCw0LLQu9GP0LXQvCDRhtC10L3RgyDRgtC+0LLQsNGA0LAg0Log0L7QsdGJ0LXQuSDRgdGD0LzQvNC1INC4INCy0YvQstC+0LTQuNC8INC+0LHRidGD0Y4g0YHRg9C80LzRg1xyXG5cdFx0XHRcdHByaWNlU2VsZWN0b3IgKz0gZGF0YUl0ZW0ucHJpY2U7XHJcblx0XHRcdFx0ZnVsbFByaWNlLnRleHRDb250ZW50ID0gYCR7bm9ybWFsUHJpY2UocHJpY2VTZWxlY3Rvcil9INGAYDtcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHQvLyDQv9C+0LvRg9GH0LDQtdC8INC60L7Qu9C40YfQtdGB0YLQstC+INGC0L7QstCw0YDQsCwg0LTQvtCx0LDQstC70Y/QtdC8INC10LPQviDQsiDQv9C+0LrQsNC30LDQtdC70Ywg0LrQvtC70LjRh9C10YHRgtCy0LAg0Lgg0LTQtdC70LDQtdC8INCw0LrRgtC40LLQvdGL0Lwg0LrRgNGD0LbQvtGH0LXQuiDRgSDQutC+0LvQuNGH0LXRgdGC0LLQvtC8XHJcblx0XHRsZXQgbnVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1pbmktY2FydF9faXRlbScpLmxlbmd0aDtcclxuXHRcdGlmIChudW0gPiAwKSB7XHJcblx0XHRcdGNhcnRDb3VudC5jbGFzc0xpc3QuYWRkKCdjYXJ0X19jb3VudC0tYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0XHRjYXJ0Q291bnQudGV4dENvbnRlbnQgPSBudW07XHJcblx0XHQvLyDQtNC10LvQsNC10Lwg0LfQvdCw0YfQtdC6INC60L7RgNC30LjQvdGLINC00L7RgdGC0YPQv9C90YvQvCDQtNC70Y8g0LrQu9C40LrQsFxyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnQnKS5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcblx0XHR1cGRhdGVTdG9yYWdlKCk7XHJcblx0fSAgZWxzZSB7XHJcblx0XHRjb25zb2xlLmxvZygoJ2Vycm9yJywgcmVzcG9uc2Uuc3RhdHVzKSk7XHJcblx0fVxyXG59XHJcbi8vINC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQvdCwINC60L3QvtC/0LrRgyBcItC00L7QsdCw0LLQuNGC0Ywg0LIg0LrQvtGA0LfQuNC90YNcIiAtINGC0L7QstCw0YAg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDQsiDQutC+0YDQt9C40L3Rg1xyXG5jYXRhbG9nUHJvZHVjdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG5cdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC10by1jYXJ0LWJ0bicpKSB7XHJcblx0XHRsZXQgaWQgPSBlLnRhcmdldC5kYXRhc2V0LmlkO1xyXG5cdFx0bGV0IHByaWNlID0gcGFyc2VJbnQocHJpY2VXaXRob3V0U3BhY2VzKGZ1bGxQcmljZS50ZXh0Q29udGVudCkpO1xyXG5cdFx0Y3JlYXRlQ2FydChpZCwgcHJpY2UpO1xyXG5cdFx0Ly8g0LfQvdCw0Log0LTQvtCx0LDQstC70LXQvdC40Y8g0LIg0LrQvtGA0LfQuNC90YMg0L3QsCDRgtC+0LLQsNGA0LUg0LTQtdC70LDQtdC8INC90LXQtNC+0YHRgtGD0L/QvdGL0LxcclxuXHRcdGUudGFyZ2V0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcblx0XHQvLyB1cGRhdGVTdG9yYWdlKCk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8vINC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQvdCwINC60L3QvtC/0LrRgyBcItC30LDQutCw0LfQsNGC0YxcIiDQsiDQvNC+0LTQsNC70YzQvdC+0Lwg0L7QutC90LUg0LrQvtGA0LfQuNC90YsgLSDRgtC+0LLQsNGAINC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0LIg0LrQvtGA0LfQuNC90YNcclxucHJvZE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuXHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb2RhbC1pbmZvX19vcmRlcicpKSB7XHJcblx0XHRsZXQgaWQgPSBlLnRhcmdldC5kYXRhc2V0LmlkO1x0XHJcblx0XHRsZXQgcHJpY2UgPSBwYXJzZUludChwcmljZVdpdGhvdXRTcGFjZXMoZnVsbFByaWNlLnRleHRDb250ZW50KSk7XHJcblx0XHRjcmVhdGVDYXJ0KGlkLCBwcmljZSk7XHJcblx0XHQvLyDQutC90L7Qv9C60YMg0LTQvtCx0LDQstC70LXQvdC40Y8g0LIg0LrQvtGA0LfQuNC90YMg0L3QsCDRgtC+0LLQsNGA0LUg0LTQtdC70LDQtdC8INC90LXQtNC+0YHRgtGD0L/QvdGL0LxcclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hZGQtdG8tY2FydC1idG5bZGF0YS1pZD1cIiR7aWR9XCJdYCkuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuXHRcdGUudGFyZ2V0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcblx0fVxyXG59KTtcclxuXHJcbm1pbmlDYXJ0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcblx0bGV0IHByaWNlID0gcGFyc2VJbnQocHJpY2VXaXRob3V0U3BhY2VzKGZ1bGxQcmljZS50ZXh0Q29udGVudCkpO1xyXG5cdC8vINC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDIFwi0YPQtNCw0LvQuNGC0Ywg0YLQvtCy0LDRgCDQuNC3INC60L7RgNC30LjQvdGLXCIg0YPQtNCw0LvRj9C10Lwg0LXQtNC40L3QuNGG0YMg0YLQvtCy0LDRgNCwLCDQvNC10L3Rj9C10Lwg0YHRg9C80LzRgyDQuCDQutC+0LvQuNGH0LXRgdGC0LLQvlxyXG5cdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21pbmktY2FydF9fZGVsZXRlJykpIHtcclxuXHRcdGNvbnN0IHNlbGYgPSBlLnRhcmdldDtcclxuXHRcdGNvbnN0IHBhcmVudCA9IHNlbGYuY2xvc2VzdCgnLm1pbmktY2FydF9faXRlbScpO1xyXG5cdFx0bGV0IHByaWNlRGVsID0gcGFyc2VJbnQocHJpY2VXaXRob3V0U3BhY2VzKHBhcmVudC5xdWVyeVNlbGVjdG9yKCcubWluaS1jYXJ0X19wcmljZScpLnRleHRDb250ZW50KSk7XHJcblx0XHRjb25zdCBpZCA9IHBhcmVudC5kYXRhc2V0LmlkO1xyXG5cdFx0bGV0IGJ0blByb2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYWRkLXRvLWNhcnQtYnRuW2RhdGEtaWQ9XCIke2lkfVwiXWApO1xyXG5cdFx0aWYgKGJ0blByb2QpIHtcclxuXHRcdFx0YnRuUHJvZC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcblx0XHR9XHJcblx0XHRwYXJlbnQucmVtb3ZlKCk7XHJcblxyXG5cdFx0cHJpY2UgLT0gcHJpY2VEZWw7XHJcblx0XHRmdWxsUHJpY2UudGV4dENvbnRlbnQgPSBgJHtub3JtYWxQcmljZShwcmljZSl9INGAYDtcclxuXHJcblx0XHQvLyDQtdGB0LvQuCDRgtC+0LLQsNGA0L7QsiDQsiDQutC+0YDQt9C40L3QtSDQvdC10YI6XHJcblx0XHQvLyDQt9Cw0LrRgNGL0LLQsNC10Lwg0L7QutC90L4g0LrQvtGA0LfQuNC90YssINC00LXQu9Cw0LXQvCDQt9C90LDRh9C10Log0LrQvtGA0LfQuNC90Ysg0L3QtdC00L7RgdGC0YPQv9C90YvQvCwg0YPQsdC40YDQsNC10Lwg0LrRgNGD0LbQtdC6INC60L7Qu9C40YfQtdGB0YLQstCwXHJcblx0XHRsZXQgbnVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1pbmktY2FydF9fbGlzdCAubWluaS1jYXJ0X19pdGVtJykubGVuZ3RoO1xyXG5cdFx0aWYgKG51bSA9PSAwKSB7XHJcblx0XHRcdGNhcnRDb3VudC5jbGFzc0xpc3QucmVtb3ZlKCdjYXJ0X19jb3VudC0tYWN0aXZlJyk7XHJcblx0XHRcdG1pbmlDYXJ0LmNsYXNzTGlzdC5yZW1vdmUoJ21pbmktY2FydC0tb3BlbicpO1xyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FydCcpLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcblx0XHR9XHJcblx0XHRjYXJ0Q291bnQudGV4dENvbnRlbnQgPSBudW07XHJcblxyXG5cdFx0dXBkYXRlU3RvcmFnZSgpO1xyXG5cclxuXHR9IGVsc2UgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoJy5taW5pLWNhcnRfX2l0ZW0nKSkge1xyXG5cdFx0Ly8g0LLRi9C00LXQu9GP0LXQvCDRgtC+0LLQsNGA0Ysg0LIg0LrQvtGA0LfQuNC90LUg0L/RgNC4INC60LvQuNC60LUg0L3QsCDQvdC40YVcclxuXHRcdGNvbnN0IHBhcmVudCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5taW5pLWNhcnRfX2l0ZW0nKTtcclxuXHRcdGNvbnN0IGNhcnRJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5taW5pLWNhcnRfX2xpc3QgLm1pbmktY2FydF9faXRlbScpO1xyXG5cdFx0Y2FydEl0ZW1zLmZvckVhY2goYnRuID0+IHtcclxuXHRcdFx0aWYgKCFidG4uY29udGFpbnMoZS50YXJnZXQpKSB7XHJcblx0XHRcdFx0YnRuLmNsYXNzTGlzdC5yZW1vdmUoJ21pbmktY2FydF9faXRlbS0tYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1x0XHJcblxyXG5cdFx0cGFyZW50LmNsYXNzTGlzdC5hZGQoJ21pbmktY2FydF9faXRlbS0tYWN0aXZlJyk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8vKiDRgNCw0LHQvtGC0LAg0LrQvtGA0LfQuNC90Ysg0LIg0LzQvtC00LDQu9GM0L3QvtC8INC+0LrQvdC1XHJcbmNvbnN0IG9wZW5PcmRlck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pbmktY2FydF9fYnRuJyk7XHJcbmNvbnN0IG9yZGVyTW9kYWxMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWNhcnQtb3JkZXJfX2xpc3QnKTtcclxuY29uc3Qgb3JkZXJNb2RhbFF1YW50aXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWNhcnQtb3JkZXJfX3F1YW50aXR5IHNwYW4nKTtcclxuY29uc3Qgb3JkZXJNb2RhbFN1bW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY2FydC1vcmRlcl9fc3VtbSBzcGFuJyk7XHJcbmNvbnN0IG9yZGVyTW9kYWxTaG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWNhcnQtb3JkZXJfX3Nob3cnKTtcclxuXHJcblxyXG4vLyDQv9GA0Lgg0LrQu9C40LrQtSDQvdCwINC60L3QvtC/0LrRgyBcItC/0LXRgNC10LnRgtC4INCyINC60L7RgNC30LjQvdGDXCIg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+INC60L7RgNC30LjQvdGLINC30LDQv9C+0LvQvdGP0LXRgtGB0Y8g0YLQvtCy0LDRgNC+0Lwg0LjQtyDQvNC40L3QuC3QutC+0YDQt9C40L3Ri1xyXG4vLyDQt9Cw0L/QvtC70L3Rj9GO0YLRgdGPINGB0YPQvNC80LAg0Lgg0LrQvtC70LjRh9C10YHRgtCy0L4g0LjQtyDQvNC40L3QuC3QutC+0YDQt9C40L3Ri1xyXG5vcGVuT3JkZXJNb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHRjb25zdCBwcm9kdWN0c01pbmlDYXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1pbmktY2FydF9faXRlbScpO1xyXG5cdGNvbnN0IHByb2R1Y3RzUXVhbnRpdHkgPSBwcm9kdWN0c01pbmlDYXJ0Lmxlbmd0aDtcclxuXHRvcmRlck1vZGFsTGlzdC5pbm5lckhUTUwgPSAnJztcclxuXHRwcm9kdWN0c01pbmlDYXJ0LmZvckVhY2goZWwgPT4ge1xyXG5cdFx0bGV0IHByb2R1Y3RJZCA9IGVsLmRhdGFzZXQuaWQ7XHJcblx0XHRtb2RhbENhcnRMb2FkKHByb2R1Y3RJZCk7XHJcblx0fSk7XHJcblxyXG5cdC8vINC30LDQutGA0YvQstCw0YLRjCDRgdC/0LjRgdC+0Log0YLQvtCy0LDRgNC+0LIg0L/RgNC4INC+0YLQutGA0YvRgtC40Lgg0L7QutC90LAg0LrQvtGA0LfQuNC90YtcclxuXHRpZiAob3JkZXJNb2RhbExpc3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb2RhbC1jYXJ0LW9yZGVyX19saXN0LS1vcGVuJykpIHtcclxuXHRcdG9yZGVyTW9kYWxTaG93LmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLWNhcnQtb3JkZXJfX3Nob3ctLWFjdGl2ZScpO1xyXG5cdFx0b3JkZXJNb2RhbExpc3QuY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWwtY2FydC1vcmRlcl9fbGlzdC0tb3BlbicpO1xyXG5cdFx0b3JkZXJNb2RhbExpc3Quc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8vINC40LvQuCDRg9Cy0LXQu9C40YfQuNCy0LDRgtGMIG1heEhlaWdodCAtINC10YHQu9C4INGB0L/QuNGB0L7QuiDQtNC+0LvQttC10L0g0L7RgdGC0LDQstCw0YLRjNGB0Y8g0LfQsNC60YDRi9GC0YvQvFxyXG5cdC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdC8vIFx0aWYgKG9yZGVyTW9kYWxMaXN0LmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwtY2FydC1vcmRlcl9fbGlzdC0tb3BlbicpKSB7XHJcblx0Ly8gXHRcdG9yZGVyTW9kYWxMaXN0LnN0eWxlLm1heEhlaWdodCA9IG9yZGVyTW9kYWxMaXN0LnNjcm9sbEhlaWdodCArICdweCc7XHJcblx0Ly8gXHR9XHJcblx0Ly8gfSwgMTAwKTtcclxuXHJcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWNhcnQtZm9ybV9fc3VibWl0JykucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuXHJcblx0b3JkZXJNb2RhbFF1YW50aXR5LnRleHRDb250ZW50ID0gYCR7cHJvZHVjdHNRdWFudGl0eX0g0YjRgmA7XHJcblx0b3JkZXJNb2RhbFN1bW0udGV4dENvbnRlbnQgPSBmdWxsUHJpY2UudGV4dENvbnRlbnQ7XHJcblxyXG59KTtcclxuXHJcbi8vINC60L3QvtC/0LrQsCDQvtGC0LrRgNGL0YLQuNGPLdC30LDQutGA0YvRgtC40Y8g0YHQv9C40YHQutCwINGC0L7QstCw0YDQvtCyINCyINC60L7RgNC30LjQvdC1XHJcbm9yZGVyTW9kYWxTaG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdGlmIChvcmRlck1vZGFsTGlzdC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsLWNhcnQtb3JkZXJfX2xpc3QtLW9wZW4nKSkge1xyXG5cdFx0b3JkZXJNb2RhbFNob3cuY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWwtY2FydC1vcmRlcl9fc2hvdy0tYWN0aXZlJyk7XHJcblx0XHRvcmRlck1vZGFsTGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC1jYXJ0LW9yZGVyX19saXN0LS1vcGVuJyk7XHJcblx0XHRvcmRlck1vZGFsTGlzdC5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRvcmRlck1vZGFsU2hvdy5jbGFzc0xpc3QuYWRkKCdtb2RhbC1jYXJ0LW9yZGVyX19zaG93LS1hY3RpdmUnKTtcclxuXHRcdG9yZGVyTW9kYWxMaXN0LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNhcnQtb3JkZXJfX2xpc3QtLW9wZW4nKTtcclxuXHRcdG9yZGVyTW9kYWxMaXN0LnN0eWxlLm1heEhlaWdodCA9IG9yZGVyTW9kYWxMaXN0LnNjcm9sbEhlaWdodCArICdweCc7XHJcblx0fVxyXG59KTtcclxuXHJcbi8vINGD0LTQsNC70LXQvdC40LUg0YLQvtCy0LDRgNC+0LIg0LjQtyDQvtC60L3QsCDQutC+0YDQt9C40L3Ri1xyXG5vcmRlck1vZGFsTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcblx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwtY2FydC1wcm9kdWN0X19kZWxldGUnKSkge1xyXG5cdFx0Y29uc3Qgc2VsZiA9IGUudGFyZ2V0O1xyXG5cdFx0Y29uc3QgcGFyZW50ID0gc2VsZi5jbG9zZXN0KCcubW9kYWwtY2FydC1wcm9kdWN0Jyk7XHJcblx0XHRjb25zdCBwcmljZUl0cm0gPSBwYXJzZUludChwcmljZVdpdGhvdXRTcGFjZXMocGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jYXJ0LXByb2R1Y3RfX3ByaWNlJykudGV4dENvbnRlbnQpKTtcclxuXHRcdGxldCBwcmlzZUZ1bGwgPSBwYXJzZUludChwcmljZVdpdGhvdXRTcGFjZXMoZnVsbFByaWNlLnRleHRDb250ZW50KSk7XHJcblx0XHRjb25zdCBpZCA9IHBhcmVudC5kYXRhc2V0LmlkO1xyXG5cdFx0XHJcblx0XHRwYXJlbnQuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRwYXJlbnQuc3R5bGUubWFyZ2luQm90dG9tID0gJzBweCc7XHJcblx0XHRcdHBhcmVudC5zdHlsZS5tYXhIZWlnaHQgPSAnMHB4JztcclxuXHRcdFx0b3JkZXJNb2RhbExpc3Quc3R5bGUubWF4SGVpZ2h0ID0gb3JkZXJNb2RhbExpc3Quc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcclxuXHRcdH0sIDEwMCk7XHJcblxyXG5cclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5taW5pLWNhcnRfX2l0ZW1bZGF0YS1pZD1cIiR7aWR9XCJdYCkucmVtb3ZlKCk7XHJcblxyXG5cdFx0bGV0IGJ0blByb2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYWRkLXRvLWNhcnQtYnRuW2RhdGEtaWQ9XCIke2lkfVwiXWApO1xyXG5cdFx0aWYgKGJ0blByb2QpIHtcclxuXHRcdFx0YnRuUHJvZC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8g0LjQt9C80LXQvdGP0LXQvCDQvtCx0YnRg9GOINGB0YLQvtC40LzQvtGB0YLRjCDRgtC+0LLQsNGA0L7QsiDQsiDQvtC60L3QtSDQuCDQsiDQvNC40L3QuC3QutC+0YDQt9C40L3QtVxyXG5cdFx0cHJpc2VGdWxsIC09IHByaWNlSXRybTtcclxuXHRcdG9yZGVyTW9kYWxTdW1tLnRleHRDb250ZW50ID0gYCR7bm9ybWFsUHJpY2UocHJpc2VGdWxsKX0g0YBgO1xyXG5cdFx0ZnVsbFByaWNlLnRleHRDb250ZW50ID0gYCR7bm9ybWFsUHJpY2UocHJpc2VGdWxsKX0g0YBgO1xyXG5cclxuXHRcdC8vINGD0LTQsNC70Y/QtdC8INGC0L7QstCw0YDRiyDQsiDQvtC60L3QtSDQuCDQsiDQvNC40L3QuC3QutC+0YDQt9C40L3QtVxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdHBhcmVudC5yZW1vdmUoKTtcclxuXHRcdFx0Ly8g0LjQt9C80LXQvdGP0LXQvCDQutC+0LvQuNGH0LXRgdGC0LLQviDRgtC+0LLQsNGA0L7QsiDQsiDQvtC60L3QtSwg0LzQuNC90Lgt0LrQvtGA0LfQuNC90LVcdNC4INC60YDRg9C20LrQtSDRgSDQutC+0LvQuNGH0LXRgdGC0LLQvtC8XHJcblx0XHRcdGxldCBudW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwtY2FydC1wcm9kdWN0JykubGVuZ3RoO1xyXG5cdFx0XHRpZiAobnVtID09IDApIHtcclxuXHRcdFx0XHRjYXJ0Q291bnQuY2xhc3NMaXN0LnJlbW92ZSgnY2FydF9fY291bnQtLWFjdGl2ZScpO1xyXG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJ0Jykuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY2FydC1mb3JtX19zdWJtaXQnKS5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xyXG5cdFx0XHRcdG9yZGVyTW9kYWxTaG93LmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLWNhcnQtb3JkZXJfX3Nob3ctLWFjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhcnRDb3VudC50ZXh0Q29udGVudCA9IG51bTsgXHJcblxyXG5cdFx0XHRvcmRlck1vZGFsUXVhbnRpdHkudGV4dENvbnRlbnQgPSBgJHtudW19INGI0YJgO1xyXG5cdFx0fSwgMzAwKTtcclxuXHJcblxyXG5cclxuXHRcdHVwZGF0ZVN0b3JhZ2UoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8g0YTRg9C90LrRhtC40Y8g0LfQsNC/0L7Qu9C90LXQvdC40Y8g0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LAg0YLQvtCy0LDRgNC+0LzQuCDQuNC3INC80LjQvdC4LdC60L7RgNC30LjQvdGLXHJcbmNvbnN0IG1vZGFsQ2FydExvYWQgPSBhc3luYyAoaWQpID0+IHtcclxuXHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnLi4vZGF0YS9kYXRhLmpzb24nKTtcclxuXHRpZiAocmVzcG9uc2Uub2spIHtcclxuXHRcdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1x0XHJcblx0XHRmb3IgKGxldCBkYXRhSXRlbSBvZiBkYXRhKSB7XHJcblx0XHRcdGlmIChkYXRhSXRlbS5pZCA9PSBpZCkge1xyXG5cdFx0XHRcdG9yZGVyTW9kYWxMaXN0Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGBcclxuXHRcdFx0XHRcdDxsaSBjbGFzcz1cIm1vZGFsLWNhcnQtcHJvZHVjdFwiIGRhdGEtaWQ9XCIke2RhdGFJdGVtLmlkfVwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtY2FydC1wcm9kdWN0X19pbWFnZVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiJHtkYXRhSXRlbS5tYWluSW1hZ2V9XCIgYWx0PVwiJHtkYXRhSXRlbS50aXRsZX1cIiB3aWR0aD1cIjgwXCIgaGVpZ2h0PVwiODBcIj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1jYXJ0LXByb2R1Y3RfX2NvbnRlbnRcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aDMgY2xhc3M9XCJtb2RhbC1jYXJ0LXByb2R1Y3RfX3RpdGxlXCI+JHtkYXRhSXRlbS50aXRsZX08L2gzPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwibW9kYWwtY2FydC1wcm9kdWN0X19wcmljZVwiPiR7bm9ybWFsUHJpY2UoZGF0YUl0ZW0ucHJpY2UpfSBwPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cIm1vZGFsLWNhcnQtcHJvZHVjdF9fZGVsZXRlIGJ0bi1yZXNldFwiPtCj0LTQsNC70LjRgtGMPC9idXR0b24+XHJcblx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdGApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cclxuXHR9ICBlbHNlIHtcclxuXHRcdGNvbnNvbGUubG9nKCgnZXJyb3InLCByZXNwb25zZS5zdGF0dXMpKTtcclxuXHR9XHJcbn07XHJcblxyXG4vLyog0LrQvtGA0LfQuNC90LAg0LIgbG9jYWxTdG9yYWdlXHJcblxyXG4vLyDQt9Cw0YHRh9C10YIg0YHRg9C80LzRiyDRgtC+0LLQsNGA0L7QsiDQv9C+0YHQu9C1INC+0LHQvdC+0LLQu9C10L3QuNGPINGB0YLRgNCw0L3QuNGG0YtcclxuY29uc3QgY291bnRTdW1tID0gKCkgPT4ge1xyXG5cdGxldCBwcmljZSA9IDA7XHJcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1pbmktY2FydF9fcHJpY2UnKS5mb3JFYWNoKGVsID0+IHtcclxuXHRcdGxldCBpdGVtUHJpY2UgPSBwYXJzZUludChwcmljZVdpdGhvdXRTcGFjZXMoZWwudGV4dENvbnRlbnQpKTtcclxuXHRcdHByaWNlICs9IGl0ZW1QcmljZTtcclxuXHRcdGZ1bGxQcmljZS50ZXh0Q29udGVudCA9IGAke25vcm1hbFByaWNlKHByaWNlKX0g0YBgO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuLy8g0LTQvtCx0LDQstC70LXQvdC40LUg0LjQvdGE0L7RgNC80LDRhtC40Lgg0LIg0LrQvtGA0LfQuNC90YMg0LjQtyBsb2NhbFN0b3JhZ2VcclxuY29uc3QgaW5pdGlhbFN0YXRlID0gKCkgPT4ge1xyXG5cdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZHVjdHMnKSAhPT0gbnVsbCkge1xyXG5cdFx0bWluaUNhcnRMaXN0LmlubmVySFRNTCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9kdWN0cycpO1xyXG5cdFx0bGV0IG51bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5taW5pLWNhcnRfX2l0ZW0nKS5sZW5ndGg7XHJcblx0XHRjYXJ0Q291bnQuY2xhc3NMaXN0LmFkZCgnY2FydF9fY291bnQtLWFjdGl2ZScpO1xyXG5cdFx0Y2FydENvdW50LnRleHRDb250ZW50ID0gbnVtO1xyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnQnKS5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcblx0XHRjb3VudFN1bW0oKTtcclxuXHRcdGJ0bkJsb2NrKCk7IC8vINCx0LvQvtC60LjRgNC+0LLQsNC90LjQtSDQutC90L7Qv9C+0Log0LTQvtCx0LDQstC70LXQvdC40Y8g0LIg0LrQvtGA0LfQuNC90YMgKNGE0YPQvdC60YbQuNGPINCyINGE0LDQudC70LUg0YHQvtC30LTQsNC90LjRjyDQutCw0YDRgtC+0YfQtdGAKVxyXG5cclxuXHR9XHJcbn07XHJcblxyXG5pbml0aWFsU3RhdGUoKTtcclxuXHJcbi8vINC+0LHQvdC+0LLQu9C10L3QuNC1IGxvY2FsU3RvcmFnZVxyXG5jb25zdCB1cGRhdGVTdG9yYWdlID0gKCkgPT4ge1xyXG5cdGxldCBodG1sID0gbWluaUNhcnRMaXN0LmlubmVySFRNTDtcclxuXHRodG1sID0gaHRtbC50cmltKCk7XHJcblxyXG5cdGlmIChodG1sLmxlbmd0aCkge1xyXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2R1Y3RzJywgaHRtbCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdwcm9kdWN0cycpO1xyXG5cdH1cclxufTsiLCJjb25zdCBmb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKTtcclxuXHJcbmlmIChmb3Jtcy5sZW5ndGggPiAwKSB7XHJcblx0Zm9ybXMuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRsZXQgZm9ybSA9IGUudGFyZ2V0O1x0XHJcblx0XHRcdGxldCBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0Jyk7XHJcblx0XHRcdC8vIGxldCBmaWxlTmFtZSA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuZmlsZV9fbmFtZScpOyAvLyDQtdGB0LvQuCDQtdGB0YLRjCDQt9Cw0LPRgNGD0LfQutCwINGE0LDQudC70LAgKNCyINCw0YLRgNC40LHRg9GCINC00L7QsdCw0LLQuNGC0YwgZmlsZSlcclxuXHRcdFx0bGV0IHZhbGlkID0gdmFsaWRJbnB1dChmb3JtKTtcclxuXHRcdFx0aWYgKHZhbGlkID09PSAwICYmIHZhbGlkQ2hlY2soZm9ybSkpIHtcclxuXHRcdFx0XHRmb3JtUmVtb3ZlRXJyb3IoZm9ybSk7XHJcblxyXG5cdFx0XHRcdC8vKiA9PT09PT09PSDQodC+0L7QsdGJ0LXQvdC40LUg0L7QsSDQvtGC0L/RgNCw0LLQutC1ID09PT09PT09PT09PVxyXG5cdFx0XHRcdGxldCB0ZXh0TWVzc2FnZSA9IGZvcm0ucXVlcnlTZWxlY3RvcignLmZvcm0tbWVzc2FnZScpO1xyXG5cdFx0XHRcdGlmICh0ZXh0TWVzc2FnZSkge1xyXG5cdFx0XHRcdFx0dGV4dE1lc3NhZ2UudGV4dENvbnRlbnQgPSAn0JfQsNCz0YDRg9C30LrQsC4uLic7XHJcblx0XHRcdFx0XHR0ZXh0TWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vKiDQl9Cw0L/QuNGB0Ywg0L3QsNC30LLQsNC90LjRjyDRh9C10LrQsdC+0LrRgdCwINCyIHZhbHVlINC40L3Qv9GD0YLQsCDRh9C10LrQsdC+0LrRgdCwICjQtdGB0LvQuCDQtdGB0YLRjCDRh9C10LrQsdC+0LrRgdGLKVxyXG5cdFx0XHRcdC8vIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcclxuXHRcdFx0XHQvLyBcdGlmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSB7XHJcblx0XHRcdFx0Ly8gXHRcdGlucHV0LnZhbHVlID0gaW5wdXQubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50O1xyXG5cdFx0XHRcdC8vIFx0fVxyXG5cdFx0XHRcdC8vIH0pO1xyXG5cclxuXHRcdFx0XHQvLyo9PT09PT09PT0gRm9ybURhdGEgPT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0XHRcdGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGl0ZW0pO1xyXG5cdFx0XHRcdC8vIGZvcm1EYXRhLmFwcGVuZCgnaW1hZ2UnLCBmb3JtSW1hZ2UuZmlsZXNbMF0pO1xyXG5cdFx0XHRcdGlmIChmb3JtLmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwtY2FydC1mb3JtJykpIHtcclxuXHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbC1jYXJ0LXByb2R1Y3QnKS5mb3JFYWNoKChlbCwgaWR4KSA9PiB7XHJcblx0XHRcdFx0XHRcdGxldCB0aXRsZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jYXJ0LXByb2R1Y3RfX3RpdGxlJykudGV4dENvbnRlbnQ7XHJcblx0XHRcdFx0XHRcdGxldCBwcmljZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jYXJ0LXByb2R1Y3RfX3ByaWNlJykudGV4dENvbnRlbnQ7XHJcblx0XHRcdFx0XHRcdGZvcm1EYXRhLmFwcGVuZChgcHJvZHVjdC0ke2lkeCArIDF9YCwgYCR7dGl0bGV9LCAke3ByaWNlfWApO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdCAgXHJcblx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoYHN1bW1gLCBgJHtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY2FydC1vcmRlcl9fc3VtbSBzcGFuJykudGV4dENvbnRlbnR9YCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyogPT09PT0g0J/RgNC+0LLQtdGA0LrQsCDRhNC+0YDQvNGLID09PT09XHJcblx0XHRcdFx0Ly8gZm9yKHZhciBwYWlyIG9mIGZvcm1EYXRhLmVudHJpZXMoKSkge1xyXG5cdFx0XHRcdC8vIFx0Y29uc29sZS5sb2cocGFpclswXSsgJywgJysgcGFpclsxXSk7XHJcblx0XHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0XHQvLyo9PT09PT09PT0g0J7RgtC/0YDQsNCy0LrQsCDQtNCw0L3QvdGL0YUgPT09PT09PT09PT09PT09XHJcblx0XHRcdFx0Y29uc3QgcG9zdERhdGEgPSBhc3luYyAodXJsLCBkYXRhKSA9PiB7XHJcblx0XHRcdFx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuXHRcdFx0XHRcdFx0bWV0aG9kOiBcIlBPU1RcIixcclxuXHRcdFx0XHRcdFx0Ym9keTogZGF0YVxyXG5cdFx0XHRcdFx0fSk7XHRcclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZS5vaykge1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gbGV0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTsgLy8ganNvbigpIC0g0LTQu9GPINCy0YvQstC+0LTQsCDRgdC+0L7QsdGJ0LXQvdC40Y87XHJcblx0XHRcdFx0XHRcdC8vIGFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcclxuXHJcblx0XHRcdFx0XHRcdGxldCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7IC8vIHRleHQoKSAtINC00LvRjyDQv9GA0L7QstC10YDQutC4INC90LAg0YHQtdGA0LLQtdGA0LUsINC/0L7QtNC60LvRjtGH0LjRgtGMIHNlcnZlci5waHApXHJcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKHJlc3VsdCk7IC8vINGN0YLQviDQtNC70Y8g0L/RgNC+0LLQtdGA0LrQuCDQvdCwINGB0LXRgNCy0LXRgNC1XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAodGV4dE1lc3NhZ2UpIHtcclxuXHRcdFx0XHRcdFx0XHR0ZXh0TWVzc2FnZS50ZXh0Q29udGVudCA9ICfQodC/0LDRgdC40LHQviwg0YHQutC+0YDQviDQvNGLINGBINCy0LDQvNC4INGB0LLRj9C20LjQvNGB0Y8hJztcclxuXHRcdFx0XHRcdFx0XHR0ZXh0TWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQvLyBjbGVhcklucHV0cyhpbnB1dHMpO1xyXG5cdFx0XHRcdFx0XHRmb3JtLnJlc2V0KCk7XHJcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGlmICh0ZXh0TWVzc2FnZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dGV4dE1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9LCA1MDAwKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdC8vIGFsZXJ0KFwi0J7RiNC40LHQutCwXCIpO1xyXG5cdFx0XHRcdFx0XHRpZiAodGV4dE1lc3NhZ2UpIHtcclxuXHRcdFx0XHRcdFx0XHR0ZXh0TWVzc2FnZS50ZXh0Q29udGVudCA9ICfQp9GC0L4t0YLQviDQv9C+0YjQu9C+INC90LUg0YLQsNC6Li4uJztcclxuXHRcdFx0XHRcdFx0XHR0ZXh0TWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHQvLyBmb3JtLnJlc2V0KCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHRleHRNZXNzYWdlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0ZXh0TWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0sIDUwMDApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0Ly8gcG9zdERhdGEoJy4uL3NlbmRtYWlsLnBocCcsIGZvcm1EYXRhKTtcclxuXHRcdFx0XHRwb3N0RGF0YSgnLi4vc2VydmVyLnBocCcsIGZvcm1EYXRhKSAvLyEg0YPQsdGA0LDRgtGMICjRjdGC0L4g0LTQu9GPINC/0YDQvtCy0LXRgNC60Lgg0L3QsCDRgdC10YDQstC10YDQtSlcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn0iLCJjb25zdCBsYXp5SW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nW2RhdGEtc3JjXSxzb3VyY2VbZGF0YS1zcmNzZXRdJyk7XHJcbmNvbnN0IGxvYWRNYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZC1tYXAnKTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcclxuXHRsZXQgc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xyXG5cdGlmIChsYXp5SW1hZ2VzLmxlbmd0aCA+IDApIHtcclxuXHRcdGxhenlJbWFnZXMuZm9yRWFjaChpbWcgPT4ge1xyXG5cdFx0XHRsZXQgaW1nT2Zmc2V0ID0gaW1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHBhZ2VZT2Zmc2V0O1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKHNjcm9sbFkgPj0gaW1nT2Zmc2V0IC0gMTAwMCkge1xyXG5cdFx0XHRcdGlmIChpbWcuZGF0YXNldC5zcmMpIHtcclxuXHRcdFx0XHRcdGltZy5zcmMgPSBpbWcuZGF0YXNldC5zcmM7XHJcblx0XHRcdFx0XHRpbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyYycpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoaW1nLmRhdGFzZXQuc3Jjc2V0KSB7XHJcblx0XHRcdFx0XHRpbWcuc3Jjc2V0ID0gaW1nLmRhdGFzZXQuc3Jjc2V0O1xyXG5cdFx0XHRcdFx0aW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmNzZXQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHQvL01hcFxyXG5cdC8vIGlmICghbG9hZE1hcC5jbGFzc0xpc3QuY29udGFpbnMoJ2xvYWRlZCcpKSB7XHJcblx0Ly8gXHRsZXQgbWFwT2Zmc2V0ID0gbG9hZE1hcC5vZmZzZXRUb3A7XHJcblx0Ly8gXHRpZiAoc2Nyb2xsWSA+PSBtYXBPZmZzZXQgLSAyMDApIHtcclxuXHQvLyBcdFx0Y29uc3QgbG9hZE1hcFVybCA9IGxvYWRNYXAuZGF0YXNldC5tYXA7XHJcblx0Ly8gXHRcdGlmIChsb2FkTWFwVXJsKSB7XHJcblx0Ly8gXHRcdFx0bG9hZE1hcC5pbnNlcnRBZGphY2VudEhUTUwoXHJcblx0Ly8gXHRcdFx0XHRcImJlZm9yZWVuZFwiLFxyXG5cdC8vIFx0XHRcdFx0YDxpZnJhbWUgc3JjPVwiJHtsb2FkTWFwVXJsfVwiIHN0eWxlPVwiYm9yZGVyOjA7XCIgYWxsb3dmdWxsc2NyZWVuPVwiXCIgbG9hZGluZz1cImxhenlcIj48L2lmcmFtZT5gXHJcblx0Ly8gXHRcdFx0KTtcclxuXHQvLyBcdFx0XHRsb2FkTWFwLmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xyXG5cdC8vIFx0XHR9XHJcblx0Ly8gXHR9XHJcblx0Ly8gfVxyXG59KTsiLCJsZXQgZmxhZyA9IDA7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKXtcclxuXHRsZXQgc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xyXG5cdGxldCBtYXBPZmZzZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21hcFwiKS5vZmZzZXRUb3A7XHJcblxyXG5cdGlmICgoc2Nyb2xsWSA+PSBtYXBPZmZzZXQgLSA1MDApICYmIChmbGFnID09IDApKSB7XHJcblx0XHR5bWFwcy5yZWFkeShpbml0KTtcclxuXHJcblx0XHRmdW5jdGlvbiBpbml0KCl7XHJcblx0XHRcdGNvbnN0IG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcFwiLCB7XHJcblx0XHRcdFx0Y2VudGVyOiBbNTkuODMwNDgxLCAzMC4xNDIxOTddLFxyXG5cdFx0XHRcdHpvb206IDEwLFxyXG5cdFx0XHRcdGNvbnRyb2xzOiBbXVxyXG5cdFx0XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRsZXQgbXlQbGFjZW1hcmsgID0gbmV3IHltYXBzLlBsYWNlbWFyayhbNTkuODMwNDgxLCAzMC4xNDIxOTddLCB7fSwge1xyXG5cdFx0XHRcdGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcclxuXHRcdFx0XHRpY29uSW1hZ2VIcmVmOiAnaW1nL3BsYWNlbWFyay5wbmcnLFxyXG5cdFx0XHRcdGljb25JbWFnZVNpemU6IFsyNSwgMzRdLFxyXG5cdFx0XHRcdGljb25JbWFnZU9mZnNldDogWy0xOSwgLTQ0XVxyXG5cdFx0XHR9KTtcdFx0XHRcclxuXHRcdFx0bXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlQbGFjZW1hcmspO1xyXG5cdFx0XHRteU1hcC5iZWhhdmlvcnMuZGlzYWJsZShbJ3Njcm9sbFpvb20nXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZmxhZyA9IDE7XHJcblx0fVxyXG59KTsiLCJsZXQgc2V0Q3Vyc29yUG9zaXRpb24gPSAocG9zLCBlbGVtKSA9PiB7XHJcbiAgICBlbGVtLmZvY3VzKCk7XHJcbiAgICBpZiAoZWxlbS5zZXRTZWxlY3Rpb25SYW5nZSkge1xyXG4gICAgICAgIGVsZW0uc2V0U2VsZWN0aW9uUmFuZ2UocG9zLCBwb3MpO1xyXG4gICAgfSBlbHNlIGlmIChlbGVtLmNyZWF0ZVRleHRSYW5nZSkge1xyXG4gICAgICAgIGxldCByYW5nZSA9IGVsZW0uY3JlYXRlVGV4dFJhbmdlKCk7XHJcblxyXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG4gICAgICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIHBvcyk7XHJcbiAgICAgICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCBwb3MpO1xyXG4gICAgICAgIHJhbmdlLnNlbGVjdCgpO1xyXG4gICAgfVxyXG59O1xyXG5mdW5jdGlvbiBjcmVhdGVNYXNrKGV2ZW50KSB7XHJcbiAgICBsZXQgbWF0cml4ID0gJys3IChfX18pIF9fXyBfXyBfXycsXHJcbiAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgZGVmID0gbWF0cml4LnJlcGxhY2UoL1xcRC9nLCAnJyksXHJcbiAgICAgICAgdmFsID0gdGhpcy52YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpO1xyXG4gICAgaWYgKGRlZi5sZW5ndGggPj0gdmFsLmxlbmd0aCkge1xyXG4gICAgICAgIHZhbCA9IGRlZjtcclxuICAgIH1cclxuICAgIHRoaXMudmFsdWUgPSBtYXRyaXgucmVwbGFjZSgvLi9nLCBmdW5jdGlvbihhKSB7XHJcbiAgICAgICAgcmV0dXJuIC9bX1xcZF0vLnRlc3QoYSkgJiYgaSA8IHZhbC5sZW5ndGggPyB2YWwuY2hhckF0KGkrKykgOiBpID49IHZhbC5sZW5ndGggPyAnJyA6IGE7XHJcbiAgICB9KTtcclxuICAgIGlmIChldmVudC50eXBlID09PSdibHVyJykge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlLmxlbmd0aCA9PSAyIHx8IHRoaXMudmFsdWUubGVuZ3RoIDwgbWF0cml4Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSdrZXl1cCcgfHwgZXZlbnQudHlwZSA9PT0nbW91c2V1cCcpIHtcclxuICAgICAgICBsZXQgY3VyID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcclxuICAgICAgICBpZiAoY3VyID09ICcwJykge1xyXG4gICAgICAgICAgICBzZXRDdXJzb3JQb3NpdGlvbih0aGlzLnZhbHVlLmxlbmd0aCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRDdXJzb3JQb3NpdGlvbih0aGlzLnZhbHVlLmxlbmd0aCwgdGhpcyk7ICAgICAgICBcclxuICAgIH1cclxufVxyXG5sZXQgdGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRlbCcpO1xyXG50ZWwuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNyZWF0ZU1hc2spO1xyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBjcmVhdGVNYXNrKTtcclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBjcmVhdGVNYXNrKTtcclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3JlYXRlTWFzayk7XHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgY3JlYXRlTWFzayk7XHJcbn0pOyIsImNvbnN0IGNhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FydCcpO1xyXG5jb25zdCBtaW5pQ2FydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5taW5pLWNhcnQnKTtcclxuLy8gY29uc3QgbWluaUNhcnRJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1pbmktY2FydF9faXRlbScpO1xyXG5cclxuY2FydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHRtaW5pQ2FydC5jbGFzc0xpc3QudG9nZ2xlKCdtaW5pLWNhcnQtLW9wZW4nKTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcblx0aWYgKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21pbmktY2FydCcpICYmICFlLnRhcmdldC5jbG9zZXN0KCcubWluaS1jYXJ0JykgJiYgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FydCcpICYmICFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21pbmktY2FydF9fZGVsZXRlJylcclxuXHR8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21pbmktY2FydF9fYnRuJykpIHtcclxuXHRcdG1pbmlDYXJ0LmNsYXNzTGlzdC5yZW1vdmUoJ21pbmktY2FydC0tb3BlbicpO1xyXG5cdH1cclxufSk7IiwiLy9UT0RPINCU0L7QsdCw0LLQuNGC0Ywg0LrQu9Cw0YHRgdGLOlxyXG4vLyogZGF0YS1idG49XCJtb2RhbC1uYW1lXCIgLSDQtNC+0LHQsNCy0LjRgtGMINC60L3QvtC/0LrQsNC8INC+0YLQutGA0YvRgtC40Y8g0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LAgKG1vZGFsLW5hbWUgLSDQuNC80Y8g0L7QutC90LAsINC60L7RgtC+0YDQvtC1INC00L7Qu9C20L3QviDQvtGC0LrRgNGL0YLRjNGB0Y8pXHJcbi8vKiBkYXRhLW1vZGFsIC0g0LTQvtCx0LDQstC40YLRjCDQstGB0LXQvCDQvNC+0LTQsNC70YzQvdGL0Lwg0L7QutC90LDQvCAobW9kYWwtbmFtZSkgKNC10YHQu9C4INC40YUg0L3QtdGB0LrQvtC70YzQutC+KVxyXG4vLyogYmxvY2stZml4IC0g0LTQvtCx0LDQstC40YLRjCDQutC70LDRgdGBINC00LvRjyDQsdC70L7QutC+0LIg0YEgcG9zaXRpb246IGFic29sdXRlINC40LvQuCBmaXhlZCAo0LTQvtCx0LDQstC40YLRgdGPIHBhZGRpbmcpXHJcbi8vKiBzbWFsbC1maXggLSDQtNC+0LHQsNCy0LjRgtGMINC60LvQsNGB0YEg0LTQu9GPINC80LDQu9C10L3RjNC60LjRhSDQsdC70L7QutC+0LIg0YEgcG9zaXRpb246IGFic29sdXRlINC40LvQuCBmaXhlZCAo0LTQvtCx0LDQstC40YLRgdGPIG1hcmdpbilcclxuLy8qIGRhdGEtaW5zaWRlIC0g0LTQvtCx0LDQstC40YLRjCDQutC90L7Qv9C60LDQvCDQstC90YPRgtGA0Lgg0LzQvtC00LDQu9GM0L3QvtCz0L4g0L7QutC90LAsINC60L7RgtC+0YDRi9C1INC+0YLQutGA0YvQstCw0Y7RgiDRgdC70LXQtNGD0Y7RidC10LUg0LzQvtC00LDQu9GM0L3QvtC1INC+0LrQvdC+ICjRh9GC0L4g0LHRiyDRgdC+0YXRgNCw0L3QuNGC0Ywg0YTQvtC60YPRgSDQvdCwINC60L3QvtC/0LrQtSDQstC90LUg0L7QutC90LApXHJcblxyXG4vLz8g0Y3RgtC4INC/0LDRgNCw0LzQtdGC0YDRiyDRg9C60LDQt9GL0LLQsNGC0YwsINC10YHQu9C4INC+0L3QuCDRgNCw0LfQvdGL0LUg0LTQu9GPINGA0LDQt9C90YvRhSDQvtC60L7QvSAtINC10YHQu9C4INC+0LTQuNC90LDQutC+0LLRi9C1IC0g0LzQtdC90Y/QtdC8IHNwZWVkVGltZSDQuCBtb2RhbEFuaW1hdGlvblxyXG4vLyogZGF0YS1zcGVlZD1cIjMwMFwiIC0g0LTQvtCx0LDQstC40YLRjCDQstGA0LXQvNGPINCy0YvQv9C+0LvQvdC10L3QuNGPLCDQv9C+INGD0LzQvtC70YfQsNC90LjRjiA1MDAgKNGB0YLQsNCy0LjRgtGB0Y8g0LIg0YHQvtC+0YLQstC10YLRgdGC0LLQuNC4INGBICR0cmFuc2l0aW9uLXRpbWUpXHJcbi8vKiBkYXRhLWFuaW1hdGlvbj1cImZhZGVJblVwXCIgIC0g0LTQvtCx0LDQstC40YLRjCDQsNC90LjQvNCw0YbQuNGOINC/0YDQuCDQvtGC0LrRgNGL0YLQuNC4INC80L7QtNCw0LvRjNC90L7Qs9C+INC+0LrQvdCwICjQutC+0L3RgtC10L3RgtCwINCy0L3Rg9GC0YDQuCDQvtCx0L7Qu9C+0YfQutC4KSwg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4gJ2ZhZGUnXHJcblxyXG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1vdmVybGF5Jyk7XHJcbmNvbnN0IG1vZGFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYnRuXScpO1xyXG5jb25zdCBvcGVuV2luZG93cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsXScpO1xyXG5jb25zdCBmaXhCbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvY2stZml4ICcpO1xyXG5jb25zdCBmaXhTbWFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbWFsbC1maXgnKTtcclxuY29uc3QgbW9kYWxTY3JvbGwgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGg7XHJcbmNvbnN0IGZvY3VzRWxlbWVudHMgPSBbXHJcblx0J2FbaHJlZl0nLFxyXG5cdCdpbnB1dCcsXHJcblx0J3NlbGVjdCcsXHJcblx0J3RleHRhcmVhJyxcclxuXHQnYnV0dG9uJyxcclxuXHQnaWZyYW1lJyxcclxuXHQnW2NvbnRlbnRlZGl0YWJsZV0nLFxyXG5cdCdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXhePVwiLVwiXSknXHJcbl07XHJcbmxldCBtb2RhbENvbnRlbnQ7XHJcbmxldCBsYXN0Rm9jdXMgPSBmYWxzZTtcclxubGV0IHNwZWVkVGltZSA9IDUwMDtcclxuLy8gbGV0IG1vZGFsQW5pbWF0aW9uID0gJ2ZhZGUnO1xyXG5pZiAobW9kYWwpIHtcclxuXHRtb2RhbEJ0bi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGxldCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcblx0XHRcdGlmICh0YXJnZXQpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0bGV0IG1vZGFsTmFtZSA9IHRhcmdldC5kYXRhc2V0LmJ0bjtcclxuXHRcdFx0XHRtb2RhbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHttb2RhbE5hbWV9YCk7XHJcblx0XHRcdFx0Ly8g0YHQutC+0YDQvtGB0YLRjCDQuCDQsNC90LjQvNCw0YbQuNGPIC0g0LXRgdC70Lgg0LTQvtCx0LDQstC70LXQvdGLINCyINCw0YDQs9GD0LzQtdC90YIgZGF0YVxyXG5cdFx0XHRcdGxldCBzcGVlZCA9IHRhcmdldC5kYXRhc2V0LnNwZWVkO1xyXG5cdFx0XHRcdC8vIGxldCBhbmltYXRpb24gPSB0YXJnZXQuZGF0YXNldC5hbmltYXRpb247XHJcblx0XHRcdFx0c3BlZWRUaW1lID0gc3BlZWQgPyBwYXJzZUludChzcGVlZCkgOiA1MDA7XHJcblx0XHRcdFx0Ly8gbW9kYWxBbmltYXRpb24gPSBhbmltYXRpb24gPyBhbmltYXRpb24gOiAnZmFkZSc7XHJcblx0XHRcdFx0b3Blbk1vZGFsKCk7XHJcblxyXG5cdFx0XHRcdC8vIHRvZG8g0LXRgdC70Lgg0LXRgdGC0Ywg0LrQvdC+0L/QutC4INCy0L3Rg9GC0YDQuCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsCwg0LrQvtGC0L7RgNGL0LUg0L7RgtC60YDRi9Cy0LDRjtGCINGB0LvQtdC00YPRjtGJ0LXQtSDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4gKGRhdGEtaW5zaWRlKSwg0L/QtdGA0LXQtNCw0LXQvCDQsNGA0LPRg9C80LXQvdGCIHRhcmdldFxyXG5cdFx0XHRcdC8vIG9wZW5Nb2RhbCh0YXJnZXQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG5cdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwtb3ZlcmxheScpICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImlzLW9wZW5cIikpIHtcclxuXHRcdFx0Y2xvc2VNb2RhbCgpO1x0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsX19jbG9zZScpICYmIGUudGFyZ2V0LmNsb3Nlc3QoJy5tb2RhbC1vcGVuJykpIHtcclxuXHRcdFx0Y2xvc2VNb2RhbCgpO1x0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdFxyXG5cclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuXHRcdGlmIChlLmNvZGUgPT09ICdFc2NhcGUnICYmIG1vZGFsLmNsYXNzTGlzdC5jb250YWlucyhcImlzLW9wZW5cIikpIHtcclxuXHRcdFx0Y2xvc2VNb2RhbCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChlLmNvZGUgPT09ICdUYWInICYmIG1vZGFsLmNsYXNzTGlzdC5jb250YWlucyhcImlzLW9wZW5cIikpIHtcclxuXHRcdFx0Zm9jdXNDYXRjaChlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3Blbk1vZGFsKGZ1bmMpIHtcclxuXHRsYXN0Rm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG5cdC8vIHRvZG8g0LXRgdC70Lgg0LXRgdGC0Ywg0LrQvdC+0L/QutC4INCy0L3Rg9GC0YDQuCDQvNC+0LTQsNC70YzQvdC+0LPQviDQvtC60L3QsCwg0LrQvtGC0L7RgNGL0LUg0L7RgtC60YDRi9Cy0LDRjtGCINGB0LvQtdC00YPRjtGJ0LXQtSDQvNC+0LTQsNC70YzQvdC+0LUg0L7QutC90L4gKGRhdGEtaW5zaWRlKSwgbGFzdEZvY3VzINC/0L7Qu9GD0YfQsNC10Lwg0YLQsNC6ICjQvtCx0YvRh9C90YvQuSDRg9Cx0YDQsNGC0YwpOlxyXG5cdC8vIGlmICghYnRuLmNsb3Nlc3QoYFtkYXRhLWluc2lkZV1gKSkge1xyXG5cdC8vIFx0bGFzdEZvY3VzID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuXHQvLyB9XHJcblxyXG5cdG9wZW5XaW5kb3dzLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLW9wZW4nKTtcclxuXHRcdGl0ZW0uc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xyXG5cdFx0Ly8gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRlLW9wZW4nKTtcclxuXHRcdC8vIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShtb2RhbEFuaW1hdGlvbik7XHJcblx0fSk7XHJcblxyXG5cdGlmICghbW9kYWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1vcGVuJykpe1xyXG5cdFx0ZGlzYWJsZVNjcm9sbCgpO1xyXG5cdH1cclxuXHJcblx0aWYgKGZ1bmMgJiYgbW9kYWxDb250ZW50LmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwtcHJvZCcpKSB7XHJcblx0XHRsZXQgb3BlbkJ0bklkID0gbGFzdEZvY3VzLmRhdGFzZXQuaWQ7XHRcclxuXHRcdGZ1bmMob3BlbkJ0bklkKTtcclxuXHR9XHJcblxyXG5cdG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcclxuXHRtb2RhbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcclxuXHJcblx0ZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHttb2RhbFNjcm9sbH1weGA7XHJcblx0aWYgKGZpeEJsb2Nrcy5sZW5ndGggPiAwKSB7XHJcblx0XHRmaXhCbG9ja3MuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0aXRlbS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHttb2RhbFNjcm9sbH1weGA7XHJcblx0XHR9KVxyXG5cdH1cclxuXHRpZiAoZml4U21hbGwubGVuZ3RoID4gMCkge1xyXG5cdFx0Zml4U21hbGwuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0aXRlbS5zdHlsZS5tYXJnaW5SaWdodCA9IGAke21vZGFsU2Nyb2xsfXB4YDtcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRtb2RhbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtb3BlbicpO1xyXG5cdG1vZGFsQ29udGVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgZmFsc2UpO1xyXG5cdC8vIG1vZGFsQ29udGVudC5jbGFzc0xpc3QuYWRkKG1vZGFsQW5pbWF0aW9uKTtcclxuXHJcblx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHQvLyBtb2RhbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS1vcGVuJyk7XHJcblx0XHRmb2N1c1RyYXAoKTtcclxuXHR9LCBzcGVlZFRpbWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xyXG5cdG9wZW5XaW5kb3dzLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLW9wZW4nKTtcclxuXHRcdGl0ZW0uc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xyXG5cdFx0Ly8gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRlLW9wZW4nKTtcclxuXHRcdC8vIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShtb2RhbEFuaW1hdGlvbik7XHJcblx0fSk7XHJcblxyXG5cdGVuYWJsZVNjcm9sbCgpO1xyXG5cclxuXHRkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAwcHhgO1xyXG5cdGlmIChmaXhCbG9ja3MubGVuZ3RoID4gMCkge1xyXG5cdFx0Zml4QmxvY2tzLmZvckVhY2goaXRlbSA9PiB7XHJcblx0XHRcdGl0ZW0uc3R5bGUucGFkZGluZ1JpZ2h0ID0gYDBweGA7XHJcblx0XHR9KVxyXG5cdH1cclxuXHRpZiAoZml4U21hbGwubGVuZ3RoID4gMCkge1xyXG5cdFx0Zml4U21hbGwuZm9yRWFjaChpdGVtID0+IHtcclxuXHRcdFx0aXRlbS5zdHlsZS5tYXJnaW5SaWdodCA9IGAwcHhgO1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcclxuXHRtb2RhbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XHJcblxyXG5cdGZvY3VzVHJhcCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb2N1c1RyYXAoKSB7XHJcblx0Ly8gY29uc3Qgbm9kZXMgPSB0aGlzLm1vZGFsQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZm9jdXNFbGVtZW50cyk7IC8vKiDQtNC70Y8g0YTQvtC60YPRgdCwINC90LAg0L/QtdGA0LLQvtC8INGN0LvQtdC80LXQvdGC0LUg0L7QutC90LBcclxuXHRpZiAobW9kYWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaXMtb3BlblwiKSkge1xyXG5cdFx0bW9kYWwuZm9jdXMoKTtcclxuXHRcdC8vIGlmIChub2Rlcy5sZW5ndGgpIG5vZGVzWzBdLmZvY3VzKCk7IC8vKiDQtNC70Y8g0YTQvtC60YPRgdCwINC90LAg0L/QtdGA0LLQvtC8INGN0LvQtdC80LXQvdGC0LUg0L7QutC90LBcclxuXHR9IGVsc2Uge1xyXG5cdFx0bGFzdEZvY3VzLmZvY3VzKCk7XHRcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvY3VzQ2F0Y2goZSkge1xyXG5cdGNvbnN0IGZvY3VzYWJsZSA9IG1vZGFsQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKGZvY3VzRWxlbWVudHMpO1xyXG5cdGNvbnN0IGZvY3VzQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmb2N1c2FibGUpO1xyXG5cdGNvbnN0IGZvY3VzZWRJbmRleCA9IGZvY3VzQXJyYXkuaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcclxuXHJcblx0aWYgKGUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSAwKSB7XHJcblx0XHRmb2N1c0FycmF5W2ZvY3VzQXJyYXkubGVuZ3RoIC0gMV0uZm9jdXMoKTtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHR9XHJcblxyXG5cdGlmICghZS5zaGlmdEtleSAmJiBmb2N1c2VkSW5kZXggPT09IGZvY3VzQXJyYXkubGVuZ3RoIC0gMSkge1xyXG5cdFx0Zm9jdXNBcnJheVswXS5mb2N1cygpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxufSIsImNvbnN0IHF1aXpGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1aXotZm9ybScpO1xyXG5jb25zdCBxdWl6SW5wdXRzID0gcXVpekZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcclxuY29uc3QgcXVpekJsb2NrcyA9IHF1aXpGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWl6LWJsb2NrJyk7XHJcblxyXG5sZXQgdGV4dGFyZWFUZXh0ID0gbnVsbDtcclxubGV0IHF1aXpSZXBseSAgPSB7fTtcclxubGV0IGJsb2NrSW5kZXggPSAwO1xyXG5cclxuLy8g0YTRg9C90LrRhtC40Y8g0L/QvtC60LDQt9CwINGC0L7Qu9GM0LrQviDQv9C10YDQstC+0LPQviDQsdC70L7QutCwINC60LLQuNC30LBcclxuc2hvd0Jsb2NrcyhibG9ja0luZGV4KTtcclxuXHJcbmZ1bmN0aW9uIHNob3dCbG9ja3MoKSB7XHJcblx0cXVpekJsb2Nrcy5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG5cdHF1aXpCbG9ja3NbYmxvY2tJbmRleF0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0cXVpekJsb2Nrc1tibG9ja0luZGV4XS5jbGFzc0xpc3QuYWRkKCdmYWRlSW4nKTtcclxufVxyXG5cclxuLy8g0LfQsNC/0LjRgdGMINC90LDQt9Cy0LDQvdC40Y8g0YfQtdC60LHQvtC60YHQsCDQsiB2YWx1ZSDQuNC90L/Rg9GC0LAg0YfQtdC60LHQvtC60YHQsFxyXG5xdWl6SW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xyXG5cdGlmIChpbnB1dC50eXBlID09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PSAncmFkaW8nKSB7XHJcblx0XHRpbnB1dC52YWx1ZSA9IGlucHV0Lm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudDtcclxuXHR9XHJcbn0pO1xyXG5cclxucXVpekZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG5cdGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHRsZXQgYmxvY2sgPSB0YXJnZXQuY2xvc2VzdCgnLnF1aXotYmxvY2snKTtcclxuXHRsZXQgbmV4dEJ0biA9IHF1aXpGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW5leHRdJyk7XHJcblx0bmV4dEJ0bi5mb3JFYWNoKGJ0biA9PiB7XHJcblx0XHRpZiAodGFyZ2V0ID09IGJ0bikge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGFkZFRvU2VuZChibG9jaywgcXVpelJlcGx5KTtcclxuXHRcdFx0bmV4dFF1ZXN0aW9uKGJsb2NrKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRpZiAodGFyZ2V0ID09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNlbmRdJykpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGFkZFRvU2VuZChibG9jaywgcXVpelJlcGx5KTtcclxuXHRcdHNlbmQoYmxvY2spO1xyXG5cdH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBuZXh0UXVlc3Rpb24oZm9ybSkge1xyXG5cdGxldCB2YWxpZCA9IHZhbGlkSW5wdXQoZm9ybSk7XHJcblx0aWYgKHZhbGlkID09PSAwICYmIHZhbGlkQ2hlY2soZm9ybSkpIHtcclxuXHRcdHNob3dCbG9ja3MoYmxvY2tJbmRleCArPSAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmQoZm9ybSkge1xyXG5cdGxldCB2YWxpZCA9IHZhbGlkSW5wdXQoZm9ybSk7XHJcblx0aWYgKHZhbGlkID09PSAwICYmIHZhbGlkQ2hlY2soZm9ybSkpIHtcclxuXHRcdGZvcm1SZW1vdmVFcnJvcihxdWl6Rm9ybSk7XHJcblxyXG5cdFx0Ly8qID09PT09PT09INCh0L7QvtCx0YnQtdC90LjQtSDQvtCxINC+0YLQv9GA0LDQstC60LUgPT09PT09PT09PT09XHJcblx0XHRsZXQgb2sgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5xdWl6LXNlbmRfX29rJyk7XHJcblx0XHRsZXQgdGV4dE1lc3NhZ2UgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5xdWl6LW1lc3NhZ2UnKTtcclxuXHRcdGlmICh0ZXh0TWVzc2FnZSkge1xyXG5cdFx0XHR0ZXh0TWVzc2FnZS50ZXh0Q29udGVudCA9ICfQl9Cw0LPRgNGD0LfQutCwLi4uJztcclxuXHRcdFx0dGV4dE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8qPT09PT09PT09IEZvcm1EYXRhID09PT09PT09PT09PT09PVxyXG5cdFx0Y29uc3QgcXVpekZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblx0XHRmb3IgKGxldCBrZXkgaW4gcXVpelJlcGx5KSB7XHJcblx0XHRcdHF1aXpGb3JtRGF0YS5hcHBlbmQoa2V5LCBxdWl6UmVwbHlba2V5XSk7XHJcblx0XHR9XHJcblx0XHQvLyBmb3JtRGF0YS5hcHBlbmQoJ2ltYWdlJywgZm9ybUltYWdlLmZpbGVzWzBdKTtcclxuXHRcdC8vKiDQn9GA0L7QstC10YDQutCwIEZvcm1EYXRhXHJcblx0XHQvLyBmb3IodmFyIHBhaXIgb2YgcXVpekZvcm1EYXRhLmVudHJpZXMoKSkge1xyXG5cdFx0Ly8gXHRjb25zb2xlLmxvZyhwYWlyWzBdKyAnOiAnKyBwYWlyWzFdKTtcclxuXHRcdC8vIH1cclxuXHJcblx0XHQvLyo9PT09PT09PT0g0J7RgtC/0YDQsNCy0LrQsCDQtNCw0L3QvdGL0YUgPT09PT09PT09PT09PT09XHJcblx0XHRjb25zdCBxdWl6RGF0YSA9IGFzeW5jICh1cmwsIGRhdGEpID0+IHtcclxuXHRcdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcblx0XHRcdFx0bWV0aG9kOiBcIlBPU1RcIixcclxuXHRcdFx0XHRib2R5OiBkYXRhXHJcblx0XHRcdH0pO1x0XHJcblx0XHRcdGlmIChyZXNwb25zZS5vaykge1xyXG5cclxuXHRcdFx0XHQvLyBsZXQgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpOyAvLyBqc29uKCkgLSDQtNC70Y8g0LLRi9Cy0L7QtNCwINGB0L7QvtCx0YnQtdC90LjRjztcclxuXHRcdFx0XHQvLyBhbGVydChyZXN1bHQubWVzc2FnZSk7XHJcblxyXG5cdFx0XHRcdGxldCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7IC8vIHRleHQoKSAtINC00LvRjyDQv9GA0L7QstC10YDQutC4INC90LAg0YHQtdGA0LLQtdGA0LUsINC/0L7QtNC60LvRjtGH0LjRgtGMIHNlcnZlci5waHApXHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2cocmVzdWx0KTsgLy8g0Y3RgtC+INC00LvRjyDQv9GA0L7QstC10YDQutC4INC90LAg0YHQtdGA0LLQtdGA0LVcclxuXHJcblx0XHRcdFx0aWYgKHRleHRNZXNzYWdlKSB7XHJcblx0XHRcdFx0XHR0ZXh0TWVzc2FnZS50ZXh0Q29udGVudCA9ICdPayEnO1xyXG5cdFx0XHRcdFx0dGV4dE1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG9rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdGNsZWFySW5wdXRzKHF1aXpJbnB1dHMpO1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKHRleHRNZXNzYWdlKSB7XHJcblx0XHRcdFx0XHRcdHRleHRNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0b2suY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdFx0fSwgNTAwMCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0YWxlcnQoXCLQntGI0LjQsdC60LAgSFRUUDogXCIgKyByZXNwb25zZS5zdGF0dXMpO1xyXG5cdFx0XHRcdGlmICh0ZXh0TWVzc2FnZSkge1xyXG5cdFx0XHRcdFx0dGV4dE1lc3NhZ2UudGV4dENvbnRlbnQgPSAn0KfRgtC+LdGC0L4g0L/QvtGI0LvQviDQvdC1INGC0LDQui4uLic7XHJcblx0XHRcdFx0XHR0ZXh0TWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRpZiAodGV4dE1lc3NhZ2UpIHtcclxuXHRcdFx0XHRcdFx0dGV4dE1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSwgNTAwMCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHQvLyBxdWl6RGF0YSgnLi4vc2VuZG1haWwucGhwJywgcXVpekZvcm1EYXRhKTtcclxuXHRcdHF1aXpEYXRhKCcuLi9zZXJ2ZXIucGhwJywgcXVpekZvcm1EYXRhKSAvLyEg0YPQsdGA0LDRgtGMICjRjdGC0L4g0LTQu9GPINC/0YDQvtCy0LXRgNC60Lgg0L3QsCDRgdC10YDQstC10YDQtSlcclxuXHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRUb1NlbmQoZm9ybSwgb2JqKSB7XHJcblx0bGV0IHZhbHVlU3RyaW5nID0gJyc7XHJcblx0bGV0IGlucHV0cyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcclxuXHRsZXQgdGV4dGFyZWEgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RleHRhcmVhJyk7XHJcblx0aWYgKGlucHV0cy5sZW5ndGggPiAwKSB7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRsZXQgZmllbGQgPSBpbnB1dHNbaV07XHJcblx0XHRcdGlmIChmaWVsZC50eXBlICE9ICdjaGVja2JveCcgJiYgZmllbGQudHlwZSAhPSAncmFkaW8nICYmIGZpZWxkLnZhbHVlKSB7XHJcblx0XHRcdFx0b2JqW2ZpZWxkLm5hbWVdID0gZmllbGQudmFsdWU7XHJcblx0XHRcdH0gZWxzZSBpZiAoZmllbGQudHlwZSA9PSAncmFkaW8nICYmIGZpZWxkLmNoZWNrZWQpIHtcclxuXHRcdFx0XHRvYmpbZmllbGQubmFtZV0gPSBmaWVsZC52YWx1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChmaWVsZC50eXBlID09ICdjaGVja2JveCcgJiYgZmllbGQuY2hlY2tlZCkge1xyXG5cdFx0XHRcdHZhbHVlU3RyaW5nICs9IGZpZWxkLnZhbHVlICsgJywnO1x0XHRcclxuXHRcdFx0XHRvYmpbZmllbGQubmFtZV0gPSB2YWx1ZVN0cmluZztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0gZWxzZSBpZiAodGV4dGFyZWEubGVuZ3RoID4gMCkge1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0YXJlYS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRsZXQgdGV4dCA9IHRleHRhcmVhW2ldO1xyXG5cdFx0XHRpZiAodGV4dC52YWx1ZSkge1xyXG5cdFx0XHRcdG9ialt0ZXh0Lm5hbWVdID0gdGV4dC52YWx1ZTtcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59IiwiY29uc3QgcmFuZ2VTbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFuZ2Utc2xpZGVyJyk7XG5cbmlmIChyYW5nZVNsaWRlcikge1xuXHRub1VpU2xpZGVyLmNyZWF0ZShyYW5nZVNsaWRlciwge1xuICAgIHN0YXJ0OiBbNTAwLCA5OTk5OTldLFxuXHRcdGNvbm5lY3Q6IHRydWUsXG5cdFx0c3RlcDogMSxcbiAgICByYW5nZToge1xuXHRcdFx0J21pbic6IFs1MDBdLFxuXHRcdFx0J21heCc6IFs5OTk5OTldXG4gICAgfVxuXHR9KTtcblxuXHRjb25zdCBpbnB1dDAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtMCcpO1xuXHRjb25zdCBpbnB1dDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtMScpO1xuXHRjb25zdCBpbnB1dHMgPSBbaW5wdXQwLCBpbnB1dDFdO1xuXG5cdHJhbmdlU2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlKXtcblx0XHRpbnB1dHNbaGFuZGxlXS52YWx1ZSA9IE1hdGgucm91bmQodmFsdWVzW2hhbmRsZV0pO1xuXHR9KTtcblxuXHRjb25zdCBzZXRSYW5nZVNsaWRlciA9IChpLCB2YWx1ZSkgPT4ge1xuXHRcdGxldCBhcnIgPSBbbnVsbCwgbnVsbF07XG5cdFx0YXJyW2ldID0gdmFsdWU7XG5cdFx0cmFuZ2VTbGlkZXIubm9VaVNsaWRlci5zZXQoYXJyKTtcblx0fTtcblxuXHRpbnB1dHMuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG5cdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcblx0XHRcdHNldFJhbmdlU2xpZGVyKGluZGV4LCBlLmN1cnJlbnRUYXJnZXQudmFsdWUpO1xuXHRcdH0pO1xuXHR9KTtcbn0iLCJsZXQgdGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0YWxvZy1zaXplcyB0ZCcpO1xyXG5cclxudGQuZm9yRWFjaChpdGVtID0+IHtcclxuXHRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuXHRcdGxldCBzZWxmID0gZS5jdXJyZW50VGFyZ2V0O1xyXG5cdFx0aXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2RiYmJhOSc7XHJcblx0XHR0ZC5mb3JFYWNoKGJ0biA9PiB7XHJcblx0XHRcdGlmIChidG4gIT09IHNlbGYpIHtcclxuXHRcdFx0XHRidG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn0pOyIsIi8vKiDQktCw0LvQuNC00LDRhtC40Y8g0YTQvtGA0LzRiyAo0LXRgdC70Lgg0YfQtdC60LHQvtC60YHRiyDQuCDQuNC90L/Rg9GC0Ysg0LIg0L7QtNC90L7QuSDRhNC+0YDQvNC1KVxyXG5mdW5jdGlvbiB2YWxpZENoZWNrKGZvcm0pIHtcclxuXHRsZXQgZWxlbWVudHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0Jyk7XHJcblx0bGV0IGlzVmFsaWQgPSBmYWxzZTtcclxuXHRpZiAoZWxlbWVudHMubGVuZ3RoID4gMCkge1xyXG5cdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGVsZW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cdFx0XHRsZXQgaW5wdXQgPSBlbGVtZW50c1tpbmRleF07XHJcblx0XHRcdGlmICghaW5wdXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdub3QtdmFsaWQnKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpID09PSBcImNoZWNrYm94XCIgfHwgaW5wdXQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSA9PT0gXCJyYWRpb1wiKSB7XHJcblx0XHRcdFx0XHRpZiAoaW5wdXQuY2hlY2tlZCkge1xyXG5cdFx0XHRcdFx0XHRpc1ZhbGlkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGZvcm1BZGRFcnJvcihpbnB1dCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7aXNWYWxpZCA9IHRydWU7fVxyXG5cdFx0fVxyXG5cdH0gZWxzZSB7aXNWYWxpZCA9IHRydWU7fVxyXG5cclxuXHRyZXR1cm4gaXNWYWxpZDtcclxufVxyXG5mdW5jdGlvbiB2YWxpZElucHV0KGZvcm0pIHtcclxuXHRsZXQgZWxlbWVudHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0Jyk7XHJcblx0bGV0IGVycm9yID0gMDtcclxuXHRpZiAoZWxlbWVudHMubGVuZ3RoID4gMCkge1xyXG5cdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGVsZW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cdFx0XHRsZXQgaW5wdXQgPSBlbGVtZW50c1tpbmRleF07XHJcblx0XHRcdGxldCBwbGFjZWhvbGRlciA9IGlucHV0LmdldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInKTtcclxuXHRcdFx0aWYgKCFpbnB1dC5jbGFzc0xpc3QuY29udGFpbnMoJ25vdC12YWxpZCcpKSB7XHJcblx0XHRcdFx0aWYgKGlucHV0LmNsYXNzTGlzdC5jb250YWlucygnZW1haWwnKSkge1xyXG5cdFx0XHRcdFx0aWYgKGVtYWlsVGVzdChpbnB1dCkgfHwgaW5wdXQudmFsdWUgPT0gcGxhY2Vob2xkZXIpIHtcclxuXHRcdFx0XHRcdFx0Zm9ybUFkZEVycm9yKGlucHV0KTtcclxuXHRcdFx0XHRcdFx0ZXJyb3IrKztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKGlucHV0LnZhbHVlID09ICcnIHx8IGlucHV0LnZhbHVlID09IHBsYWNlaG9sZGVyKSB7XHJcblx0XHRcdFx0XHRcdGZvcm1BZGRFcnJvcihpbnB1dCk7XHJcblx0XHRcdFx0XHRcdGVycm9yKys7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZXJyb3I7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1BZGRFcnJvcihpdGVtKSB7XHJcblx0aXRlbS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XHJcblx0aXRlbS5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xyXG5cclxuXHRpZiAoaXRlbS5jbG9zZXN0KCcucXVpei1mb3JtJykpIHtcclxuXHRcdGxldCBxdWl6RXJyb3IgPSBpdGVtLmNsb3Nlc3QoJy5xdWl6LWJsb2NrJykucXVlcnlTZWxlY3RvcignLnF1aXotbWVzc2FnZScpO1xyXG5cdFx0aWYgKHF1aXpFcnJvcikge1xyXG5cdFx0XHRxdWl6RXJyb3IuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdGxldCBmb3JtRXJyb3IgPSBpdGVtLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tbWVzc2FnZScpO1xyXG5cdFx0aWYgKGZvcm1FcnJvcikge1xyXG5cdFx0XHRmb3JtRXJyb3IuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JtUmVtb3ZlRXJyb3IoZm9ybSkge1xyXG5cdGxldCBpbnB1dHMgPSBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCB0ZXh0YXJlYScpO1xyXG5cdGlmIChpbnB1dHMubGVuZ3RoID4gMCkge1xyXG5cdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGlucHV0cy5sZW5ndGg7IGluZGV4KyspIHtcclxuXHRcdFx0bGV0IGlucHV0ID0gaW5wdXRzW2luZGV4XTtcclxuXHRcdFx0aWYgKCFpbnB1dC5jbGFzc0xpc3QuY29udGFpbnMoJ25vdC12YWxpZCcpKSB7XHJcblx0XHRcdFx0aW5wdXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xyXG5cdFx0XHRcdGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0bGV0IGZvcm1FcnJvciA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLmZvcm0tbWVzc2FnZScpO1xyXG5cdGlmIChmb3JtRXJyb3IubGVuZ3RoID4gMCkge1xyXG5cdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGZvcm1FcnJvci5sZW5ndGg7IGluZGV4KyspIHtcclxuXHRcdFx0Y29uc3QgZXJyb3IgPSBmb3JtRXJyb3JbaW5kZXhdO1xyXG5cdFx0XHRlcnJvci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVtYWlsVGVzdChzZWxlY3Rvcikge1xyXG5cdHJldHVybiAhL15cXHcrKFtcXC4tXT9cXHcrKSpAXFx3KyhbXFwuLV0/XFx3KykqKFxcLlxcd3syLDh9KSskLy50ZXN0KHNlbGVjdG9yLnZhbHVlKTtcclxufVxyXG5cclxuY29uc3QgdGV4dElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVjaycpOyAgIFxyXG50ZXh0SW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xyXG5cdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0aWYgKGUua2V5Lm1hdGNoKC9bXtCwLdGP0ZEgMC05XS9pZykpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLnZhbHVlPXRoaXMudmFsdWUucmVwbGFjZSgvW15cXNCwLdGP0ZEgMC05XS9pZyxcIlwiKTtcclxuXHR9KTtcclxufSk7Il19

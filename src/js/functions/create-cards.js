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
								<button class="catalog-item__btn btn-reset modal-btn" data-id="${item.id}" data-btn="modal-prod" aria-label="Показать информацию о товаре">
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
			bindModal(loadModalData);
			//todo - переменную const modalBtn перенести внутрь функции bindModal
			//todo - добавить аргумент func в функцию bindModal(func)
			//todo - вставить этот код в функцию bindModal (модальное окно) в момент открытия окна (после disableScroll)
			// получение id кнопки
			// if (modalContent.classList.contains('modal-prod')) {
			// 	let openBtnId = lastFocus.dataset.id;
			// 	func(openBtnId);
			// }

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
				bindModal(loadModalData);
			});
			
		} else {
			console.log(('error', response.status));
		}
	};

	loadProducts();

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
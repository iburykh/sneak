const catalogProducts = document.querySelector('.catalog__wrap');
if (catalogProducts) {
	//* делаем видимыми кнопки товара при фокусе (по умолчанию они скрыты)
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

// работа мини-корзины
const miniCartList = document.querySelector('.mini-cart__list');
const fullPrice = document.querySelector('.mini-cart__summ');
const cartCount = document.querySelector('.cart__count');
let price = 0;

// функция вставляет пробел между разрядами
const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
// функция удаляет пробел между разрядами
const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const createCart = function () {
	miniCartList.insertAdjacentHTML('afterbegin', `
		<li class="mini-cart__item">
			<div class="mini-cart__image">
				<img src="img/image.jpg" alt="изображение" width="100" height="100">
			</div>
			<div class="mini-cart__content">
				<h3 class="mini-cart__title">Кроссовки Nike Air Force 1 '07 QS</h3>
				<span class="mini-cart__price">11 000 р</span>
			</div>
			<button class="mini-cart__delete btn-reset"></button>
		</li>
	`);

	price += 11000;
	fullPrice.textContent = `${normalPrice(price)} р`;

	// получаем количество товара, добавляем его в показаель количества и делаем активным кружочек с количеством
	let num = document.querySelectorAll('.mini-cart__item').length;
	if (num > 0) {
		cartCount.classList.add('cart__count--active');
	}
	cartCount.textContent = num;
	// делаем значек корзины доступным для клика
	document.querySelector('.cart').removeAttribute('disabled');
}

// при нажатии на кнопку "добавить в корзину" - товар добавляется в корзину
catalogProducts.addEventListener('click', (e) => {
	if (e.target.classList.contains('add-to-cart-btn')) {
		createCart();
	}
});

// при нажатии на кнопку "заказать" в модальном окне корзины - товар добавляется в корзину
const modalOrder = document.querySelector('.modal-info__order');
modalOrder.addEventListener('click', (e) => {
	createCart();
});

// кнопки размера в модальном окне
const modalSize = document.querySelectorAll('.modal-info__size');
modalSize.forEach(function(el) {
	el.addEventListener('click', function(e) {
		let self = e.currentTarget;
		el.style.backgroundColor = '#b2b5bb';
		modalSize.forEach(btn => {
			if (btn !== self) {
				btn.style.backgroundColor = 'transparent';
			}
		});
	});
});

miniCartList.addEventListener('click', (e) => {
	// при клике на кнопку "удалить товар из корзины" удаляем единицу товара, меняем сумму и количество
	if (e.target.classList.contains('mini-cart__delete')) {
		const self = e.target;
		const parent = self.closest('.mini-cart__item');
		parent.remove();
		price -= 11000;
		fullPrice.textContent = `${normalPrice(price)} р`;
		let num = document.querySelectorAll('.mini-cart__list .mini-cart__item').length;
		if (num == 0) {
			cartCount.classList.remove('cart__count--active');
			miniCart.classList.remove('mini-cart--open');
			document.querySelector('.cart').setAttribute("disabled", "disabled");
		}
		cartCount.textContent = num;

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
openOrderModal.addEventListener('click', () => {
	const productsMiniCart = document.querySelectorAll('.mini-cart__item');
	const productsQuantity = productsMiniCart.length;
	orderModalList.innerHTML = '';
	productsMiniCart.forEach(function(el) {
		modalCartLoad();
	});

	document.querySelector('.modal-cart-form__submit').removeAttribute("disabled", "disabled");

	orderModalQuantity.textContent = `${productsQuantity} шт`;
	orderModalSumm.textContent = fullPrice.textContent;
});

// функция заполнения модального окна товароми из мини-корзины
const modalCartLoad = () => {
	orderModalList.insertAdjacentHTML('afterbegin', `
		<li class="modal-cart-product">
			<div class="modal-cart-product__image">
				<img src="img/image.jpg" alt="изображение" width="80" height="80">
			</div>
			<div class="modal-cart-product__content">
				<h3 class="modal-cart-product__title">Кроссовки Nike Air Force 1 '07 QS</h3>
				<span class="modal-cart-product__price">11 000 p</span>
			</div>
			<button class="modal-cart-product__delete btn-reset">Удалить</button>
		</li>
	`);
};

// удаление товаров из окна корзины
orderModalList.addEventListener('click', (e) => {
	if (e.target.classList.contains('modal-cart-product__delete')) {
		const self = e.target;
		const parent = self.closest('.modal-cart-product');
		// parent.remove();

		const productsMiniCart = document.querySelectorAll('.mini-cart__item');
		for (let i = 0; i < productsMiniCart.length; i++) {
			let item = productsMiniCart[i];
			if (i == 0) {
				item.remove();
			}
		}
		
		parent.style.opacity = '0';
		setTimeout(() => {
			parent.style.marginBottom = '0px';
			parent.style.maxHeight = '0px';
		}, 100);

		// изменяем общую стоимость товаров в окне и в мини-корзине
		price -= 11000;
		setTimeout(() => {
			parent.remove();
			let num = document.querySelectorAll('.modal-cart-product').length;
			if (num == 0) {
				cartCount.classList.remove('cart__count--active');
				document.querySelector('.cart').setAttribute("disabled", "disabled");
				document.querySelector('.modal-cart-form__submit').setAttribute("disabled", "disabled");
				orderModalShow.classList.remove('active');
			}
			cartCount.textContent = num; 
			orderModalSumm.textContent = `${normalPrice(price)} р`;
			orderModalQuantity.textContent = `${num} шт`;
			fullPrice.textContent = `${normalPrice(price)} р`;
		}, 300);


	}
});

// очищение корзины после нажатия кнопки "заказать" (используется в форме заказа)
function allDel() {
	orderModalShow.classList.remove('active');
	orderModalList.hidden = true;

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
	price =  0;
}

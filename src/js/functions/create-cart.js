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
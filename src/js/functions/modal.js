//TODO Добавить классы:
//* data-btn="modal-name" - добавить кнопкам открытия модального окна (modal-name - имя окна, которое должно открыться)
//* data-modal - добавить всем модальным окнам (modal-name) (если их несколько)
//* block-fix - добавить класс для блоков с position: absolute или fixed (добавится padding)
//* small-fix - добавить класс для маленьких блоков с position: absolute или fixed (добавится margin)
//* data-inside - добавить кнопкам внутри модального окна, которые открывают следующее модальное окно (что бы сохранить фокус на кнопке вне окна)

//? эти параметры указывать, если они разные для разных окон - если одинаковые - меняем speedTime и modalAnimation
//* data-speed="300" - добавить время выполнения, по умолчанию 500 (ставится в соответствии с $transition-time)
//* data-animation="fadeInUp"  - добавить анимацию при открытии модального окна (контента внутри оболочки), по умолчанию 'fade'
const modalSlider = function() {
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
const lazyVideo = document.querySelector('iframe[data-src]');
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
if (modal) {
	modalBtn.forEach(function(item) {
		item.addEventListener('click', function(e) {
			let target = e.currentTarget;
			if (target) {
				e.preventDefault();
				let modalName = target.dataset.btn;
				modalContent = document.querySelector(`.${modalName}`);
				let speed = target.dataset.speed;
				speedTime = speed ? parseInt(speed) : 500;
				openModal();
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
	openWindows.forEach(item => {
		item.classList.remove('modal-open');
		item.setAttribute('aria-hidden', true);
	});

	if (!modal.classList.contains('is-open')){
		disableScroll();
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
	if (modalContent.classList.contains('modal-prod')) {
		modalSlider();
		lazyVideo.src = lazyVideo.dataset.src;
		lazyVideo.removeAttribute('data-src');
	}
	setTimeout(() => {
		focusTrap();
	}, speedTime);
}

function closeModal() {
	openWindows.forEach(item => {
		item.classList.remove('modal-open');
		item.setAttribute('aria-hidden', true);
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
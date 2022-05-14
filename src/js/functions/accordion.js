const btns = document.querySelectorAll('.spoiler__btn');

btns.forEach(btn => {
	btn.addEventListener('click', function(e) {
		const spollersBlock = this.closest('.spoilers');
		const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
		if (!spollersBlock.querySelectorAll('.slide').length) {
			if (oneSpoller && !this.classList.contains('active')) {
				const spollerActive = spollersBlock.querySelector('.spoiler__btn.active');
				if (spollerActive) {
					spollerActive.classList.remove('active');
					slideUp(spollerActive.nextElementSibling, 500);
				}
			}
			this.classList.toggle('active');
			slideToggle(this.nextElementSibling, 500);
		}
	});
});

// ==================================================================
//SlideToggle
let slideUp = (target, duration = 500) => {
	if (!target.classList.contains('slide')) {
		target.classList.add('slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('slide');
		}, duration);
	}
}
let slideDown = (target, duration = 500) => {
if (!target.classList.contains('slide')) {
	target.classList.add('slide');
	if (target.hidden) {
		target.hidden = false;
	}
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('slide');
	}, duration);
}
}
let slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return slideDown(target, duration);
	} else {
		return slideUp(target, duration);
	}
}
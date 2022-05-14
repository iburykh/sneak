let flag = 0;
let lazyScript = document.querySelectorAll('script[data-src]');

window.addEventListener('scroll', function() {
	let scrollY = window.scrollY;
	let mapOffset = document.querySelector("#map").offsetTop;

	if ((scrollY >= mapOffset - 500) && (flag == 0)) {
		flag = 1;
		// Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором
		loadScript();
	}
});

// Функция загрузки API Яндекс.Карт
function loadScript(){
	let script = document.createElement("script");

	if (script.readyState) {  // IE
		script.onreadystatechange = function(){
			if (script.readyState == "loaded" || script.readyState == "complete") {
				script.onreadystatechange = null;
				ymaps.ready(init);
			}
		};
	} else {  // Другие браузеры
		script.onload = function(){
			ymaps.ready(init);
		};
	}

	script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
	document.getElementsByTagName("head")[0].appendChild(script);
}

//Функция создания карты сайта и затем вставки ее в блок с идентификатором map;
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
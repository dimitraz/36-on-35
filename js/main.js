// To make images retina, add a class "2x" to the img element
// and add a <image-name>@2x.png image. Assumes jquery is loaded.

function isRetina() {
	var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
					  (min--moz-device-pixel-ratio: 1.5),\
					  (-o-min-device-pixel-ratio: 3/2),\
					  (min-resolution: 1.5dppx)";

	if (window.devicePixelRatio > 1)
		return true;

	if (window.matchMedia && window.matchMedia(mediaQuery).matches)
		return true;

	return false;
};

function retina() {
	if (!isRetina())
		return;

	$("img.2x").map(function (i, image) {
		var path = $(image).attr("src");

		path = path.replace(".png", "@2x.png");
		path = path.replace(".jpg", "@2x.jpg");

		$(image).attr("src", path);
	});
};

$(document).ready(function () {
	let images = document.querySelectorAll('[data-src]')

	const interactSettings = {
		root: document.querySelector('.center'),
		rootMargin: '0px 0px 200px 0px'
	};

	function onIntersection(imageEntites) {
		imageEntites.forEach(image => {
			if (image.isIntersecting) {
				observer.unobserve(image.target);
				image.target.src = image.target.dataset.src;
				image.target.onload = () => image.target.classList.add('loaded');
			}
		});
	}

	let observer = new IntersectionObserver(onIntersection, interactSettings);
	images.forEach(image => observer.observe(image));
	retina();
});

$('.toggleOpen').click(function () {
	$('#overview').removeClass("fadeOut")
		.addClass("fadeIn").toggle();
});

$('#overview').click(function () {
	$('#overview').removeClass("fadeIn")
		.addClass("fadeOut");
	$('#overview').toggle();
});
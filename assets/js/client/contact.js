$(document).on('click', '#x-btn', () => {
	$('.navbar-side').css({ left: '-200rem' });
	$('#toggleBtn').css('transform', 'rotate(-180deg)');
});

$(document).on('click', '#toggleBtn', () => {
	const heightOfContainer = $('html').height();
	$('.navbar-side').css({ left: '0rem', height: `${heightOfContainer}` });
	$('#toggleBtn').css('transform', 'rotate(90deg)');
});
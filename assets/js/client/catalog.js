$(document).ready(function () {
    $('.owl-carousel1').owlCarousel({
        autoplay: true,
        autoplayTimeout: 3000,
        loop: true,
        margin: 30,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            577: {
                items: 2
            },
            1100: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    })
});

$(document).on('click', ".category-item", function () {
    $('.category-item').not(this).removeClass('active');
    $(this).addClass("active");
})

db.ref("/book-type").on("value", function (snap) {
    let categoryObj = snap.val()
    let categoryArr = Object.entries(categoryObj).reverse();
    let idObjectArray = categoryArr.map(item => {
        return {
            id: item[0],
            ...item[1]
        }
    })

    renderCategoryPage(idObjectArray);
})

function renderCategoryPage(arr) {
    $("#catalogType").html(arr.map(item => {
        return `<span class="category-item" value="${item.category}">${item.category}</span>`
    }))
}

db.ref("/books").on("value", function (snap) {
    let bookObj = snap.val()
    let bookArr = Object.entries(bookObj).reverse();
    let bookObjArr = bookArr.map(item => {
        return {
            id: item[0],
            ...item[1]
        }
    })

    renderBookPage(bookObjArr);
    renderBestseller(bookObjArr)
})

function showBooks(item, tagName) {
    let bookName = item.bookName.substring(0, 16);
    let authorName = item.authorName.substring(0, 20);
    let image = '';
    item.image ? image = item.image : image = "https://www.iconattitude.com/icons/open_icon_library/oxygen-style/png/256/x-office-address-book.png";
    let div = $("<div>").addClass("card").html(`
              <img class="card-img-top d-block"
                src="${image}"
                alt="">
             <div class="card-body px-0 text-center">
                 <h6 class="card-book-name">${bookName}</h6>
              <p class="card-author-name">${authorName}</p>
            <a href="" class="btn btn-block card-btn">Read more</a>
            </div>`);
    $(tagName).trigger('add.owl.carousel', div)

}

function renderBookPage(arr) {

    for (let item of arr) {
        showBooks(item, '#allBookList');
    }
}

function renderBestseller(arr) {

    for (let item of arr) {
        if (item.category === 'fantastic') {
            showBooks(item, '#bestsellerBooks');
        }
    }
}


$(document).on('click', '#x-btn', () => {
	$('.navbar-side').css({ left: '-200rem' });
	$('#toggleBtn').css('transform', 'rotate(-180deg)');
});

$(document).on('click', '#toggleBtn', () => {
	const heightOfContainer = $('html').height();
	$('.navbar-side').css({ left: '0rem', height: `${heightOfContainer}` });
	$('#toggleBtn').css('transform', 'rotate(90deg)');
});
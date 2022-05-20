// **************************************
// Login section
let loginPage = $("#loginPage");
let adminPage = $("#adminPage");

if (localStorage.getItem("login")) {
    loginPage.hide();
    adminPage.show();
} else {
    loginPage.show();
    adminPage.hide();
}

$("#loginBtn").on("click", (e) => {
    e.preventDefault();
    let usernameVal = $("#userName").val().trim();
    let passwordVal = $("#password").val().trim();
    let title = "";

    let clearInput = () => {
        $("#userName").val("");
        $("#password").val("");
    }

    if (usernameVal === "") {
        title = "Username can't be empty!"
    } else if (passwordVal === "") {
        title = "Password can't be empty!"
    } else if (passwordVal.length < 8) {
        title = "Password can't be shorter than 8 characters!"
    } else {
        db.ref('/login').on("value", function (snap) {
            let username = snap.val().name;
            let password = snap.val().password;
            if (usernameVal == username && passwordVal == password) {
                localStorage.setItem("login", JSON.stringify(snap.val()));
                clearInput();
                loginPage.hide();
                adminPage.show();
            } else {
                swal({
                    icon: 'error',
                    title: 'Eroor...',
                    text: 'Username or password is incorrect',
                })
                clearInput();
            }
        });
        return;
    }

    swal({
        icon: 'error',
        title: 'Error...',
        text: title,
    })

    clearInput();
})

// **************************************
// Logout section

$("#logoutBtn").on("click", () => {
    localStorage.removeItem("login");
    loginPage.show();
    adminPage.hide();
})

// **************************************
// Clear input of book section

let clearBookInput = () => {
    $("#bookName").val("");
    $("#authorName").val("");
    $("#bookImageUrl").val("");
    $("#addBookDescription").val("");
    $("#publicationYear").val("");
    $("#isNew").prop("checked", false);
}

// **************************************
// Search section

$("#searchBtn").on("click", (e) => {
    e.preventDefault();
    $("#searchInput").val() !== "" ? $("#searchResult").show() : false;
})

$("#searchResult").on("click", () => {
    $("#searchResult").hide();
    $("#searchInput").val("");
});

$("#searchBtn").on("click", () => {
    $("#searchResult ul").html(`<img id="loadingImg" src="./assets/img/loading.gif" width="50" class="d-block m-auto" alt="">`);
    let search = $("#searchInput").val();
    const books = {
        "async": true,
        "crossDomain": true,
        "url": `https://www.googleapis.com/books/v1/volumes?q=${search}`,
        "method": "GET",
    };

    $.ajax(books).then(function (response) {
        $("#searchResult ul").html("");
        let dataArr = response.items;
        if (!dataArr) {
            $("#searchResult ul").html(`<p class="text-danger">No results found for your search</p>`);
        } else {
            for (let item of dataArr) {
                let data = item.volumeInfo;
                let searchImg = '';
                data.imageLinks.thumbnail ? searchImg = data.imageLinks.thumbnail : searchImg = './assets/img/book.png';
                let searchRes = $("<li>").addClass("row align-items-center mb-3 cursor-pointer").attr("data-name", data.authors);
                searchRes.html(`<img src="${searchImg}" class="col-4 search-img" alt=""><span class="col-8">${data.authors}</span>`);
                $("#searchResult ul").append(searchRes);
                searchRes.on("click", function () {
                    clearBookInput();
                    getBookInfo(data);
                })
            }
        }
    })
})

// **************************************
// Add book section

$("#addBookDescription").on("change keyup paste", () => {
    $("#bookTextareaCount").text($("#addBookDescription").val().length);
    if ($("#addBookDescription").val().length >= 100) {
        $("#bookTextarea").addClass("text-danger");
    } else {
        $("#bookTextarea").removeClass("text-danger");
    }
})

// ***************************************
// Get book information and write to input

function getBookInfo(data) {
    $("#bookName").val(data.title);
    $("#authorName").val(data.authors);
    $("#addBookDescription").val(data.description);
    if (data.imageLinks.thumbnail) {
        $("#bookImageUrl").val(data.imageLinks.thumbnail);
    }

    if (data.publishedDate) {
        let publishYear = parseInt(data.publishedDate.substring(0, 4))
        let thisYear = new Date().getFullYear();
        $("#publicationYear").val(publishYear);

        if (publishYear >= (thisYear - 2)) {
            $("#isNew").prop("checked", true);
        }
    }
}


// **************************************
// Add and Show Book Type Section

let addTypeSection = $('#addTypeSection');
let dbBookType = db.ref("/book-type");
let bookTypeInput = $("#bookTypeInput");

$('#addTypeBtn').click(function (e) {
    addTypeSection.toggle();
    e.stopPropagation();
});

$("body").click(function () {
    addTypeSection.hide();
});

addTypeSection.click(function (e) {
    e.stopPropagation();
});

dbBookType.on("value", function (snap) {
    let categoryObj = snap.val()
    let categoryArr = Object.entries(categoryObj).reverse();
    let idObjectArray = categoryArr.map(item => {
        return {
            id: item[0],
            ...item[1]
        }
    })

    renderPage(idObjectArray);
})

function renderPage(arr) {
    $("#categorySelect").html(arr.map(item => {
        return `<option value="${item.category}">${item.category}</option>`
    }))
}

$("#bookTypeBtn").on("click", (e) => {
    e.preventDefault();
    addTypeSection.hide();
    let typeVal = bookTypeInput.val().trim();
    if (typeVal) {
        dbBookType.push().set({ category: typeVal })
        swal({
            icon: 'success',
            title: 'Success...',
            text: "Book type successfully added",
        })
    } else {
        swal({
            icon: 'error',
            title: 'Error...',
            text: "Book type can't be empty",
        })
    }
    bookTypeInput.val("");
})


// **************************************
// Add book to firebase section

$("#addBookBtn").on("click", function () {
    let bookName = $("#bookName").val();
    let authorName = $("#authorName").val();
    let image = $("#bookImageUrl").val();
    let year = $("#publicationYear").val();
    let description = $("#addBookDescription").val();
    let category = $("#categorySelect").val();
    let isNew = $("#isNew").is(":checked");

    let bookObj = {
        bookName,
        authorName,
        image,
        year,
        description,
        isNew,
        category
    }

    db.ref("/books").push().set(bookObj);

    swal({
        icon: 'success',
        title: 'Success...',
        text: "Book successfully added",
    })
})








// *****************************
// About store section (Jalə)

// Your code is here

// End of about store section
// *****************************





// *****************************
// Join us section (Xalid)

// Your code is here

// End of join us section
// *****************************





// *****************************
// Contact us section (Ruslan)

// Your code is here

// End of contact us section
// *****************************
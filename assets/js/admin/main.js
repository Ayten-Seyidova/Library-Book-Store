// Login section

if (localStorage.getItem("login")) {
    $("#loginPage").hide();
    $("#adminPage").show();
} else {
    $("#loginPage").show();
    $("#adminPage").hide();
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
                $("#loginPage").hide();
                $("#adminPage").show();
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

// Logout section

$("#logoutBtn").on("click", () => {
    localStorage.removeItem("login");
    $("#loginPage").show();
    $("#adminPage").hide();
})


// Search section

$("#searchBtn").on("click", (e) => {
    e.preventDefault();
    $("#searchInput").val() !== "" ? $("#searchResult").show() : false;
})

$("#searchResult").on("click", () => {
    $("#searchResult").hide();
    $("#searchInput").val("")
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
                let searchRes = $("<li>").addClass("row align-items-center mb-3 cursor-pointer");
                searchRes.html(`<img src="${searchImg}" class="col-4 search-img" alt=""><span class="col-8">${data.authors}</span>`);
                $("#searchResult ul").append(searchRes);
            }
        }
    })
})

// Add book section

$("#addBookDescription").keyup(() => {
    $("#bookTextareaCount").text($("#addBookDescription").val().length);
    if ($("#addBookDescription").val().length == 100) {
        $("#bookTextarea").addClass("text-danger");
    } else {
        $("#bookTextarea").removeClass("text-danger");
    }
})


// Add Type Section

$('#addTypeBtn').click(function (e) {
    $('#addTypeSection').toggle();
    e.stopPropagation();
});

$("body").click(function () {
    $('#addTypeSection').hide();
});

$('#addTypeSection').click(function (e) {
    e.stopPropagation();
});

$("#bookTypeBtn").on("click", (e) => {
    e.preventDefault();
    $('#addTypeSection').hide();
    swal({
        icon: 'success',
        title: 'Success...',
        text: "Book type successfully added",
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
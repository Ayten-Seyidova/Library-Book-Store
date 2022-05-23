$(document).on('click', '#x-btn', () => {
	$('.navbar-side').css({ left: '-200rem' });
	$('#toggleBtn').css('transform', 'rotate(-180deg)');
});

$(document).on('click', '#toggleBtn', () => {
	const heightOfContainer = $('html').height();
	$('.navbar-side').css({ left: '0rem', height: `${heightOfContainer}` });
	$('#toggleBtn').css('transform', 'rotate(90deg)');
});

$(document).ready(function () {
    let userCollection = db.ref("/users")
    $(document).on("click", "#addJoin", function (e) {
        e.preventDefault()
        var joinFullName = $("#joinFullName").val().trim();
        var joinEmail = $("#joinEmail").val().trim();
        let formData = {
            joinFullName,
            joinEmail
        }
        if (!joinFullName) {
            $("#alertJoinFirst").removeClass("d-none")
            setTimeout(() => alertSetTimeout(), 2000)

            function alertSetTimeout() {
                $("#alertJoinFirst").addClass("d-none")
            }
        }
        if (!joinEmail) {
            $("#alertJoinSecond").removeClass("d-none")
            setTimeout(() => alertSetTimeoutFunc(), 2000)

            function alertSetTimeoutFunc() {
                $("#alertJoinSecond").addClass("d-none")
            }
        } else {
            userCollection.push().set(formData)
            swal({
                icon: 'success',
                title: 'Success...',
                text: "Successfully added",
            })
            $("#joinFullName").val("")
            $("#joinEmail").val("")

        }
    })
})

$(document).on('click', '#x-btn', () => {
    $('.navbar-side').css({ left: '-200rem' });
    $('#toggleBtn').css('transform', 'rotate(-180deg)');
});

$(document).on('click', '#toggleBtn', () => {
    const heightOfContainer = $('html').height();
    $('.navbar-side').css({ left: '0rem', height: `${heightOfContainer}` });
    $('#toggleBtn').css('transform', 'rotate(90deg)');
});
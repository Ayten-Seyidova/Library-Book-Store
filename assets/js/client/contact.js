/*************Join us js */
$(document).ready(function () {

    let userCollection = db.ref("/users")
    // let addJoin = $("#addJoin")
    $(document).on("click", "#addJoin", function (e) {
      e.preventDefault()
      var joinFullName = $("#joinFullName").val()
      var joinEmail = $("#joinEmail").val()
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
      }
  
      console.log(joinFullName, joinEmail);
      if (formData) {
        userCollection.push().set(formData)
        $("#joinFullName").val("")
        $("#joinEmail").val("")
      }
      console.log(formData);
      // function addJoinDb()
    })
  
  
  })
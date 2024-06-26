$(document).ready(function() {
  // small effect for the sign up container
  $(".signUpContainer").hide();
  $(".signUpContainer").fadeIn(1500);
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  function handleLoginErr(err) {
    // $("#alert .msg").text("Error with User Credentials");
    $("#alert .msg").text(JSON.stringify(err));
    $("#alert").fadeIn(500);
  }

    // Does a post to the signup route. If successful, redirect to the 'login' page
  // Otherwise we log any errors
  function signUpUser(userData) {
    // console.log("userData:", userData);
    $.ajax({
      url: "/api/signup",
      data: userData,
      type: "POST"
    }).then(function(result) {
        // console.log(result);
        emailInput.val("");
        passwordInput.val("");
        // This is line of code is where it will redirect the first-time user.
        location.href = "/chooseCollege";


        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(function(err) {
        handleLoginErr(err);
      });
  }


  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      // TODO: need an error message for the user here
      alert('Enter valid input');
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
  });

});

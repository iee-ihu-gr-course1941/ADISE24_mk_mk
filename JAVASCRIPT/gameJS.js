//Arxikopoihsh twn listeners
$(function () {
    var signUpButton = document.getElementById("signUpbt");
    var cancelSignUpButton = document.getElementById("cancelSignUpbt");
  
    var logInButton = document.getElementById("logInBtn");
    var cancelLoginButton = document.getElementById("cancelLoginbt");
  
    signUpButton.addEventListener("click", signUp);
    cancelSignUpButton.addEventListener("click", cancelSignUp);
    logInButton.addEventListener("click", logIn);
    cancelLoginButton.addEventListener("click", showSignupForm);
   
  });
  
  //Global metavlhtes
  {
    var token;
    var counter = 0;

  }
  
  //H synarthsh setToken() orizei ena monadiko tyxaio 16bit token gia na ginetai eykola to authentication tou ka8e xrhsth
  function setToken() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    var counter = 0;
    token = "";
    while (counter < 16) {
      token += characters.charAt(Math.floor(Math.random() * 62));
      counter += 1;
    }
  }
  
  //start main.js
  
  //H synarthsh ypey8ynh gia thn egrafh twn xrhstwn sthn bash
  function signUp() {
    //apo8hkeysh tou input toy xrhsth se metavlhtes
    var username = document.getElementById("signUpusername").value;
    var password = document.getElementById("signUpPassword").value;
    var passwordRepeat = document.getElementById("signUpPasswordRepeat").value;
    //var tagName = selectedTag();
    //ana8esh token ston xrhsth pou ekane sign up
    setToken();
    
    //elegxos gia kena username h password
    if (username === "" || password === "" || passwordRepeat === "") {
      
      window.alert("Παρακαλώ συμπληρώστε όλα τα πεδία!");
     
      return false;
    } //elegxos oti ta password einai idia
    if (password != passwordRepeat) {
      window.alert("Οι κωδικοί δεν ταιριάζουν!");
      return false;
    }
  
    //Dhmhiourgia enos JSON antikeimeno
    var signUpdata = {
      playerUsername: username,
      playerPassword: password,
      playerPasswordRepeat: passwordRepeat,
      playerToken: token,
    };
  
    //klhsh Ajax gia eggrafh tou neou xrhsth sthn vash
    $.ajax({
      url: "PHP/signUp.php",
      method: "POST",
      dataType: "json",
      data: JSON.stringify(signUpdata),
      contentType: "application/json",
      success: function (response) {
        successMessage = response.message;
        alert(successMessage);
        document.getElementById("signUpForm").style.display = "none";
        document.getElementById("signInQuestion").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("logInQuestion").style.display = "block";
      },
      error: function (xhr, status, error) {
        console.log("XHR response:", xhr.responseText);  // Log raw response from the server
        if (xhr.status == 400) {
          try {
            var errorMessage = JSON.parse(xhr.responseText).message;
            alert(errorMessage);
          } catch (e) {
            alert("Error parsing the response: " + e.message);
          }
        } else {
          alert("Unexpected error: " + status + " - " + error);
        }
      }
    });
    
  
    var loginUsername = document.getElementById("loginUsername");
    var loginPassword = document.getElementById("loginPassword");
  
    loginUsername.value = "";
    loginPassword.value = "";
  }
  
  function cancelSignUp() {
    var username = document.getElementById("signUpusername");
    var password = document.getElementById("signUpPassword");
    var passwordRepeat = document.getElementById("signUpPasswordRepeat");
  
    username.value = "";
    password.value = "";
    passwordRepeat.value = "";
  }
  
  function showSignupForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signUpForm").style.display = "block";
    document.getElementById("signInQuestion").style.display = "block";
    document.getElementById("logInQuestion").style.display = "none";
    cancelSignUp();
  }
  
  //Synarthsh syndeshs tou xrhsth me thn bash
  function logIn() {
    //Apo8hkeysh tou input tou xrhsth se metavlhtes
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;
    //H ana8esh tou token ginetai ka8e fora pou kanei login o xrhsths ka8ws einai monadiko se ka8e session tou
    setToken();
    //Apo8hkeysh tou token sto session storage wste na einai emfanes kai meta apo allagh sthn current selida
    window.sessionStorage.setItem("token", token);
    var logInData = {
      playerUsername: username,
      playerPassword: password,
      playerToken: token,
    };
  
    //Ajax gia syndesh me thn bash kai oristiko login tou xrhsth
    $.ajax({
      url: "PHP/logIn.php",
      method: "POST",
      dataType: "json",
      data: JSON.stringify(logInData),
      contentType: "application/json",
      success: function (response) {
        if (response.status === "success") {
          alert(response.message);
          document.getElementById("loginForm").style.display = "none";
          document.getElementById("logInQuestion").style.display = "none";
          //an ola pane kala o xrhsths blepei thn game.html
          window.location.href = "HTML/game.html";
        } else {
          alert(response.message);
        }
      },
      error: function (jqXHR) {
        console.error("AJAX error:", jqXHR.responseJSON.message);
      },
    });
  
    //Enhmerwsh tou status tou paixnidiou
  
    //updateStatusLogin();
  }
  
  function showLogInForm() {
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signInQuestion").style.display = "none";
    document.getElementById("logInQuestion").style.display = "block";
  }
  
  //end of main.js
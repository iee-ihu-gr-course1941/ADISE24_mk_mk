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
        if (xhr.status == 400) {
          var errorMessage = JSON.parse(xhr.responseText).message;
          alert(errorMessage);
        } else {
          alert("Unexpected error: " + status + " - " + error);
        }
      },
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
  
    updateStatusLogin();
  }
  
  function showLogInForm() {
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signInQuestion").style.display = "none";
    document.getElementById("logInQuestion").style.display = "block";
  }
  
  //end of main.js
  
  //Synarthsh pou dhmiourgei tous pinakes
  function initiateBoards() {
    //apo8hkeysh toy token tou xrhsth (pou phre timh sto login) se topikh metavlhth
    token = window.sessionStorage.getItem("token");
    //emfanish twn koumpiwn topo8ethshs ploiwn kai "svhsimo" twn enarji paixnidiou kai kanonwn
    document.getElementById("startGameButton").style.visibility = "hidden";
    document.getElementById("rulesButton").style.visibility = "hidden";
  
    //Dhmiourgeia JSON antikeimenou me to token
    var resetBoardsData = {
      id: token,
    };
  
    //Reset tou board gia ton antistoixo xrhsth
    $.ajax({
      url: "../PHP/resetBoards.php",
      method: "POST",
      dataType: "json",
      data: JSON.stringify(resetBoardsData),
      contentType: "application/json",
      success: function (response) {
        successMessage = response.message;
        console.log(successMessage);
      },
      error: function (response) {
        successMessage = "Σφάλμα: " + response.message;
        console.log(successMessage);
      },
    });
  
    //Dhmioyrgeia tou pinaka topo8ethshs twn ploiwn
    var centerBoard = document.getElementById("boardL");
  
    var table = document.createElement("TABLE");
    table.border = "1";
  
    //O pinakas exei friendlyBoard id kai to ka8e cell $i,$j
    var tableBody = document.createElement("TBODY");
    tableBody.setAttribute("id", "friendlyBoard");
    table.appendChild(tableBody);
  
    //dhmiourgia twn keliwn tou friendlyBoard me event listener gia topo8ethsh ploiwn
    for (var i = 0; i < 10; i++) {
      var tr = document.createElement("TR");
      tableBody.appendChild(tr);
  
      for (var j = 0; j < 10; j++) {
        var td = document.createElement("TD");
        td.width = "75";
        td.height = "25";
        td.setAttribute("id", i + "," + j);
        td.addEventListener("click", placeShipOnBoard);
        td.appendChild(document.createTextNode(" "));
        tr.appendChild(td);
      }
    }
    centerBoard.appendChild(table);
 
    
  }
  
  
  //Path8hke to koumpi rules
  function goToRules() {
    window.open("./kanones.html");
  }
  
  //Synarthsh topo8ethshs ploiwn sthn bash, ka8e keli ploiou prosti8etai seiriaka ston antistoixo pinaka kai oxi ka8e ploio oloklhro
  function placeShipOnBoardDb(x, y) {
    //eisodos twn syntetagmenwn tou keliou
    x = parseInt(x);
    y = parseInt(y);
  
    //Dhmiourgeia enos JSON antikeimenou
    var placeShipData = {
      grammh: x,
      sthlh: y,
      id: token,
    };
  
    //klhsh tou Ajax gia thn topo8ethsh tou ka8e keliou tou ploiou sthn bash
    $.ajax({
      url: "../PHP/placeShipOnBoard.php",
      method: "POST",
      dataType: "json",
      data: JSON.stringify(placeShipData),
      contentType: "application/json",
      success: function (response) {
        successMessage = response.message;
        console.log(successMessage);
      },
      error: function (response) {
        //An kati den paei kala (O xrhsths topo8ethsei la8os ta ploia h diadikasia topo8ethshs jekinaei apo thn arxh)
        successMessage = "Σφάλμα: " + response.message;
        alert("Wrong Input");
        window.location.reload();
      },
    });
  }
  
  //H synarthsh elegxou tou apotelesmatos ths epi8eshs
  function attackShip(x, y) {
    //apo8hkeysh tou token se topikh metavlhth
    token = window.sessionStorage.getItem("token");
    //Dhmiourgeia enos JSON antikeimenou
    var attackShipData = {
      grammh: x,
      sthlh: y,
      id: token,
      content: 0,
    };
  
    //Klhsh tou ajax gia diapistosh an yparxei ploio h oxi sto antistoixo keli tou pinaka tou antipalou
    $.ajax({
      url: "../PHP/attackShip.php",
      method: "POST",
      dataType: "json",
      data: JSON.stringify(attackShipData),
      contentType: "application/json",
      async: !1,
      //an ola pane kala 8a klh8ei h attackResult
      success: attackResult,
      error: function (response) {
        successMessage = "Σφάλμα: " + response.message;
        console.log(successMessage);
      },
    });
  }
  
  //Kaleitai otan ola pane kala me to ajax sthn epi8esh kai kalei thn attackOnBoardResult(data) me to data na einai to JSON pou epistrefei to ajax
  function attackResult(data) {
    attackOnBoardResult(data);
  }
  
  //Kanei ton oristiko elegxo gia thn yparxh h mh ploiou sto keli pou epite8hke o xrhsths
  function attackOnBoardResult(data) {
    //apo8hkeysh tou json pou epestrepse to ajax se topikh metavlhth
    attackData = data;
    //apo8hkeysh twn timwn tou JSON se topikes metavlhtes
    var x = attackData.grammh;
    var y = attackData.sthlh;
    var result = attackData.content;
    //Dhmiourgeia tou html id tou keliou apo ta x kai y
    id = "enemy," + String(x) + "," + String(y);
    //An eixe ploio sto keli, to bafei kokkino kai enhmerwnei ton xrhsth
    if (result == 1) {
      document.getElementById(id).style.backgroundColor = "#8b0000";
      //alert("YOU GOT A HIT ON ENEMY SHIP!!");
    } //An oxi, to bafei mple kai enhmerwnei ton xrhsth
    else {
      document.getElementById(id).style.backgroundColor = "#000080";
      //alert("Unfortunetly you missed");
    }
    //Afairesh tou event listener apo to keli wste na mhn mporei na ginei attack se ena keli 2 fores
    document.getElementById(id).removeEventListener("click", attackOnBoard);
    //Epanafora tou attack flag sto false
    attackIsOn = false;
    //enhmerwsh tou status tou paixnidiou
    updateStatus();
  }
  
  function updateStatusLogin() {
    //apo8hkeysh tou token se topikh metavlhth
    token = window.sessionStorage.getItem("token");
    //Dhmiourgeia enos JSON antikeimenou
    var updateStatusData = {
      id: token,
      end_of_game: false,
      round: 0,
      winner: "",
    };
    //Xrhsh Ajax gia thn enhmerwsh tou status tou paixnidiou
    $.ajax({
      url: "PHP/gameStatus.php",
      method: "POST",
      dataType: "json",
      data: JSON.stringify(updateStatusData),
      contentType: "application/json",
      //an ola pane kala kaleitai h checkStatus
      success: checkStatus,
      error: function (response) {
        successMessage = "Σφάλμα: " + response.message;
        alert(successMessage);
      },
    });
  }
  
  //Synarthsh enhmerwshs tou status tou paixnidiou
  function updateStatus() {
    //apo8hkeysh tou token se topikh metavlhth
    token = window.sessionStorage.getItem("token");
    //Dhmiourgeia enos JSON antikeimenou
    var updateStatusData = {
      id: token,
      end_of_game: false,
      round: 0,
      winner: "",
    };
    //Xrhsh Ajax gia thn enhmerwsh tou status tou paixnidiou
    $.ajax({
      url: "../PHP/gameStatus.php",
      method: "POST",
      dataType: "json",
      data: JSON.stringify(updateStatusData),
      contentType: "application/json",
      //an ola pane kala kaleitai h checkStatus
      success: checkStatus,
      error: function (response) {
        successMessage = "Σφάλμα: " + response.message;
        alert(successMessage);
      },
    });
  }
  
  //Synarthsh pou elegxei thn katastash tou paixnidiou
  function checkStatus(data) {
    //apo8hkeysh twn timwn tou json pou epistrefei to ajax se topikes metavlhtes
    statusData = data;
    //to id edw DEN einai to token ALLA h etiketa tou user
    var id = statusData.id;
    window.sessionStorage.setItem("id",id);
    var hasEnded = statusData.end_of_game;
    var round = statusData.round;
    var winner = statusData.winner;
    if (hasEnded) {
      //alert(winner+","+id);
      if (winner == id) {
        alert("Συγχαρητήρια ΚΕΡΔΙΣΕΣ!!");
        updateStatus();
      } else {
        alert("Δυστηχώς έχασες!!");
        updateStatus();
      }
  
      $.ajax({
        url: "../PHP/resetStatus.php",
        method: "POST",
        contentType: "application/json",
        success: function (response) {
          successMessage = response.message;
          console.log(successMessage);
        },
        error: function (response) {
          successMessage = "Σφάλμα:!! " + response.message;
          alert(successMessage);
        },
      });
      window.location.reload();
    }
  }
  
  function getRound() {
    var getRoundData = {
      round: 0,
    };
  
    $.ajax({
      url: "../PHP/getRound.php",
      method: "POST",
      dataType: "json",
      data: JSON.stringify(getRoundData),
      async: false,
      contentType: "application/json",
      //an ola pane kala kaleitai h checkStatus
      success: setRound,
      error: function (response) {
        successMessage = "Σφάλμα: " + response.message;
        alert(successMessage);
      },
    });
  }
  
  function setRound(data) {
    getrData = data;
    round = Object.values(getrData.round)[0];;
    //alert(round);
    window.sessionStorage.setItem("round", round);
  }
  
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
  setInterval(checkGameState, 2000);
  //Global metavlhtes
  {
    var token;
    var counter = 0;
    var yourturn = false;
    
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
      
      window.alert("FILL ALL THE FIELDS!");
     
      return false;
    } //elegxos oti ta password einai idia
    if (password != passwordRepeat) {
      window.alert("THE PASSWORDS DONT MATCH!");
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
    document.getElementById("command").style.visibility = "visible";
    document.getElementById("command_submit").style.visibility = "visible";
  
    //Dhmiourgeia JSON antikeimenou me to token
    
  
    //Reset tou board gia ton antistoixo xrhsth
    $.ajax({
      url: "../PHP/resetBoard.php",
      method: "POST",
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
    tableBody.setAttribute("id", "ataxx_board");
    table.appendChild(tableBody);
  
    //dhmiourgia twn keliwn tou friendlyBoard me event listener gia topo8ethsh ploiwn
    for (var i = 0; i < 7; i++) {
      var tr = document.createElement("TR");
      tableBody.appendChild(tr);
  
      for (var j = 0; j < 7; j++) {
        var td = document.createElement("TD");
        td.width = "75";
        td.height = "25";
        td.setAttribute("id", i + "," + j);
        td.appendChild(document.createTextNode(""));
        tr.appendChild(td);
      }
    }
    centerBoard.appendChild(table);
    
      reset();
      
}
      
    
function play() {
  updateStatus();
  gettag();
  getRound();
  
  round = window.sessionStorage.getItem("round");
  tag = window.sessionStorage.getItem("id");

  if(round < 0){
    alert("YOU LOST");
    updateStatus();
    window.location.reload();
  }
  else if (String(tag).localeCompare("white") == 0) {
    if (round % 2 == 0) {
      if (noValidMove(tag)) {
        alert("You have no valid moves left!");
        updatevalidmove();
        updateStatus();
        incround();
      } 
          
      const input = document.getElementById('command').value;

      // Split the input by commas into an array
      const coordinatesArray = input.split(',');

      // Check if there are exactly 4 values
      if (coordinatesArray.length === 4) {
        // Assign the values to separate variables
        const [x1, y1, x2, y2] = coordinatesArray.map(coord => parseInt(coord.trim())); // Convert to integers
        if (x1 < 0 || x1 > 6 || y1 < 0 || y1 > 6 || x2 < 0 || x2 > 6 || y2 < 0 || y2 > 6) {
          // Display the values
          alert("out of bounds");
        }
        else {
          if (x1 == x2 && y1 == y2) {
            alert("invalid move! your origin block is also your destination block");
          }
          else {
            
            const originCell = document.getElementById(`${x1},${y1}`);
            const destinationCell = document.getElementById(`${x2},${y2}`);
            if (originCell.textContent == tag) {
              

              const dx = Math.abs(x2 - x1);
              const dy = Math.abs(y2 - y1);

              if (dx > 2 || dy > 2) {
                alert("Invalid move! You can only move to an adjacent cell.");
              }
              else {


                const result = validmove(x1, y1, x2, y2);
                if (result.valid == true) {
                  if (result.movetype == "adjacent") {
                    var cell = document.getElementById(`${x2},${y2}`);
                    if (cell) {
                      cell.textContent = tag;
                    }
                    turnAdjacentOpponents(x2, y2, tag);
                    updateStatusBoard(-1,-1,x2,y2,tag);
                    updateStatus();
                    incround();
                  } else if (result.movetype == "jump") {
                    var cell = document.getElementById(`${x2},${y2}`);
                    if (cell) {
                      cell.textContent = tag;
                    }
                    var cell = document.getElementById(`${x1},${y1}`);
                    if (cell) {
                      cell.textContent = " ";
                    }
                    turnAdjacentOpponents(x2, y2, tag);
                    updateStatusBoard(x1,y1,x2,y2,tag);
                    updateStatus();
                    incround();
                  }
                  
                  
                }
                else {
                  alert("invalid move");
                }
              }
            }
            else {
              alert("you cant move a empty space or  your opponents pawn");
            }
          }
        }
      }
      else {
        // Handle error if there are not exactly 4 values
        alert("the correct way to write the command is y1,x1,y2,x2");
      }
      // finish test for white turn
    }
    else {
      alert("its your opponents turn");
    }
  }
  else if (String(tag).localeCompare("black") == 0) {
    if (round % 2 != 0) {
      if (noValidMove(tag)) {
        alert("You have no valid moves left!");
        updatevalidmove();
        updateStatus();
        incround();
      } 
  
      const input = document.getElementById('command').value;

      // Split the input by commas into an array
      const coordinatesArray = input.split(',');

      // Check if there are exactly 4 values
      if (coordinatesArray.length === 4) {
        // Assign the values to separate variables
        const [x1, y1, x2, y2] = coordinatesArray.map(coord => parseInt(coord.trim())); // Convert to integers
        if (x1 < 0 || x1 > 6 || y1 < 0 || y1 > 6 || x2 < 0 || x2 > 6 || y2 < 0 || y2 > 6) {
          // Display the values
          alert("out of bounds");
        }
        else {
          if (x1 == x2 && y1 == y2) {
            alert("invalid move! your origin block is also your destination block");
          }
          else {
            
            const originCell = document.getElementById(`${x1},${y1}`);
            const destinationCell = document.getElementById(`${x2},${y2}`);
            if (originCell.textContent == tag) {
              

              const dx = Math.abs(x2 - x1);
              const dy = Math.abs(y2 - y1);

              if (dx > 2 || dy > 2) {
                alert("Invalid move! You can only move 2 cell at a time.");
              }
              else {
                
                const result = validmove(x1, y1, x2, y2);
                if (result.valid == true) {
                  if (result.movetype == "adjacent") {
                    var cell = document.getElementById(`${x2},${y2}`);
                    if (cell) {
                      cell.textContent = tag;
                    }
                    turnAdjacentOpponents(x2, y2, tag);
                    updateStatusBoard(-1,-1,x2,y2,tag);
                    updateStatus();
                    incround();
                  } else if (result.movetype == "jump") {
                    var cell = document.getElementById(`${x2},${y2}`);
                    if (cell) {
                      cell.textContent = tag;
                    }
                    var cell = document.getElementById(`${x1},${y1}`);
                    if (cell) {
                      cell.textContent = " ";
                    }
                    turnAdjacentOpponents(x2, y2, tag);
                    updateStatusBoard(x1,y1,x2,y2,tag);
                    
                    updateStatus();
                    incround();
                  }
                  
                  
                }else{
                  alert("invalid move");
                }
              }
            }
            else {
              alert("you cant move a empty space or  your opponents pawn");
            }
          }
        }
      }
      else {
        // Handle error if there are not exactly 4 values
        alert("the correct way to write the command is y1,x1,y2,x2");
      }
      // finish test for black turn
    }
    else {
      alert("its your opponents turn");
    }
  }
}

 
function noValidMove(tag) {
  // Directions: left, right, up, down, and four diagonals
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],   // Left, right, up, down
    [-1, -1], [-1, 1], [1, -1], [1, 1]    // Diagonals: top-left, top-right, bottom-left, bottom-right
  ];

  // Jumps: Horizontal, Vertical, and Diagonal (2 steps in each direction)
  const jumps = [
    [2, 0], [-2, 0], [0, 2], [0, -2],    // Horizontal and vertical jumps
    [2, 2], [2, -2], [-2, 2], [-2, -2]    // Diagonal jumps
  ];

  // Check all cells on the board
  for (let x = 0; x < 7; x++) {
    for (let y = 0; y < 7; y++) {
      // Skip empty cells and opponent's pieces
      const currentCell = document.getElementById(`${x},${y}`);
      if (currentCell.textContent !== tag) continue;

      // Check each direction for possible valid adjacent moves (1 step in any direction)
      for (let [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        // Check if the move is within bounds (only valid moves)
        if (nx >= 0 && nx < 7 && ny >= 0 && ny < 7) {
          const result = validmove(x, y, nx, ny); // Check validity using validmove function
          
          if (result.valid) {
            return false; // Found a valid adjacent move, so the player has a valid move left
          }
        }
      }

      // Check for jumps (2 steps in any direction)
      for (let [dx, dy] of jumps) {
        const nx = x + dx;
        const ny = y + dy;

        // Ensure the move is within bounds
        if (nx >= 0 && nx < 7 && ny >= 0 && ny < 7) {
          const result = validmove(x, y, nx, ny); // Check for jump
          if (result.valid) {
            return false; // Valid jump found, so the player has a valid move left
          }
        }
      }
    }
  }

  // If no valid move or jump was found, return true (no valid moves left)
  return true;
}






//checks if a move is vallid
function validmove(x1,y1,x2,y2){
  let valid = false;
  let movetype = "";
 // Check if the move is adjacent (for Ataxx, only adjacent moves or jumps are allowed)
 const dx = Math.abs(x2 - x1);
 const dy = Math.abs(y2 - y1);

 // Validates if it's an adjacent cell move or if it involves a valid jump
 if (dx <= 1 && dy <= 1) {
   // A normal adjacent move, check if the destination is empty
   const destinationCell = document.getElementById(`${x2},${y2}`);
   if (destinationCell.textContent === "") {
     movetype="adjacent";
     valid=true;
   } 
 }

 // If it's a jump, check if the cell is empty (or handle additional jump logic)
 if (dx === 2 && dy===0) {
   // For jumps, the destination should be empty, and the intermediate cell should be of the opposite color  
   const destinationCell = document.getElementById(`${x2},${y2}`);

   if (destinationCell.textContent === "") {
      valid=true;
      movetype="jump";
      
   } 
     
 }else if(dy ===2 && dx===0){
  const destinationCell = document.getElementById(`${x2},${y2}`);

  if (destinationCell.textContent === "") {
     valid=true;
     movetype="jump";
     
  } 
 }else if(dx===2 && dy===2){
  const destinationCell = document.getElementById(`${x2},${y2}`);

  if (destinationCell.textContent === "") {
     valid=true;
     movetype="jump";
     
  } 
    
  

 }
 return { valid, movetype };
}

function turnAdjacentOpponents(x, y, tag) {
  // Define directions for adjacent cells (horizontal, vertical, diagonal)
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1], // Vertical and Horizontal
    [-1, -1], [1, 1], [-1, 1], [1, -1] // Diagonal
  ];

  // Loop through all adjacent cells
  for (let i = 0; i < directions.length; i++) {
    const [dx, dy] = directions[i];
    const newX = x + dx;
    const newY = y + dy;

    // Check if the new coordinates are within bounds
    if (newX >= 0 && newX <= 6 && newY >= 0 && newY <= 6) {
      const cell = document.getElementById(`${newX},${newY}`);
      // If it's an opponent's pawn, turn it into your pawn
      if (cell.textContent !== "" && cell.textContent !== tag) {
        cell.textContent = tag;
        
      }
    }
  }
}

function updateStatusBoard(x1,y1,x2,y2,tag){
  var statusBoardData ={
    rowst:x1,
    columnst:y1,
    rowdes: x2,
    columndes: y2,
    tag: tag,
  };
  $.ajax({
    url: "../PHP/updateStatusBoard.php",
    method: "POST",
    dataType: "json",
    data: JSON.stringify(statusBoardData),
    contentType: "application/json",
    async: !1,
    success: function (response) {
      successMessage = response.message;
      console.log(successMessage);
    },
    error: function (response) {
      successMessage = "Σφάλμα: " + response.message;
      console.log(successMessage);
    },
  });

}



  
  //Path8hke to koumpi rules
  function goToRules() {
    window.open("./kanones.html");
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
        alert("YOU WIN!!");
        updateStatus();
      }else if(winner == "draw"){
        alert("THE GAME WAS A DRAW");
        updateStatus();
      }
      else {
        alert("YOU LOST!!");
        updateStatus();
      }
  
      
      window.location.reload();
    }
  }
  
  function reset(){
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

 function gettag(){
  token = window.sessionStorage.getItem("token");

  var getTagData={
    tag: token,  };
  $.ajax({
    url:"../PHP/getTag.php",
    method: "POST",
    dataType: "json",
    data: JSON.stringify(getTagData),
    async: false,
    conterType: "application/json",
    success: setTag,
    error:function(response){
      successMessage="Σφαλμα: "+response.message;
      alert(successMessage);
    },
  
  });
  
 }
 function setTag(data){
    gettData=data;
    var id = gettData.tag;
    window.sessionStorage.setItem("id",id);
 }
  
  function setRound(data) {
    getrData = data;
    round = Object.values(getrData.round)[0];;
    
    window.sessionStorage.setItem("round", round);
  }

  function checkGameState() {
    // Send an AJAX request to get the current game content
    $.ajax({
        url: "../PHP/getContent.php", // The PHP endpoint that will return the game state
        method: "GET",
        dataType: "json", // Expecting JSON data from the server
        success: function(response) {
            // Check if there is a new board state from the response
            
                // Update the game board with the new state
                updateBoard(response);
            
        },
        error: function() {
            console.log("Error while polling for game updates.");
        }
    });
}

function updateBoard(response) {
  
  for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 7; j++) {
          
          const Cell = document.getElementById(`${i},${j}`);
          var piece = response[i][j]; // Access the 2D array directly
          Cell.textContent = piece;
      }
  }
}

function incround(){
     
  $.ajax({
    url: "../PHP/incround.php", // The PHP endpoint that will return the game state
    method: "POST",
    contentType: "application/json",
    success: function(response) {
      console.log("Round increased successfully", response);
  },
  error: function() {
      console.log("Error while increasing the round");
  }
});

}

function updatevalidmove(){
  $.ajax({
    url: "../PHP/updatevalidmove.php",
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
}
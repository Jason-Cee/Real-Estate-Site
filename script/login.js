
// let btn = document.querySelector("#btn");
// let sidebar = document.querySelector(".sidebar");

// btn.onclick = function() {
//     sidebar.classList.toggle("active");
    
// }


// -------------------- LOGIN FUNCTION ---------------------- //


let signInButton = document.querySelector("#login_form");

function login(username, password) {
  console.log(username);
  console.log(password);
  fetch("https://stormy-tundra-96699.herokuapp.com/auth", {
    method: "POST",
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data["access_token"]) {
        console.log(data);
        myStorage = window.localStorage;
        myStorage.setItem("jwt-token", data["access_token"]);
        myStorage.setItem("username", username);
        myStorage.setItem("password", password);
      }
        // window.location.replace("/index.html");

    });
}

document.getElementById("login_form").addEventListener("submit", (e) => {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  e.preventDefault();
  login(username, password);
});

// -------------------------------------------------------------- //
// -------------------- REGISTER FUNCTION ---------------------- //

let reg_form = document.querySelector(".registration-form");
if (reg_form != null) {
    reg_form.addEventListener("submit", (e) => {
      //  PREVENT THE DEFAULT ACTION OF THE FORM
      e.preventDefault();

      //  CREATE AN OBJECT CONTAINING ALL THE INPUTS VALUES
      let new_user = {
        first_name: document.querySelector("#first_name").value,
        last_name: document.querySelector("#last_name").value,
        username: document.querySelector("#username").value,
        // email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
      };

      console.log(new_user);
  
      fetch("https://stormy-tundra-96699.herokuapp.com/registration", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(new_user)
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status_code === 201) {
            window.localStorage.setItem("user", JSON.stringify(new_user));
            alert("successful registration")
            // window.location.href = "./login.html";
          } else {
            alert("unsuccessful registration")
            
          }
         
        });
    });
  }
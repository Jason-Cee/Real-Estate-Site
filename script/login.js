
let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");

btn.onclick = function() {
    sidebar.classList.toggle("active");
    
}


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
        window.location.href = "./index.html";
      }
    });

  document.querySelector("#loginform")
}


// -------------------------------------------------------------- //
// -------------------- REGISTER FUNCTION ---------------------- //

function registerUser() {
  const name = document.getElementById("first_name").value;
  const surname = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    if (
      typeof name === "number" ||
      typeof surname === "number" ||
      typeof cell === "string"
    ) {
      throw "Please use the proper format for each section";
    }
  } catch (e) {
    alert("Error: " + e);
  } finally {
    fetch("https://stormy-tundra-96699.herokuapp.com/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: name,
        last_name: surname,
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("Your details have successfully been registered");

        if (data["message"] == "Success") {
          alert("Please Sign In On Next Page");
          window.location.href = "./login.html";
        } else {
          alert("Please Fill In The Required Fields Correctly");
        }
      });
  }
}
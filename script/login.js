
// let btn = document.querySelector("#btn");
// let sidebar = document.querySelector(".sidebar");

// btn.onclick = function() {
//     sidebar.classList.toggle("active");
    
// }


// -------------------- LOGIN FUNCTION ---------------------- //


// login
const baseURL = "https://stormy-tundra-96699.herokuapp.com/auth/";

function login() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    fetch(baseURL, {
        method: "PATCH",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data);
            
            if (data.status_code == 200) {
                window.localStorage.setItem("auth", username);
                window.location.href="./index.html"
            } else {
                alert("Username and password does not match");
            }
        });
};

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
    fetch("https://stormy-tundra-96699.herokuapp.com/registration", {
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
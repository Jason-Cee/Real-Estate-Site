const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

function addingProduct() {
      
    fetch("https://backendfs.herokuapp.com/product-table/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description:document.getElementById("add_description").value,
        email:  localStorage.getItem("user"),
        product_name: document.getElementById("add_product_name").value,
        type: document.getElementById("add_product_type").value,
        price: document.getElementById("add_price").value,
        image: document.querySelector(".conimage").src,
      }),
     })
      .then(res => res.json())
      .then(res => {
        window.location.reload();
        alert("product added succesfully")
        console.log(res);
      });
  }

function updatingProduct() {
  
    let productId = document.querySelector('.button-modal').id
    console.log(productId)
    
      
    fetch(`https://backendfs.herokuapp.com/updating-products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description:document.getElementById("updating_description").value,
        email:  localStorage.getItem("user"),
        product_name: document.getElementById("updating_product_name").value,
        type: document.getElementById("updating_product_type").value,
        price: document.getElementById("updating_price").value,
        image: document.querySelector(".conimage").src,
      }),
     })
      .then(res => res.json())
      .then(res => {
        window.location.reload();
        console.log(res);
      });
  }

function deleteProduct(e){
    let productid = e.target.id
    fetch(`https://backendfs.herokuapp.com/updating-products/${productid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
     })
      .then(res => res.json())
      .then(res => {
        window.location.reload();
        console.log(res);
      });
  }
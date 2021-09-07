let carts = document.querySelectorAll(".add-cart");

let products = [
    {
      title: "3 Bedroom House",
      tag: "constantia",
      description:"Private and Secure </br> Spacious and sun-filled North-facing home located down a panhandle driveway surrounded by properties. Private and secure in Constantia Sillery! This single-storey family home has been beautifully maintained and is ready for its next owner.</br> The large, central dining room and living room with wood burning fireplace both have sliding doors opening to the covered patio and garden. To the right of the entrance hall there is a large kitchen with breakfast bar, eye level oven, integrated freezer and laundry/scullery. The kitchen is open-plan to the tv room which also has sliding doors opening onto the patio and garden. There is also a study/office off the tv room.</br>The bedroom wing, to the left of the entrance hall, consists of 3 double bedrooms all with built-in-cupboards, new carpets and a full family bathroom with ample space for a double vanity. The main bedroom is ultra-spacious with doors opening to the garden and has a dressing room and full en-suite with double vanity.</br>The covered patio with retractable awning is the best place to relax, overlooking the solar heated swimming pool and lush, established garden with mountain views. The entire house and garden are completely private and tranquil.</br>Extras include: Double garage with direct access, secure off-street parking for up to 4 vehicles, staff/guest accommodation with shower and toilet en-suite and store room.</br>Alarm system, borehole and computerized irrigation. Aluminium windows and doors throughout.</br>Call to arrange a viewing.",
      price: "6 995 000",
      category: "House",
      location: "Constantia",
      inCart: 0,
    },
    {
      title: "2 Bedroom House",
      tag: "claremont",
      description: "Charming Cottage in Claremont!</br>Starting up or scaling down? This is the perfect property for you!</br>Walk in to original Oregon flooring, high ceilings and a mix of modern flair. The lounge area is spacious, with an added bonus of a wood burning fireplace to keep you cosy. The kitchen is open plan with plenty space, cupboards and a lovely addition of a Smeg gas hob with oven and extractor fan! Melamine counter tops plus the added bonus of a Swan dishwasher. The back door with stained glass leads out to a perfect entertainment spot with pine decking and a built-in braai. Plenty space for friends and family plus a seating area with storage underneath. </br>The bedrooms are both substantial in size, with built-in cupboards and Oregon flooring. The separate bathroom has both a bath and shower, modern vanity plus a handheld showerhead in the bath. Plumbing for a washing machine in the bathroom.</br>Additional information:</br>*Alarm with a back beam.</br>*Fibre installed.</br>*Pre-paid electricity.</br>*On street parking.",
      price: "2 100 000",
      category: "House",
      location: "Claremont",
      inCart: 0,
    },
    {
      title: "4 Bedroom House",
      tag: "plattekloof",
      description: "Spacious family home in prime position</br>There's something about this home in this yesteryear neighbourhood of Plattekloof and street with happy children that feeds your soul; it could be the expanse of the high ceilings of the living area, the peaceful views over the expansive garden and Table Mountain, and the bespoke attention to detail throughout the home.</br>Whatever it might be, this home gives a true feeling of peace.</br>The enormous family room, lounge, and dining room offer a great lifestyle and entertainment versatility. The passage leads to four bedrooms with two bathrooms (one en-suite) that catch the afternoon sun. The sumptuous master suite is sun-drenched and welcoming. Expansive open-plan gourmet kitchen. The home has a wrap-around garden with an east-facing inviting courtyard, 2× double garage, loads of guest parking, koi pond which completes the picture of this comfortable home. This home is also within walking distance of shopping centres.</br>This home is ideal for a homeowner looking for the full package.\n",
      price: "4 800 000",
      category: "House",
      location: "Plattekloof",
      inCart: 0,
    },
    {
      title: "1 Bedroom Apartment",
      tag: "pinelands",
      description: "Apartments for Sale Conradie Park (Paarl Rock) Pinelands from R535 000</br>Conradie park is arguably the best mixed-use development in the Western Cape. The location is Pinelands, which is close to Cape Town CBD. The development will give you a lifestyle far superior to most where you will enjoy the following features and amenities.</br>Private schools (Primary and High School)</br>Sports centre</br>3 Crèches</br>Hotel</br>Mixed residential housing – FLISP and ordinary housing</br>Community Centre</br>Gym</br>Doggy Day-care</br>Commercial (Offices)</br>Retail (Shopping Centre)</br>Parks and kids play facilities</br>State of the art security with 24/7 NPR cameras</br>Old Mutual head office is just a stone throw away from here, so therefore demand is high for people wanting to live close to work as well as investors wanting to take advantage of the fantastic location. It is also within walking distance of business nodes such as Maitland, Ndabeni and Epping. Observatory, Salt river, Woodstock, Paarden Eiland and Century City are only a 5-minute drive away approximately. And most importantly Cape Town CBD is just a 5 – 10-minute drive.",
      price: "535 000",
      category: "Apartment",
      location: "Pinelands",
      inCart: 0,
    },
    {
      title: "1 Bedroom Apartment",
      tag: "grassy-park",
      description: "Apartment for Sale in Grassy Park</br>Everyone needs a place of sanctuary. A place to retreat, reflect and just be you. A space you define as much as it defines you. Now more than ever, the meaning of home itself has evolved and requires spaces to provide a balance between work and play. Relaxation and expression. This is a newly RENOVATED 2 bedroom APARTMENT with semi open plan living...brand new aluminium windows and new flooring to match. Close to all amenities in Grassy Park.",
      price: "619 000",
      category: "Apartment",
      location: "Grassy Park", 
      inCart: 0,
    },
    {
      title: "2 Bedroom Apartment",
      tag: "south-field",
      description: "This neat, two-bedroom apartment is located in a secure and well-run complex in a quiet</br>corner of Southfield, close to major transport routes, shops, schools and daycares.</br>The kitchen has built in cupboards with a stove and hob and leads to your open plan living area. There is a private balcony for you to sit on while enjoying the sunset after a hard day or while entertaining a few friends.</br>Both bedrooms are carpeted and have built in cupboards. The bathroom has a shower and is plumbed for a washing machine. There is fibre in the complex and a router is already in-stalled in the unit.</br>Great for first time buyers or young families.",
      price: "775 000",
      category: "Apartment",
      location: "South Field",
      inCart: 0,
    },
  ];
for (let j = 0; j < carts.length; j++) {
  carts[j].addEventListener("click", () => {
    cartNumbers(products[j]);
    totalCost(products[j]);
    // console.log("Added to Cart");
  });
}

function trueCartNumber() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(products) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(products);
}

function setItems(products) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[products.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [products.tag]: products,
      };
    }
    cartItems[products.tag].inCart += 1;
  } else {
    products.inCart = 1;
    cartItems = {
      [products.tag]: products,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(products) {
  // console.log("the products price is", products.price);
  let cartCost = localStorage.getItem("totalCost");

  console.log("My cart cost is: ", cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + products.price);
  } else {
    localStorage.setItem("totalCost", products.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product">
        <img src="./images/${item.tag}.jpg">
        <span class="pro-title">${item.name}</span>
      
        <div class="price">R${item.price}.00</div>
        <div class="quantity">
        <span>${item.inCart}</span>
        </div>
        <div class="total">
        R${item.inCart * item.price}.00
        </div>
      </div>
      `;
    });

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
        <h4 class="basketTotalTitle"> Basket Total</h4>
        <h4 class="basketTotal">R${cartCost}.00</h4>    
      </div>
    
    
    `;
  }
}

trueCartNumber();
displayCart();
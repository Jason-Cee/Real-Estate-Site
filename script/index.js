let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");

btn.onclick = function() {
    sidebar.classList.toggle("active");
    
}


let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    title: "3 Bedroom House",
    tag: "constantia",
    description:"Private and Secure \n Spacious and sun-filled North-facing home located down a panhandle driveway surrounded by properties. Private and secure in Constantia Sillery! This single-storey family home has been beautifully maintained and is ready for its next owner.\n\nThe large, central dining room and living room with wood burning fireplace both have sliding doors opening to the covered patio and garden. To the right of the entrance hall there is a large kitchen with breakfast bar, eye level oven, integrated freezer and laundry/scullery. The kitchen is open-plan to the tv room which also has sliding doors opening onto the patio and garden. There is also a study/office off the tv room.\n\nThe bedroom wing, to the left of the entrance hall, consists of 3 double bedrooms all with built-in-cupboards, new carpets and a full family bathroom with ample space for a double vanity. The main bedroom is ultra-spacious with doors opening to the garden and has a dressing room and full en-suite with double vanity.\n\nThe covered patio with retractable awning is the best place to relax, overlooking the solar heated swimming pool and lush, established garden with mountain views. The entire house and garden are completely private and tranquil.\n\nExtras include: Double garage with direct access, secure off-street parking for up to 4 vehicles, staff/guest accommodation with shower and toilet en-suite and store room.\n\nAlarm system, borehole and computerized irrigation. Aluminium windows and doors throughout.\n\nCall to arrange a viewing.\n",
    price: "6 995 000",
    category: "House",
    location: "Constantia",
    inCart: 0,
  },
  {
    title: "2 Bedroom House",
    tag: "claremont",
    description: "Charming Cottage in Claremont!\n\nStarting up or scaling down? This is the perfect property for you!\n\nWalk in to original Oregon flooring, high ceilings and a mix of modern flair. The lounge area is spacious, with an added bonus of a wood burning fireplace to keep you cosy. The kitchen is open plan with plenty space, cupboards and a lovely addition of a Smeg gas hob with oven and extractor fan! Melamine counter tops plus the added bonus of a Swan dishwasher. The back door with stained glass leads out to a perfect entertainment spot with pine decking and a built-in braai. Plenty space for friends and family plus a seating area with storage underneath.\n\nThe bedrooms are both substantial in size, with built-in cupboards and Oregon flooring. The separate bathroom has both a bath and shower, modern vanity plus a handheld showerhead in the bath. Plumbing for a washing machine in the bathroom.\n\nAdditional information:\n\n*Alarm with a back beam.\n\n*Fibre installed.\n\n*Pre-paid electricity.\n\n*On street parking.",
    price: "2 100 000",
    category: "House",
    location: "Claremont",
    inCart: 0,
  },
  {
    title: "4 Bedroom House",
    tag: "plattekloof",
    description: "Spacious family home in prime position\n\nThere's something about this home in this yesteryear neighbourhood of Plattekloof and street with happy children that feeds your soul; it could be the expanse of the high ceilings of the living area, the peaceful views over the expansive garden and Table Mountain, and the bespoke attention to detail throughout the home.\n\nWhatever it might be, this home gives a true feeling of peace.\n\nThe enormous family room, lounge, and dining room offer a great lifestyle and entertainment versatility. The passage leads to four bedrooms with two bathrooms (one en-suite) that catch the afternoon sun. The sumptuous master suite is sun-drenched and welcoming. Expansive open-plan gourmet kitchen. The home has a wrap-around garden with an east-facing inviting courtyard, 2× double garage, loads of guest parking, koi pond which completes the picture of this comfortable home. This home is also within walking distance of shopping centres.\n\nThis home is ideal for a homeowner looking for the full package.\n",
    price: "4 800 000",
    category: "House",
    location: "Plattekloof",
    inCart: 0,
  },
  {
    title: "1 Bedroom Apartment",
    tag: "pinelands",
    description: "Apartments for Sale Conradie Park (Paarl Rock) Pinelands from R535 000\n\nConradie park is arguably the best mixed-use development in the Western Cape. The location is Pinelands, which is close to Cape Town CBD. The development will give you a lifestyle far superior to most where you will enjoy the following features and amenities.\n\nPrivate schools (Primary and High School)\n\nSports centre\n\n3 Crèches\n\nHotel\n\nMixed residential housing – FLISP and ordinary housing\n\nCommunity Centre\n\nGym\n\nDoggy Day-care\n\nCommercial (Offices)\n\nRetail (Shopping Centre)\n\nParks and kids play facilities\n\nState of the art security with 24/7 NPR cameras\n\nOld Mutual head office is just a stone throw away from here, so therefore demand is high for people wanting to live close to work as well as investors wanting to take advantage of the fantastic location. It is also within walking distance of business nodes such as Maitland, Ndabeni and Epping. Observatory, Salt river, Woodstock, Paarden Eiland and Century City are only a 5-minute drive away approximately. And most importantly Cape Town CBD is just a 5 – 10-minute drive.",
    price: "535 000",
    category: "Apartment",
    location: "Pinelands",
    inCart: 0,
  },
  {
    title: "1 Bedroom Apartment",
    tag: "grassy-park",
    description: "Apartment for Sale in Grassy Park\n\nEveryone needs a place of sanctuary. A place to retreat, reflect and just be you. A space you define as much as it defines you. Now more than ever, the meaning of home itself has evolved and requires spaces to provide a balance between work and play. Relaxation and expression. This is a newly RENOVATED 2 bedroom APARTMENT with semi open plan living...brand new aluminium windows and new flooring to match. Close to all amenities in Grassy Park.\n",
    price: "619 000",
    category: "Apartment",
    location: "Grassy Park", 
    inCart: 0,
  },
  {
    title: "2 Bedroom Apartment",
    tag: "south-field",
    description: "This neat, two-bedroom apartment is located in a secure and well-run complex in a quiet\n\ncorner of Southfield, close to major transport routes, shops, schools and daycares.\n\nThe kitchen has built in cupboards with a stove and hob and leads to your open plan living area. There is a private balcony for you to sit on while enjoying the sunset after a hard day or while entertaining a few friends.\n\nBoth bedrooms are carpeted and have built in cupboards. The bathroom has a shower and is plumbed for a washing machine. There is fibre in the complex and a router is already in-stalled in the unit.\n\nGreat for first time buyers or young families.",
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
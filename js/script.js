const publicKey = "83d0bfddd6c736e79c4dea8b64e9d78a";

// calling api for fetching superheroes

async function fetchSuperheroes() {
  const apiurl = `https://gateway.marvel.com/v1/public/characters?ts=1710744591141&apikey=83d0bfddd6c736e79c4dea8b64e9d78a&hash=b8fe3c458e7ce5cfb76f11be57cf4cf6`;
  const response = await fetch(apiurl);
  const data = await response.json();

  const data1 = data.data.results;

  displaySuperHeroes(data1);
}

// calling api for searchquery

async function filterSuperheroes(searchQuery) {
  const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchQuery}&ts=1710744591141&apikey=83d0bfddd6c736e79c4dea8b64e9d78a&hash=b8fe3c458e7ce5cfb76f11be57cf4cf6`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.data.results;

  console.log(results);

  displaySuperHeroes(results);
}

const herosContainer = document.querySelector(".heros-container");
const searchInput = document.getElementById("search-input");

// displaying superheroes

async function displaySuperHeroes(superheroes) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  herosContainer.innerHTML = "";

  superheroes.forEach((hero) => {
    const heroCardDiv = document.createElement("div");
    heroCardDiv.classList.add("card");

    const heroImg = document.createElement("img");
    heroImg.src = hero.thumbnail.path + "." + hero.thumbnail.extension;
    heroImg.alt = hero.name;

    const heroDiv = document.createElement("div");
    heroDiv.classList.add("card-content");

    const heroName = document.createElement("h3");
    heroName.innerText = hero.name;

    const addToFavouritebtn = document.createElement("button");
    addToFavouritebtn.classList.add("add-to-fav-btn");
    addToFavouritebtn.textContent = "add-to-favourite";

    if (favorites.includes(hero.id)) {
      addToFavouritebtn.textContent = "remove favourite";
    } else {
      addToFavouritebtn.textContent = "add-to-favourite";
    }

    addToFavouritebtn.addEventListener("click", () => {
      const heroid = hero.id;
      if (addToFavouritebtn.textContent === "add-to-favourite") {
        addToFavouritebtn.textContent = "remove favourite";
        addToFavorites(heroid);
      } else {
        removeFavourites(heroid);
        addToFavouritebtn.textContent = "add-to-favourite";
      }
    });

    const viewDetailanchor = document.createElement("a");
    viewDetailanchor.href = "details.html?id=" + hero.id;

    const viewDetailsbtn = document.createElement("button");
    viewDetailsbtn.classList.add("about");
    viewDetailsbtn.textContent = "about";
    // viewDetailsbtn.value = hero.id;

    viewDetailsbtn.addEventListener("click", () => {
      window.location.href = `details.html?id=${hero.id}`;
    });

    viewDetailanchor.appendChild(viewDetailsbtn);

    heroDiv.appendChild(heroName);
    heroDiv.appendChild(addToFavouritebtn);
    heroDiv.appendChild(viewDetailanchor);

    heroCardDiv.appendChild(heroImg);
    heroCardDiv.appendChild(heroDiv);

    herosContainer.appendChild(heroCardDiv);
  });
}

// searchinput eventlistner

searchInput.addEventListener("input", () => {
  if (searchInput.value === "") {
    fetchSuperheroes();
  } else {
    filterSuperheroes(searchInput.value);
  }
});

// function to add to fav

function addToFavorites(superHeroid) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(superHeroid)) {
    favorites.push(superHeroid);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("hero has been added to your favourite list");
  } else {
    alert("hero already added to your favourite list");
  }

  console.log(favorites);
}

// function to remove from fav

function removeFavourites(superHeroid) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((superhero) => superhero !== superHeroid);

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

fetchSuperheroes();

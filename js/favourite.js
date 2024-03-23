const herosContainer = document.querySelector(".heros-container");

// displaying the favsuperheroes

async function getFavoriteSuperheroes() {
  // fetching the favid from localstorage

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length == 0) {
    herosContainer.innerHTML = `<p style="
    font-weight: 800;
    background-color: black;
    color: aqua;
">no items in your favourites please add it from the home screen </p>`;
  } else {
    herosContainer.innerHTML = "";

    favorites.forEach(async (favoritesid) => {
      const url = `https://gateway.marvel.com/v1/public/characters/${favoritesid}?ts=1710744591141&apikey=83d0bfddd6c736e79c4dea8b64e9d78a&hash=b8fe3c458e7ce5cfb76f11be57cf4cf6`;

      const response = await fetch(url);
      const data = await response.json();

      const superhero = data.data.results[0];

      console.log(superhero);

      const heroCardDiv = document.createElement("div");
      heroCardDiv.classList.add("card");

      const heroImg = document.createElement("img");
      heroImg.src =
        superhero.thumbnail.path + "." + superhero.thumbnail.extension;
      heroImg.alt = superhero.name;

      const heroDiv = document.createElement("div");
      heroDiv.classList.add("card-content");

      const heroName = document.createElement("h3");
      heroName.innerText = superhero.name;

      const removebtn = document.createElement("button");
      removebtn.classList.add("add-to-fav-btn");
      removebtn.textContent = "remove";
      removebtn.value = superhero.id;

      removebtn.addEventListener("click", () => {
        removeFavourites(superhero.id);
        getFavoriteSuperheroes();
      });

      const viewDetailanchor = document.createElement("a");
      viewDetailanchor.href = "details.html?id=" + superhero.id;

      const viewDetailsbtn = document.createElement("button");
      viewDetailsbtn.classList.add("about");
      viewDetailsbtn.textContent = "about";

      viewDetailanchor.appendChild(viewDetailsbtn);

      heroDiv.appendChild(heroName);
      heroDiv.appendChild(removebtn);
      heroDiv.appendChild(viewDetailanchor);

      heroCardDiv.appendChild(heroImg);
      heroCardDiv.appendChild(heroDiv);

      herosContainer.appendChild(heroCardDiv);
    });
  }
}

// removing the superheroes from addtofav page

function removeFavourites(heroid) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((superhero) => superhero !== heroid);

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

getFavoriteSuperheroes();

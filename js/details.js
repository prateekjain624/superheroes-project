// fetching the superheroid from window.location

function getSuperheroIdFromUrl() {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get("id");
}

const superheroId = getSuperheroIdFromUrl();

console.log(superheroId);

const detailContainer = document.querySelector(".details-container");

async function getdetails(superheroId) {
  const url = `https://gateway.marvel.com/v1/public/characters/${superheroId}?ts=1710744591141&apikey=83d0bfddd6c736e79c4dea8b64e9d78a&hash=b8fe3c458e7ce5cfb76f11be57cf4cf6`;

  const response = await fetch(url);
  const data = await response.json();

  const superhero = data.data.results[0];

  displayDetails(superhero);
}

// displaying the details of superhero

function displayDetails(superhero) {
  console.log(superhero);
  const superheroImg = document.querySelector(".superhero-img img");
  const superheroName = document.getElementById("superhero-name");
  const description = document.getElementById("description");
  const comics = document.getElementById("comics");
  const events = document.getElementById("events");
  const series = document.getElementById("series");
  const stories = document.getElementById("stories");

  superheroImg.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
  superheroName.textContent = superhero.name;
  description.textContent = superhero.description || "No description available";
  comics.textContent = superhero.comics.available;
  events.textContent = superhero.events.available;
  series.textContent = superhero.series.available;
  stories.textContent = superhero.stories.available;
}

getdetails(superheroId);

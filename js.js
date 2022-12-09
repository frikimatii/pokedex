const typeColors = {
  steel: `#A8A8C0`,
  water: `#3899F8`,
  bug: `#A8B820`,
  dragon: `#7860E0`,
  electric: `#F8D030`,
  ghost: `#6060B0`,
  fire: `#F05030`,
  fairy: `#E79FE7`,
  ice: `#58C8E0`,
  fighting: `#A05038`,
  normal: `#A8A090`,
  grass: `#78C850`,
  psychic: `#F870A0`,
  rock: `#B8A058`,
  siniestro: `#7A5848`,
  ground: `#E9D6A4`,
  poison: `#B058A0`,
  flying: `#98A8F0`,

};

const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const hp = document.querySelector(`.hp`);
const ataque = document.querySelector(`.ataque`);
const defensa = document.querySelector(`.defensa`);
const velocidad = document.querySelector(`.velocidad`);
const tipo = document.querySelector(`.tipo`)

const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const btnRandom = document.querySelector(`.btn-random`);

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input.value = "";
    searchPokemon = data.id;
    hp.innerHTML = `Hp: ${data.stats[0].base_stat}`;
    ataque.innerHTML = `Ataque: ${data.stats[1].base_stat} `;
    defensa.innerHTML = `Defensa: ${data.stats[2].base_stat} `;
    velocidad.innerHTML = `Velocidad: ${data.stats[5].base_stat} `;
    tipo.innerHTML = `${data.types[0].type.name}`.toUpperCase();
    const themeColor = typeColors[data.types[0].type.name];
    tipo.style.color = themeColor
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found :c";
    pokemonNumber.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

btnRandom.addEventListener(`click`, () => {
  let id = Math.floor(Math.random() * 649) + 1;
  renderPokemon(id);
});
renderPokemon(searchPokemon);

///
////const themeColor = typeColors[data.types[0].type.name];
//

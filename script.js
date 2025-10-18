function searchActive(value) {
  const input = document.querySelector(".topbar__search-input");
  input.focus();
}

async function searchBarEnter(event) {
  let value = document.querySelector(".topbar__search-input").value;
  const input = document.querySelector(".topbar__search-input");

  if (event.keyCode == 13) { 
    if (input === document.activeElement) {
      searchResult(value);
      await moviesSearch(value);
      return setTimeout(() => loadingDone(), 1000); 
    }

    value = document.querySelector(".cinema__search-input").value;
    searchResult(value);
    await moviesSearch(value);
    setTimeout(() => loadingDone(), 1000);
  }
}

async function searchBarClick() {
  const value = document.querySelector(".cinema__search-input").value;
  searchResult(value);
  await moviesSearch(value);
  setTimeout(() => loadingDone(), 1000);
}

function searchResult(value) {
  const searchBar = document.querySelector(".catalog__header-section");
  const searchBarHTML = `<h2 class="catalog__header-section--label">
  Search results for:
</h2>
<h2 class="catalog__query-display">"${value}"</h2>`;
  searchBar.innerHTML = searchBarHTML;
  searchBar.classList.add("catalog__query-display-visible"); 
}

async function moviesSearch(value) {
  const response = await fetch(
    `https://www.omdbapi.com/?type=movie&apikey=ccc3ba1&s=${value}`
  );

  const searchResults = await response.json();
  const array = searchResults.Search.slice(0, 6); 
  const movies = document.querySelector(".catalog__items-grid");
  const moviesHTML = array
    .map(
      (movie) => `
<div class="filmcard filmcard__invisible">
<figure class="filmcard__poster--container">
  <img src="${movie.Poster}" alt="" class="filmcard__poster">
  <h3 class="filmcard__metadata--heading">${movie.Title}</h3>
  <div class="filmcard__metadata--collection">
    <div class="filmcard__metadata">
      <i class="fa-solid fa-clock filmcard__metadata--symbol"></i>
      <p class="filmcard__metadata--value">136m</p>
    </div>
    <div class="filmcard__metadata">
      <i class="fa-solid fa-star filmcard__metadata--symbol"></i>
      <p class="filmcard__metadata--value">4.5</p>
    </div>
    <div class="filmcard__metadata">
      <i class="fa-solid fa-earth-americas filmcard__metadata--symbol"></i>
      <p class="filmcard__metadata--value">English</p>
    </div>
  </div>
</figure>
<h4 class="filmcard__primary-title">${movie.Title}</h4>
</div>`
    )
    .join("");
  movies.innerHTML =
    `<i class="fa-solid fa-spinner catalog__items-grid--spinner catalog__items-grid--spinner-visible"></i>` +
    moviesHTML;
  console.log('pending');
}

function loadingDone() {
  const targetMovie = document.querySelectorAll('.filmcard');
  const targetLoading = document.querySelector(".catalog__items-grid--spinner");

  targetLoading.classList.remove("catalog__items-grid--spinner-visible"); 
  targetMovie.forEach((movie) => movie.classList.remove("filmcard__invisible")); 
  console.log('removed');
}
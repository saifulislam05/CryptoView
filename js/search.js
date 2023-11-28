const search_input = document.getElementById("search_input");
const search_btn = document.getElementById("search_btn");
const search_results = document.getElementById("search-results");

function searchCoins() {
  const inputValue = search_input.value;
  fetch("https://api.coingecko.com/api/v3/search?query=" + inputValue)
    .then((response) => response.json())
    .then(renderCoins)
    .catch((error) => console.error("Error fetching data:", error));
}

function renderCoins(data) {
  const coins = data.coins;
  const fragment = new DocumentFragment();

  coins.forEach((coin, index) => {
    const coinCard = document.createElement("div");
    coinCard.classList.add("single-search-result", "card", "bg-base-200");
    coinCard.innerHTML = displayCard(coin, index);
    fragment.append(coinCard);
  });
    search_results.innerHTML = "";
    search_results.appendChild(fragment);

  
}
function displayCard(coin, index) {
  const { id, large, name, symbol } = coin;

  return `
            <p>${index + 1}</p>
            <img src=${large} alt=${name}>
            <h3>${name}</h3>
            <h3>${symbol}</h3>
            <a href="./detail.html?id=${id}">More Info</a>`;
}

search_btn.addEventListener("click", (event) => {
  event.preventDefault();
  searchCoins();
});

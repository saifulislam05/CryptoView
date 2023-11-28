const coins_wrapper = document.getElementById("coins_wrapper");

function windowLoaded() {
  fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr"
  )
    .then((response) => response.json())
    .then(loadCoinData)
    .catch((error) => console.error("Error fetching data:", error));
}

function loadCoinData(data) {
  const conversionRate = data.bitcoin.inr;
  fetch("https://api.coingecko.com/api/v3/search/trending")
    .then((response) => response.json())
    .then((data) => {
      renderCards(data, conversionRate);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function renderCards(data, conversionRate) {
  const coins = data.coins;
  const fragment = new DocumentFragment();

  coins.forEach((coin) => {
    const coinCard = document.createElement("div");
    coinCard.classList.add(
      "card",
      "min-w-[25rem]",
      "bg-base-300",
      "flex",
      "flex-row",
      "p-3",
      "gap-4"
    );
    coinCard.innerHTML = displayCard(coin, conversionRate);
    fragment.append(coinCard);
  });

  coins_wrapper.innerHTML = "";
  coins_wrapper.appendChild(fragment);
}

function displayCard(coin, conversionRate) {
  const { large, name, symbol, price_btc } = coin.item;
  const price = Math.round(price_btc * conversionRate * 10000) / 10000;

  return `
    <img class="w-10 card-image" src=${large} alt=${name}>
    <div class="w-fit">
      <h1>${name} (${symbol})</h1>
      <p>₹ ${price}</p>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  windowLoaded();
});

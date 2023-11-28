
async function loadDetail() {
  try {
    const url_string = window.location.href;
    const url_obj = new URL(url_string);
    const params = new URLSearchParams(url_obj.search);

    if (!params.has("id")) {
      window.location.href = "./index.html";
      return;
    }

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${params.get(
        "id"
      )}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    display(data);
  } catch (error) {
    console.error("Error loading details:", error);
    // Handle error, e.g., display an error message to the user
  }
}

function display(data) {
  console.log(data);
  const name = `${data.name} (${data.symbol.toUpperCase()})`;
  const description = data.description.en;
  const logo = data.image.large;

  const inr = data.market_data.current_price.inr;
  const usd = data.market_data.current_price.usd;
  const eur = data.market_data.current_price.eur;
  const gbp = data.market_data.current_price.gbp;

  document.getElementById("coin-name").innerText = name;
  document.getElementById("coin-description").innerHTML = description;
  document.getElementById("coin-logo").src = logo;

  document.getElementById("inr-price").innerText = inr;
  document.getElementById("usd-price").innerText = usd;
  document.getElementById("eur-price").innerText = eur;
  document.getElementById("gbp-price").innerHTML = gbp;
}

document.addEventListener("DOMContentLoaded", () => {
  loadDetail();
});

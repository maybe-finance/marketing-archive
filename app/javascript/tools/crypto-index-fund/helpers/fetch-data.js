const fs = require("fs");
const path = require("path");
const axios = require("axios");
const request = require("request");
const getColors = require("get-image-colors");

const logoUrl = require("./logo-url");
const funds = require("../data/funds.json");

const uniq = (array) => [...new Set(array)];

const symbols = uniq(funds.flatMap((fund) => fund.symbols));

const download = async (uri, filePath) => {
  const promise = new Promise((resolve) => {
    request.head(uri, () => {
      request(uri).pipe(fs.createWriteStream(filePath)).on("close", resolve);
    });
  });

  return promise;
};

const getLogoImageFilePath = (symbol) =>
  path.join(__dirname, "./../../../../../public", logoUrl(symbol));

const downloadLogo = async (logoUrl, symbol) => {
  const logoFilePath = getLogoImageFilePath(symbol);
  await download(logoUrl, logoFilePath);

  return logoFilePath;
};

const getLogoColor = async (logoFilePath) => {
  const colors = await getColors(logoFilePath, { count: 1 });

  return colors[0].hex();
};

const fetchCurrencies = async () => {
  const response = await axios.get(
    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=" +
      symbols.join(","),
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_API_KEY,
      },
    }
  );

  return Object.keys(response.data.data).map(
    (symbol) => response.data.data[symbol][0]
  );
};

(async () => {
  const rawCurrencies = await fetchCurrencies();
  const currencies = [];

  await Promise.all(
    rawCurrencies.map(async (currency) => {
      const logoFilePath = await downloadLogo(currency.logo, currency.symbol);
      const color = await getLogoColor(logoFilePath);

      currencies.push({
        symbol: currency.symbol,
        name: currency.name,
        color: color,
      });
    })
  );

  fs.writeFileSync("../data/currencies.json", JSON.stringify(currencies));

  console.log("symbols: " + symbols.length);
  console.log("currencies: " + currencies.length);
})();

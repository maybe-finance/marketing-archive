![home](https://github.com/maybe-finance/marketing/assets/35243/e899e0a0-7d77-495e-b8d1-f189d097f87b)

# Maybe Marketing Site

This is the repo for the former (and hopefully soon to be "present") marketing site for Maybe, an OSS personal finance and wealth management platform.

The marketing site was home to a half dozen financial mini-tools and dozens of in-depth articles on personal finance.

Now that Maybe [is getting a new lease on life](https://github.com/maybe-finance/maybe), we're working on getting the marketing site back up as well!

The README details below are likely somewhat dated, but we're working to get everything cleaned up and functioning as quickly as possible.

---

## Getting Started

1. Install Ruby (directions below use the `rbenv` method)
   - Install `rbenv` ([docs](https://github.com/rbenv/rbenv#installation))
   - `cat .ruby-version` in the root of the project to find required Ruby version
   - `rbenv install x.x.x`
   - `rbenv global x.x.x` - sets Ruby version used by `rbenv`
2. Install Ruby on Rails ([helpful guide here](https://gorails.com/setup/ubuntu/20.04))
3. Install Postgres 12.x
4. Create a Postgres user (Rails defaults the Postgres user to your computer's username)
5. Find the Bundler version at the bottom of `Gemfile.lock` and install that version with `gem install bundler -v x.x.x`
6. Run `bin/setup`

Run the app using:

```
bin/dev
```

## Running Tests

While this app does not have extensive testing setup, as a sanity check, there are a few basic integration tests for the mini-tools along with unit tests as necessary.

All integration tests have the naming convention `testname.integration.test.(ts|tsx)` and should be placed in the `__tests__` folder in the appropriate tool.

All unit tests have the naming convention `testname.unit.test.(ts|tsx)` and should be placed next to the relevant file being tested.

To run the tests:

```
yarn test # runs all tests
yarn test:unit
yarn test:integration
```

## Syncing equity prices

Signup for an account on twelvedata.com and export your api key:

```
export TWELVE_DATA_API_KEY=your-api-key
export ALPHA_VANTAGE_API_KEY=your-api-key
rake equity_prices:sync
```

GET /api/equity_prices/BTCUSD

## Syncing market cap

Signup for an account on coinmarketcap.com/api and export your api key:

```
export COIN_MARKET_CAP_API_KEY=your-api-key
rake market_cap:sync
```

## Crypto Index Fund

In order to add, remove or update a fund you need to perform the following steps:

**Fund**

Update the funds file (`app/javascript/tools/crypto-index-fund/data/funds.json`) as you want.

Note: The top 4 currencies will have the logo displayed in the fund select.

If you are **not** including a new currency, you are done.

If you are including a new currency, you need to continue with the next steps.

**Name, color and logo**

Run the script `app/javascript/tools/crypto-index-fund/helpers/fetch-data.js`.

```
COIN_MARKET_CAP_API_KEY=your-api-key node fetch-data.js
```

The script will automatically:

- Download and save the logo to `public/img/crypto-index-fund/logos/`
- Update the currencies file (`app/javascript/tools/crypto-index-fund/data/currencies.json`) with currency name and color (the dominant color of the logo)

Note: The data is fetched from [CoinMarket API](coinmarketcap.com/api).

**Equity prices**

Include the symbol in the **TwelveDataEquityImporter** (`app/services/twelve_data_equity_importer.rb`)

**Market cap**

Include the symbol in the **CoinMarketCapImporter** (`app/services/coin_market_cap_importer.rb`)

---

## Credits

The original marketing site had nearly a dozen contributors! Massive thanks to [@pieterbeulque](https://github.com/pieterbeulque), [@zachgoll](https://github.com/zachgoll), [@TWilson023](https://github.com/TWilson023), [@benface](https://github.com/benface), [@sauloantuness](https://github.com/sauloantuness), [@ffiller](https://github.com/ffiller), [@Tobolka](https://github.com/Tobolka), [@jaobrown](https://github.com/jaobrown), [@justinfar](https://github.com/justinfar), [@marcqualie](https://github.com/marcqualie) and [@narciero](https://github.com/narciero)!

## Copyright & license

The Maybe marketing site is distributed under an [AGPLv3 license](https://github.com/maybe-finance/marketing/blob/main/LICENSE). "Maybe" is a trademark of Maybe Finance, Inc.

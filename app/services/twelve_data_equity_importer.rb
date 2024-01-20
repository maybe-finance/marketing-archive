class TwelveDataEquityImporter < EquityImporter
  SOURCE = 'https://api.twelvedata.com/time_series'.freeze
  API_URL = 'https://api.twelvedata.com/time_series?symbol={{symbol}}&interval=1day&outputsize=5000&start_date={{start_date}}&apikey={{api_key}}'.freeze
  API_RPM_LIMIT = 600

  SYMBOLS = %w[
    AAL AAPL AGG AMZN BND BP CCL CVX DISCK GOOGL ITOT IXUS NTGR SCHB SCHF SCHZ
    SIX SPAB SPDW SPTM SPX SPY TSLA VTI VXUS XOM
    BTC/USD ETH/USD BNB/USD XRP/USD SOL/USD ADA/USD AVAX/USD pDOTn/USD DAI/USD DOGE/USD SHIB/USD MATIC/USD NEAR/USD CRO/USD TRX/USD LTC/USD BCH/USD LEOu/USD FTT/USD ATOM/USD UNIs/USD AAVE/USD MKR/USD SNX/USD LRC/USD COMP/USD YFI/USD SUSHI/USD KNC/USD REN/USD XTZ/USD CRV/USD THETA/USD CAKE/USD FTM/USD GRT/USD STX/USD BAT/USD MANA/USD SAND/USD GMT/USD AXS/USD FLOW/USD CHZ/USD GALA/USD
  ].freeze

  # Some symbols can be ambiguous, for example:
  # LUNA can be "Luna Coin" or "Terra"
  # Use the CSV file bellow to identify the symbol that you want to use
  # https://api.twelvedata.com/cryptocurrencies?format=CSV&source=docs

  SYMBOL_MAPPER = {
    # twelvedata symbol => expected symbol
    'BTTN/USD' => 'BTT/USD',
    'pDOTn/USD' => 'DOT/USD',
    'LEOu/USD' => 'LEO/USD',
    'IOTA/USD' => 'MIOTA/USD',
    'UNIs/USD' => 'UNI/USD',
    'WAX/USD' => 'WAXP/USD',
  }

  def data_for_symbol(symbol, start_date)
    data, meta = json_get_data_for_symbol(symbol, start_date)

    # Some symbols contain duplicated values, for example:
    # LTC (Litecoin) result duplicate for 2020-09-13
    data.uniq { |entry| entry["datetime"] }.map do |entry|
      {
        symbol: SYMBOL_MAPPER.fetch(symbol, symbol).gsub('/', ''),
        date: entry['datetime'].to_date,
        open: entry['open'].to_d,
        high: entry['high'].to_d,
        low: entry['low'].to_d,
        close: entry['close'].to_d,
        source: SOURCE,
        currency: meta['currency'],
        exchange: meta['exchange'],
        kind: meta['kind'],
      }
    end
  end

  private

  def json_get_data_for_symbol(symbol, start_date)
    exchange = symbol == 'BTC/USD' ? 'Bitfinex' : nil
    url = api_url(symbol: symbol, start_date: start_date, params: { exchange: exchange })

    json, _status = json_get(url)
    [
      json['values'],
      metadata(json),
    ]
  end

  def metadata(json)
    {
      'currency' => json.dig('meta', 'currency'),
      'exchange' => json.dig('meta', 'exchange'),
      'kind' => json.dig('meta', 'type'),
    }
  end
end

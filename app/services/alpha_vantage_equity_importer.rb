class AlphaVantageEquityImporter < EquityImporter
  SOURCE = 'https://www.alphavantage.co/query'.freeze
  API_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={{symbol}}&outputsize=full&apikey={{api_key}}'.freeze
  API_RPM_LIMIT = 5
  SYMBOLS = %w[
    VTSMX VGTSX VBMFX
  ].freeze

  def data_for_symbol(symbol, start_date)
    data, meta = json_get_data_for_symbol(symbol)
    data.map do |date, entry|
      {
        symbol: symbol.gsub('/', ''),
        date: date.to_date,
        open: entry['1. open'].to_d,
        high: entry['2. high'].to_d,
        low: entry['3. low'].to_d,
        close: entry['4. close'].to_d,
        source: SOURCE,
        currency: meta['currency'],
        exchange: meta['exchange'],
        kind: meta['kind'],
      }
    end
  end

  private

  # { 'YYYY-MM-DD' => { '1. open' => '100', '2. high' => '100' => '4. close' => '100', '5. volume' => '100' } }
  def json_get_data_for_symbol(symbol)
    url = api_url(symbol: symbol)
    json, _status = json_get(url)

    [
      json['Time Series (Daily)'],
      metadata(json),
    ]
  end

  def metadata(json)
    {
      'currency' => json['Meta Data']['2. Symbol'],
      'exchange' => nil,
      'kind' => nil,
    }
  end
end

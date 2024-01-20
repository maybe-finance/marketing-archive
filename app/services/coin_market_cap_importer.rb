require 'uri'
require 'net/https'

class CoinMarketCapImporter
  API_URL = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest'.freeze
  SYMBOLS = %w[
    BTC ETH BNB XRP SOL ADA AVAX DOT DAI DOGE SHIB MATIC NEAR CRO TRX LTC BCH LEO FTT ATOM UNI AAVE MKR SNX LRC COMP YFI SUSHI KNC REN XTZ CRV THETA CAKE FTM GRT STX BAT MANA SAND GMT AXS FLOW CHZ GALA
  ].freeze


  def initialize(api_key:)
    @api_key = api_key
  end

  def call
    api_data = get_api_data()
    market_cap_data = map_api_data_to_market_cap_data(api_data)
    
    import_data(market_cap_data)
  end

  protected

  def symbols
    self.class::SYMBOLS
  end

  def url
    API_URL + '?symbol=' + symbols.join(',')
  end

  def get_api_data()
    uri = URI(url)
    puts "[GET] #{url}"

    headers = {
      'Content-Type' => 'application/json',
      'X-CMC_PRO_API_KEY': @api_key,
    }

    req = Net::HTTP::Get.new(uri, headers)
    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
      http.request(req)
    end

    if res.code != '200'
      raise  "Error: #{res.code}"
    end

    response = JSON.parse(res.body)
  end

  def map_api_data_to_market_cap_data(api_data)
    api_data['data'].map do |symbol, data|
      {
        symbol: symbol,
        value: data[0]['quote']['USD']['market_cap'],
      }
    end
  end

  def import_data(data)
    MarketCap.upsert_all(data, unique_by: :symbol)
  end
end

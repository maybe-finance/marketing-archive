require 'uri'
require 'net/https'

class EquityImporter
  SOURCE = ''.freeze # Stored in db as the data origin
  API_URL = ''.freeze # API url which can contain template vars
  API_RPM_LIMIT = 1 # Maximum requests per minute allowed via API
  SYMBOLS = [].freeze # List of currency symbols to pull from the source url

  def initialize(api_key:)
    @api_key = api_key
  end

  def call
    symbols.each_with_index do |symbol, idx|
      if idx > 0
        sleep seconds_between_api_calls.seconds
      end

      data = data_for_symbol(symbol, '2000-01-01')
      import_data(data)
    end
  end

  protected

  # This should be implemented by each equity provider
  def data_for_symbol(_symbol, _start_date = nil)
    raise 'Not implemented'
  end

  def symbols
    self.class::SYMBOLS
  end

  def json_get(url)
    uri = URI(url)
    puts "[GET] #{url.gsub(@api_key, 'xxx')}"

    req = Net::HTTP::Get.new(uri, 'Content-Type' => 'application/json')
    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
      http.request(req)
    end
    json = JSON.parse(res.body)
    errors = []

    [json, res.code, errors]
  end

  def import_data(data)
    EquityPrice.import(
      data.map { |d| EquityPrice.new(d) },
      on_duplicate_key_update: {
        conflict_target: %i[symbol date],
        columns: %i[open high low close source currency exchange kind]
      }
    )
  end

  def seconds_between_api_calls
    60.0 / self.class::API_RPM_LIMIT
  end

  def api_url(symbol:, start_date: nil, params: {})
    [
      self.class::API_URL
        .gsub('{{api_key}}', @api_key)
        .gsub('{{symbol}}', symbol)
        .gsub('{{start_date}}', start_date&.to_s || ''),
      params.compact.to_query.presence,
    ].compact.join('&')
  end
end

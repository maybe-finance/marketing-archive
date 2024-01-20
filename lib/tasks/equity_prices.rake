require 'dotenv/tasks'

# rubocop:disable Metrics/BlockLength
namespace :equity_prices do
  desc 'Sync Equity prices for mini tools'
  task sync: :environment do
    AlphaVantageEquityImporter.new(api_key: ENV['ALPHA_VANTAGE_API_KEY']).call
    TwelveDataEquityImporter.new(api_key: ENV['TWELVE_DATA_API_KEY']).call

    Tools::CryptoIndexFund::CacheCleaner.call
  end
end

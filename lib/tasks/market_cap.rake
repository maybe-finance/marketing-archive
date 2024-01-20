require 'dotenv/tasks'

# rubocop:disable Metrics/BlockLength
namespace :market_cap do
  desc 'Sync Market Cap for mini tools'
  task sync: :environment do
    CoinMarketCapImporter.new(api_key: ENV['COIN_MARKET_CAP_API_KEY']).call

    Tools::CryptoIndexFund::CacheCleaner.call
  end
end

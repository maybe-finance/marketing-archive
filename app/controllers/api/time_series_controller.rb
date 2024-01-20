module API
  class TimeSeriesController < BaseController
    def index
      if cached_timeseries.present?
        render json: cached_timeseries, status: 200
      else
        head :not_found
      end
    end

    private

    # Job to update prices run 2AM UTC
    def cached_timeseries
      @cached_timeseries ||= Rails.cache.fetch(cache_key, expires_in: 24.hours) do
        timeseries
      end
    end

    def cache_key
      [
        Tools::CryptoIndexFund::CacheCleaner::CACHE_KEY,
        params['symbols'],
      ]
    end

    def timeseries
      result = {}

      symbols.each do |symbol|
        result[symbol] = {
          market_cap: market_cap_for_symbol(symbol),
          prices: equity_prices_for_symbol(symbol),
        }
      end

      result
    end

    def symbols
      params['symbols'].split(',')
    end

    def symbols_with_equity_prices_format
      symbols.map{ |symbol| symbol + 'USD' }
    end

    def equity_prices
      @equity_prices ||= EquityPrice
        .select(:symbol, :date, :close)
        .where(symbol: symbols_with_equity_prices_format)
        .order(date: :desc)
        .group_by(&:symbol)
    end

    def equity_prices_for_symbol(symbol)
      equity_prices[symbol + 'USD']
        .map{ |price| price.close.to_f }
    rescue
      []
    end

    def market_cap
      @market_cap ||= MarketCap
        .select(:symbol, :value)
        .where(symbol: symbols)
        .index_by(&:symbol)
    end

    def market_cap_for_symbol(symbol)
      market_cap[symbol].value.to_i
    rescue
      0
    end
  end
end

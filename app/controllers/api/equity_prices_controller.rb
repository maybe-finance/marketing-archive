module API
  class EquityPricesController < BaseController
    def show
      if symbol_timeseries.present?
        render json: symbol_timeseries, status: 200
      else
        head :not_found
      end
    end

    private

    def interval
      %w[day week month].find { |i| i == params[:interval] } || 'week'
    end

    def build_json_response_query
      <<-SQL
        with rows as (
          select json_agg(t) as rows
          from (
            select distinct on (date_trunc($2, date)) date, open, high, low, close
          from equity_prices
          where symbol = $1
          order by date_trunc($2, date), date desc
          ) t
        )
        select json_build_object('symbol', symbol, 'currency', currency, 'exchange', exchange, 'type', kind, 'rows', rows)
        from equity_prices
        join rows on 1 = 1
        where symbol = $1
        order by date desc
        limit 1;
      SQL
    end

    def symbol_timeseries
      EquityPrice.connection.exec_query(
        build_json_response_query, 'SQL', [[nil, params[:symbol]], [nil, interval]]
      ).first.try(:[], 'json_build_object')
    end
  end
end

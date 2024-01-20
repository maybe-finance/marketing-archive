require "test_helper"

class API::TimeSeriesControllerTest < ActionDispatch::IntegrationTest
  test "return empty data if don't find symbol" do
    get api_time_series_index_url, xhr: true, as: :json, params: {
      symbols: 'AAA,BBB'
    }
    assert_response :success

    result = JSON.parse(response.body)

    expected = {
      'AAA' => {
        'market_cap' => 0,
        'prices' => [],
      },
      'BBB' => {
        'market_cap' => 0,
        'prices' => [],
      }
    }

    assert_equal result, expected
  end

  test "return valid data" do
    EquityPrice.create(symbol: 'AAAUSD', date: '2017-01-01', close: 1)
    EquityPrice.create(symbol: 'AAAUSD', date: '2017-01-02', close: 2)

    MarketCap.create(symbol: 'AAA', value: 1)

    get api_time_series_index_url, xhr: true, as: :json, params: {
      symbols: 'AAA'
    }
    assert_response :success

    result = JSON.parse(response.body)

    expected = {
      'AAA' => {
        'market_cap' => 1,
        'prices' => [2.0, 1.0]
      }
    }

    assert_equal expected, result
  end

  test "return data sorted" do
    EquityPrice.create(symbol: 'AAAUSD', date: '2017-01-01', close: 1)
    EquityPrice.create(symbol: 'AAAUSD', date: '2017-01-02', close: 2)
    EquityPrice.create(symbol: 'BBBUSD', date: '2017-01-01', close: 3)
    EquityPrice.create(symbol: 'BBBUSD', date: '2017-01-02', close: 4)

    MarketCap.create(symbol: 'AAA', value: 1)
    MarketCap.create(symbol: 'BBB', value: 2)

    get api_time_series_index_url, xhr: true, as: :json, params: {
      symbols: 'AAA,BBB'
    }
    assert_response :success

    result = JSON.parse(response.body)

    expected = {
      'AAA' => {
        'market_cap' => 1,
        'prices' => [2.0, 1.0]
      },
      'BBB' => {
        'market_cap' => 2,
        'prices' => [4.0, 3.0]
      }
    }

    assert_equal expected, result
  end
end

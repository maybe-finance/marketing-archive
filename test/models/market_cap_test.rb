require "test_helper"

class MarketCapTest < ActiveSupport::TestCase
  test "is not valid without symbol" do
    market_cap = MarketCap.new(value: 100)
    assert_not market_cap.valid?
  end

  test "is not valid without value" do
    market_cap = MarketCap.new(symbol: 'SOL')
    assert_not market_cap.valid?
  end

  test "is not valid for duplicated symbols" do
    market_cap = MarketCap.new(symbol: 'BTC', value: 100)
    assert_not market_cap.valid?
  end

  test "is not valid for negative value" do
    market_cap = MarketCap.new(symbol: 'SOL', value: -100)
    assert_not market_cap.valid?
  end

  test "valid market cap" do
    market_cap = MarketCap.new(symbol: 'SOL', value: 100)
    assert market_cap.valid?
  end

  test "valid for huge value" do
    market_cap = MarketCap.new(symbol: 'SOL', value: 782293786967)
    assert market_cap.valid?
  end
end

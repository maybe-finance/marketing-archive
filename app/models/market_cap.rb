class MarketCap < ApplicationRecord
  validates :symbol, uniqueness: true, presence: true
  validates :value, presence: true
  validates_numericality_of :value, on: :create, greater_than_or_equal_to: 0
end

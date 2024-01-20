class CreateEquityPrices < ActiveRecord::Migration[6.1]
  def change
    create_table :equity_prices do |t|
      t.string :symbol, null: false, index: true
      t.date :date, null: false, index: true
      t.decimal :open, precision: 20, scale: 11
      t.decimal :high, precision: 20, scale: 11
      t.decimal :low, precision: 20, scale: 11
      t.decimal :close, precision: 20, scale: 11
      t.string :source
      t.string :currency, default: 'usd'
      t.string :exchange
      t.string :kind

      t.timestamps
    end

    add_index :equity_prices, %i[symbol date], unique: true
  end
end

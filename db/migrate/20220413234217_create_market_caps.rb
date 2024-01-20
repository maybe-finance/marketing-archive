class CreateMarketCaps < ActiveRecord::Migration[6.1]
  def change
    create_table :market_caps do |t|
      t.string :symbol, null: false, index: { unique: true }
      t.integer :value, null: false, :limit => 8

      t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
    end
  end
end

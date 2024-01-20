class AddValueColumnToBiEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :bi_events, :value, :decimal, precision: 16, scale: 6
  end
end

class AddWaitlistConstraints < ActiveRecord::Migration[6.1]
  def change
    change_column_null :waitlists, :email, false
    add_index :waitlists, :email, :unique => true
  end
end

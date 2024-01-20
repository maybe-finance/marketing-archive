class AddToolConstraints < ActiveRecord::Migration[6.1]
  def change
    change_column_null :tools, :email, false
    change_column_null :tools, :name, false
    change_column_null :tools, :description, false
    change_column_null :tools, :status, false
  end
end

class AddCurrentToEarlyAccessUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :early_access_users, :current, :text
  end
end

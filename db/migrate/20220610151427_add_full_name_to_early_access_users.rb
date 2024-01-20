class AddFullNameToEarlyAccessUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :early_access_users, :full_name, :string
  end
end

class CreateEarlyAccessUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :early_access_users do |t|
      t.string :email
      t.string :country
      t.string :age
      t.text :interests, array: true, default: []
      t.text :comments
      t.integer :referrer_id, default: nil

      t.timestamps
    end
  end
end

class CreateVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :votes do |t|
      t.references :tool, null: false, foreign_key: true
      t.string :ip_address

      t.timestamps
    end
  end
end

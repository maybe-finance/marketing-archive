class CreateTools < ActiveRecord::Migration[6.1]
  def change
    create_table :tools do |t|
      t.string :name
      t.text :description
      t.string :topic
      t.string :sub_topic
      t.string :status
      t.string :email

      t.timestamps
    end
  end
end

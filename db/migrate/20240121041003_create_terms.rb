class CreateTerms < ActiveRecord::Migration[6.1]
  def change
    create_table :terms do |t|
      t.string :name
      t.string :slug
      t.text :body

      t.timestamps
    end
  end
end

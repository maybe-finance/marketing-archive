class CreateTermSuggestions < ActiveRecord::Migration[6.1]
  def change
    create_table :term_suggestions do |t|
      t.string :email, null: false
      t.string :term, null: false
      t.string :definition

      t.timestamps
    end
  end
end

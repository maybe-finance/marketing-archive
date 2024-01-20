class AddEpisodesUniqueConstraints < ActiveRecord::Migration[6.1]
  def change
    add_index :episodes, :external_id, unique: true
    add_index :episodes, :number, unique: true
    add_index :episodes, :slug, unique: true
  end
end

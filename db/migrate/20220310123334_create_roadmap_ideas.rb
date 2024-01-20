class CreateRoadmapIdeas < ActiveRecord::Migration[6.1]
  def change
    create_table :roadmap_ideas do |t|
      t.string :email, null: false
      t.string :category, null: false
      t.text :description, null: false

      t.timestamps
    end
  end
end

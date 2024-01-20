class CreateEpisodes < ActiveRecord::Migration[6.1]
  def change
    create_table :episodes do |t|
      t.string :external_id
      t.integer :number
      t.string :title
      t.text :summary
      t.text :description
      t.string :image_url
      t.string :formatted_published_at
      t.string :formatted_duration
      t.text :embed_html_player
      t.datetime :external_updated_at

      t.timestamps
    end
  end
end

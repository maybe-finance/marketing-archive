class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.string :slug
      t.text :body
      t.datetime :publish_at

      t.timestamps
    end
  end
end

class AddAuthorToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :author_name, :string, default: "Josh Pigford"
    add_column :articles, :author_twitter, :string, default: "Shpigford"
    add_column :articles, :hero_image, :string
  end
end

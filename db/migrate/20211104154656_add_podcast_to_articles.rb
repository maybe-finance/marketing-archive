class AddPodcastToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :podcast, :string
  end
end

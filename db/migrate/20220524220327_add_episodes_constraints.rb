class AddEpisodesConstraints < ActiveRecord::Migration[6.1]
  def change
    change_column_null :episodes, :external_id, false
    change_column_null :episodes, :number, false
    change_column_null :episodes, :title, false
    change_column_null :episodes, :summary, false
    change_column_null :episodes, :description, false
    change_column_null :episodes, :image_url, false
    change_column_null :episodes, :formatted_published_at, false
    change_column_null :episodes, :formatted_duration, false
    change_column_null :episodes, :embed_html_player, false
    change_column_null :episodes, :external_updated_at, false
    change_column_null :episodes, :slug, false

    change_column_default :episodes, :summary, ''
    change_column_default :episodes, :description, ''
  end
end

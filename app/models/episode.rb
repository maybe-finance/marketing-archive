class Episode < ApplicationRecord
  validates :external_id, :number, :title, :image_url, :formatted_published_at, :formatted_duration, :embed_html_player, :external_updated_at, :slug, presence: true
  validates :external_id, :number, :slug, uniqueness: true
  validates_numericality_of :number, on: :create, greater_than_or_equal_to: 0
end

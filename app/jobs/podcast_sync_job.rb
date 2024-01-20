class PodcastSyncJob < ApplicationJob
  queue_as :default

  def perform
    Podcast::TransistorImporter.new(api_key: ENV['TRANSISTOR_API_KEY']).call
  end
end

require 'dotenv/tasks'

namespace :podcast do
  desc 'Sync podcast episodes'
  task sync: :environment do
    Podcast::TransistorImporter.new(api_key: ENV['TRANSISTOR_API_KEY']).call
  end
end

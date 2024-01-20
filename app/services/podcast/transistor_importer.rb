module Podcast
  class TransistorImporter
    def initialize(api_key: )
      @fetcher = Fetcher.new(api_key: api_key)
      @updater = Updater.new
    end

    def call
      api_episodes = @fetcher.call
      @updater.call(api_episodes)
    end
  end
end

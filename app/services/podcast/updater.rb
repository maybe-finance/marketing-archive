module Podcast
  class Updater
    DEFAULT_IMG_URL = '/img/podcast/podcast-cover.png'.freeze

    def call(api_episodes)
      @episodes = Episode.all
      import_episodes(api_episodes)
    end

    private

    def import_episodes(api_episodes)
      api_episodes.each do |api_episode|
        episode = @episodes.find{|episode| episode.external_id == api_episode['id']}

        if episode_is_new?(episode)
          Episode.create(episode_attributes(api_episode))
        elsif episode_has_changed?(episode, api_episode)
          episode.update(episode_attributes(api_episode))
        end
      end
    end

    def episode_is_new?(episode)
      episode.nil?
    end

    def episode_has_changed?(episode, api_episode)
      episode.external_updated_at != api_episode['attributes']['updated_at']
    end

    def slug(api_episode)
      "#{api_episode['attributes']['number']}-#{api_episode['attributes']['title'].parameterize}"
    end

    def episode_attributes(api_episode)
      {
        external_id: api_episode['id'],
        number: api_episode['attributes']['number'],
        title: api_episode['attributes']['title'],
        summary: api_episode['attributes']['summary'],
        description: api_episode['attributes']['description'],
        image_url: api_episode['attributes']['image_url'] || DEFAULT_IMG_URL,
        formatted_published_at: api_episode['attributes']['formatted_published_at'],
        formatted_duration: api_episode['attributes']['duration_in_mmss'],
        embed_html_player: api_episode['attributes']['embed_html_dark'],
        external_updated_at: api_episode['attributes']['updated_at'],
        slug: slug(api_episode),
      }
    end
  end
end

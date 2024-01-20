require 'uri'
require 'net/https'

module Podcast
  class Fetcher
    API_URL = 'https://api.transistor.fm/v1/episodes'.freeze
    SHOW_ID = '25796'.freeze

    def initialize(api_key: )
      @page = 1
      @api_key = api_key
      @api_episodes = []
    end

    def call
      meta, api_episodes = json_get(uri, headers)
      
      @api_episodes += api_episodes

      if meta['currentPage'] < meta['totalPages']
        @page = @page + 1
        return call
      end

      @api_episodes
    end

    private

    def json_get(uri, headers)
      puts "[GET] #{uri}"

      req = Net::HTTP::Get.new(uri, headers)
      res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
        http.request(req)
      end

      raise "Failed to connect to Transistor.fm" unless res.kind_of? Net::HTTPSuccess

      api_response = JSON.parse(res.body)
      [api_response['meta'], api_response['data']]
    end

    def uri
      uri = URI.parse(API_URL)
      uri.query = URI.encode_www_form(params)

      uri
    end

    def params
      {
        'show_id' => SHOW_ID,
        'status' => 'published',
        'fields[episode][]' => [
          'number',
          'title','description',
          'formatted_published_at',
          'duration_in_mmss',
          'embed_html_dark',
          'summary',
          'media_url',
          'updated_at',
        ],
        'pagination[page]' => @page,
      }
    end

    def headers
      {
        'Content-Type' => 'application/json',
        'x-api-key': @api_key,
      }
    end
  end
end

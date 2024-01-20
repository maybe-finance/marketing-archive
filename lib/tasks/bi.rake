require 'dotenv/tasks'

# rubocop:disable Metrics/BlockLength
namespace :bi do
  desc 'Sync ConvertKit subscribers for BI'
  task convertkit: :environment do
    require 'convertkit'

    Convertkit.configure do |config|
      config.api_secret = ENV['CONVERTKIT_API_SECRET']
      config.api_key = ENV['CONVERTKIT_API_KEY']
    end

    client = Convertkit::Client.new

    from = BiEvent.where(event_type: 'convertkit.subscriber').maximum(:occurred_at)
    page = 1
    total_pages = nil

    bi_events_to_insert = []

    while total_pages.nil? || page <= total_pages
      subscribers = client.subscribers(from: from, page: page)
      response = subscribers.body

      response['subscribers'].each do |sub|
        bi_events_to_insert << BiEvent.new(
          oid: sub['id'],
          event_type: 'convertkit.subscriber',
          occurred_at: Time.parse(sub['created_at']),
          metadata: {
            email: sub['email_address']
          }
        )
      end

      total_pages ||= response['total_pages']
      page += 1
    end

    BiEvent.import(
      bi_events_to_insert,
      on_duplicate_key_update: {
        conflict_target: %i[event_type oid],
        columns: %i[occurred_at metadata]
      }
    )
  end

  desc 'Sync Clockify timesheets for BI'
  task clockify: :environment do
    require 'uri'
    require 'net/https'

    start_date = BiEvent.where(event_type: 'clockify.timeentry').maximum(:occurred_at)
    start_date ||= Time.parse('2021-05-01 00:00:00UTC')
    start_date -= 2.weeks

    uri = URI('https://reports.api.clockify.me/v1/workspaces/'+ ENV['CLOCKIFY_WORKSPACE'] +'/reports/detailed')
    req = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
    req.body = {
      dateRangeStart: start_date.iso8601,
      dateRangeEnd: 1.week.from_now.iso8601,
      detailedFilter: {
        page: 1,
        pageSize: 1000
      }
    }.to_json
    req['X-Api-Key'] = ENV['CLOCKIFY_API_KEY']
    res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
    res = JSON.parse(res.body)
    bi_events_to_insert = res['timeentries'].map do |entry|
      BiEvent.new(
        oid: entry['_id'],
        event_type: 'clockify.timeentry',
        occurred_at: Time.parse(entry.dig('timeInterval', 'start')),
        metadata: entry
      )
    end

    BiEvent.import(
      bi_events_to_insert,
      on_duplicate_key_update: {
        conflict_target: %i[event_type oid],
        columns: %i[occurred_at metadata]
      }
    )
  end
end

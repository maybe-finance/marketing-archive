class PodcastController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:webhook]

  def show
    @episode = Episode.find_by(slug: params[:slug])
  end

  def index
    @episodes = Episode.order(number: 'desc')
  end

  def webhook
    PodcastSyncJob.perform_later
  end
end

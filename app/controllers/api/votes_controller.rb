module API
  class VotesController < BaseController
    def create
      @vote = Vote.new(vote_params)

      if @vote.save
        render json: { success: true }, status: 200
      else
        render json: @vote.errors, status: :unprocessable_entity
      end
    end

    private

    def vote_params
      params
        .permit(:tool_id)
        .merge(ip_address: request.remote_ip)
    end
  end
end

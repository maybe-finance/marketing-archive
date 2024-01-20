module API
  class WaitlistController < BaseController
    def create
      @waitlist = Waitlist.new(waitlist_params)

      if @waitlist.save
        render json: { success: true }, status: 200
      else
        render json: @waitlist.errors, status: :unprocessable_entity
      end
    end

    private

    def waitlist_params
      params.permit(:email)
    end
  end
end

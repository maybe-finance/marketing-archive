module API
  class RoadmapIdeasController < BaseController
    def create
      @roadmapIdea = RoadmapIdea.new(roadmap_idea_params)

      if @roadmapIdea.save
        render json: { success: true }, status: 200
      else
        render json: @roadmapIdea.errors, status: :unprocessable_entity
      end
    end

    private

    def roadmap_idea_params
      params
        .permit(:email, :category, :description)
    end
  end
end

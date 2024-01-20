module API
  class ToolsController < BaseController
    def index
      render json: Tool.on_vote, status: 200, only: [:id, :name, :description, :topic, :sub_topic, :votes_count]
    end

    def create
      @tool = Tool.new(tool_params)

      if @tool.save
        render json: { success: true }, status: 200
      else
        render json: @tool.errors, status: :unprocessable_entity
      end
    end

    private

    def tool_params
      params
        .permit(:email, :name, :description)
    end
  end
end

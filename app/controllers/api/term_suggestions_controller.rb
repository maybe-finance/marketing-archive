module API
  class TermSuggestionsController < BaseController
    def create
      @term_suggestion = TermSuggestion.new(term_suggestion_params)

      if @term_suggestion.save
        render json: { success: true }, status: 200
      else
        render json: @term_suggestion.errors, status: :unprocessable_entity
      end
    end

    private

    def term_suggestion_params
      params.permit(:email, :term, :definition)
    end
  end
end

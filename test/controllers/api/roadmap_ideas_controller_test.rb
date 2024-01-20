require "test_helper"

class API::RoadmapIdeasControllerTest < ActionDispatch::IntegrationTest
  test "creates roadmap idea" do
    assert_difference 'RoadmapIdea.count' do
      post api_roadmap_ideas_url, params: {
        email: 'saulo@maybe.co',
        category: 'improvement',
        description: 'This is a new roadmap idea'
      }, xhr: true, as: :json
    end
  end

  test "dont creates invalid roadmap idea" do
    assert_no_difference 'RoadmapIdea.count' do
      post api_roadmap_ideas_url, params: {
        email: 'saulo@maybe.co',
      }, xhr: true, as: :json

      assert_response :unprocessable_entity
    end
  end
end

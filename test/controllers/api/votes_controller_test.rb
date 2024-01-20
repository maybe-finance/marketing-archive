require "test_helper"

class API::VotesControllerTest < ActionDispatch::IntegrationTest
  test "save vote" do
    assert_difference 'Vote.count' do
      post api_votes_url, params: {
        email: 'saulo@maybe.co',
        tool_id: Tool.first.id,
      }, xhr: true, as: :json
    end
  end

  test "skip votes from same ip" do
    tool_id = Vote.first.tool_id

    post api_votes_url, params: {
      tool_id: tool_id,
      }, xhr: true, as: :json
      
    assert_no_difference 'Vote.count' do
      post api_votes_url, params: {
        tool_id: tool_id,
      }, xhr: true, as: :json

      assert_response :unprocessable_entity
    end
  end
end

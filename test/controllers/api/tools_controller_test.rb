require "test_helper"

class API::ToolsControllerTest < ActionDispatch::IntegrationTest
  test "gets tools on vote" do
    get api_tools_url, xhr: true, as: :json
    assert_response :success

    result = JSON.parse(response.body)

    assert_equal result.count, Tool.on_vote.count
  end

  test "creates a tool" do
    assert_difference 'Tool.count' do
      post api_tools_url, params: {
        email: 'saulo@maybe.co',
        name: 'My new tool idea',
        description: 'This is a new tool idea'
      }, xhr: true, as: :json
    end
  end
end

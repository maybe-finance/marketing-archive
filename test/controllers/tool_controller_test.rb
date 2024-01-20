require "test_helper"

class ToolControllerTest < ActionDispatch::IntegrationTest
  test "get tools index page" do
    get tools_url
    assert_response :success
  end

  test "get tools vote page" do
    get tools_vote_url
    assert_response :success
  end
end

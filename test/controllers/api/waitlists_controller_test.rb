require "test_helper"

class API::WaitlistsControllerTest < ActionDispatch::IntegrationTest
  test "join to waitlist" do
    assert_difference 'Waitlist.count' do
      post api_waitlist_index_url, params: {
        email: 'tim@maybe.co',
      }, xhr: true, as: :json
    end
  end

  test "skip subscription for same email" do
    email = 'tim@maybe.co'

    post api_waitlist_index_url, params: {
      email: email
      }, xhr: true, as: :json
      
    assert_no_difference 'Waitlist.count' do
      post api_waitlist_index_url, params: {
        email: email
      }, xhr: true, as: :json

      assert_response :unprocessable_entity
    end
  end
end

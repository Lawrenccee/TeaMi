require 'test_helper'

class Api::ChatsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_chats_index_url
    assert_response :success
  end

  test "should get create" do
    get api_chats_create_url
    assert_response :success
  end

  test "should get show" do
    get api_chats_show_url
    assert_response :success
  end

  test "should get update" do
    get api_chats_update_url
    assert_response :success
  end

end

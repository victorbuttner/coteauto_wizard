require 'test_helper'

class PixelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pixel = pixels(:one)
  end

  test "should get index" do
    get pixels_url
    assert_response :success
  end

  test "should get new" do
    get new_pixel_url
    assert_response :success
  end

  test "should create pixel" do
    assert_difference('Pixel.count') do
      post pixels_url, params: { pixel: { text: @pixel.text } }
    end

    assert_redirected_to pixel_url(Pixel.last)
  end

  test "should show pixel" do
    get pixel_url(@pixel)
    assert_response :success
  end

  test "should get edit" do
    get edit_pixel_url(@pixel)
    assert_response :success
  end

  test "should update pixel" do
    patch pixel_url(@pixel), params: { pixel: { text: @pixel.text } }
    assert_redirected_to pixel_url(@pixel)
  end

  test "should destroy pixel" do
    assert_difference('Pixel.count', -1) do
      delete pixel_url(@pixel)
    end

    assert_redirected_to pixels_url
  end
end

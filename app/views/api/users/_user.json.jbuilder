json.extract! user, :id, :username, :email, :profile_pic_url

json.set! :user_thumb_image_url, asset_path(user.user_image.url(:thumb))
json.set! :user_medium_image_url, asset_path(user.user_image.url(:medium))
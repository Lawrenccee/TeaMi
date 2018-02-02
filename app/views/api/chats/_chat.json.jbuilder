json.extract! chat, :id, :name, :chat_pic_url
json.set! :timestamp, chat.updated_at.localtime.strftime("%a %b %d %I:%M%P")

most_recent_message = chat.messages.order("created_at").last

if most_recent_message
  created_at = most_recent_message.created_at
  timestamp = created_at.localtime.strftime("%a %b %d %I:%M%P")

  json.set! :preview do 
    json.extract! most_recent_message, 
      :id, :body, :giphy_url, :author_id, :chat_id

    json.set! :timestamp, timestamp
  end
else
  timestamp = chat.updated_at.localtime.strftime("%a %b %d %I:%M%P")

  json.set! :preview do 
    json.set! :body, ""
    json.set! :timestamp, timestamp
  end
end
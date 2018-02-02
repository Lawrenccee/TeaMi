created_at = message.created_at

  timestamp = created_at.strftime("%a %b %d %I:%M%P")

  json.set! message.id do 
    json.extract! message, 
      :id, :body, :giphy_url, :author_id, :chat_id

    json.set! :timestamp, timestamp
  end
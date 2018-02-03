json.extract! chat, :id, :name, :chat_pic_url
# json.set! :timestamp, chat.updated_at.localtime.strftime("%a %b %d %I:%M%P")

most_recent_message = chat.messages.order("created_at").last

date_compare = nil

if most_recent_message
  time = most_recent_message.created_at.localtime
  date_compare = time
  time_to_date = time.to_date

  timestamp = time.strftime("%b %d")

  if Date.today - 7 < time_to_date
    timestamp = time.strftime("%a")
  end

  if Date.today == time_to_date
    timestamp = time.strftime("%I:%M%P")
  end

  json.set! :preview do 
    json.extract! most_recent_message, 
      :id, :body, :giphy_url, :author_id, :chat_id

    json.set! :timestamp, timestamp
  end
else
  time = chat.updated_at.localtime
  date_compare = time
  time_to_date = time.to_date
  
  timestamp = time.strftime("%b %d")
  
  if Date.today - 7 < time_to_date
    timestamp = time.strftime("%a")
  end

  if Date.today == time_to_date
    timestamp = time.strftime("%I:%M%P")
  end

  json.set! :preview do 
    json.set! :body, ""
    json.set! :timestamp, timestamp
  end
end

json.set! :date_compare, date_compare
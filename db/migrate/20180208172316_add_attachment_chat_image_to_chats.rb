class AddAttachmentChatImageToChats < ActiveRecord::Migration[5.1]
  def self.up
    change_table :chats do |t|
      t.attachment :chat_image
    end
  end

  def self.down
    remove_attachment :chats, :chat_image
  end
end

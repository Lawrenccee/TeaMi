class ChatMembership < ApplicationRecord
  validates :member_id, presence: true
  validates :chat_id, presence: true

  belongs_to :member,
    primary_key: :id,
    foreign_key: :member_id,
    class_name: :User

  belongs_to :chat,
    primary_key: :id,
    foreign_key: :chat_id,
    class_name: :Chat
end

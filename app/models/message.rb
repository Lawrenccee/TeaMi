class Message < ApplicationRecord
  validates :author_id, presence: true
  validates :chat_id, presence: true

  after_create_commit { MessageBroadcastJob.perform_later(self) }

  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User

  belongs_to :chat
end



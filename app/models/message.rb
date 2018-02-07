class Message < ApplicationRecord
  validates :author_id, presence: true
  validates :chat_id, presence: true
  validate :body_or_gif

  after_create_commit { MessageBroadcastJob.perform_later(self) }

  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User

  belongs_to :chat

  private

  def body_or_gif
    unless body.present? || giphy_url.present? 
      errors.add(:body, "Either body or giphy url needs a value") 
    end
  end
end



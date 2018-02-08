class Chat < ApplicationRecord
  validates :name, presence: true

  has_many :messages,
    primary_key: :id,
    foreign_key: :chat_id,
    class_name: :Message

  has_many :chat_memberships,
    primary_key: :id,
    foreign_key: :chat_id,
    class_name: :ChatMembership

  has_many :members,
    through: :chat_memberships,
    source: :member
end

class Chat < ApplicationRecord
  validates :name, presence: true

  has_attached_file :chat_image, 
    storage: :s3,
    s3_credentials: {
      access_key_id: ENV["aws_access_key_id"],
      secret_access_key: ENV["aws_secret_access_key"],
      bucket: "teami-#{Rails.env[0..2]}"
    },
    styles: { 
      medium: "100x100#", 
      thumb: "50x50#" 
    },
    convert_options: { 
      thumb: '-quality 80',
      medium: '-quality 80'
    },
    url: ":s3_domain_url", 
    default_url: "https://s3-us-west-1.amazonaws.com/teami-#{Rails.env[0..2]}/images/profile_pic.svg", 
    s3_region: ENV["aws_region"],
    path: '/images/chats/:id/:filename'

  # Validate content type
  validates_attachment_content_type :chat_image, content_type: /\Aimage/
  # Validate filename
  validates_attachment_file_name :chat_image, matches: [/png\z/i, /jpe?g\z/i, /tif?f\z/i, /bmp\z/i]

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

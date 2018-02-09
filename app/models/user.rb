class User < ApplicationRecord
  validates :username, presence: true, length: { maximum: 20 }
  validates :email, presence: true, uniqueness: true
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }

  before_validation :ensure_session_token

  #TODO Add relations here
  has_attached_file :user_image, 
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
    url: ":s3_domain_url",
    default_url: "https://s3-us-west-1.amazonaws.com/teami-#{Rails.env[0..2]}/images/profile_pic.svg", 
    s3_region: ENV["aws_region"],
    path: '/images/users/:id/:filename'

  # Validate content type
  validates_attachment_content_type :user_image, content_type: /\Aimage/
  # Validate filename
  validates_attachment_file_name :user_image, matches: [/png\z/i, /jpe?g\z/i, /tif?f\z/i, /bmp\z/i]

  has_many :messages,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :Message,
    dependent: :destroy

  has_many :chat_memberships,
    primary_key: :id,
    foreign_key: :member_id,
    class_name: :ChatMembership,
    dependent: :destroy

  has_many :chats,
    through: :chat_memberships,
    source: :chat

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(email, password) 
    user = User.find_by(email: email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end


class User < ApplicationRecord
  validates :username, presence: true, length: { maximum: 20 }
  validates :email, presence: true, uniqueness: true
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }
  
  before_validation :ensure_session_token

  #TODO Add relations here
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


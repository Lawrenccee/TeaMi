class CreateChatMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :chat_memberships do |t|
      t.string :chat_id, null: false
      t.string :member_id, null: false

      t.timestamps
    end

    add_index :chat_memberships, [:chat_id, :member_id], unique: true
    add_index :chat_memberships, :chat_id
    add_index :chat_memberships, :member_id
  end
end

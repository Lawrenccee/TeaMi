class CreateChats < ActiveRecord::Migration[5.1]
  def change
    create_table :chats do |t|
      t.string :name, null: false
      t.string :chat_pic_url

      t.timestamps
    end

    add_index :chats, :name
  end
end

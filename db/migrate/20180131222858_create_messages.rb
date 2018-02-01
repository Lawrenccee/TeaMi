class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :body
      t.string :giphy_url
      t.integer :author_id
      t.integer :chat_id

      t.timestamps
    end

    add_index :messages, :author_id
    add_index :messages, :chat_id
  end
end

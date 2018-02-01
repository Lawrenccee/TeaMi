class ChangeMessageColumn < ActiveRecord::Migration[5.1]
  def change
    change_column :messages, :body, :text
    change_column :messages, :author_id, :integer, null: false
    change_column :messages, :chat_id, :integer, null: false
  end
end

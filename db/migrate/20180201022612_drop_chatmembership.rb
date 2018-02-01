class DropChatmembership < ActiveRecord::Migration[5.1]
  def change
    drop_table :chatmemberships
  end
end

class ChangeForeignKeyTypesOfChatMembershipToIntegerFromString < ActiveRecord::Migration[5.1]
  def change
    change_column :chat_memberships, :chat_id, 'integer USING chat_id::integer', null: false
    change_column :chat_memberships, :member_id, 'integer USING member_id::integer', null: false
  end
end

class AddVoteConstraints < ActiveRecord::Migration[6.1]
  def change
    change_column_null :votes, :ip_address, false
    add_index :votes, [:tool_id, :ip_address], :unique => true
  end
end

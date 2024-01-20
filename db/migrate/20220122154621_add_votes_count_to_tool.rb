class AddVotesCountToTool < ActiveRecord::Migration[6.1]
  def change
    add_column :tools, :votes_count, :integer
  end
end

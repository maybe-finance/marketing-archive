class Vote < ApplicationRecord
  belongs_to :tool, counter_cache: true
  
  validates :ip_address, presence: true
  validates :tool_id, uniqueness: { scope: :ip_address,
    message: "vote already computed for this ip" }
end

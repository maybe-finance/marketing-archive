class EarlyAccessUser < ApplicationRecord
  include Hashid::Rails

  has_many :referrals, class_name: 'EarlyAccessUser', foreign_key: 'referrer_id'
  belongs_to :referrer, class_name: 'EarlyAccessUser', optional: true

  validates :email, 
    presence: true, 
    format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i },
    length: { minimum: 4, maximum: 254 }

  #
  # Calculates a user's position in the queue:
  #   1 referral  = jump 5 positions
  #  25 referrals = jump 1,000 positions
  #  The reward scales linearly and the max allowed jump is 1,000 positions.
  #  Multiple users can hold the same position in the queue.
  #
  def queue_position
    boost_per_referral = 5 + (referral_count - 1) * 1.46
    [
      1,
      id - [1000, (referral_count * boost_per_referral).ceil].min
    ].max
  end

  def referral_count
    @referral_count ||= EarlyAccessUser.where(referrer_id: id).count
  end
end

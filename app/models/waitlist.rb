class Waitlist < ApplicationRecord
  validates :email, presence: true
  validates :email, uniqueness: { message: "%{value} already on waitlist" }
end

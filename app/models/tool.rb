class Tool < ApplicationRecord
  has_many :votes, dependent: :destroy

  IN_REVIEW = 'in_review'
  ON_VOTE = 'on_vote'
  IN_PROGRESS = 'in_progress'
  REJECTED = 'rejected'
  BUILT = 'built'

  STATUSES = [
    IN_REVIEW,
    ON_VOTE,
    IN_PROGRESS,
    REJECTED,
    BUILT,
  ]

  attribute :status, :string, default: IN_REVIEW

  validates :status, :inclusion => { :in => STATUSES }
  validates :name, :description, :email, :status, presence: true

  scope :on_vote, -> { where(status: ON_VOTE) }
end

class RoadmapIdea < ApplicationRecord
  IMPROVEMENT = 'improvement'
  INTEGRATION = 'integration'
  DEALBREAKER = 'dealbreaker'
  UX = 'ux'
  BUG = 'bug'
  MISC = 'misc'

  CATEGORIES = [
    IMPROVEMENT,
    INTEGRATION,
    DEALBREAKER,
    UX,
    BUG,
    MISC,
  ]

  validates :category, :inclusion => { :in => CATEGORIES }
  validates :email, :category, :description, presence: true
end

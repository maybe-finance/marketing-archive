class TermSuggestion < ApplicationRecord
  validates :email, :term, presence: true
end

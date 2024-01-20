# Preview all emails at http://localhost:3000/rails/mailers/transaction_mailer
class TransactionMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/transaction_mailer/EarlyAccess
  def EarlyAccess
    TransactionMailer.EarlyAccess
  end

end

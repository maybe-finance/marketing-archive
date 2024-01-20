require 'postmark-rails/templated_mailer'

class TransactionMailer < PostmarkRails::TemplatedMailer
  def early_access
    @user = params[:user]
    self.template_model = { "earlyAccessLink": "https://maybe.co/early-access/#{@user.hashid}/#{Base64.urlsafe_encode64(@user.email, padding: false)}",
    "referralLink": "https://maybe.co/refer/#{@user.hashid}" }

    mail(
      to: @user.email,
      from: 'hello@maybe.co',
      track_opens: 'true',
      message_stream: 'outbound'
    )
  end
end

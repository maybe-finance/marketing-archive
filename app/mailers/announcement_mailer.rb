class AnnouncementMailer < ApplicationMailer
  def announcement
    @user = params[:user]
  
    mail(
      subject: '🎉 Maybe Early Access',
      to: @user.email,
      from: 'announcements@maybe.co',
      track_opens: 'true',
      message_stream: 'announcements')
  end
end

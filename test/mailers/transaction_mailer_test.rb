require "test_helper"

class TransactionMailerTest < ActionMailer::TestCase
  test "EarlyAccess" do
    mail = TransactionMailer.EarlyAccess
    assert_equal "Earlyaccess", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end

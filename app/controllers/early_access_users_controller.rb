class EarlyAccessUsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    @user = EarlyAccessUser.new
  end

  def edit
    
  end

  def existing
    
  end

  def create
    if @user = EarlyAccessUser.find_by(email: params[:early_access_user][:email])
      TransactionMailer.with(user: @user).early_access.deliver
      redirect_to existing_early_access_users_path
    else
      @user = EarlyAccessUser.new(user_params)

      if params[:early_access_user][:referrer_id]
        referrer = EarlyAccessUser.find_by_hashid(params[:early_access_user][:referrer_id])

        if referrer.present?
          @user.referrer_id = referrer.id
        else 
          @user.referrer_id = nil
        end
      end

      if @user.save
        TransactionMailer.with(user: @user).early_access.deliver
        
        encrypted_email = Base64.urlsafe_encode64(@user.email, padding: false)
        
        redirect_to early_access_users_encrypt_path(@user, encrypted_email)
      else
        render 'edit'
      end
    end
  end

  def show
    # http://localhost:3000/early-access/2VxSW5/am9zaEBtYXliZS5jbw
    begin
      email = Base64.urlsafe_decode64(params[:email]) if params[:email]
    rescue ArgumentError
    end

    @user = EarlyAccessUser.where(email: email).find_by_hashid(params[:id])

    redirect_to root_path if @user.nil?
  end

  def update
    @user = EarlyAccessUser.find_by_hashid(params[:id])

    if @user.update(user_params)
      encrypted_email = Base64.urlsafe_encode64(@user.email, padding: false)
      redirect_to early_access_users_encrypt_path(@user, encrypted_email)
    else
      render 'edit'
    end
  end

  private

  def user_params
    params.require(:early_access_user).permit(:full_name, :email, :country, :age, :device, {:interests => []}, :comments, :current, :referrer_id)
  end
end

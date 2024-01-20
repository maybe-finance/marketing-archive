class ReferController < ApplicationController
  def show
    cookies.permanent[:referral] = params[:id]

    redirect_to root_path
  end
end

class PagesController < ApplicationController
  def home; end

  def privacy
    @page = ButterCMS::Page.get('*', 'privacy-policy').data
  end

  def terms
    @page = ButterCMS::Page.get('*', 'terms-of-service').data
  end

  def roadmap
  end

  def now_subscribe; end

  def now_thanks; end
  
  def now_unsubscribe; end

  def investors; end

  def ask; end

  def community
    #redirect_to 'https://community.maybe.co'
  end
end

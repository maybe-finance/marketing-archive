class SitemapsController < ApplicationController
  def index
    respond_to do |format|
      format.xml
    end
  end

  def pages
    respond_to do |format|
      format.xml
    end
  end

  def tools
    respond_to do |format|
      format.xml
    end
  end

  def articles
    @articles = ButterCMS::Post.all({:page_size => 50})
    
    respond_to do |format|
      format.xml
    end
  end
end

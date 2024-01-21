class ArticlesController < ApplicationController
  def index
    @articles = Article.order('publish_at DESC')
    @title = "Articles"
  end

  def show
    @article = Article.where(slug: params[:id]).first
    @title = @article.title

    if @article.nil?
      redirect_to '/404'
    end
  end
end

class ArticlesController < ApplicationController
  def index
    @articles = ButterCMS::Post.all({:page_size => 50})
    @title = "Articles"
  end

  def show
    @article = ButterCMS::Post.find(params[:id])
    @title = @article.title
  end
end

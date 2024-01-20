class DictionaryController < ApplicationController
  def show
    @term = DictionaryTermsFetcher.get(params[:slug])
    @more_terms = DictionaryTermsFetcher.more_terms(params[:slug])
  end

  def index
    @terms = DictionaryTermsFetcher.list
  end
end

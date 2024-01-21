Rails.application.routes.draw do
  namespace :api, default: { format: :json } do
    resources :equity_prices, only: :show, param: :symbol
    resources :tools, only: [:index, :create]
    resources :votes, only: [:create]
    resources :waitlist, only: [:create]
    resources :roadmap_ideas, only: [:create]
    resources :time_series, only: [:index]
    resources :term_suggestions, only: [:create]
  end

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  resources :articles

  get 'early-access/:id/:email', to: 'early_access_users#show', as: 'early_access_users_encrypt'

  resources :early_access_users, path: 'early-access' do
    get :existing, on: :collection
  end

  resources :refer

  get 'tools', to: 'tools#index'
  get 'tools/vote', to: 'tools#vote'
  get 'tools/low-hanging-fruit-checklist', to: 'tools#low_hanging_fruit_checklist'
  get 'tools/fomo-calculator', to: 'tools#fomo_calculator'
  get 'tools/freedom-calculator', to: 'tools#freedom_calculator'
  get 'tools/bogleheads-growth-calculator', to: 'tools#bogleheads_growth_calculator'
  get 'tools/crypto-index-fund', to: 'tools#crypto_index_fund'
  get 'tools/compound-interest-calculator', to: 'tools#compound_interest_calculator'
  get 'vote', to: 'tools#vote'

  get 'privacy', to: 'pages#privacy'
  get 'terms', to: 'pages#terms'
  get 'roadmap', to: 'pages#roadmap'
  get 'ask', to: 'pages#ask'
  get 'community', to: 'pages#community'
  get 'investors', to: 'pages#investors'
  get 'security', to: 'pages#security'
  get 'pricing', to: 'pages#pricing'
  
  get '/podcast', to: redirect('/')
  get '/podcast/*path', to: redirect('/')

  get 'dictionary', to: 'dictionary#index'
  get 'dictionary/:slug', to: 'dictionary#show'

  get "/sitemap.xml", to: "sitemaps#index", as: :sitemaps
  get "/sitemap-pages.xml", to: "sitemaps#pages", as: :sitemap_pages
  get "/sitemap-tools.xml", to: "sitemaps#tools", as: :sitemap_tools
  get "/sitemap-articles.xml", to: "sitemaps#articles", as: :sitemap_articles

  get 'unsubscribe-newsletter', to: 'pages#now_unsubscribe'
  get 'now-subscribe', to: 'pages#now_subscribe'
  get 'now-thanks', to: 'pages#now_thanks'
  get 'now-unsubscribe', to: 'pages#now_unsubscribe'

  get '/404', to: 'errors#not_found'
  get '/500', to: 'errors#internal_server'
  get '/422', to: 'errors#unprocessable'

  root to: 'pages#home'
end

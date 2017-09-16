Rails.application.routes.draw do
  devise_for :readers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'
  resource :library
  resources :books, constraints: { format: 'json' }
end

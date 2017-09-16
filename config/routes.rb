Rails.application.routes.draw do
  devise_for :readers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#home'
  resource :library
  resources :books, constraints: { format: 'json' } do
    collection do
      get :reading_list
      get :read_list
    end
  end
  resource :books_readers, only: [:create, :update], constraints: { format: 'json' }
end

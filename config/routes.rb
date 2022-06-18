Rails.application.routes.draw do
  resources :posts, only: [:new, :create, :show, :edit, :update]
  get 'inertia-example', to: 'inertia_example#index'
end

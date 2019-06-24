Rails.application.routes.draw do
  get '/migration_analytics', to: 'migration_analytics#index'
end

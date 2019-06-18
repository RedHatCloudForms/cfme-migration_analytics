Rails.application.routes.draw do
  # TODO strip this down to one page?
  get '/plug', to: 'plug#show'

  get '/demo', to: 'demo#show_list'
  get "demo/show(/:id)", controller: 'demo', action: 'show'
  get "demo/show_list(/:id)", controller: 'demo', action: 'show_list'
  post "demo/report_data", controller: 'demo', action: 'report_data'
end

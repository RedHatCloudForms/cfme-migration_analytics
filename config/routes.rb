Rails.application.routes.draw do
  if Settings.prototype.migration_analytics.enabled
    get "/migration_analytics", to: "migration_analytics#index"
  end
end

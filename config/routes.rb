Rails.application.routes.draw do
  if Settings.prototype.migration_analytics.enabled
    get "/migration_analytics", to: "migration_analytics#index"
    get "/migration_analytics/payload", to: "migration_analytics#payload"
  end
end

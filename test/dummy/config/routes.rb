Rails.application.routes.draw do
  mount Cfme::MigrationAnalytics::Engine => "/migration_analytics"
end

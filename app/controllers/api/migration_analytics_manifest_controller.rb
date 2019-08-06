module Api
  class MigrationAnalyticsManifestController < BaseController
    def index
      res = {
        :hello => 'world'
      }
      render_resource :migration_analytics_manifest, res
    end
  end
end
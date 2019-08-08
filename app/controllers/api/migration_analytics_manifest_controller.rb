module Api
  class MigrationAnalyticsManifestController < BaseController

    def index
      manifest_path = Cfme::MigrationAnalytics::Engine.root.join("config", "default-manifest.json")
      manifest = load_manifest(manifest_path)

      res = {
        :path => manifest_path,
        :body => manifest,
      }
      render_resource :migration_analytics_manifest, res
    end

    private

    def load_manifest(path)
        JSON.parse(File.read(path))
      rescue JSON::ParserError
        nil
    end

  end
end

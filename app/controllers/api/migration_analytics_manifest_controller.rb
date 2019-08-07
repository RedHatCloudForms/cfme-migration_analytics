module Api
  class MigrationAnalyticsManifestController < BaseController

    def index
      tmp_manifest_path = '/tmp/migration-analytics-manifest.json'
      tmp_manifest = File.file?(tmp_manifest_path) ? load_manifest(tmp_manifest_path) : nil
      tmp_manifest_valid = tmp_manifest != nil && tmp_manifest != :invalid

      if tmp_manifest_valid
        manifest_path = tmp_manifest_path
        manifest = tmp_manifest
      else
        manifest_path = Cfme::MigrationAnalytics::Engine.root.join('config', 'default-manifest.json')
        manifest = load_manifest(manifest_path)
      end

      res = {
        :tmp_manifest_present => tmp_manifest != nil,
        :tmp_manifest_valid => tmp_manifest_valid,
        :path => manifest_path,
        :body => manifest,
      }
      render_resource :migration_analytics_manifest, res
    end

    private

    def load_manifest(path)
        JSON.parse(File.read(path))
      rescue JSON::ParserError
        :invalid
    end

  end
end

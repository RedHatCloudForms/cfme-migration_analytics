def parse_json_if_valid(json)
    return JSON.parse(json)
  rescue JSON::ParserError => e
    return :invalid
end

module Api
  class MigrationAnalyticsManifestController < BaseController
    def index
      tmp_manifest_path = '/tmp/migration-analytics-manifest.json'
      tmp_manifest = File.file?(tmp_manifest_path) ? parse_json_if_valid(File.read(tmp_manifest_path)) : nil
      tmp_manifest_valid = tmp_manifest != nil && tmp_manifest != :invalid

      if tmp_manifest_valid
        manifest_path = tmp_manifest_path
        manifest = tmp_manifest
      else
        manifest_path = File.join(
          Bundler.environment.specs['cfme-migration_analytics'].first.full_gem_path,
          'config/default-manifest.json'
        )
        manifest = parse_json_if_valid(File.read(manifest_path))
      end

      res = {
        :tmp_manifest_present => tmp_manifest != nil,
        :tmp_manifest_valid => tmp_manifest_valid,
        :path => manifest_path,
        :body => manifest,
      }
      render_resource :migration_analytics_manifest, res
    end
  end
end

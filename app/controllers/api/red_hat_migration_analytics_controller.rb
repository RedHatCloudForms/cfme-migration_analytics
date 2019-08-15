module Api
  class RedHatMigrationAnalyticsController < BaseController
    def index
      check_feature_enabled
      manifest = self.class.parse_manifest
      res = {
        :manifest_version => manifest[:version],
        :using_default_manifest => manifest[:using_default]
      }
      render_resource :red_hat_migration_analytics, res
    end

    def bundle_collection(type, data)
      check_feature_enabled
      manifest = self.class.parse_manifest[:body]

      provider_ids = data["provider_ids"]
      provider_ids = provider_ids.uniq if provider_ids
      raise "Must specify a list of provider ids via \"provider_ids\"" if provider_ids.blank?
      invalid_provider_ids = provider_ids - find_provider_ids(type)
      raise "Invalid provider ids #{invalid_provider_ids.sort.join(', ')} specified" if invalid_provider_ids.present?

      desc = "Bundling providers ids: #{provider_ids.join(', ')}"

      userid = User.current_user.userid
      provider_targets = provider_ids.map { |id| ["ExtManagementSystem", id] }

      # bundle takes (userid, manifest, targets, tempdir = nil)
      task_id = Cfme::CloudServices::InventorySync.bundle_queue(userid, manifest, provider_targets)
      action_result(true, desc, :task_id => task_id)
    rescue => e
      action_result(false, e.to_s)
    end

    private

    def check_feature_enabled
      unless Settings.prototype.migration_analytics.enabled
        raise ActionController::RoutingError, 'Feature Not Enabled'
      end
    end

    def find_provider_ids(type)
      providers, _ = collection_search(false, :providers, collection_class(:providers))
      providers ? providers.ids.sort : []
    end

    class << self
      def parse_manifest
        # TODO: check for a valid user-provided manifest before defaulting to default-manifest.json
        manifest_path = Cfme::MigrationAnalytics::Engine.root.join("config", "default-manifest.json")
        manifest = Vmdb::Settings.filter_passwords!(load_manifest(manifest_path))
        {
          :path => manifest_path,
          :body => manifest,
          :version => manifest.dig("manifest", "version"),
          :using_default => true
        }
      end

      def load_manifest(path)
        JSON.parse(File.read(path))
      rescue JSON::ParserError
        nil
      end
    end
  end
end

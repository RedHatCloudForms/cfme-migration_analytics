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
      provider_ids = provider_ids.map(&:to_i).uniq if provider_ids
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

    def import_manifest_collection(type, data)
      check_feature_enabled
      self.class.store_manifest(data['manifest'])
      action_result(true, 'imported manifest')
    end

    def reset_manifest_collection(type, data)
      check_feature_enabled
      path = self.class.user_manifest_path
      if File.exist?(path)
        File.unlink(path)
        action_result(true, 'deleted manifest')
      else
        action_result(true, 'manifest does not exist')
      end
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

      def default_manifest_path
        @default_manifest_path ||= Cfme::MigrationAnalytics::Engine.root.join("config", "default-manifest.json")
      end

      def user_manifest_path
        @user_manifest_path ||= Pathname.new("/opt/rh/cfme-migration_analytics/manifest.json")
      end

      def store_manifest(manifest)
        File.open(user_manifest_path, 'w') do |f|
          f.write(JSON.generate(manifest))
        end
      end

      def parse_manifest
        manifest_path = user_manifest_path.exist? ? user_manifest_path : default_manifest_path
        manifest = Vmdb::Settings.filter_passwords!(load_manifest(manifest_path))

        {
          :path          => manifest_path,
          :body          => manifest,
          :version       => manifest.dig("manifest", "version"),
          :using_default => manifest_path == default_manifest_path
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

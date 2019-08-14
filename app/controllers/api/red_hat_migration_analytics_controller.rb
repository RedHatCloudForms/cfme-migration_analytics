module Api
  class RedHatMigrationAnalyticsController < BaseController
    def index
      manifest_path = Cfme::MigrationAnalytics::Engine.root.join("config", "default-manifest.json")
      manifest = self.class.load_manifest(manifest_path)

      res = {
        :path => manifest_path,
        :body => manifest,
      }
      render_resource :migration_analytics_manifest, res
    end

    def bundle_collection(type, data)
      manifest_path = Cfme::MigrationAnalytics::Engine.root.join("config", "default-manifest.json")
      manifest = self.class.load_manifest(manifest_path)
      provider_ids = data["provider_ids"]
      provider_ids = provider_ids.uniq if provider_ids
      raise "Must specify a list of provider ids via \"provider_ids\"" if provider_ids.blank?

      invalid_provider_ids = provider_ids - find_provider_ids(type)
      raise "Invalid provider ids #{invalid_provider_ids.sort.join(', ')} specified" if invalid_provider_ids.present?

      desc = "Bundling providers ids: #{provider_ids.join(', ')}"
      # bundle takes (userid, manifest, targets, tempdir = nil)
      task_id = Cfme::CloudServices::InventorySync.bundle_queue(User.current_user.userid, manifest, provider_ids)
      action_result(true, desc, :task_id => task_id)
    rescue => e
      action_result(false, e.to_s)
    end

    private

    def find_provider_ids(type)
      providers, _ = collection_search(false, :providers, collection_class(:providers))
      providers ? providers.ids.sort : []
    end

    class << self
      def load_manifest(path)
        Vmdb::Settings.filter_passwords!(JSON.parse(File.read(path)))
      rescue JSON::ParserError
        nil
      end
    end
  end
end

module Cfme
  module MigrationAnalytics
    class Engine < ::Rails::Engine
      isolate_namespace Cfme::MigrationAnalytics

      def self.vmdb_plugin?
        true
      end

      def self.plugin_name
        _("Red Hat Migration Analytics")
      end

      initializer "plugin.assets" do |app|
        app.config.assets.paths  << root.join("assets", "images").to_s
      end

      initializer "plugin-migration-analytics-menu", {:after => "plugin-migration-menu"} do
        if Settings.prototype.migration_analytics.enabled
          Menu::CustomLoader.register(
            Menu::Item.new("migration_analytics", N_("Migration Analytics"), "migration_analytics", {:feature => "migration_analytics", :any => true}, "/migration_analytics", :default, :migration)
          )
        end
      end
    end
  end
end

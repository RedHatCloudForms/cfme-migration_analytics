module Cfme
  module MigrationAnalytics
    class Engine < ::Rails::Engine
      isolate_namespace Cfme::MigrationAnalytics

      def self.vmdb_plugin?
        true
      end

      def self.plugin_name
        _('Red Hat Migration Analytics')
      end

      initializer 'plugin.assets' do |app|
        app.config.assets.paths  << root.join('assets', 'images').to_s
      end

      # TODO figure out this menu initializer stuff -- how to put inside Compute / Cloud Intel?
      initializer 'plugin' do
        Menu::CustomLoader.register(
          Menu::Section.new(:spike, N_('Plugin'), 'fa fa-map-pin', [
            Menu::Item.new('plug', N_('Test'), 'miq_report', {:feature => 'miq_report', :any => true}, '/plug'),
            Menu::Item.new('plug', N_('Demo'), 'miq_report', {:feature => 'miq_report', :any => true}, '/demo')
          ])
        )
      end
    end
  end
end

module MiqPluginExample
  class Engine < ::Rails::Engine
    isolate_namespace MiqPluginExample

    def vmdb_plugin?
      true
    end

    initializer 'plugin.assets' do |app|
      app.config.assets.paths  << root.join('assets', 'images').to_s
    end

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

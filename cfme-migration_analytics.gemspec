$:.push File.expand_path("../lib", __FILE__)

require "json"

# Maintain your gem's version:
require "cfme/migration_analytics/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "cfme-migration_analytics"
  s.version     = Cfme::MigrationAnalytics::VERSION
  s.authors     = ["ManageIQ Authors"]
  
  s.summary     = "Red Hat Migration Analytics plugin for CloudForms"
  s.description = "Red Hat Migration Analytics plugin for CloudForms"
  s.homepage    = "https://github.com/mturley/cfme-migration_analytics" # TODO update with new repo URL when we move it
  s.license     = "Apache-2.0"

  s.files = Dir["{app,config,db,lib}/**/*", "LICENSE.txt", "Rakefile", "README.md"]

  s.add_development_dependency "sqlite3"
end

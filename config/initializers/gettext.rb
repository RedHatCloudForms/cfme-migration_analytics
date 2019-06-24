Vmdb::Gettext::Domains.add_domain(
  'Cfme::MigrationAnalytics',
  Cfme::MigrationAnalytics::Engine.root.join('locale').to_s,
  :po
)

# TODO: make sure gettext/i18n stuff is working properly

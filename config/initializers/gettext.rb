Vmdb::Gettext::Domains.add_domain(
  'Cfme::MigrationAnalytics',
  Cfme::MigrationAnalytics::Engine.root.join('locale').to_s,
  :po
)

describe :placeholders do
  include_examples :placeholders, Cfme::MigrationAnalytics::Engine.root.join('locale').to_s
end

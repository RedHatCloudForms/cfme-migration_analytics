class MigrationAnalyticsController < ApplicationController
  before_action :check_privileges
  after_action :cleanup_action

  def index
    @layout = "migration_analytics"
    @page_title = _("Migration Analytics")
  end

  helper do
    def layout_full_center
      "layouts/full_center"
    end
  end

  menu_section :migration
end

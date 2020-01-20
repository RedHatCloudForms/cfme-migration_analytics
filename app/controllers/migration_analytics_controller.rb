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

  def payload
    check_feature_enabled
    task_id = params['task_id']
    raise "Must specify a task id via \"task_id\"" if task_id.blank?

    begin
      task = MiqTask.find(task_id)
      path = task&.context_data&.payload_path
      if path && File.exist?(path)
        send_file(path, :type => 'application/binary', :filename => 'analytics_payload.bin')
      else
        raise "Payload not found."
      end
    rescue ActiveRecord::RecordNotFound => e
      action_result(false, e.to_s)
    end
  end

  menu_section :migration

  private
  def check_feature_enabled
    unless Settings.prototype.migration_analytics.enabled
      raise ActionController::RoutingError, 'Feature Not Enabled'
    end
  end
end

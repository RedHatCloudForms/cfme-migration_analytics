module Api
  class RedHatMigrationAnalyticsPayloadController < BaseController
    def index
      check_feature_enabled
      task_id = params['task_id']
      raise "Must specify a task id via \"task_id\"" if task_id.blank?

      begin
        task = MiqTask.find(task_id)
        path = task&.context_data&.fetch(:payload_path, nil)
        if path && File.exist?(path)
          send_file(path, :type => 'application/binary')
        else
          raise "Payload not found."
        end
      end
    end

    private

    def check_feature_enabled
      unless Settings.prototype.migration_analytics.enabled
        raise ActionController::RoutingError, 'Feature Not Enabled'
      end
    end
  end
end

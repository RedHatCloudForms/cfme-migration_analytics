module Api
  module Mixins
    module FeatureCheck
      def check_feature_enabled
        unless Settings.prototype.migration_analytics.enabled
          raise ActionController::RoutingError, 'Feature Not Enabled'
        end
      end
    end
  end
end

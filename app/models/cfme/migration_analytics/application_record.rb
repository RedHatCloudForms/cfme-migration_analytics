module Cfme
  module MigrationAnalytics
    class ApplicationRecord < ActiveRecord::Base
      self.abstract_class = true
    end
  end
end

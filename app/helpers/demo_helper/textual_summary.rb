module DemoHelper::TextualSummary
  include TextualMixins::TextualGroupTags

  def textual_group_properties
    TextualGroup.new(_("Properties"), %i(title foobar))
  end

  #def textual_group_relationships
  #  TextualGroup.new(_("Relationships"), %i(parent_ems_cloud ems_network cloud_tenant instance network_port))
  #end

  #
  # Items
  #

  def textual_title
    @record.title
  end

  def textual_foobar
    @record.foobar
  end
end

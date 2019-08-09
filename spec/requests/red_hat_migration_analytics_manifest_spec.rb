describe "Red Hat  Migration Analytics Manifest API" do
  let(:api_red_hat_migration_analytics_url) { "#{api_url}/red_hat_migration_analytics" }
  let(:manifest) { { "ManageIQ::Providers::Vmware::InfraManager" => {}} }
  let(:task) { FactoryBot.create(:miq_task) }

  describe "POST" do
    it "/api/red_hat_migration_analytics/:id bundle action" do
      api_basic_authorize "red_hat_migration_analytics"

      ems1 = FactoryBot.create(:ems_vmware, :name => "sample vmware1")

      allow(Cfme::CloudServices::InventorySync).to receive("bundle_queue").with(@user.userid, manifest, [ems1.id]) { task.id }

      post(api_red_hat_cloud_service_providers_url,
           :params => {
             "action"       => "bundle",
             "provider_ids" => [ems1.id]
      })

      expect(response.parsed_body).to include(
        "success" => true,
        "message" => "Bundling providers ids: #{ems1.id}",
        "task_id" => "#{task.id}"
      )
      expect(response).to have_http_status(:ok)
    end
  end
end
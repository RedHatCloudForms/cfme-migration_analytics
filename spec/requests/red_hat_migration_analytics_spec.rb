describe "Red Hat  Migration Analytics Manifest API" do
  let(:api_red_hat_migration_analytics_url) { "#{api_url}/red_hat_migration_analytics" }
  let(:manifest) { { "ManageIQ::Providers::Vmware::InfraManager" => {}} }
  let(:task) { FactoryBot.create(:miq_task) }

  describe "GET" do
    context "/api/red_hat_migration_analytics index action" do
      before do
        api_basic_authorize "red_hat_migration_analytics"
      end

      it "with the built-in manifest" do
        expect(Api::RedHatMigrationAnalyticsController).to receive(:user_manifest_path).and_return(Pathname.new('/non-existent-file'))
        get(api_red_hat_migration_analytics_url)

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body).to match({"manifest_version" => "1.0.0", "using_default_manifest" => true})
      end

      it "filters out passwords from the manifest" do
        malicious_manifest = {
          "password"      => nil,
          "amazon_secret" => nil,
          "ssh_key_data"  => nil
        }

        expect(Api::RedHatMigrationAnalyticsController).to receive(:user_manifest_path).and_return(Pathname.new('/non-existent-file'))
        expect(Api::RedHatMigrationAnalyticsController).to receive(:load_manifest).and_return(malicious_manifest)

        get(api_red_hat_migration_analytics_url)

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body).to match({"manifest_version" => nil, "using_default_manifest" => true})
      end
    end
  end

  describe "POST" do
    it "/api/red_hat_migration_analytics/:id bundle action" do
      api_basic_authorize "red_hat_migration_analytics"

      ems1 = FactoryBot.create(:ems_vmware, :name => "sample vmware1")

      expect(Api::RedHatMigrationAnalyticsController).to receive(:load_manifest).and_return(manifest)
      allow(Cfme::CloudServices::InventorySync).to receive("bundle_queue")
        .with(@user.userid, manifest, [["ExtManagementSystem", ems1.id]]) { task.id }

      post(api_red_hat_migration_analytics_url,
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

    it "/api/red_hat_migration_analytics/:id import_manifest action" do
      api_basic_authorize "red_hat_migration_analytics"

      expect(Api::RedHatMigrationAnalyticsController).to receive(:store_manifest)

      post(api_red_hat_migration_analytics_url,
           :params => {
             "action"   => "import_manifest",
             "manifest" => { "foo" => "bar "}
      })

      expect(response.parsed_body).to include(
        "success" => true,
        "message" => "imported manifest"
      )
      expect(response).to have_http_status(:ok)
    end

    it "/api/red_hat_migration_analytics/:id reset_manifest action" do
      api_basic_authorize "red_hat_migration_analytics"

      expect(Api::RedHatMigrationAnalyticsController).to receive(:user_manifest_path).and_return(Pathname.new('/non-existent-file'))

      post(api_red_hat_migration_analytics_url,
           :params => {
             "action"       => "reset_manifest"
      })

      expect(response.parsed_body).to include(
        "success" => true,
        "message" => "manifest does not exist"
      )
      expect(response).to have_http_status(:ok)
    end
  end
end

describe "Red Hat  Migration Analytics Payload API" do
  let(:url) { "#{api_url}/red_hat_migration_analytics_payload" }
  let(:manifest) { { "ManageIQ::Providers::Vmware::InfraManager" => {}} }
  let(:payload_path) { __FILE__ }
  let(:task) { FactoryBot.create(:miq_task, :context_data => {:payload_path => payload_path}) }
  let(:empty_task) { FactoryBot.create(:miq_task) }

  describe "GET" do
    context "/api/red_hat_migration_analytics_payload" do
      before do
        api_basic_authorize "red_hat_migration_analytics"
      end

      it "returns the payload is present in the Task" do
        allow(MiqTask).to receive(:find).and_return(task)
        get(url, :params => {:task_id => task.id})
        expect(response).to have_http_status(:ok)
        expect(response.body).to match(/tady je Krakonosovo/)
      end

      it "fails if no payload is present in the Task" do
        allow(MiqTask).to receive(:find).and_return(empty_task)
        get(url, :params => {:task_id => empty_task.id})
        expect(response).to have_http_status(500)
      end

      it "fails if task_id is passed" do
        get(url)
        expect(response).to have_http_status(500)
      end
    end

    context "/api/red_hat_migration_analytics_payload" do
      it "denies w/o authorization" do
        allow(MiqTask).to receive(:find).and_return(task)
        get(url, :params => {:task_id => task.id})
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end

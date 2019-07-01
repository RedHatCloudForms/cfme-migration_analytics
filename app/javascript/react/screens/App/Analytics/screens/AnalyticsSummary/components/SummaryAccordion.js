import React from 'react';
import PropTypes from 'prop-types';
import { ListView, Grid } from 'patternfly-react';
import SummaryTable from './SummaryTable';

const SummaryAccordion = ({ summaryData }) => {
  return (
    <div className="reports-summary">
      <p>{__('CloudForms discovered the following information:')}</p>
      <div className="environment-summary">
        <h2>{__('Environment Summary')}</h2>
        <SummaryTable data={summaryData.total} />
      </div>
      <ListView>
        {summaryData.providers.map(provider => (
          <ListView.Item
            key={provider.id}
            leftContent={<ListView.Icon type="pf" name="server-group" />}
            heading={provider.name}
            description={__('Provider Summary')}
            stacked
          >
            <Grid.Row>
              <Grid.Col sm={11}>
                <SummaryTable data={provider} />
              </Grid.Col>
            </Grid.Row>
          </ListView.Item>
        ))}
      </ListView>
    </div>
  );
};

SummaryAccordion.propTypes = {
  summaryData: PropTypes.shape({
    total: PropTypes.shape({
      numProviders: PropTypes.number,
      numHypervisors: PropTypes.number,
      numVms: PropTypes.number,
      allocatedDiskSpace: PropTypes.number,
      allocatedMemory: PropTypes.number,
      numCpuCores: PropTypes.number
    }),
    providers: PropTypes.arrayOf(
      PropTypes.shape({
        numHypervisors: PropTypes.number,
        numVms: PropTypes.number,
        allocatedDiskSpace: PropTypes.number,
        allocatedMemory: PropTypes.number,
        numCpuCores: PropTypes.number
      })
    )
  })
};

export default SummaryAccordion;

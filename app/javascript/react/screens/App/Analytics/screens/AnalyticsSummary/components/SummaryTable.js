import React from 'react';
import PropTypes from 'prop-types';
import filesize from 'filesize';

const SummaryRow = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
);

SummaryRow.propTypes = {
  name: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired
};

const SummaryTable = ({ data }) => (
  <table>
    <tbody>
      {data.numProviders && <SummaryRow name={__('Number of VMware providers')} value={data.numProviders} />}
      <SummaryRow name={__('Number of ESXi hypervisors (2 socket servers) discovered')} value={data.numHypervisors} />
      <SummaryRow name={__('Number of VMs on discovered hypervisors')} value={data.numVms} />
      <SummaryRow
        name={__('Total disk space allocated for discovered VMs')}
        value={filesize(data.allocatedDiskSpace)}
      />
      <SummaryRow
        name={__('Total memory allocated for discovered VMs')}
        value={filesize(data.allocatedMemory * 1024 * 1024)}
      />
      <SummaryRow name={__('Total vCPU cores allocated for discovered VMs')} value={data.numCpuCores} />
    </tbody>
  </table>
);

SummaryTable.propTypes = {
  data: PropTypes.shape({
    numProviders: PropTypes.number,
    numHypervisors: PropTypes.number,
    numVms: PropTypes.number,
    allocatedDiskSpace: PropTypes.number,
    allocatedMemory: PropTypes.number,
    numCpuCores: PropTypes.number
  }).isRequired
};

export default SummaryTable;

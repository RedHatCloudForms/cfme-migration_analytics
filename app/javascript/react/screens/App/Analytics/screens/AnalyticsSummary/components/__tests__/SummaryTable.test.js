import React from 'react';
import { shallow } from 'enzyme';
import SummaryTable from '../SummaryTable';

describe('summary table', () => {
  const getBaseProps = () => ({
    data: {
      numProviders: 2,
      numHypervisors: 3,
      numVms: 10,
      allocatedDiskSpace: 10737418240,
      allocatedMemory: 16384,
      numCpuCores: 20
    }
  });

  test('renders correctly', () => {
    const component = shallow(<SummaryTable {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
    expect(
      component
        .find('SummaryRow')
        .first()
        .dive()
    ).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import SummaryAccordion from '../SummaryAccordion';

describe('summary accordion', () => {
  const getBaseProps = () => ({
    summaryData: {
      total: { mock: 'data' },
      providers: [{ mock: 'data' }, { mock: 'data' }]
    }
  });

  test('renders correctly', () => {
    const component = shallow(<SummaryAccordion {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });
});

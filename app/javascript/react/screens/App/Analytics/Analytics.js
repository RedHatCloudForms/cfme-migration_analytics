import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'patternfly-react';
import Toolbar from './components/Toolbar';
import AnalyticsEmptyState from './screens/AnalyticsEmptyState';
import AnalyticsSummary from './screens/AnalyticsSummary';
import AnalyticsProviderSelection from './screens/AnalyticsProviderSelection';
import AnalyticsDataCollection from './screens/AnalyticsDataCollection';
// import BreadcrumbPageSwitcher from '../common/BreadcrumbPageSwitcher'; // TODO: figure out how to share the breadcrumb switcher with v2v

const SCREENS = {
  EMPTY_STATE: 'EMPTY_STATE',
  SUMMARY: 'SUMMARY',
  PROVIDER_SELECTION: 'PROVIDER_SELECTION',
  DATA_COLLECTION: 'DATA_COLLECTION'
};

const AnalyticsContainer = ({ currentScreen, children }) => (
  <div id="migration-analytics" className={currentScreen === SCREENS.EMPTY_STATE ? 'row cards-pf' : ''}>
    {children}
  </div>
);
AnalyticsContainer.propTypes = {
  currentScreen: PropTypes.oneOf(Object.values(SCREENS)).isRequired,
  children: PropTypes.node.isRequired
};

class Analytics extends React.Component {
  state = { currentScreen: SCREENS.EMPTY_STATE };

  goToEmptyState = () => this.setState({ currentScreen: SCREENS.EMPTY_STATE });
  goToSummary = () => this.setState({ currentScreen: SCREENS.SUMMARY });
  goToProviderSelection = () => this.setState({ currentScreen: SCREENS.PROVIDER_SELECTION });
  goToDataCollection = () => this.setState({ currentScreen: SCREENS.DATA_COLLECTION });

  renderCurrentScreen = () => {
    const screens = {
      [SCREENS.EMPTY_STATE]: <AnalyticsEmptyState onGetStartedClick={this.goToSummary} />,
      [SCREENS.SUMMARY]: (
        <AnalyticsSummary onCollectInventoryClick={this.goToProviderSelection} onStartOverClick={this.goToEmptyState} />
      ),
      [SCREENS.PROVIDER_SELECTION]: (
        <AnalyticsProviderSelection onContinueClick={this.goToDataCollection} onCancelClick={this.goToSummary} />
      ),
      [SCREENS.DATA_COLLECTION]: <AnalyticsDataCollection onCancelClick={this.goToProviderSelection} />
    };
    return screens[this.state.currentScreen];
  };

  render() {
    const { currentScreen } = this.state;
    return (
      <React.Fragment>
        <Toolbar>
          <Breadcrumb.Item active>{__('Compute')}</Breadcrumb.Item>
          <Breadcrumb.Item active>{__('Migration')}</Breadcrumb.Item>
          <Breadcrumb.Item active>
            <strong>{__('Migration Analytics')}</strong>
          </Breadcrumb.Item>
          {/* <BreadcrumbPageSwitcher activeHref="#/analytics" /> */}
          {/* TODO: figure out how to share the breadcrumb switcher with v2v */}
        </Toolbar>
        <AnalyticsContainer currentScreen={currentScreen}>{this.renderCurrentScreen()}</AnalyticsContainer>
      </React.Fragment>
    );
  }
}

export default Analytics;

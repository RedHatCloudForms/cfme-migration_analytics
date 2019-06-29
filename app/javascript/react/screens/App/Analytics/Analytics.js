import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'patternfly-react';
import Toolbar from './components/Toolbar';
import AnalyticsEmptyState from './screens/AnalyticsEmptyState';
import AnalyticsSummary from './screens/AnalyticsSummary';
// import BreadcrumbPageSwitcher from '../common/BreadcrumbPageSwitcher'; // TODO: figure out how to share the breadcrumb switcher with v2v

const SCREENS = {
  EMPTY_STATE: 'emptyState',
  SUMMARY: 'summary'
};

const AnalyticsContainer = ({ currentScreen, children }) => (
  <div id="migration-analytics" className={currentScreen === SCREENS.EMPTY_STATE ? 'row cards-pf' : ''}>
    {children}
  </div>
);
AnalyticsContainer.propTypes = {
  currentScreen: PropTypes.oneOf(Object.values(SCREENS)),
  children: PropTypes.node.isRequired
};

class Analytics extends React.Component {
  state = { currentScreen: SCREENS.EMPTY_STATE };

  goToSummary = () => this.setState({ currentScreen: SCREENS.SUMMARY });

  renderCurrentScreen = () => {
    switch (this.state.currentScreen) {
      case SCREENS.EMPTY_STATE:
        return <AnalyticsEmptyState onGetStartedClick={this.goToSummary} />;
      case SCREENS.SUMMARY:
        return <AnalyticsSummary />;
      default:
        return null;
    }
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
        <AnalyticsContainer currentScreen={currentScreen}>
          {this.renderCurrentScreen()}
          <h6 className="manifest-version">{__('Manifest version: x.y.z 2019-06-10') /* TODO make this real */}</h6>
        </AnalyticsContainer>
      </React.Fragment>
    );
  }
}

export default Analytics;

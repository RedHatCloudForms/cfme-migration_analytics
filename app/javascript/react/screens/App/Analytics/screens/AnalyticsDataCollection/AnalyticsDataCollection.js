import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button, Icon, noop } from 'patternfly-react';

class AnalyticsDataCollection extends React.Component {
  constructor(props) {
    super(props);
    this.fetchBundleTaskTimeout = null;
  }

  componentDidMount() {
    const { startInventoryBundleAction, selectedProviders } = this.props;
    startInventoryBundleAction(selectedProviders.map(provider => provider.id));
  }

  componentDidUpdate(prevProps) {
    const { bundleTaskHref, fetchBundleTaskAction, isFetchingBundleTask, isBundleTaskFinished } = this.props;

    // If we started the bundle task and we have a task href, fetch it.
    if (!prevProps.bundleTaskHref && bundleTaskHref) {
      fetchBundleTaskAction(bundleTaskHref);
    }

    // If we fetched the bundle task and it was unfinished, wait and fetch it again.
    if (prevProps.isFetchingBundleTask && !isFetchingBundleTask && !isBundleTaskFinished) {
      this.fetchBundleTaskTimeout = setTimeout(() => fetchBundleTaskAction(bundleTaskHref), 3000);
    }

    if (!prevProps.isBundleTaskFinished && isBundleTaskFinished) {
      clearTimeout(this.fetchBundleTaskTimeout); // Just in case.
      this.fetchBundleTaskTimeout = null;
    }
  }

  render() {
    const { bundleError, isPayloadReady, onCancelClick, numVms, payloadPath, onReturnClick } = this.props;

    if (bundleError) {
      // TODO format this better
      return <h1>Error collecting inventory data: {bundleError}</h1>;
    }

    if (!isPayloadReady) {
      return (
        <div className="data-collection-status icon-with-content">
          <Spinner loading size="lg" inline />
          <div>
            <h3 className="beside-spinner">{__('Collecting inventory data')}</h3>
            <Button onClick={onCancelClick}>{__('Cancel')}</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="data-collection-status icon-with-content">
        <Icon className="checkmark" type="fa" name="check" />
        <div>
          <h3>{__('Inventory collection complete')}</h3>
          <p>
            {numVms}
            &nbsp;
            {__('VMs examined')}
            <br />
            {__('Inventory data saved at:')}
            <br />
            <span className="payload-path">{payloadPath}</span>
          </p>
          <div className="buttons">
            <Button
              bsStyle="primary"
              onClick={() => alert('This is a placeholder. The data collection feature is still in development.')}
            >
              {__('Download Inventory File')}
            </Button>
            <Button onClick={onReturnClick}>{__('Return to Summary')}</Button>
          </div>
        </div>
      </div>
    );
  }
}

AnalyticsDataCollection.propTypes = {
  startInventoryBundleAction: PropTypes.func,
  selectedProviders: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) })
  ),
  bundleError: PropTypes.string,
  isPayloadReady: PropTypes.bool,
  bundleTaskHref: PropTypes.string,
  fetchBundleTaskAction: PropTypes.func,
  isFetchingBundleTask: PropTypes.bool,
  isBundleTaskFinished: PropTypes.bool,
  numVms: PropTypes.number,
  payloadPath: PropTypes.string,
  onCancelClick: PropTypes.func.isRequired,
  onReturnClick: PropTypes.func.isRequired
};

AnalyticsDataCollection.defaultProps = {
  startInventoryBundleAction: noop,
  selectedProviders: [],
  bundleError: null,
  isPayloadReady: false,
  bundleTaskHref: null,
  fetchBundleTaskAction: noop,
  isFetchingBundleTask: false,
  isBundleTaskFinished: false,
  numVms: null,
  payloadPath: null
};

export default AnalyticsDataCollection;

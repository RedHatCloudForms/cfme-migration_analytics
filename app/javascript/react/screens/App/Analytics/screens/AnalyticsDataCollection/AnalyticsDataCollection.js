import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button, Icon, noop } from 'patternfly-react';
import EmptyStateWithButton from '../../components/EmptyStateWithButton';

class AnalyticsDataCollection extends React.Component {
  constructor(props) {
    super(props);
    this.fetchBundleTaskTimeout = null;
  }

  clearTimer = () => {
    clearTimeout(this.fetchBundleTaskTimeout);
    this.fetchBundleTaskTimeout = null;
  };

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
      this.clearTimer(); // Just in case.
    }
  }

  componentWillUnmount() {
    // If the user clicks Cancel before the task is complete, prevent unmounted renders.
    this.clearTimer();
    this.props.resetDataCollectionStateAction();
  }

  render() {
    const {
      bundleError,
      isPayloadReady,
      onCancelClick,
      numVms,
      bundleTaskId,
      downloadPayloadAction,
      isDownloadingPayload,
      onReturnClick
    } = this.props;

    if (bundleError) {
      return (
        <EmptyStateWithButton
          iconName="error-circle-o"
          title={__('Failed to collect inventory data')}
          message={bundleError}
          buttonText={__('Cancel')}
          onClick={onCancelClick}
        />
      );
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
          </p>
          <div className="buttons">
            <div>
              <Button
                bsStyle="primary"
                onClick={() => downloadPayloadAction(bundleTaskId)}
                disabled={!bundleTaskId || isDownloadingPayload}
              >
                {__('Download Inventory File')}
              </Button>
              {isDownloadingPayload && <Spinner size="xs" loading />}
            </div>
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
  onCancelClick: PropTypes.func.isRequired,
  onReturnClick: PropTypes.func.isRequired,
  bundleTaskId: PropTypes.string,
  downloadPayloadAction: PropTypes.func,
  isDownloadingPayload: PropTypes.bool,
  resetDataCollectionStateAction: PropTypes.func
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
  bundleTaskId: null,
  downloadPayloadAction: noop,
  isDownloadingPayload: false,
  resetDataCollectionStateAction: noop
};

export default AnalyticsDataCollection;

import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button, Icon, noop } from 'patternfly-react';
import EmptyStateWithButton from '../../components/EmptyStateWithButton';

class AnalyticsDataCollection extends React.Component {
  constructor(props) {
    super(props);
    this.fetchBundleTaskTimeout = null;
    this.scpSpanRef = React.createRef();
  }

  clearTimer = () => {
    clearTimeout(this.fetchBundleTaskTimeout);
    this.fetchBundleTaskTimeout = null;
  };

  copyToClipboard = e => {
    const range = document.createRange();
    range.selectNode(this.scpSpanRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    e.target.focus();
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
      payloadHost,
      payloadPath,
      // payloadUrl,
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
            <br />
            {__('To download the saved inventory data, copy the command below and run it from a command line.')}
            <br />
            <span className="payload-path" ref={this.scpSpanRef}>{`scp root@${payloadHost}:${payloadPath} .`}</span>
          </p>
          <div className="buttons">
            {document.queryCommandSupported('copy') && (
              <Button bsStyle="primary" onClick={this.copyToClipboard}>
                {__('Copy to Clipboard')}
              </Button>
            )}
            {/* Disabled for now, before we figure out how to download the payload safely over http
            <Button bsStyle="primary" href={payloadUrl} disabled={!payloadUrl}>
              {payloadUrl ? __('Download Inventory File') : __('Download Not Available')}
            </Button>
            */}
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
  payloadHost: PropTypes.string,
  payloadPath: PropTypes.string,
  // payloadUrl: PropTypes.string,
  onCancelClick: PropTypes.func.isRequired,
  onReturnClick: PropTypes.func.isRequired,
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
  payloadHost: null,
  payloadPath: null,
  // payloadUrl: null,
  resetDataCollectionStateAction: noop
};

export default AnalyticsDataCollection;

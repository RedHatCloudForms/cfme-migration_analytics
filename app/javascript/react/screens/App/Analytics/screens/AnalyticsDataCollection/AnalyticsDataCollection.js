import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button, Icon } from 'patternfly-react';

class AnalyticsDataCollection extends React.Component {
  state = { mockLoaded: false };

  componentDidMount() {
    setTimeout(() => this.setState({ mockLoaded: true }), 3000);
  }

  render() {
    const { onCancelClick, onReturnClick } = this.props;
    const { mockLoaded } = this.state;

    if (!mockLoaded) {
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
            {__('0 VMs examined')}
            <br />
            {__('Inventory data saved as: placeholder/path/filename.json')}
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
  onCancelClick: PropTypes.func.isRequired,
  onReturnClick: PropTypes.func.isRequired
};

export default AnalyticsDataCollection;

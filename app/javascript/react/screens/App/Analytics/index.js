import { connect } from 'react-redux';
import Analytics from './Analytics';

export const reducers = {}; // TODO add analytics reducer

const mapStateToProps = () => ({}); // TODO pull analytics state from store

export default connect(
  mapStateToProps,
  {}, // TODO add analytics actions
)(Analytics);

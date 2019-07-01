import { combineReducers } from 'redux';
import reports from './reports/reportsReducer';
import analytics from '../react/screens/App/Analytics/redux/analyticsReducer';

export default () => ({
  migrationAnalytics: combineReducers({
    reports,
    analytics
  })
});

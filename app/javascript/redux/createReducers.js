import { combineReducers } from 'redux';
import providers from './providers/providersReducer';
import reports from './reports/reportsReducer';
import analytics from '../react/screens/App/Analytics/redux/analyticsReducer';

export default () => ({
  migrationAnalytics: combineReducers({
    providers,
    reports,
    analytics
  })
});

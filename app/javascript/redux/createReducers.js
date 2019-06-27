import { combineReducers } from 'redux';
import reports from './reports/reportsReducer';

export default () => ({
  migrationAnalytics: combineReducers({
    reports
  })
});

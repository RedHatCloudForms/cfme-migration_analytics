import React from 'react';
import { Provider } from 'react-redux';
import Analytics from './screens/App/Analytics/Analytics';
import createReducers from '../redux/createReducers';

class App extends React.Component {
  constructor(props) {
    super(props);
    ManageIQ.redux.addReducer(createReducers());
  }

  render() {
    return (
      <Provider store={ManageIQ.redux.store}>
        <Analytics />
      </Provider>
    );
  }
}

export default App;

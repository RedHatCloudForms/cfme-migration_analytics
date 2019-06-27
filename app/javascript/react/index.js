import React from 'react';
import Analytics from './screens/App/Analytics/Analytics';
import createReducers from '../redux/createReducers';

class App extends React.Component {
  constructor(props) {
    super(props);
    ManageIQ.redux.addReducer(createReducers());
  }

  render() {
    return <Analytics />;
  }
}

export default App;

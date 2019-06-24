import React from 'react';
//import { ConnectedRouter } from 'connected-react-router';
//import { connect } from 'react-redux';
//import Routes from './config/Routes';

class App extends React.Component {
  render() {
    return (
      <h1>Hello from React</h1>
      /*<ConnectedRouter history={ManageIQ.redux.history}>
        <React.Fragment>
          <Routes store={ManageIQ.redux.store} />
        </React.Fragment>
      </ConnectedRouter>*/
    );
  }
}

const mapStateToProps = () => ({});

//export default connect(mapStateToProps)(App);

export default App;

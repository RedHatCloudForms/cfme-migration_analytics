import * as React from 'react';

export default class HalloReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'neni tu'};
  };

  componentDidMount() {
    ManageIQ.angular.rxSubject.subscribe((event) => {
      var eventType = event.type;

      if (eventType === 'demo' && event.operation === 'react') {
        this.setState({message: (new Date()).toString()});
      }
    });
  };

  render() {
    return (
      <h1>React: Hallo at { this.state.message }</h1>
    )
  }
}

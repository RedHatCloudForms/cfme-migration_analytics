import * as React from 'react'
import * as ReactDOM from 'react-dom'
import HalloReact from './hallo_react'

window.bind_me = function() {
  ReactDOM.render(React.createElement(HalloReact, { context: $('body') }), document.getElementById('hallo_react'));
};

window.bind_me;

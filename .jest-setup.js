import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { sprintf } from 'sprintf-js';
import { APImock } from './app/javascript/common/mockRequests';

configure({ adapter: new Adapter() });

// Mocking translation function
global.__ = str => str;
global.n__ = str => str;
global.sprintf = sprintf;
global.Jed = { sprintf };

APImock.reset();

global.API.get = jest.fn(url => APImock.respond('GET', url));
global.API.put = jest.fn(url => APImock.respond('PUT', url));
global.API.post = jest.fn(url => APImock.respond('POST', url));
global.API.patch = jest.fn(url => APImock.respond('PATCH', url));
global.API.delete = jest.fn(url => APImock.respond('DELETE', url));

global.$ = jest.fn(() => ({
  on: jest.fn(),
  selectpicker: jest.fn()
}));

// @flow
/*eslint no-console: 0*/
import 'core-js/stable';
import dotenv from 'dotenv';
import 'regenerator-runtime/runtime';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StackTrace from 'stacktrace-js';

dotenv.config({ path: `${__dirname}/../.env.test` });

// Failed promises do not show where they errored at in the tests.js file.
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

configure({ adapter: new Adapter() });

class IntersectionObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
}
window.IntersectionObserver = IntersectionObserverMock;

global.open = jest.fn();

const originalConsoleError = console.error;

const callback = stackframes => {
  const stringifiedStack = stackframes
    .map(sf => {
      return sf.toString();
    })
    .join('\n');
  console.log(stringifiedStack);
};

const errback = err => {
  console.log(err.message);
};

// Throws an error in Jest if the prop-types validation fails.
// $FlowFixMe
console.error = async (message: string) => {
  await StackTrace.get()
    .then(callback)
    .catch(errback);

  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }

  originalConsoleError(message);
};

global.onerror = (msg, file, line, col, error) => {
  // callback is called with an Array[StackFrame]
  StackTrace.fromError(error)
    .then(callback)
    .catch(errback);
};

global.open = jest.fn();

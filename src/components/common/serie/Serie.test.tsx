import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Serie from './Serie';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Serie />, div);
  ReactDOM.unmountComponentAtNode(div);
});

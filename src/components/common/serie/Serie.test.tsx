import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ISerie } from '../../../api/Serie';
import Serie from './Serie';

it('renders without crashing', () => {
  const serie: ISerie = {id: "serie_01", title: "PBI", publisher: {mbox: "mail@min.com", name: 'MinEc'}, description: "PBI"};
  const div = document.createElement('div');
  ReactDOM.render(<Serie key={serie.id} serie={serie} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

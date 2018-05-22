import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import { ISerie } from '../../../../api/Serie';
import Serie from '../../../../components/common/serie/Serie';

it('renders without crashing', () => {
  const serie: ISerie = { data: [], id: "serie_01", title: "PBI", publisher: { mbox: "mail@min.com", name: 'MinEc' }, description: "PBI" };
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Serie key={serie.id} serie={serie} />
    </MemoryRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});

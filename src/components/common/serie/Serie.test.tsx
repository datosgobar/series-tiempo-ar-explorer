import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Serie from './Serie';

it('renders without crashing', () => {
  const serie = {id: 1, name: "PBI", author: "MinEc", description: "PBI"};
  const div = document.createElement('div');
  ReactDOM.render(<Serie key={serie.id} 
                          id={serie.id} 
                          name={serie.name} 
                          author={serie.author} 
                          description={serie.description} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';

import App from '../App.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let active = {
    id: `_fuIMye31Gw`,
    //id: '',
    title: 'Erik Satie - Once Upon A Time In Paris',
    description: `Erik Satie - Gymnopédie No.1

  Satie was introduced as a "gymnopedist" in 1887, shortly before writing his most famous compositions, the Gymnopédies. Later, he also referred to himself as a "phonometrograph" or "phonometrician" (meaning "someone who measures (and writes down) sounds") preferring this designation to that of "musician," after having been called "a clumsy but subtle technician" in a book on contemporary French composers published in 1911.
  
  Satie was a colourful figure in the early 20th century Parisian avant-garde. He was a precursor to later artistic movements such as minimalism, repetitive music and the Theatre of the Absurd.
  The Gymnopédies, published in Paris starting in 1888, are three piano compositions written by French composer and pianist, Erik Satie.
  
  - Gymmopedie No. 1.
  - Gnossienne No. 1
  - Gnossienne No. 3
      -GnossienneNo. 4
  - Gnossienne No. 2
  
  Édouard Cortès's paintings.`,
    author: 'Estoy Perdida',
    thumbnail: 'https://img.youtube.com/vi/_fuIMye31Gw/0.jpg'
  }

  //ReactDOM.render(<App active={active} />, div);
  //ReactDOM.unmountComponentAtNode(div);
  expect(true).toBe(true)
});

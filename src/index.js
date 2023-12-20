import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FiltersProvider from './context/FiltersProvider';
import PlanetsProvider from './context/PlanetsProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetsProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </PlanetsProvider>,
  );

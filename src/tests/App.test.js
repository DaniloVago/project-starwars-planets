import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import dataTest from './dataTest';
import { act } from 'react-dom/test-utils';
import PlanetsProvider from '../context/PlanetsProvider';
import FiltersProvider from '../context/FiltersProvider';

const mockFetch = () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(dataTest)
})
act(() => {
render(
<PlanetsProvider>
  <FiltersProvider>
    <App />
  </FiltersProvider>
</PlanetsProvider>
);
})
};

describe('Testando os componentes', () => {
  beforeEach(mockFetch);
test('Verifica requsição da api', async () => {
  const loading = await screen.findByText(/loading/i);
  expect(loading).toBeInTheDocument();
  expect(global.fetch).toBeCalled()
  expect(global.fetch).toBeCalledTimes(1)
})
test('Verifica a renderização da página', async () => {
  const inputSearchName = screen.getByTestId('name-filter');
  expect(inputSearchName).toBeInTheDocument();
  const nameColumn = screen.getByRole('columnheader', {
    name: /name/i
  });
  expect(nameColumn).toBeInTheDocument();
  const rotationColumn = screen.getByRole('columnheader', {
    name: /rotation period/i
  });
  expect(rotationColumn).toBeInTheDocument();
  const filterColumn = screen.getByTestId('column-filter');
  expect(filterColumn).toBeInTheDocument();
  const filterComparison = screen.getByTestId('comparison-filter');
  expect(filterComparison).toBeInTheDocument();
  const filterValue = screen.getByTestId('value-filter');
  expect(filterValue).toBeInTheDocument();
  const buttonFilter = screen.getByRole('button', {
    name: /filtrar/i
  });
  expect(buttonFilter).toBeInTheDocument();
})
test('Verifica se os filtros estão funcionando corretamente', async () => {
  const inputSearchName = screen.getByTestId('name-filter');
  userEvent.type(inputSearchName,'Alderaan');
  const alderaanName = await screen.findByRole('cell', {
    name: /alderaan/i
  });
  expect(alderaanName).toBeInTheDocument();
  userEvent.clear(inputSearchName);
  const tatooineName = await screen.findByRole('cell', {
    name: /tatooine/i
  });
  expect(tatooineName).toBeInTheDocument();

  const columnFilter = screen.getByTestId('column-filter');
  expect(columnFilter).toBeInTheDocument();
  userEvent.selectOptions(columnFilter, 'orbital_period');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  expect(comparisonFilter).toBeInTheDocument();
  userEvent.selectOptions(comparisonFilter, 'maior que');
  const valueFilter = screen.getByTestId('value-filter');
  expect(valueFilter).toBeInTheDocument();
  userEvent.type(valueFilter, '4818');
  const buttonFilter = screen.getByRole('button', {
    name: /filtrar/i
  });
  expect(buttonFilter).toBeInTheDocument();
  userEvent.click(buttonFilter);
  const bespinName = await screen.findByRole('cell', {
    name: /bespin/i 
  });
  expect(bespinName).toBeInTheDocument();

  userEvent.selectOptions(columnFilter, 'population');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  userEvent.type(valueFilter, '200000');
  userEvent.click(buttonFilter);
  expect(alderaanName).toBeInTheDocument();
  userEvent.selectOptions(columnFilter, 'diameter');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  userEvent.type(valueFilter, '12500');
  userEvent.click(buttonFilter);
  expect(bespinName).toBeInTheDocument();
  userEvent.selectOptions(columnFilter, 'orbital_period');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  userEvent.type(valueFilter, '463');
  userEvent.click(buttonFilter);
  expect(bespinName).toBeInTheDocument();
  const buttonLimparFiltros = screen.getByRole('button', {
    name: /limpar filtros/i
  });
  expect(buttonLimparFiltros).toBeInTheDocument();
  userEvent.click(buttonLimparFiltros);
  expect(tatooineName).toBeInTheDocument();

  userEvent.selectOptions(columnFilter, 'population');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  userEvent.type(valueFilter, '200000');
  userEvent.click(buttonFilter);
  expect(alderaanName).toBeInTheDocument();
  const buttonDelete = screen.getByRole('button', {
    name: /delete/i
  });
  expect(buttonDelete).toBeInTheDocument();
  userEvent.click(buttonDelete);
  expect(tatooineName).toBeInTheDocument();
});
});
import React, { useContext } from 'react';
import FiltersContext from '../context/FiltersContext';

export default function Filters() {
  const {
    searchByName,
    setSearchByName,
    selectFilters,
    handleChange,
    operator,
    handleClick,
    filtersChoose,
    filtersApllied,
    handleClearAllFilters,
    handleClearOneFilter,
  } = useContext(FiltersContext);

  const { columnFilter, comparisonFilter, valueFilter } = filtersChoose;

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        value={ searchByName }
        name="searchByName"
        onChange={ (event) => setSearchByName(event.target.value) }
      />
      <select
        data-testid="column-filter"
        value={ columnFilter }
        name="columnFilter"
        onChange={ (event) => handleChange(event) }
      >
        {selectFilters && selectFilters.map(
          (filter) => <option key={ filter }>{ filter }</option>,
        )}
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparisonFilter }
        name="comparisonFilter"
        onChange={ (event) => handleChange(event) }
      >
        {operator.map((comparison) => <option key={ comparison }>{ comparison }</option>)}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ valueFilter }
        name="valueFilter"
        onChange={ (event) => handleChange(event) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleClearAllFilters }
      >
        Limpar Filtros
      </button>
      { filtersApllied && filtersApllied.map((filter) => (
        <div key={ filter.columnFilter } data-testid="filter">
          <p key={ filter.columnFilter }>
            {`${filter.columnFilter} ${filter.comparisonFilter} ${filter.valueFilter}`}
          </p>
          <button
            type="button"
            name={ filter.columnFilter }
            onClick={ handleClearOneFilter }
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

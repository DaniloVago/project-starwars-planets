import { useState, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import FiltersContext from './FiltersContext';
import PlanetsContext from './PlanetsContext';

export default function FiltersProvider({ children }) {
  // planetas filtrados pelo nome
  const [filteredByName, setFilteredByName] = useState([]);
  // busca digitada pelo nome
  const [searchByName, setSearchByName] = useState('');
  // filtros do campo select
  const [selectFilters, setSelectFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  // operadores para a busca
  const [operator, setOperator] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);
  // armazenando as respostas de filtro em um estado
  const [filtersChoose, setFiltersChoose] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: 0,
  });
  // acumulando todos os tipos de filtros em um array no estado
  const [filtersApllied, setFiltersApllied] = useState([]);
  // todos os planetas sem nenhum filtro
  const { allPlanets } = useContext(PlanetsContext);

  // exercicio 2
  const filteringByName = async () => {
    const filtered = await allPlanets.filter(
      (planet) => planet.name.toLowerCase().includes(searchByName.toLowerCase()),
    );
    setFilteredByName(filtered);
  };

  useEffect(() => {
    if (searchByName) {
      filteringByName();
    } else {
      setFilteredByName(allPlanets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchByName, allPlanets]);

  // exercicio 3 e 4
  const filteringByFilters = () => {
    let planetsFiltering = allPlanets;
    // let planetsFiltering = [...filteredByName];
    // console.log(filtersApllied);

    filtersApllied.forEach((filter) => {
      const { columnFilter, comparisonFilter, valueFilter } = filter;

      switch (comparisonFilter) {
      case 'maior que':
        planetsFiltering = planetsFiltering.filter(
          (planet) => parseFloat(planet[columnFilter]) > parseFloat(valueFilter),
        );
        break;
      case 'menor que':
        planetsFiltering = planetsFiltering.filter(
          (planet) => parseFloat(planet[columnFilter]) < parseFloat(valueFilter),
        );
        break;
      case 'igual a':
        planetsFiltering = planetsFiltering.filter(
          (planet) => parseFloat(planet[columnFilter]) === parseFloat(valueFilter),
        );
        break;
      default:
        break;
      }
    });
    // console.log(planetsFiltering);
    return planetsFiltering;
  };

  useEffect(() => {
    setFilteredByName(filteringByFilters());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersApllied]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltersChoose({
      ...filtersChoose,
      [name]: value,
    });
  };

  // exercicio 6
  const handleDiferentFilters = () => {
    const { columnFilter } = filtersChoose;
    const diferentFilters = selectFilters.filter((filter) => filter !== columnFilter);
    setSelectFilters([...diferentFilters]);
    setFiltersChoose({ ...filtersChoose,
      columnFilter: diferentFilters[0] });
  };

  const handleClick = () => {
    // atualizando o estado filtrado com os filtros
    setFilteredByName(filteringByFilters());
    // chamando função de filtros unicos
    handleDiferentFilters();
    // acrescenta todos os filtros usados no estado
    setFiltersApllied([...filtersApllied, filtersChoose]);
  };

  // exercicio 7
  const handleClearOneFilter = ({ target }) => {
    const clearFiltered = filtersApllied
      .filter((filter) => filter.columnFilter !== target.name);
    console.log(clearFiltered);
    setFiltersApllied(clearFiltered);
    setSelectFilters([...selectFilters, target.name]);
    // const newFiltered = filteringByFilters(clearFiltered);
    // setFilteredByName(newFiltered);
    setFilteredByName(filteringByFilters());
    console.log(filteredByName);

    // console.log(filteredByName);
  };

  // exercicio 7
  const handleClearAllFilters = () => {
    setFiltersApllied([]);
    setSelectFilters([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setFilteredByName(allPlanets);
  };

  const context = useMemo(() => ({
    filteredByName,
    setFilteredByName,
    searchByName,
    setSearchByName,
    selectFilters,
    setSelectFilters,
    operator,
    setOperator,
    filtersChoose,
    setFiltersChoose,
    filtersApllied,
    setFiltersApllied,
    handleChange,
    handleClick,
    handleClearAllFilters,
    handleClearOneFilter,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [
    filteredByName,
    searchByName,
    selectFilters,
    operator,
    filtersChoose,
    filtersApllied,
  ]);

  return (
    <FiltersContext.Provider value={ context }>
      { children }
    </FiltersContext.Provider>
  );
}

FiltersProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

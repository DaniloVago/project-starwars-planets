import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const { loading, error, dataPlanets } = useFetch('https://swapi.dev/api/planets');
  const [allPlanets, setAllPlanets] = useState([]);

  const deletingResidents = async () => {
    const data = await dataPlanets;
    const deletedResidents = data.filter((planets) => {
      delete planets.residents;
      return planets;
    });
    setAllPlanets(deletedResidents);
  };

  useEffect(() => {
    deletingResidents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPlanets]);

  const context = useMemo(() => ({
    allPlanets,
    loading,
    error,
  }), [allPlanets, loading, error]);

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

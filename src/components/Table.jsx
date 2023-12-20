import React, { useContext } from 'react';
import FiltersContext from '../context/FiltersContext';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { loading } = useContext(PlanetsContext);
  const { filteredByName } = useContext(FiltersContext);

  // console.log(filteredByName);

  return (
    <>
      {loading && <p> loading</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredByName.map((planet) => (
            <tr key={ planet.name }>
              <th>{ planet.name }</th>
              <th>{ planet.rotation_period }</th>
              <th>{ planet.orbital_period }</th>
              <th>{ planet.diameter }</th>
              <th>{ planet.climate }</th>
              <th>{ planet.gravity }</th>
              <th>{ planet.terrain }</th>
              <th>{ planet.surface_water }</th>
              <th>{ planet.population }</th>
              <th>{ planet.films.map((film) => <p key={ film }>{ film }</p>) }</th>
              <th>{ planet.created }</th>
              <th>{ planet.edited }</th>
              <th>{ planet.url }</th>
            </tr>
          ))}
        </tbody>

      </table>
    </>
  );
}

import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [dataPlanets, setDataPlanets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const doFetch = () => {
    setLoading(true);
    fetch(url)
      .then((result) => result.json())
      .then((data) => setDataPlanets(data.results))
      .catch((err) => setError(err))
      .finally(setLoading(false));
  };

  useEffect(() => {
    doFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, error, dataPlanets };
}

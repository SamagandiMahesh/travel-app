 import { useState, useEffect } from 'react';

const useFetchData = <T,>(url: string) => {
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const rawData = await response.json();
      setData(rawData);
    } catch(e) {
      console.error(`Failed to fetch data from ${url}`, e);
      setError(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;

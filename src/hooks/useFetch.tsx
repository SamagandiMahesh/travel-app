import { useState, useEffect } from "react";

const useFetchData = <T,>(url: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const rawData = await response.json();
        setData(rawData);
      } catch (e) {
        console.error(`Failed to fetch data from ${url}`, e);
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;

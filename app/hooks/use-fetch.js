import { useState, useCallback } from "react";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const response = await cb(...args);
        setData(response);
      } catch (err) {
        // Ensure that error is normalized (could be an object or string)
        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [cb] // Memoize fn to avoid re-creating it unless cb changes
  );

  return { data, loading, error, fn };
};

export default useFetch;

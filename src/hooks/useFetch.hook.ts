import { useState } from "react";

/**
 * * Hook responsible for managing the error, success and loading states of a request
 * @param config The initial loading, error, and success states
 * @returns the error, loading, and success states, alongside functions to display them
 */
const useFetch = <T>(config?: {
  data?: T;
  loading?: boolean;
  error?: string;
}) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string | undefined>(
    config?.error || undefined
  );
  const [success, setSuccess] = useState<string>();
  const [loading, setLoading] = useState<boolean>(config?.loading || false);

  /**
   * * Function to display the loading state, e.g. during the commencement of the fetch
   * @param error The error string
   */
  const display_loading = () => {
    setLoading(true);
    setError(undefined);
    setSuccess(undefined);
  };

  /**
   * * Function to set and the error state with a timeout, and reset the loading state
   * @param error The error string
   */
  const display_error = (error: string) => {
    setLoading(false);
    setSuccess(undefined);
    setError(error);

    setTimeout(() => setError(undefined), 6000);
  };

  /**
   * * Function to set and the success state with a timeout, and reset the loading state
   * @param msg The success message
   */
  const display_success = (msg: string, data?: T) => {
    setLoading(false);
    setError(undefined);
    setSuccess(msg);
    data && setData(data);

    setTimeout(() => setSuccess(undefined), 6000);
  };

  return {
    data,
    error,
    loading,
    success,
    setError,
    setData,
    setSuccess,
    setLoading,
    display_loading,
    display_error,
    display_success,
  };
};

export default useFetch;

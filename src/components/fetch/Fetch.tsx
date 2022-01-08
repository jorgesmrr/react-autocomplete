import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

export type FetchRenderInfo = {
  isLoading: boolean;
  hasFailed: boolean;
  data: any;
};

interface FetchProps {
  url: string | null;
  render: (state: FetchRenderInfo) => React.ReactElement;
  responseTransformer?: (data: any) => any;
  debounceWaitInterval?: number;
}

const Fetch: React.FC<FetchProps> = ({
  url,
  responseTransformer,
  render,
  debounceWaitInterval = 250,
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(!!url);
  const [hasFailed, setFailed] = useState(false);
  const controller = useRef<AbortController>();

  const fetchData = async (url: string) => {
    try {
      controller.current?.abort();

      controller.current = new AbortController();
      const { signal } = controller.current;

      const response = await fetch(url, { signal });
      const data = await response.json();

      setData(responseTransformer ? responseTransformer(data) : data);
      setLoading(false);
    } catch (error: any) {
      if (error.name !== "AbortError") {
        setFailed(true);
        setData(null);
        setLoading(false);
      }
    }
  };

  /* eslint react-hooks/exhaustive-deps: "off" */
  const debouncedFetchData = useCallback(
    debounce(fetchData, debounceWaitInterval),
    []
  );

  useEffect(() => {
    if (url) {
      setLoading(true);
      setFailed(false);

      debouncedFetchData(url);
    } else {
      setData(null);
    }
  }, [url, debouncedFetchData]);

  return render({ isLoading, hasFailed, data });
};

export default Fetch;

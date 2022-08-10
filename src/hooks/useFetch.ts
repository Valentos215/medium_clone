import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

interface ArticleResponseType {
  data: { article: { favoritesCount: number; favorited: boolean } };
}

const useFetch = (url: string) => {
  const baseUrl = "https://conduit.productionready.io/api";
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<null | ArticleResponseType>(null);
  const [error, setError] = useState(null);
  type Options = { method: "post" | "put" | "delete" } | {};
  const [options, setOptions] = useState<Options>({});
  const [token] = useLocalStorage("token");

  const doFetch = useCallback((options: Options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipGetResponseAfterDestroy = false;
    const requestOptions = {
      ...options,
      ...{
        headers: { authorization: token ? `Token ${token}` : "" },
      },
    };
    if (!isLoading) return;

    axios(baseUrl + url, requestOptions)
      .then((res) => {
        if (!skipGetResponseAfterDestroy) {
          setIsLoading(false);
          setResponse(res.data);
        }
      })
      .catch((error) => {
        if (!skipGetResponseAfterDestroy) {
          setIsLoading(false);
          setError(error.response.data);
        }
      });

    return () => {
      skipGetResponseAfterDestroy = true;
    };
  }, [isLoading, options, url, token]);

  return [{ isLoading, response, error }, doFetch];
};

export default useFetch;

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

type User = {
  image: string;
  bio: string;
  username: string;
  email: string;
  password: string;
  token: string;
};
type Article = {
  slug: string;
  title: string;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  tagList: string[];
  author: { username: string; image: string };
};
interface ResponseType {
  article: Article;
  articles: Article[];
  articlesCount: number;
  tags: string[];
  user: User;
}

type Options =
  | {
      method: "get" | "post" | "put" | "delete";
      data: { user: User; article: Article };
    }
  | {};

type Error =
  | { errors: { name: { errors: string[] } } }
  | { errors: { name: { error: string } } };

type UseFetchResult = {
  isLoading: boolean;
  response: ResponseType | null;
  error: Error | null;
  doFetch: (options?: Options) => void;
};

const useFetch = (url: string): UseFetchResult => {
  const baseUrl = "https://conduit.productionready.io/api";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [error, setError] = useState<Error | null>(null);
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

  return { isLoading, response, error, doFetch };
};

export default useFetch;

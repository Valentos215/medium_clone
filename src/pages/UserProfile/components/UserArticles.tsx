import React from "react";
import { stringify } from "query-string";
import { useEffect } from "react";
import ErrorMessage from "../../../components/ErrorMessage";
import Feed from "../../../components/Feed";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import useFetch from "../../../hooks/useFetch";
import { getPaginator, limit } from "../../../utils";

type UserArticlesProps = {
  username: string;
  location: { search: string };
  isFavorites: boolean;
  url: string;
};
type GetApiUrlProps = {
  username: string;
  offset: number;
  isFavorites: boolean;
};

const getApiUrl = ({
  username,
  offset,
  isFavorites,
}: GetApiUrlProps): string => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };

  return `/articles?${stringify(params)}`;
};

const UserArticles: React.FC<UserArticlesProps> = ({
  username,
  location,
  isFavorites,
  url,
}) => {
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const { response, isLoading, error, doFetch } = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites, offset]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount + 1}
            limit={limit}
            url={isFavorites ? `${url}/favorites` : url}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default UserArticles;

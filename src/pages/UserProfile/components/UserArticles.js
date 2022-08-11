import { stringify } from "query-string";
import { Fragment, useEffect } from "react";
import ErrorMessage from "../../../components/ErrorMessage";
import Feed from "../../../components/Feed";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import useFetch from "../../../hooks/useFetch";
import { getPaginator, limit } from "../../../utils";

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };

  return `/articles?${stringify(params)}`;
};

const UserArticles = ({ username, location, isFavorites, url }) => {
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
        <Fragment>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount + 1}
            limit={limit}
            url={isFavorites ? `${url}/favorites` : url}
            currentPage={currentPage}
          />
        </Fragment>
      )}
    </div>
  );
};

export default UserArticles;

import { stringify } from "query-string";
import { Fragment, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Feed from "../../components/Feed";
import FeedToggler from "../../components/FeedToggler";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import PopularTags from "../../components/PopularTags";
import useFetch from "../../hooks/useFetch";
import { getPaginator, limit } from "../../utils";

const GlobalFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset,
  });
  const apiUrl = `/articles?${stringifiedParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <Fragment>
                <Feed articles={response.articles} />
                <Pagination
                  total={19 /*response.articlesCount*/}
                  limit={limit}
                  url={match.url}
                  currentPage={currentPage}
                />
              </Fragment>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;

import React from "react";
import { stringify } from "query-string";
import { useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import Feed from "../../components/Feed";
import FeedToggler from "../../components/FeedToggler";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import PopularTags from "../../components/PopularTags";
import useFetch from "../../hooks/useFetch";
import { getPaginator, limit } from "../../utils";

type TagFeedProps = {
  location: { search: string };
  match: { params: { slug: string }; url: string };
};

const TagFeed: React.FC<TagFeedProps> = ({ location, match }) => {
  const tagName = match.params.slug;
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName,
  });
  const apiUrl = `/articles?${stringifiedParams}`;
  const { response, isLoading, error, doFetch } = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, tagName]);

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
            <FeedToggler tagName={tagName} />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount + 1}
                  limit={limit}
                  url={match.url}
                  currentPage={currentPage}
                />
              </>
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

export default TagFeed;

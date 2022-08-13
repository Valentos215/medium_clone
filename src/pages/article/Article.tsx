import React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import TagList from "../../components/TagList";
import { CurrentUserContext } from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";

type ArticleProps = { match: { params: { slug: string } } };

const Article: React.FC<ArticleProps> = (props) => {
  const slug = props.match.params.slug;
  const apiUrl = `/articles/${slug}`;

  const {
    response: fetchingResponse,
    isLoading: fetchingInProcess,
    error: fetchingError,
    doFetch,
  } = useFetch(apiUrl);

  const { response: deletingResponse, doFetch: doDelete } = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);

  const isAuthor = () => {
    if (!fetchingResponse || !currentUserState.isLoggedIn) {
      return false;
    }
    return (
      fetchingResponse.article.author.username ===
      currentUserState.currentUser.username
    );
  };

  const deleteArticle = () => {
    doDelete({
      method: "delete",
    });
  };

  useEffect(() => {
    if (!deletingResponse) {
      return;
    }
    setIsSuccessfullDelete(true);
  }, [deletingResponse]);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isSuccessfullDelete) {
    return <Redirect to="/" />;
  }
  return (
    <div className="article-page">
      <div className="banner">
        {!fetchingInProcess && fetchingResponse && (
          <div className="container">
            <h1>{fetchingResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchingResponse.article.author.username}`}
              >
                <img src={fetchingResponse.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchingResponse.article.author.username}`}
                >
                  {fetchingResponse.article.author.username}
                </Link>
                <span className="date">
                  {fetchingResponse.article.createdAt}
                </span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    className="btn btn-outline-secondary btn-sm"
                    to={`/articles/${fetchingResponse.article.slug}/edit`}
                  >
                    <i className="ion-edit"></i>
                    Edit article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteArticle}
                  >
                    <i className="ion-trash-a"></i>
                    Delete article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchingInProcess && <Loading />}
        {fetchingError && <ErrorMessage />}
        {!fetchingInProcess && fetchingResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{fetchingResponse.article.body}</p>
              </div>
              <TagList tags={fetchingResponse.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;

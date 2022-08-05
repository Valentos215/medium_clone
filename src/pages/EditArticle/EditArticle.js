import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ArticleForm from "../../components/ArticleForm";
import { CurrentUserContext } from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";

const EditArticle = ({ match }) => {
  const slug = match.params.slug;
  const [CurrentUserState] = useContext(CurrentUserContext);
  const apiUrl = `/articles/${slug}`;
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle,
  ] = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) return;
    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList,
    });
  }, [fetchArticleResponse]);

  const handleSubmit = (article) => {
    doUpdateArticle({
      method: "put",
      data: { article },
    });
  };

  useEffect(() => {
    if (!updateArticleResponse) return;
    setIsSuccessfullSubmit(true);
  }, [updateArticleResponse]);

  if (CurrentUserState.isLoggedIn === false) {
    return <Redirect to="/" />;
  }
  if (isSuccessfullSubmit) return <Redirect to={`/articles/${slug}`} />;
  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError) || {}}
      initialValues={initialValues}
    />
  );
};

export default EditArticle;

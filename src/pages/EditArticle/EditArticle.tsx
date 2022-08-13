import React from "react";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ArticleForm from "../../components/ArticleForm";
import { CurrentUserContext } from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";

type Article = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

type EditArticleProps = { match: { params: { slug: string } } };

const EditArticle: React.FC<EditArticleProps> = ({ match }) => {
  const slug = match.params.slug;

  const [CurrentUserState] = useContext(CurrentUserContext);
  const apiUrl = `/articles/${slug}`;
  const { response: fetchResponse, doFetch } = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState<Article | null>(null);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const {
    response: updateResponse,
    error: updateError,
    doFetch: doUpdate,
  } = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!fetchResponse) {
      return;
    }
    setInitialValues({
      title: fetchResponse.article.title,
      description: fetchResponse.article.description,
      body: fetchResponse.article.body,
      tagList: fetchResponse.article.tagList,
    });
  }, [fetchResponse]);

  const handleSubmit = (article: Article) => {
    doUpdate({
      method: "put",
      data: { article },
    });
  };

  useEffect(() => {
    if (!updateResponse) return;
    setIsSuccessfullSubmit(true);
  }, [updateResponse]);

  if (CurrentUserState.isLoggedIn === false) {
    return <Redirect to="/" />;
  }
  if (isSuccessfullSubmit) return <Redirect to={`/articles/${slug}`} />;
  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateError && updateError.errors) || null}
      initialValues={initialValues}
    />
  );
};

export default EditArticle;

import React from "react";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ArticleForm from "../../components/ArticleForm";
import { CurrentUserContext } from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";

const CreateArticle: React.FC = () => {
  const apiUrl = "/articles";
  const { response, error, doFetch } = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);

  const initialValues = {
    title: "",
    description: "",
    body: "",
    tagList: [],
  };

  const handleSubmit = (article) => {
    doFetch({
      method: "post",
      data: { article },
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    setIsSuccessfullSubmit(true);
  }, [response]);

  if (!currentUserState.isLoggedIn) {
    return <Redirect to="/" />;
  }
  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${response!.article.slug}`} />;
  }
  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || null}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateArticle;

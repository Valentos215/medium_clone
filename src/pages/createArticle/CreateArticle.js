import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ArticleForm from "../../components/ArticleForm";
import { CurrentUserContext } from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";

const CreateArticle = () => {
  const apiUrl = "/articles";
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const initialValues = {
    title: "",
    description: "",
    body: "",
    tagList: [],
  };
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const handleSubmit = (article) => {
    doFetch({
      method: "post",
      data: { article },
    });
  };

  useEffect(() => {
    if (!response) return;
    setIsSuccessfullSubmit(true);
  }, [response]);

  if (!currentUserState.isLoggedIn) return <Redirect to="/" />;
  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />;
  }
  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateArticle;

import React, { useEffect, useState } from "react";
import BackendErrorMessages from "./BackendErrorMessages";

type Article = {
  title: string;
  body: string;
  description: string;
  tagList: string[] | null;
};
type ArticleFormProps = {
  onSubmit: (article: Article) => void;
  errors: { name: string[] } | { name: string } | null;
  initialValues: Article | null;
};

const ArticleForm: React.FC<ArticleFormProps> = ({
  onSubmit,
  errors,
  initialValues,
}) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tagListStr, setTagListStr] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tagList: string[] | null = tagListStr ? tagListStr.split(" ") : null;
    const article = { title, body, description, tagList };
    onSubmit(article);
  };

  useEffect(() => {
    if (!initialValues) {
      return;
    }
    setTitle(initialValues.title);
    setBody(initialValues.body);
    setDescription(initialValues.description);
    if (initialValues.tagList) setTagListStr(initialValues.tagList.join(" "));
  }, [initialValues]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <BackendErrorMessages backendErrors={errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="What is this article about?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter tags separated by spaces"
                    value={tagListStr}
                    onChange={(e) => setTagListStr(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <button
                    type="submit"
                    className="btn btn-lg pull-xs-right btn-primary"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;

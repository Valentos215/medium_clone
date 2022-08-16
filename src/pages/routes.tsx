import React from "react";
import { Switch, Route } from "react-router-dom";
import { withSuspense } from "../hoc/withSuspense";
import GlobalFeed from "./globalFeed/GlobalFeed";
import TagFeed from "./TagFeed/TagFeed";
import YourFeed from "./YourFeed/YourFeed";

const Authentication = React.lazy(
  () => import("./authentication/Authentication")
);
const Settings = React.lazy(() => import("./Settings/Settings"));
const Article = React.lazy(() => import("./article/Article"));
const CreateArticle = React.lazy(() => import("./createArticle/CreateArticle"));
const EditArticle = React.lazy(() => import("./EditArticle/EditArticle"));
const UserProfile = React.lazy(() => import("./UserProfile/UserProfile"));

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/feed" component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/login" component={withSuspense(Authentication)} />
      <Route path="/register" component={withSuspense(Authentication)} />
      <Route path="/settings" component={withSuspense(Settings)} />
      <Route path="/articles/new" component={withSuspense(CreateArticle)} />
      <Route path="/articles/:slug" component={withSuspense(Article)} exact />
      <Route
        path="/articles/:slug/edit"
        component={withSuspense(EditArticle)}
      />
      <Route
        path="/profiles/:slug"
        component={withSuspense(UserProfile)}
        exact
      />
      <Route
        path="/profiles/:slug/favorites"
        component={withSuspense(UserProfile)}
      />
    </Switch>
  );
};

export default Routes;

import { Switch, Route } from "react-router-dom";
import GlobalFeed from "./globalFeed/GlobalFeed";
import Article from "./article/Article";
import Authentication from "./authentication/Authentication";
import TagFeed from "./TagFeed/TagFeed";
import YourFeed from "./YourFeed/YourFeed";
import CreateArticle from "./createArticle/CreateArticle";
import EditArticle from "./EditArticle/EditArticle";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/articles/new" component={CreateArticle} />
      <Route path="/articles/:slug/edit" component={EditArticle} />
      <Route path="/articles/:slug" component={Article} />
      <Route path="/feed" component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
    </Switch>
  );
};

export default Routes;

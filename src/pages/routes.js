import { Switch, Route } from "react-router-dom";
import GlobalFeed from "./globalFeed/GlobalFeed";
import Article from "./article/Article";
import Authentication from "./authentication/Authentication";
import TagFeed from "./TagFeed/TagFeed";
import YourFeed from "./YourFeed/YourFeed";

const Routes = () => {
  return (
    <Switch>
      <Route path="/feed" component={YourFeed} />
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  );
};

export default Routes;

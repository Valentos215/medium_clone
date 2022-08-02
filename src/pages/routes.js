import { Switch, Route } from "react-router-dom";
import GlobalFeed from "./globalFeed/GlobalFeed";
import Article from "./article/Article";
import Authentication from "./authentication/Authentication";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  );
};

export default Routes;

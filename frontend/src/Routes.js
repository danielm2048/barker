import { Redirect, Route, Switch } from "react-router-dom";
import useAuth from "./hooks/useAuth";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Swoofer from "./pages/Swoofer";
import Profile from "./pages/Profile";
import AddDog from "./pages/AddDog";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { data, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        data ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <PrivateRoute path="/swoofer" component={Swoofer} />
      <PrivateRoute path="/add-dog" component={AddDog} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  );
};

export default Routes;

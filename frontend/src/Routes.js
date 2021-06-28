import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Swoofer from "./pages/Swoofer";
import NotFound from "./pages/NotFound";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/about" component={About} />
			<Route path="/swoofer" component={Swoofer} />
			<Route path="/404" component={NotFound} />
			<Redirect to="/404" />
		</Switch>
	);
};

export default Routes;

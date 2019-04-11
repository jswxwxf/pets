import React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

// import { UserServiceActivity } from 'fashionipo-services/es/services';
// import { UtilService } from 'utility';

import { routes as welcomeRoutes } from './features/welcome';
import { routes as activityRoutes } from './features/activity';
import { routes as userRoutes } from './features/user';

const routes = [
  ...welcomeRoutes,
  ...activityRoutes,
  ...userRoutes
];

// const handleRouteChange = (props) => {

//   let utilService = UtilService.instance;
//   let userService = UserServiceActivity.instance;
//   let { match, location } = props;
//   let query = qs.parse(location.search);

//   utilService.rememberLocation(location);
//   $('#root').removeClass();
//   if (match.path.startsWith('/opbuy/')) {
//     $('#root').addClass('opbuy');
//   }
//   if (match.path.startsWith('/oppay/')) {
//     $('#root').addClass('oppay');
//   }
//   if (query.idRequired === "true") {
//     if (!userService.isLoggedIn()) return utilService.handleLogin();
//   }

// }

// wrap <Route> and use this everywhere instead, then when sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
  <Route exact={route.exact} path={route.path} render={props => {
    // pass the sub-routes down to keep nesting
    // let { history } = props;
    // let utilService = UtilService.instance;
    // handleRouteChange(props);
    // utilService.rememberLocation(location);
    // history.listen((location, action) => {
    //   utilService.moveToTop();
    // });
    // utilService.history = history;
    return (<route.component {...props} routes={route.routes} />);
  }} />
)

export default () => (
  <Router>
    <div>
      <Route exact path="/" render={() => (
        <Redirect to="/welcome" />
      )} />
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </div>
  </Router>
);
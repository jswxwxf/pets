import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { inject } from './config';

import { routes as welcomeRoutes } from './features/welcome';
import { routes as activityRoutes } from './features/activity';
import { routes as userRoutes } from './features/user';
import { routes as storeRoutes } from './features/creditstore';
import { routes as otherRoutes } from './features/others';
import { routes as inviteRoutes } from './features/invite';
import { routes as landingRoutes } from './features/landing';

const routes = [
    ...welcomeRoutes,
    ...activityRoutes,
    ...userRoutes,
    ...storeRoutes,
    ...otherRoutes,
    ...inviteRoutes,
    ...landingRoutes
];

// wrap <Route> and use this everywhere instead, then when sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
    <Route exact={route.exact} path={route.path} render={props => {
        // pass the sub-routes down to keep nesting
        let { history } = props;
        // let utilService = UtilService.instance;
        // handleRouteChange(props);
        // utilService.rememberLocation(location);
        // history.listen((location, action) => {
        //   utilService.moveToTop();
        // });
        let utilService = inject('utilService');
        utilService.history = history;
        return (<route.component {...props} routes={route.routes} />);
    }} />
)

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => (
                <Redirect to="/welcome" />
            )} />
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    </Router>
);
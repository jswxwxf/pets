import Feed from './Feed';
import Moment from './Moment';
import Hashtag from './Hashtag';
import Pet from './Pet';
import User from './User';
import Register from './Register';
import Baike from './Baike';

const routes = [
    { path: '/landing/feed', component: Feed },
    { path: '/landing/moment', component: Moment },
    { path: '/landing/hashtag', component: Hashtag },
    { path: '/landing/pet', component: Pet },
    { path: '/landing/user', component: User },
    { path: '/landing/baike', component: Baike },
    { path: '/landing/register', component: Register },
]

export { routes }
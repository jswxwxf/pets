import About from './About';
import Faq from './Faq';
import Regulations from './Regulations';
import Privacy from './Privacy';
import Terms from './Terms';

const routes = [
    { path: '/about', component: About },
    { path: '/faq', component: Faq },
    { path: '/regulations', component: Regulations },
    { path: '/privacy', component: Privacy },
    { path: '/terms', component: Terms },
]

export { routes }
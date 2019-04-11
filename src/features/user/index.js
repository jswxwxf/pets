import ActivitiesTabs from './Activities';
import OrdersTabs from './Orders';

const routes = [
  { path: '/user/activities', component: ActivitiesTabs },
  { path: '/user/orders', component: OrdersTabs },
]

export { routes }
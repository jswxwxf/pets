import ActivitiesTabs from './Activities';
import ActivitiesDetail from './ActivitiesDetail';
import OrdersTabs from './Orders';
import OrderDetail from './OrderDetail';

const routes = [
  { path: '/user/activities', component: ActivitiesTabs },
  { path: '/user/activity', component: ActivitiesDetail },
  { path: '/user/orders', component: OrdersTabs },
  { path: '/user/order', component: OrderDetail },
]

export { routes }
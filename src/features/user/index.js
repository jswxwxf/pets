import ActivitiesTabs from './Activities';
import OrdersTabs from './Orders';
import OrderDetail from './OrderDetail';

const routes = [
  { path: '/user/activities', component: ActivitiesTabs },
  { path: '/user/orders', component: OrdersTabs },
  { path: '/user/orders/:id', component: OrderDetail },
]

export { routes }
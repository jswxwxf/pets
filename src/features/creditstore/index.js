import Home from './Home';
import Product from './Product';
import Orders from './Orders';
import Order from './Order';

const routes = [
  { path: '/store/home', component: Home },
  { path: '/store/product', component: Product },
  { path: '/store/orders', component: Orders },
  { path: '/store/order', component: Order },
]

export { routes }
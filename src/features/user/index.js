import ActivitiesTabs from './Activities';
import ActivitiesDetail from './ActivitiesDetail';
import OrdersTabs from './Orders';
import OrderDetail from './OrderDetail';
import OrderRefund from './OrderRefund';
import OrderRefundConfirm from './OrderRefundConfirm';
import PublishOrders from './PublishOrders';
import WriteOff from './WriteOff';

const routes = [
    { path: '/user/activities', component: ActivitiesTabs },
    { path: '/user/activity', component: ActivitiesDetail },
    { path: '/user/orders', component: OrdersTabs },
    { path: '/user/publishorders', component: PublishOrders },
    { path: '/user/order', component: OrderDetail },
    { path: '/user/refund', component: OrderRefund },
    { path: '/user/refundconfirm', component: OrderRefundConfirm },
    { path: '/user/writeoff', component: WriteOff },
]

export { routes }
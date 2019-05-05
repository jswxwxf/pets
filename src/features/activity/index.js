import Detail from './Detail';
import Attend from './Attend';
import Upload from './Upload';

const routes = [
  { path: '/activity/detail', component: Detail },
  { path: '/activity/attend', component: Attend },
  { path: '/activity/upload', component: Upload },
]

export { routes }
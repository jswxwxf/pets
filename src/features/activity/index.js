import Detail from './Detail';
import Attend from './Attend';
import Done from './Done';
import Publish from './Publish';
import PublishTitle from './PublishTitle';
import PublishStep1 from './PublishStep1';
import PublishStep2 from './PublishStep2';
import PublishStep3 from './PublishStep3';
import PublishStep4 from './PublishStep4';
import PublishDone from './PublishDone';
// import PaymentDone from './PaymentDone';

const routes = [
    { path: '/activity/detail', component: Detail },
    { path: '/activity/attend', component: Attend },
    { path: '/activity/done', component: Done },
    // { path: '/payment/done', component: PaymentDone },

    { path: '/activity/publish', component: PublishTitle },
    // { path: '/activity/publish-title', component: PublishTitle },
    { path: '/activity/publish-step1', component: PublishStep1 },
    { path: '/activity/publish-step2', component: PublishStep2 },
    { path: '/activity/publish-step3', component: PublishStep3 },
    { path: '/activity/publish-step4', component: PublishStep4 },
    { path: '/activity/publish-done', component: PublishDone },
]

export { routes }
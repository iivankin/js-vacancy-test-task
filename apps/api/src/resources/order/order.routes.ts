import { routeUtil } from 'utils';

import cancel from './actions/cancel';
import create from './actions/create';
import list from './actions/list';
import success from './actions/success';

const privateRoutes = routeUtil.getRoutes([create, list]);

const publicRoutes = routeUtil.getRoutes([success, cancel]);

export default {
  privateRoutes,
  publicRoutes,
};

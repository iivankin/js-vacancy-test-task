import { routeUtil } from 'utils';

import create from './actions/create-product';
import list from './actions/list';
import listOwn from './actions/list-own';
import remove from './actions/remove';

const privateRoutes = routeUtil.getRoutes([create, listOwn, remove, list]);

export default {
  privateRoutes,
};

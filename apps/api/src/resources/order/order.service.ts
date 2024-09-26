import db from 'db';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { orderSchema } from 'schemas';
import { Order } from 'types';

const service = db.createService<Order>(DATABASE_DOCUMENTS.ORDERS, {
  schemaValidator: (obj) => orderSchema.parseAsync(obj),
});

export default service;

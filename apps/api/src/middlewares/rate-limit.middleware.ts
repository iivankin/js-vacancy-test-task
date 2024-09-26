import { ParameterizedContext } from 'koa';
import koaRateLimit, { MiddlewareOptions } from 'koa-ratelimit';

import { AppKoaContextState } from 'types';

const rateLimit = (
  limitDuration = 1000 * 60, // 60 sec
  requestsPerDuration = 10,
  errorMessage: string | undefined = 'Looks like you are moving too fast. Retry again in few minutes.',
): ReturnType<typeof koaRateLimit> => {
  const dbOptions: Pick<MiddlewareOptions, 'driver' | 'db'> = {
    driver: 'memory',
    db: new Map(),
  };

  return koaRateLimit({
    ...dbOptions,
    duration: limitDuration,
    max: requestsPerDuration,
    id: (ctx: ParameterizedContext<AppKoaContextState>) => ctx.state?.user?._id || ctx.ip,
    errorMessage,
    disableHeader: false,
    throw: true,
  });
};

export default rateLimit;

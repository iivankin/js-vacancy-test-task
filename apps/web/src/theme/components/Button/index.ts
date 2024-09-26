import { Button } from '@mantine/core';
import clsx from 'clsx';

import classes from './index.module.css';

export default Button.extend({
  defaultProps: {
    size: 'md',
    radius: 'md',
  },
  classNames: (_, props) => ({
    root: clsx(
      classes.root,
      props.variant === 'outline' ? classes.rootOutline : props.color !== 'red' && classes.rootMain,
    ),
    label: classes.label,
  }),
});

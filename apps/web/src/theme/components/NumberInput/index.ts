import { NumberInput } from '@mantine/core';
import cx from 'clsx';

import classes from './index.module.css';

export default NumberInput.extend({
  defaultProps: {
    size: 'md',
    radius: 'md',
    hideControls: true,
    allowNegative: false,
  },
  classNames: (_, props) => ({
    label: cx(
      {
        [classes.error]: props.error,
      },
      classes.label,
    ),
    input: cx(classes.input, props.error && classes.inputError, !props.suffix && classes.animatedInput),
  }),
});

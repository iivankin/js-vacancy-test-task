import { TextInput } from '@mantine/core';
import cx from 'clsx';

import classes from './index.module.css';

export default TextInput.extend({
  defaultProps: {
    size: 'md',
    radius: 'md',
  },
  classNames: (_, props) => ({
    label: cx(
      {
        [classes.error]: props.error,
      },
      classes.label,
    ),
    input: cx(classes.input, props.error && classes.inputError, !props.leftSection && classes.animatedInput),
  }),
});

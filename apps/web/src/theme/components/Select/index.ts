import { Select } from '@mantine/core';

import classes from './style.module.css';

export default Select.extend({
  defaultProps: {
    size: 'md',
  },
  classNames: {
    input: classes.input,
  },
});

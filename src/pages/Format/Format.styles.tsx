import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.red[8],
    '&:hover': {
      backgroundColor: theme.colors.red[9],
    },
  },
}));

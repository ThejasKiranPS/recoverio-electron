import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  button: {
    height: 200,
    width: 220,
    borderRadius: 10,
    backgroundColor: theme.colors.gray[3],
    color: theme.colors.gray[8],
    fontSize: 18,
  },
  greenHover: {
    '&:hover': {
      backgroundColor: theme.colors.green[5],
      color: theme.white,
    },
  },
  redHover: {
    '&:hover': {
      backgroundColor: theme.colors.red[5],
      color: theme.white,
    },
  },
}));

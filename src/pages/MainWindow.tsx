import { Button, Flex, Paper, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
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
// create mantine theme where buttons are default varaint
export function MainWindow() {
  const { classes } = useStyles();
  return (
    <Paper>
      <Flex justify="space-evenly" sx={{ height: '100vh' }} align="center">
        <Button
          variant="default"
          className={`${classes.button} ${classes.greenHover}`}
        >
          Recover
        </Button>
        <Button
          variant="default"
          className={`${classes.button} ${classes.redHover}`}
        >
          Delete
        </Button>
      </Flex>
    </Paper>
  );
}

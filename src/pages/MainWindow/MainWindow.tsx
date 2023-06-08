import { Box, Button, Flex, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './useStyles';

// create a function which executes a shell command and consoles its output

// create a function which executes a shell command and returns its output
export function MainWindow() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleRecover = () => {
    navigate('/recover');
  };
  const handleFormat = () => {
    navigate('/format');
  };
  const theme = useMantineTheme();

  return (
    <Box sx={{ backgroundColor: theme.colors.gray[1] }}>
      <Flex justify="space-evenly" sx={{ height: '100vh' }} align="center">
        <Button
          variant="default"
          className={`${classes.button} ${classes.greenHover}`}
          onClick={handleRecover}
        >
          Recover
        </Button>
        <Button
          variant="default"
          className={`${classes.button} ${classes.redHover}`}
          onClick={handleFormat}
        >
          Format
        </Button>
      </Flex>
    </Box>
  );
}

/* eslint-disable promise/always-return */
import {
  Button,
  Group,
  Loader,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { BottomNav } from 'components/BottomNav';
import { useState } from 'react';
import useSyles from './Format.styles';

export function FormatProgress() {
  const theme = useMantineTheme();
  const { classes } = useSyles();

  const [scanning, setScanning] = useState(true);

  const handleFinish = () => {
    window.eapi.killAllRecoverIO();
    setScanning(false);
  };
  return (
    <Stack
      p="md"
      sx={{ backgroundColor: theme.colors.gray[1], height: '100vh' }}
      spacing="xs"
    >
      {scanning ? (
        <Group>
          <Text>Shredding disk</Text>
          <Loader />
        </Group>
      ) : (
        <Text>Shredding complete</Text>
      )}
      <BottomNav
        next={
          <Button className={classes.button} onClick={handleFinish}>
            Finish
          </Button>
        }
      />
    </Stack>
  );
}

import { Button, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { BottomNav } from 'components/BottomNav';
import { FileCard } from '../../../components/FileCard';

export function ScanPage() {
  const theme = useMantineTheme();
  return (
    <Stack
      p="md"
      sx={{ backgroundColor: theme.colors.gray[1], height: '100vh' }}
      spacing="xs"
    >
      <Text>Recovered files</Text>
      <Paper p="sm">
        <Stack mih="60vh" sx={{ overflow: 'auto' }}>
          <FileCard name="file1" path="/home/user/file1" />
        </Stack>
      </Paper>
      <BottomNav next={<Button>Finish</Button>} />
    </Stack>
  );
}

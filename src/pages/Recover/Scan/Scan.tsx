/* eslint-disable promise/always-return */
import {
  Button,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { BottomNav } from 'components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FileCard } from '../../../components/FileCard';

export function ScanPage() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [files, setFiles] = useState<string[]>([]);
  const [scanning, setScanning] = useState(true);

  // console log every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      window.eapi
        .listRecoveredFiles()
        .then((files) => {
          console.log(files);
          setFiles(files);
        })
        .catch((err) => {
          // console.log(err);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
          <Text c="dimmed">Scanning for files</Text>
          <Loader />
        </Group>
      ) : (
        <Text>Recovered Files</Text>
      )}

      <Paper p="sm">
        <Stack mih="60vh" mah="80vh" sx={{ overflow: 'auto' }}>
          {files.map((file) => (
            <FileCard
              key={file}
              name={file}
              path={`/tmp/recoverio.out/${file}`}
            />
          ))}
        </Stack>
      </Paper>
      <BottomNav next={<Button onClick={handleFinish}>Finish</Button>} />
    </Stack>
  );
}

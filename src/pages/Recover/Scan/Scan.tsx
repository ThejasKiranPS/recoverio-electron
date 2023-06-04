/* eslint-disable promise/always-return */
import { Button, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { BottomNav } from 'components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { FileCard } from '../../../components/FileCard';
import { useEffect, useState } from 'react';

export function ScanPage() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [files, setFiles] = useState<string[]>([]);

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
          console.log(err);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Stack
      p="md"
      sx={{ backgroundColor: theme.colors.gray[1], height: '100vh' }}
      spacing="xs"
    >
      <Text>Recovered files</Text>
      <Paper p="sm">
        <Stack mih="60vh" mah={'80vh'} sx={{ overflow: 'auto' }}>
          {files.map((file) => (
            <FileCard
              key={file}
              name={file}
              path={`/tmp/recoverio.out/${file}`}
            />
          ))}
        </Stack>
      </Paper>
      <BottomNav next={<Button onClick={() => navigate('/')}>Finish</Button>} />
    </Stack>
  );
}

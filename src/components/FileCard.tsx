import { Box, Group, Text, createStyles } from '@mantine/core';
import { IconFile } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  fileCard: {
    '&:hover': {
      backgroundColor: theme.colors.gray[3],
      cursor: 'pointer',
    },
    userSelect: 'none',
  },
}));
const openFile = (path) => {
  console.log(path);
  window.eapi.openFile(path);
};
export function FileCard({ name, path }) {
  const { classes } = useStyles();
  return (
    <Box className={classes.fileCard} p={'sm'} onClick={() => openFile(path)}>
      <Group>
        <IconFile />
        <Text>{name}</Text>
      </Group>
    </Box>
  );
}

import { Box, Text, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  fileCard: {
    '&:hover': {
      backgroundColor: theme.colors.gray[3],
      cursor: 'pointer',
    },
    userSelect: 'none',
  },
}));
export function FileCard({ name, path }) {
  const { classes } = useStyles();
  return (
    <Box className={classes.fileCard} p={'sm'}>
      <Text>{name}</Text>
    </Box>
  );
}

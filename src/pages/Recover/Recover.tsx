import { BottomNav } from 'components/BottomNav';
import {
  Select,
  Stack,
  Button,
  Text,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.green[8],
    '&:hover': {
      backgroundColor: theme.colors.green[9],
    },
  },
}));

const supportedFilesystems = ['FAT32'];
export function Recover() {
  const [disks, setDisks] = useState<string[]>(['/dev/sda']);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      disk: '',
      filesystem: '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.disk) {
        errors.disk = 'Disk is required';
      }
      if (!values.filesystem) {
        errors.filesystem = 'Filesystem is required';
      }
      return errors;
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    window.eapi
      .listDisks()
      .then((data: Array<string>) => setDisks(data))
      .catch((e) => console.log(e));
  }, []);

  const handleNext = () => {
    const res = form.validate();
    if (res.hasErrors) return;
    console.log(form.values);
    navigate('/recover/scan');
  };

  return (
    <Stack
      p="md"
      sx={{ backgroundColor: theme.colors.gray[1], height: '100vh' }}
    >
      <Text>Recover</Text>
      <Select
        data={disks}
        label="Select disk"
        placeholder="Select disk"
        {...form.getInputProps('disk')}
      />
      <Select
        data={supportedFilesystems}
        label="Select filesystem"
        placeholder="Select filesystem"
        {...form.getInputProps('filesystem')}
      />
      <BottomNav
        next={
          <Button
            className={classes.button}
            rightIcon={<IconChevronRight />}
            onClick={handleNext}
          >
            Start Scan
          </Button>
        }
      />
    </Stack>
  );
}

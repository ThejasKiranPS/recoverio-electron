import { BottomNav } from 'components/BottomNav';
import { Select, Stack, Button, Text, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import useStyles from './Format.styles';

export function Format() {
  const [disks, setDisks] = useState<string[]>([]);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      disk: '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.disk) {
        errors.disk = 'Disk is required';
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
    window.eapi.formatDisk(form.values);
    navigate('/format/progress');
  };

  return (
    <Stack
      p="md"
      sx={{ backgroundColor: theme.colors.gray[1], height: '100vh' }}
    >
      <Text>Shred</Text>
      <Select
        data={disks}
        label="Select disk"
        placeholder="Select disk"
        {...form.getInputProps('disk')}
      />
      <BottomNav
        next={
          <Button
            className={classes.button}
            rightIcon={<IconChevronRight />}
            onClick={handleNext}
          >
            Shred disk
          </Button>
        }
      />
    </Stack>
  );
}

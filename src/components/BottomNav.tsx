/* eslint-disable react/require-default-props */
import { Button, Group } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { ReactNode, cloneElement } from 'react';
import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  next?: ReactNode;
  disabled?: boolean;
  nextRoute?: string;
  onNext?: () => any;
}
export function BottomNav({
  next,
  disabled,
  nextRoute,
  onNext,
}: BottomNavProps) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Group
      sx={{ position: 'absolute', bottom: '0px', left: '0px', width: '100%' }}
      p="md"
      position="right"
    >
      <Button
        disabled={disabled}
        variant="outline"
        leftIcon={<IconChevronLeft />}
        onClick={handleBack}
      >
        Back
      </Button>
      {next || (
        <Button
          rightIcon={<IconChevronRight />}
          onClick={() => onNext || navigate(nextRoute)}
        >
          Next
        </Button>
      )}
    </Group>
  );
}

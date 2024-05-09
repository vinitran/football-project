import { Box, CircularProgress } from '@mui/material';

type Props = {
  color?: string;
  children?: any;
};

export const Loading = (props: Props) => {
  return (
    <Box sx={{}}>
      <CircularProgress style={{ color: `${props.color ?? 'var(--color-three)'}` }} />
    </Box>
  );
};

import { Box, CircularProgress } from '@mui/material';

type Props = {
  color?: string;
  children?: any;
};

export const NoData = (props: Props) => {
  return <div>Không có dữ liệu</div>;
};

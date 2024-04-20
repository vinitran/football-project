import { RouteObject } from 'react-router-dom';

export type Route = RouteObject & {
  isHideOnNavBar?: boolean;
  navName?: string;
};

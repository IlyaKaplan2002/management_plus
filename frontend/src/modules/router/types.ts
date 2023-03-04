import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface RouteItem {
  name: string;
  path: string;
  element: () => JSX.Element;
  isProtected: boolean;
  isRestricted: boolean;
  redirect: string;
  icon?: OverridableComponent<
    SvgIconTypeMap<Record<string, unknown>, 'svg'>
  > & {
    muiName: string;
  };
}

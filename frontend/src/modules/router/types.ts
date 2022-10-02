export interface RouteItem {
  name: string;
  path: string;
  element: () => JSX.Element;
  isProtected: boolean;
  isRestricted: boolean;
  redirect: string;
}

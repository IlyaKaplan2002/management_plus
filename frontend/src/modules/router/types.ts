export interface RouteItem {
  name: string;
  path: string;
  element: () => JSX.Element;
  isProtected: boolean;
  redirect: string;
}

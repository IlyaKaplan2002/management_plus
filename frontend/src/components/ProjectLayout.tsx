import { ReactNode } from 'react';
import DefaultLayout from './DefaultLayout';

interface ProjectLayoutProps {
  project?: { name: string; id: string };
  children: ReactNode;
}

const ProjectLayout = ({ project, children }: ProjectLayoutProps) => {
  return (
    <DefaultLayout showDrawer project={project}>
      {children}
    </DefaultLayout>
  );
};

export default ProjectLayout;

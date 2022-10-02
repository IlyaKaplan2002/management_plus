import React from 'react';
import styled from 'styled-components';
import { Project } from 'store/projects/projects.type';
import ProjectsItem from './ProjectsItem';

interface ProjectsListProps {
  projects: { [key: string]: Project };
  setAddOpen: (value: boolean) => void;
}

const ProjectsList = ({ projects, setAddOpen }: ProjectsListProps) => (
  <ProjectsList.Container>
    <ProjectsItem add={setAddOpen} />
    {Object.keys(projects).map(key => (
      <ProjectsItem key={key} project={projects[key]} />
    ))}
  </ProjectsList.Container>
);

ProjectsList.Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

export default ProjectsList;

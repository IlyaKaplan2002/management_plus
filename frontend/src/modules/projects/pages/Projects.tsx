import DefaultLayout from 'components/DefaultLayout';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProjectsList from '../components/ProjectsList';
import ProjectsSelectors from 'store/projects/projects.selectors';
import AddProject from '../components/AddProject';

const Projects = () => {
  const [open, setOpen] = useState<boolean>(false);

  const projects = useSelector(ProjectsSelectors.getAll);

  return (
    <DefaultLayout>
      <ProjectsList projects={projects} setAddOpen={setOpen} />
      <AddProject open={open} setOpen={setOpen} />
    </DefaultLayout>
  );
};

export default Projects;

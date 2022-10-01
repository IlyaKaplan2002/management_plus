import DefaultLayout from 'components/DefaultLayout';
import React from 'react';
import { useSelector } from 'react-redux';
import ProjectsList from '../components/ProjectsList';
import ProjectsSelectors from 'store/projects/projects.selectors';

const Home = () => {
  const projects = useSelector(ProjectsSelectors.getAll);

  return (
    <DefaultLayout>
      <ProjectsList projects={projects} />
    </DefaultLayout>
  );
};

export default Home;

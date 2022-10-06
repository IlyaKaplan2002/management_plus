import DefaultLayout from 'components/DefaultLayout';
import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectChart from '../components/ProjectChart';

const ProjectDashboard = () => {
  const { id: projectId } = useParams();

  return (
    <DefaultLayout>
      <ProjectChart />
    </DefaultLayout>
  );
};

export default ProjectDashboard;

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Project = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/projects/${projectId}/dashboard`);
  }, [navigate]);

  return <></>;
};

export default Project;

import DefaultLayout from 'components/DefaultLayout';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import ProjectsList from '../components/ProjectsList';
import ProjectsSelectors from 'store/projects/projects.selectors';
import AddProject from '../components/AddProject';
import { useAppDispatch } from 'store';
import ProjectsActions from 'store/projects/projects.actions';

const Projects = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const dispatch = useAppDispatch();

  const projects = useSelector(ProjectsSelectors.getAll);

  const setAddProjectOpen = useCallback((value: boolean) => {
    if (!value) {
      dispatch(ProjectsActions.resetCurrentlyCreating());
      setStep(1);
    }
    setOpen(value);
  }, []);

  return (
    <DefaultLayout>
      <ProjectsList projects={projects} setAddOpen={setAddProjectOpen} />
      <AddProject
        open={open}
        setOpen={setAddProjectOpen}
        step={step}
        setStep={setStep}
      />
    </DefaultLayout>
  );
};

export default Projects;

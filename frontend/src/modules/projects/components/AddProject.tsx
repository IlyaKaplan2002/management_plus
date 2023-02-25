import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { IconButton, Slide, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import FirstStep from '../forms/steps/FirstStep';
import { useAppDispatch } from 'store/index';
import { projectsActions, projectsSelectors } from 'store/projects';
import { ProjectCreate } from 'store/projects/projects.types';
import ErrorAlert from 'components/ErrorAlert';
import { useSelector } from 'react-redux';
import SecondStep from '../forms/steps/SecondStep';
import { ProductCreate } from 'store/products/products.types';
import { productsActions, productsSelectors } from 'store/products';

interface AddProjectProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  step: number;
  setStep: (value: number) => void;
}

const AddProject = ({ open, setOpen, step, setStep }: AddProjectProps) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const createProjectError = useSelector(projectsSelectors.getError);
  const currentlyCreatingProject = useSelector(
    projectsSelectors.getCurrentlyCreating,
  );

  const createProductsError = useSelector(productsSelectors.getError);

  const onProjectCreate = useCallback(
    async (createData: ProjectCreate) => {
      await dispatch(projectsActions.create(createData));
      setAlertOpen(true);
      setStep(2);
    },
    [dispatch, setStep],
  );

  const onProductsCreate = useCallback(
    async (createData: ProductCreate[]) => {
      if (!currentlyCreatingProject) return;

      await dispatch(
        productsActions.createMany({
          projectId: currentlyCreatingProject,
          products: createData,
        }),
      );
      setOpen(false);
    },
    [currentlyCreatingProject, dispatch, setOpen],
  );

  return (
    <>
      <AddProject.Container
        direction="left"
        in={open}
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        <AddProject.Wrapper>
          <AddProject.TopWrapper>
            <IconButton onClick={() => setOpen(false)}>
              <Close color="action" />
            </IconButton>
            <AddProject.Steps variant="subtitle1">
              Create project (Step {step} of 1)
            </AddProject.Steps>
          </AddProject.TopWrapper>

          <AddProject.BottomWrapper>
            {step === 1 && <FirstStep onCreate={onProjectCreate} />}
            {step === 2 && <SecondStep onCreate={onProductsCreate} />}
          </AddProject.BottomWrapper>
        </AddProject.Wrapper>
      </AddProject.Container>
      <ErrorAlert
        open={alertOpen}
        error={createProjectError || createProductsError}
        setOpen={setAlertOpen}
      />
    </>
  );
};

AddProject.Container = styled(Slide)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1101;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
`;

AddProject.Wrapper = styled.div`
  background: #ffffff;
`;

AddProject.TopWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 70px;
  padding-top: 100px;
`;

AddProject.Steps = styled(Typography)`
  font-size: 20px;
  margin-left: 20px;
  color: rgba(0, 0, 0, 0.54);
`;

AddProject.BottomWrapper = styled.div`
  padding-top: 40px;
  padding-left: 130px;
`;

export default AddProject;

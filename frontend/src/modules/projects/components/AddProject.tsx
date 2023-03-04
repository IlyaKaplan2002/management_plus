import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { IconButton, Slide, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import FirstStep from './steps/FirstStep';
import { useAppDispatch } from 'store/index';
import { projectsActions, projectsSelectors } from 'store/projects';
import { ProjectCreate } from 'store/projects/projects.types';
import ErrorAlert from 'components/ErrorAlert';
import { useSelector } from 'react-redux';
import SecondStep from './steps/SecondStep';
import { ProductCreate } from 'store/products/products.types';
import { productsActions, productsSelectors } from 'store/products';
import ThirdStep from './steps/ThirdStep';
import { CostsCategoryCreate } from 'store/costsCategories/costsCategories.types';
import {
  costsCategoriesActions,
  costsCategoriesSelectors,
} from 'store/costsCategories';
import { useNavigate } from 'react-router-dom';

interface AddProjectProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  step: number;
  setStep: (value: number) => void;
}

const AddProject = ({ open, setOpen, step, setStep }: AddProjectProps) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const createProjectError = useSelector(projectsSelectors.getError);
  const currentlyCreatingProject = useSelector(
    projectsSelectors.getCurrentlyCreating,
  );

  const createProductsError = useSelector(productsSelectors.getError);

  const createCostsCategoriesError = useSelector(
    costsCategoriesSelectors.getError,
  );

  const onProjectCreate = useCallback(
    async (createData: ProjectCreate) => {
      await dispatch(projectsActions.create(createData));
      setAlertOpen(true);
      setStep(2);
    },
    [dispatch, setStep],
  );

  const onProductSpend = useCallback(() => setStep(3), []);

  const onProductsCreate = useCallback(
    async (createData: ProductCreate[]) => {
      if (!currentlyCreatingProject) return;

      await dispatch(
        productsActions.createMany({
          projectId: currentlyCreatingProject,
          products: createData,
        }),
      );
      setStep(3);
    },
    [currentlyCreatingProject, dispatch, setOpen],
  );

  const onCostsCategorySpend = useCallback(() => {
    if (!currentlyCreatingProject) {
      navigate(`/projects`);
      setError('Failed');
      return;
    }

    navigate(`/projects/${currentlyCreatingProject}`);
    setOpen(false);
  }, [navigate]);

  const onCostsCategoriesCreate = useCallback(
    async (createData: CostsCategoryCreate[]) => {
      if (!currentlyCreatingProject) {
        navigate(`/projects`);
        setError('Failed');
        return;
      }

      await dispatch(
        costsCategoriesActions.createMany({
          projectId: currentlyCreatingProject,
          costsCategories: createData,
        }),
      );
      navigate(`/projects/${currentlyCreatingProject}`);
      setOpen(false);
    },
    [currentlyCreatingProject, setOpen, dispatch, navigate],
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
              Create {step === 1 && 'project'}
              {step === 2 && 'products'}
              {step === 3 && 'costs categories'}(Step {step} of 3)
            </AddProject.Steps>
          </AddProject.TopWrapper>

          <AddProject.BottomWrapper>
            {step === 1 && <FirstStep onCreate={onProjectCreate} />}
            {step === 2 && (
              <SecondStep
                onCreate={onProductsCreate}
                onSpendClick={onProductSpend}
              />
            )}
            {step === 3 && (
              <ThirdStep
                onCreate={onCostsCategoriesCreate}
                onSpendClick={onCostsCategorySpend}
              />
            )}
          </AddProject.BottomWrapper>
        </AddProject.Wrapper>
      </AddProject.Container>
      <ErrorAlert
        open={alertOpen}
        error={
          createProjectError ||
          createProductsError ||
          createCostsCategoriesError ||
          error
        }
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

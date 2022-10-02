import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { IconButton, Slide, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import FirstStep from './steps/FirstStep';
import { useAppDispatch } from '../../../store/index';
import ProjectsActions from '../../../store/projects/projects.actions';
import { ProjectCreate } from '../../../store/projects/projects.type';
import ErrorAlert from 'components/ErrorAlert';
import { useSelector } from 'react-redux';
import ProjectsSelectors from '../../../store/projects/projects.selectors';

interface AddProjectProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const AddProject = ({ open, setOpen }: AddProjectProps) => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<ProjectCreate>({
    name: '',
    description: '',
  });
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const createError = useSelector(ProjectsSelectors.getError);

  const onCreate = useCallback(
    async (createData: ProjectCreate) => {
      await dispatch(ProjectsActions.create(createData));
      setAlertOpen(true);
      setOpen(false);
      setStep(1);
    },
    [dispatch],
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
              Create project (Step {step} of 3)
            </AddProject.Steps>
          </AddProject.TopWrapper>

          <AddProject.BottomWrapper>
            {step === 1 && (
              <FirstStep
                setStep={setStep}
                data={data}
                setData={setData}
                onCreate={onCreate}
              />
            )}
          </AddProject.BottomWrapper>
        </AddProject.Wrapper>
      </AddProject.Container>
      <ErrorAlert open={alertOpen} error={createError} setOpen={setAlertOpen} />
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

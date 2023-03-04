import { DeleteForever } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import ConfirmDialog from 'components/ConfirmDialog';
import ProjectLayout from 'components/ProjectLayout';
import AddCostsCategory, {
  CostsCategoryFormData,
} from 'modules/costsCategories/forms/AddCostsCategory';
import AddProject from 'modules/projects/forms/AddProject';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import {
  costsCategoriesActions,
  costsCategoriesSelectors,
} from 'store/costsCategories';
import { projectsActions, projectsSelectors } from 'store/projects';
import { ProjectCreate } from 'store/projects/projects.types';
import styled from 'styled-components';
import { FormikHelpers } from 'formik';
import CostsCategoriesList from 'modules/costsCategories/components/CostsCategoriesList';

const SettingsPage = () => {
  const { id: projectId } = useParams();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const project = useSelector(projectsSelectors.getById(projectId || ''));

  const costsCategories = useSelector(
    costsCategoriesSelectors.getByProjectId(projectId || ''),
  );

  const onProjectDelete = useCallback(async () => {
    if (!projectId) return;
    await dispatch(projectsActions.delete(projectId));
  }, [dispatch, projectId]);

  const onProjectEdit = useCallback(
    async (data: ProjectCreate) => {
      if (!projectId) return;

      await dispatch(projectsActions.update({ projectId, projectData: data }));
    },
    [dispatch, projectId],
  );

  const onAddCostsCategory = useCallback(
    async (
      data: CostsCategoryFormData,
      helpers: FormikHelpers<CostsCategoryFormData>,
    ) => {
      if (!projectId) return;

      await dispatch(
        costsCategoriesActions.create({ projectId, costsCategory: data }),
      );

      helpers.resetForm();
    },
    [],
  );

  const onCostsCategoryDelete = useCallback(async (costsCategoryId: string) => {
    if (!projectId) return;
    await dispatch(
      costsCategoriesActions.delete({ projectId, costsCategoryId }),
    );
  }, []);

  return (
    <ProjectLayout>
      <Typography variant="h4" marginBottom="30px">
        Settings
      </Typography>

      <Box marginBottom="30px">
        <Typography variant="h6" marginBottom="20px">
          Edit project info
        </Typography>

        <AddProject
          onSubmit={onProjectEdit}
          initialValues={{
            name: project?.name || '',
            description: project?.description || '',
          }}
        />
      </Box>

      <Box marginBottom="30px">
        <Typography variant="h6" marginBottom="20px">
          Edit costs categories
        </Typography>

        <AddCostsCategory onSubmit={onAddCostsCategory} />

        <CostsCategoriesList
          costsCategories={Object.values(costsCategories)}
          onDelete={onCostsCategoryDelete}
        />
      </Box>

      <Box marginBottom="30px">
        <Typography variant="h6" marginBottom="20px">
          Danger zone
        </Typography>

        <SettingsPage.DeleteButton onClick={() => setDialogOpen(true)}>
          <DeleteForever sx={{ marginRight: '5px' }} />
          <p>Delete project {project?.name}</p>
        </SettingsPage.DeleteButton>
      </Box>

      <ConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={onProjectDelete}
        title={`Delete project ${project?.name}`}
        content={`Are you sure to delete project ${project?.name}?`}
        confirmText={
          <SettingsPage.DeleteDiv>
            <DeleteForever />
            <p>Delete project {project?.name}</p>
          </SettingsPage.DeleteDiv>
        }
      />
    </ProjectLayout>
  );
};

SettingsPage.DeleteButton = styled(Button)`
  color: red;
  display: flex;
  align-items: flex-end;
`;

SettingsPage.DeleteDiv = styled.div`
  color: red;
  display: flex;
  align-items: flex-end;
`;

export default SettingsPage;

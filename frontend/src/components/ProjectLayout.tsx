import { ReactNode, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { costsCategoriesActions } from 'store/costsCategories';
import { productsActions } from 'store/products';
import DefaultLayout from './DefaultLayout';

interface ProjectLayoutProps {
  project?: { name: string; id: string };
  children: ReactNode;
}

const ProjectLayout = ({ project, children }: ProjectLayoutProps) => {
  const { id: projectId } = useParams();

  const dispatch = useAppDispatch();

  const fetchProducts = useCallback(async () => {
    if (!projectId) return;
    await dispatch(productsActions.get(projectId));
  }, [dispatch, projectId]);

  const fetchCostsCategories = useCallback(async () => {
    if (!projectId) return;
    await dispatch(costsCategoriesActions.get(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    fetchProducts();
    fetchCostsCategories();
  }, [fetchProducts, fetchCostsCategories]);

  return (
    <DefaultLayout showDrawer project={project}>
      {children}
    </DefaultLayout>
  );
};

export default ProjectLayout;

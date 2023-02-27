import { ReactNode, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { costsCategoriesActions } from 'store/costsCategories';
import { incomeStatisticsActions } from 'store/incomeStatistics';
import { manufacturedQuantityStatisticsActions } from 'store/manufacturedQuantityStatistics';
import { normativePriceActions } from 'store/normativePrice';
import { periodsActions } from 'store/periods';
import { plannedSellQuantityActions } from 'store/plannedSellQuantity';
import { productsActions } from 'store/products';
import { projectsSelectors } from 'store/projects';
import DefaultLayout from './DefaultLayout';

interface ProjectLayoutProps {
  children: ReactNode;
}

const ProjectLayout = ({ children }: ProjectLayoutProps) => {
  const { id: projectId } = useParams();

  const dispatch = useAppDispatch();

  const projects = useSelector(projectsSelectors.getAll);
  const project = useSelector(projectsSelectors.getById(projectId || ''));
  const projectsFetched = useSelector(projectsSelectors.getFetched);

  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    if (!projectId) return;
    await dispatch(productsActions.get(projectId));
  }, [dispatch, projectId]);

  const fetchCostsCategories = useCallback(async () => {
    if (!projectId) return;
    await dispatch(costsCategoriesActions.get(projectId));
  }, [dispatch, projectId]);

  const fetchPeriods = useCallback(async () => {
    if (!projectId) return;
    await dispatch(periodsActions.get(projectId));
  }, [projectId, dispatch]);

  const fetchNormativePrices = useCallback(async () => {
    if (!projectId) return;
    await dispatch(normativePriceActions.getByProjectId({ projectId }));
  }, [projectId, dispatch]);

  const fetchPlannedSellQuantities = useCallback(async () => {
    if (!projectId) return;
    await dispatch(plannedSellQuantityActions.getByProjectId({ projectId }));
  }, [projectId, dispatch]);

  const fetchIncomeStatistics = useCallback(async () => {
    if (!projectId) return;
    dispatch(incomeStatisticsActions.getByProjectId({ projectId }));
  }, [dispatch, projectId]);

  const fetchManufacturedQuantityStatistics = useCallback(async () => {
    if (!projectId) return;
    dispatch(
      manufacturedQuantityStatisticsActions.getByProjectId({ projectId }),
    );
  }, [dispatch, projectId]);

  useEffect(() => {
    fetchProducts();
    fetchCostsCategories();
    fetchPeriods();
    fetchNormativePrices();
    fetchPlannedSellQuantities();
    fetchIncomeStatistics();
    fetchManufacturedQuantityStatistics();
  }, [
    fetchProducts,
    fetchCostsCategories,
    fetchPeriods,
    fetchNormativePrices,
    fetchPlannedSellQuantities,
    fetchIncomeStatistics,
    fetchManufacturedQuantityStatistics,
  ]);

  useEffect(() => {
    if (!projectId) return;
    if (projectsFetched && !Object.keys(projects).includes(projectId))
      navigate('/');
  }, [projects, navigate, projectId, projectsFetched]);

  return (
    <DefaultLayout showDrawer project={project}>
      {children}
    </DefaultLayout>
  );
};

export default ProjectLayout;

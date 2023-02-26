import { Typography } from '@mui/material';
import ProjectLayout from 'components/ProjectLayout';
import { FormikHelpers } from 'formik';
import { ProductData } from 'modules/projects/components/steps/SecondStep';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { productsActions, productsSelectors } from 'store/products';
import { Product } from 'store/products/products.types';
import { projectsSelectors } from 'store/projects';
import ProductsTable from '../components/ProductsTable';
import AddProduct from '../forms/AddProduct';
import { ProductFormData } from '../forms/AddProduct';

const ProductsPage = () => {
  const { id: projectId } = useParams();

  const dispatch = useAppDispatch();

  const projects = useSelector(projectsSelectors.getAll);
  const project = useSelector(projectsSelectors.getById(projectId || ''));
  const projectsFetched = useSelector(projectsSelectors.getFetched);

  const products = useSelector(
    productsSelectors.getByProjectId(projectId || ''),
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!projectId) return;
    if (projectsFetched && !Object.keys(projects).includes(projectId))
      navigate('/');
  }, [projects, navigate, projectId, projectsFetched]);

  const addProduct = useCallback(
    async (
      product: ProductFormData,
      helpers: FormikHelpers<ProductFormData>,
    ) => {
      if (!projectId) return;
      await dispatch(
        productsActions.create({
          projectId,
          product: {
            name: product.name,
            price: Number(product.price),
            cost: Number(product.cost),
          },
        }),
      );
      helpers.resetForm();
    },
    [projectId, dispatch],
  );

  const onEdit = useCallback(
    async (productData: Product | ProductData) => {
      if (!projectId) return;
      await dispatch(
        productsActions.update({
          projectId,
          productId: productData.id,
          product: {
            name: productData.name,
            cost: productData.cost,
            price: productData.price,
          },
        }),
      );
    },
    [dispatch],
  );

  const onDelete = useCallback(async (productId: string) => {
    if (!projectId) return;
    await dispatch(productsActions.delete({ projectId, productId }));
  }, []);

  return (
    <ProjectLayout
      project={{ name: project?.name || '', id: project?.id || '' }}
    >
      <Typography variant="h4" marginBottom="30px">
        Products
      </Typography>

      <AddProduct onSubmit={addProduct} />

      <ProductsTable
        products={Object.values(products)}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </ProjectLayout>
  );
};

export default ProductsPage;

import { Button } from '@mui/material';
import { FormikHelpers } from 'formik';
import { useCallback, useState } from 'react';
import { ProductCreate } from 'store/products/products.types';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import ProductsTable from 'modules/products/components/ProductsTable';
import AddProduct, { ProductFormData } from 'modules/products/forms/AddProduct';

export interface ProductData {
  id: string;
  name: string;
  price: number;
  cost: number;
}

export const initialValues = {
  name: '',
  price: '',
  cost: '',
};

interface SecondStepProps {
  onCreate: (value: ProductCreate[]) => void;
  onSpendClick: () => void;
}

const SecondStep = ({ onCreate, onSpendClick }: SecondStepProps) => {
  const [data, setData] = useState<ProductData[]>([]);

  const onSubmit = useCallback(
    (
      { name, price, cost }: ProductFormData,
      helpers: FormikHelpers<ProductFormData>,
    ) => {
      setData(prev => [
        ...prev,
        { id: uuid(), name, price: Number(price), cost: Number(cost) },
      ]);
      helpers.resetForm();
    },
    [],
  );

  const onDelete = useCallback((id: string) => {
    setData(prev => [...prev.filter(item => item.id !== id)]);
  }, []);

  const onEdit = useCallback((data: ProductData) => {
    setData(prev =>
      prev.map(item => {
        if (item.id === data.id) {
          return { ...data };
        }
        return item;
      }),
    );
  }, []);

  const onNextClick = useCallback(() => {
    onCreate(
      data.map(item => ({
        name: item.name,
        price: item.price,
        cost: item.cost,
      })),
    );
  }, [data, onCreate]);

  return (
    <SecondStep.Wrapper>
      <AddProduct onSubmit={onSubmit} />

      <ProductsTable products={data} onDelete={onDelete} onEdit={onEdit} />

      <SecondStep.ButtonsWrapper>
        <Button
          type="button"
          className="button buttonSpend"
          onClick={onSpendClick}
        >
          Spend
        </Button>
        <Button
          type="button"
          className="button"
          onClick={onNextClick}
          disabled={data.length === 0}
        >
          Next
        </Button>
      </SecondStep.ButtonsWrapper>
    </SecondStep.Wrapper>
  );
};

SecondStep.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 130px;
`;

SecondStep.ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .buttonSpend {
    color: grey;
  }

  .button {
    height: 37px;
  }
`;

export default SecondStep;

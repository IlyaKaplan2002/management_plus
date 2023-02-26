import { Button } from '@mui/material';
import { FormikHelpers } from 'formik';
import CostsCategoriesList from 'modules/costsCategories/components/CostsCategoriesList';
import AddCostsCategory, {
  CostsCategoryFormData,
} from 'modules/costsCategories/forms/AddCostsCategory';
import { useCallback, useState } from 'react';
import { CostsCategoryCreate } from 'store/costsCategories/costsCategories.types';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

export interface CostsCategoryData {
  id: string;
  name: string;
}

interface ThirdStepProps {
  onCreate: (data: CostsCategoryCreate[]) => void;
  onSpendClick: () => void;
}

const ThirdStep = ({ onCreate, onSpendClick }: ThirdStepProps) => {
  const [data, setData] = useState<CostsCategoryData[]>([]);

  const onSubmit = useCallback(
    (
      { name }: CostsCategoryFormData,
      helpers: FormikHelpers<CostsCategoryFormData>,
    ) => {
      setData(prev => [...prev, { id: uuid(), name }]);
      helpers.resetForm();
    },
    [],
  );

  const onDelete = useCallback((id: string) => {
    setData(prev => [...prev.filter(item => item.id !== id)]);
  }, []);

  const onCreateClick = useCallback(() => {
    onCreate(data.map(item => ({ name: item.name })));
  }, [data, onCreate]);

  return (
    <ThirdStep.Wrapper>
      <AddCostsCategory onSubmit={onSubmit} />

      <CostsCategoriesList costsCategories={data} onDelete={onDelete} />

      <ThirdStep.ButtonsWrapper>
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
          onClick={onCreateClick}
          disabled={data.length === 0}
        >
          Create
        </Button>
      </ThirdStep.ButtonsWrapper>
    </ThirdStep.Wrapper>
  );
};

ThirdStep.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 130px;
`;

ThirdStep.ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .buttonSpend {
    color: grey;
  }

  .button {
    height: 37px;
  }
`;

export default ThirdStep;

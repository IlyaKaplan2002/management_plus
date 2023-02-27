import { CostsCategoryData } from 'modules/projects/components/steps/ThirdStep';
import styled from 'styled-components';
import CostsCategoriesItem from './CostsCategoriesItem';

interface CostsCategoriesListProps {
  costsCategories: CostsCategoryData[];
  onDelete: (id: string) => void;
}

const CostsCategoriesList = ({
  costsCategories,
  onDelete,
}: CostsCategoriesListProps) => {
  return (
    <CostsCategoriesList.Wrapper>
      {costsCategories.map(item => (
        <CostsCategoriesItem
          key={item.id}
          costsCategory={item}
          onDelete={onDelete}
        />
      ))}
    </CostsCategoriesList.Wrapper>
  );
};

CostsCategoriesList.Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

export default CostsCategoriesList;

import { Delete } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { CostsCategoryData } from 'modules/projects/components/steps/ThirdStep';
import styled from 'styled-components';

interface CostsCategoriesItemProps {
  costsCategory: CostsCategoryData;
  onDelete: (id: string) => void;
}

const CostsCategoriesItem = ({
  costsCategory,
  onDelete,
}: CostsCategoriesItemProps) => {
  return (
    <CostsCategoriesItem.Wrapper>
      <IconButton
        sx={{ marginRight: '5px' }}
        onClick={() => onDelete(costsCategory.id)}
      >
        <Delete />
      </IconButton>
      <Typography>{costsCategory.name}</Typography>
    </CostsCategoriesItem.Wrapper>
  );
};

CostsCategoriesItem.Wrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 5px 20px 5px 10px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  border-radius: 15px;
  margin-bottom: 10px;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export default CostsCategoriesItem;

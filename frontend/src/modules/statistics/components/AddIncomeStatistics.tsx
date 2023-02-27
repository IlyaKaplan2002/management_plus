import { Close } from '@mui/icons-material';
import {
  Button,
  IconButton,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { incomeStatisticsActions } from 'store/incomeStatistics';
import {
  IncomeStatisticsCreate,
  IncomeStatisticsData,
} from 'store/incomeStatistics/incomeStatistics.types';
import { periodsSelectors } from 'store/periods';
import { productsSelectors } from 'store/products';
import styled from 'styled-components';
import AddIncomeStatisticsRaw from './AddIncomeStatisticsRaw';

interface AddIncomeStatisticsProps {
  open: boolean;
  onClose: () => void;
}

const AddIncomeStatistics = ({ open, onClose }: AddIncomeStatisticsProps) => {
  const { id: projectId } = useParams();

  const [data, setData] = useState<IncomeStatisticsData[]>([]);

  const dispatch = useAppDispatch();

  const currentPeriod = useSelector(
    periodsSelectors.getCurrentPeriod(projectId || ''),
  );

  const products = useSelector(
    productsSelectors.getByProjectId(projectId || ''),
  );

  const reset = useCallback(() => {
    const newData: IncomeStatisticsData[] = Object.values(products).map(
      item => ({
        id: item.id,
        price: item.price,
        creationDate: new Date(),
        quantity: 0,
        productId: item.id,
      }),
    );

    setData(newData);
  }, [products]);

  useEffect(() => {
    if (data.length !== 0) return;
    reset();
  }, [reset, data]);

  const onEdit = useCallback((data: IncomeStatisticsData) => {
    setData(prev =>
      prev.map(item => {
        if (item.id === data.id) {
          return { ...data };
        }
        return item;
      }),
    );
  }, []);

  const onSave = useCallback(async () => {
    if (!currentPeriod || !currentPeriod.id || !projectId) return;

    const insertItems: IncomeStatisticsCreate[] = data.map(item => ({
      creationDate: item.creationDate,
      price: item.price,
      quantity: item.quantity,
      productId: item.productId,
    }));

    await dispatch(
      incomeStatisticsActions.createMany({
        projectId,
        periodId: currentPeriod.id,
        incomeStatistics: insertItems,
      }),
    );

    reset();

    onClose();
  }, [dispatch, data, currentPeriod, projectId, onClose, reset]);

  return (
    <AddIncomeStatistics.Container
      direction="left"
      in={open}
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      <AddIncomeStatistics.Wrapper>
        <AddIncomeStatistics.TopWrapper>
          <IconButton onClick={onClose}>
            <Close color="action" />
          </IconButton>
          <AddIncomeStatistics.Steps variant="subtitle1">
            Add sales statistics
          </AddIncomeStatistics.Steps>
        </AddIncomeStatistics.TopWrapper>

        <AddIncomeStatistics.BottomWrapper>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Product name</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Total price</TableCell>
                  <TableCell align="left" sx={{ width: 20 }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(item => {
                  return (
                    <AddIncomeStatisticsRaw
                      key={item.id}
                      data={item}
                      product={products[item.productId]}
                      onEdit={onEdit}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            sx={{ display: 'block', marginLeft: 'auto', marginTop: '20px' }}
            onClick={onSave}
          >
            Save
          </Button>
        </AddIncomeStatistics.BottomWrapper>
      </AddIncomeStatistics.Wrapper>
    </AddIncomeStatistics.Container>
  );
};

AddIncomeStatistics.Container = styled(Slide)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1101;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
`;

AddIncomeStatistics.Wrapper = styled.div`
  background: #ffffff;
`;

AddIncomeStatistics.TopWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 270px;
  padding-top: 100px;
`;

AddIncomeStatistics.Steps = styled(Typography)`
  font-size: 20px;
  margin-left: 20px;
  color: rgba(0, 0, 0, 0.54);
`;

AddIncomeStatistics.BottomWrapper = styled.div`
  padding-top: 40px;
  padding-left: 270px;
  padding-right: 70px;
`;

export default AddIncomeStatistics;

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
import { ManufacturedQuantityStatisticsData } from 'store/manufacturedQuantityStatistics/manufacturedQuantityStatistics.types';
import { periodsSelectors } from 'store/periods';
import { productsSelectors } from 'store/products';
import styled from 'styled-components';
import AddManufacturedStatisticsRaw from './AddManufacturedStatisticsRaw';
import { ManufacturedQuantityStatisticsCreate } from '../../../store/manufacturedQuantityStatistics/manufacturedQuantityStatistics.types';
import { manufacturedQuantityStatisticsActions } from 'store/manufacturedQuantityStatistics';

interface AddManufacturedStatisticsProps {
  open: boolean;
  onClose: () => void;
}

const AddManufacturedStatistics = ({
  open,
  onClose,
}: AddManufacturedStatisticsProps) => {
  const { id: projectId } = useParams();

  const [data, setData] = useState<ManufacturedQuantityStatisticsData[]>([]);

  const dispatch = useAppDispatch();

  const currentPeriod = useSelector(
    periodsSelectors.getCurrentPeriod(projectId || ''),
  );

  const products = useSelector(
    productsSelectors.getByProjectId(projectId || ''),
  );

  useEffect(() => {
    if (data.length !== 0) return;
    const newData: ManufacturedQuantityStatisticsData[] = Object.values(
      products,
    ).map(item => ({
      id: item.id,
      cost: item.cost,
      creationDate: new Date(),
      quantity: 0,
      productId: item.id,
    }));

    setData(newData);
  }, [products]);

  const onEdit = useCallback((data: ManufacturedQuantityStatisticsData) => {
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

    const insertItems: ManufacturedQuantityStatisticsCreate[] = data.map(
      item => ({
        creationDate: item.creationDate,
        cost: item.cost,
        quantity: item.quantity,
        productId: item.productId,
      }),
    );

    await dispatch(
      manufacturedQuantityStatisticsActions.createMany({
        projectId,
        periodId: currentPeriod.id,
        manufacturedQuantityStatistics: insertItems,
      }),
    );

    onClose();
  }, [dispatch, data, currentPeriod, projectId, onClose]);

  return (
    <AddManufacturedStatistics.Container
      direction="left"
      in={open}
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      <AddManufacturedStatistics.Wrapper>
        <AddManufacturedStatistics.TopWrapper>
          <IconButton onClick={onClose}>
            <Close color="action" />
          </IconButton>
          <AddManufacturedStatistics.Steps variant="subtitle1">
            Add production statistics
          </AddManufacturedStatistics.Steps>
        </AddManufacturedStatistics.TopWrapper>

        <AddManufacturedStatistics.BottomWrapper>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Product name</TableCell>
                  <TableCell align="left">Cost</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Total cost</TableCell>
                  <TableCell align="left" sx={{ width: 20 }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(item => {
                  return (
                    <AddManufacturedStatisticsRaw
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
        </AddManufacturedStatistics.BottomWrapper>
      </AddManufacturedStatistics.Wrapper>
    </AddManufacturedStatistics.Container>
  );
};

AddManufacturedStatistics.Container = styled(Slide)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1101;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
`;

AddManufacturedStatistics.Wrapper = styled.div`
  background: #ffffff;
`;

AddManufacturedStatistics.TopWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 270px;
  padding-top: 100px;
`;

AddManufacturedStatistics.Steps = styled(Typography)`
  font-size: 20px;
  margin-left: 20px;
  color: rgba(0, 0, 0, 0.54);
`;

AddManufacturedStatistics.BottomWrapper = styled.div`
  padding-top: 40px;
  padding-left: 270px;
  padding-right: 70px;
`;

export default AddManufacturedStatistics;

import { Close } from '@mui/icons-material';
import {
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
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { periodsSelectors } from 'store/periods';
import { productsSelectors } from 'store/products';
import styled from 'styled-components';
import PeriodTableRaw from './PeriodTableRaw';

interface PeriodInfoProps {
  open: boolean;
  onClose: () => void;
  periodId: string;
  number: number;
}

const PeriodInfo = ({ open, periodId, onClose, number }: PeriodInfoProps) => {
  const { id: projectId } = useParams();

  const currentPeriod = useSelector(
    periodsSelectors.getCurrentPeriod(projectId || ''),
  );

  const period = useSelector(
    periodsSelectors.getById({ projectId: projectId || '', periodId }),
  );

  const products = useSelector(
    productsSelectors.getByProjectId(projectId || ''),
  );

  return (
    <PeriodInfo.Container
      direction="left"
      in={open}
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      <PeriodInfo.Wrapper>
        <PeriodInfo.TopWrapper>
          <IconButton onClick={onClose}>
            <Close color="action" />
          </IconButton>
          <PeriodInfo.Steps variant="subtitle1">
            <p>
              {number} period {period?.id === currentPeriod?.id && '(Current)'}
            </p>
            {period?.startDate &&
              dayjs(period.startDate).format('DD/MM/YYYY hh:mm:ss')}
            {period?.endDate &&
              ` - ${dayjs(period.endDate).format('DD/MM/YYYY hh:mm:ss')}`}
          </PeriodInfo.Steps>
        </PeriodInfo.TopWrapper>

        <PeriodInfo.BottomWrapper>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Product name</TableCell>
                  <TableCell align="left">Normative price</TableCell>
                  <TableCell align="left">Planned sales volume</TableCell>
                  <TableCell align="left" sx={{ width: 20 }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.values(products).map(product => {
                  return (
                    <PeriodTableRaw
                      key={product.id}
                      product={product}
                      periodId={periodId}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </PeriodInfo.BottomWrapper>
      </PeriodInfo.Wrapper>
    </PeriodInfo.Container>
  );
};

PeriodInfo.Container = styled(Slide)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1101;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
`;

PeriodInfo.Wrapper = styled.div`
  background: #ffffff;
`;

PeriodInfo.TopWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 270px;
  padding-top: 100px;
`;

PeriodInfo.Steps = styled(Typography)`
  font-size: 20px;
  margin-left: 20px;
  color: rgba(0, 0, 0, 0.54);
`;

PeriodInfo.BottomWrapper = styled.div`
  padding-top: 40px;
  padding-left: 270px;
  padding-right: 70px;
`;

export default PeriodInfo;

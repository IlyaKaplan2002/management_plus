import { Button, Typography } from '@mui/material';
import ProjectLayout from 'components/ProjectLayout';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { periodsActions, periodsSelectors } from 'store/periods';
import styled from 'styled-components';
import PeriodInfo from '../components/PeriodInfo';

const PeriodsPage = () => {
  const { id: projectId } = useParams();

  const [openedPeriod, setOpenedPeriod] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const currentPeriod = useSelector(
    periodsSelectors.getCurrentPeriod(projectId || ''),
  );

  const periods = useSelector(periodsSelectors.getByProjectId(projectId || ''));

  const onStartNewPeriod = useCallback(() => {
    if (!projectId) return;

    if (currentPeriod) {
      dispatch(
        periodsActions.update({
          projectId,
          period: { endDate: new Date() },
          periodId: currentPeriod.id,
        }),
      );
    }

    dispatch(
      periodsActions.create({ projectId, period: { startDate: new Date() } }),
    );
  }, [dispatch, projectId, currentPeriod]);

  const openedPeriodNumber = useMemo(
    () =>
      Object.values(periods).length -
      Object.keys(periods).indexOf(openedPeriod || ''),
    [periods, openedPeriod],
  );

  return (
    <ProjectLayout>
      <Typography variant="h4" marginBottom="30px">
        Reporting periods
      </Typography>
      <Button onClick={onStartNewPeriod} sx={{ marginBottom: '20px' }}>
        Start new period
      </Button>
      <PeriodsPage.List>
        {Boolean(periods) &&
          Object.values(periods).map((item, indx) => (
            <PeriodsPage.Item
              key={item.id}
              onClick={() => setOpenedPeriod(item.id)}
            >
              <p>
                {Object.values(periods).length - indx}{' '}
                {item.id === currentPeriod?.id && '(Current)'}
              </p>
              <p>
                Start date:{' '}
                {dayjs(item.startDate).format('DD/MM/YYYY hh:mm:ss')}
              </p>
              <p>
                {item.endDate &&
                  `End date: ${dayjs(item.endDate).format(
                    'DD/MM/YYYY hh:mm:ss',
                  )}`}
              </p>
            </PeriodsPage.Item>
          ))}
      </PeriodsPage.List>

      <PeriodInfo
        open={Boolean(openedPeriod)}
        onClose={() => setOpenedPeriod(null)}
        periodId={openedPeriod || ''}
        number={openedPeriodNumber}
      />
    </ProjectLayout>
  );
};

PeriodsPage.List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

PeriodsPage.Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 296px;
  height: 150px;
  padding: 20px 20px 12px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  border-radius: 8px;
  margin-bottom: 30px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 30px;
  }
`;

export default PeriodsPage;

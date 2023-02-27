import ErrorAlert from 'components/ErrorAlert';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from 'store';
import { statisticsActions, statisticsSelectors } from 'store/statistics';
import ProfitableChart from '../../projects/components/ProfitableChart';
import StatisticsChart from '../../projects/components/StatisticsChart';
import { IconButton, Typography } from '@mui/material';
import ProjectLayout from 'components/ProjectLayout';

const ProjectDashboard = () => {
  const { id: projectId } = useParams();

  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const statistics = useSelector(
    statisticsSelectors.getProjectStatistics(projectId || ''),
  );
  const profitableChartData = useSelector(
    statisticsSelectors.getProfitableChartData(projectId || ''),
  );
  const statisticsError = useSelector(statisticsSelectors.getError);

  const fetchStatistics = useCallback(async () => {
    if (!projectId || statistics) return;
    await dispatch(statisticsActions.get(projectId));
    setAlertOpen(true);
  }, [projectId, dispatch, statistics]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return (
    <ProjectLayout>
      <ProjectDashboard.Wrapper>
        <ProjectDashboard.LeftWrapper>
          <ProjectDashboard.ChartsWrapper>
            <ProfitableChart data={profitableChartData} />
            <StatisticsChart data={profitableChartData} />
          </ProjectDashboard.ChartsWrapper>
        </ProjectDashboard.LeftWrapper>
      </ProjectDashboard.Wrapper>

      <ErrorAlert
        open={alertOpen}
        error={statisticsError}
        setOpen={setAlertOpen}
      />
    </ProjectLayout>
  );
};

ProjectDashboard.Wrapper = styled.div`
  display: flex;
`;

ProjectDashboard.Title = styled(Typography)`
  margin-bottom: 20px;
  margin-left: 65px;
`;

ProjectDashboard.LeftWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-right: 40px;
  height: calc(100vh - 142px);
`;

ProjectDashboard.Button = styled(IconButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: -4px;
`;

ProjectDashboard.ChartsWrapper = styled.div`
  height: calc(100% - 52px);
  width: 100%;
`;

ProjectDashboard.RightWrapper = styled.div`
  width: 25%;
`;

export default ProjectDashboard;

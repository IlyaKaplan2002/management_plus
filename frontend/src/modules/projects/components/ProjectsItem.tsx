import React from 'react';
import styled from 'styled-components';
import { Project } from 'store/projects/projects.type';
import { Add, BarChart } from '@mui/icons-material';
import { Typography } from '@mui/material';

interface ProjectItemProps {
  project?: Project;
  add?: (value: boolean) => void;
}

const ProjectsItem = ({ project, add }: ProjectItemProps) => (
  <ProjectsItem.Container
    add={Boolean(add)}
    onClick={Boolean(add) && add ? () => add(true) : () => console.log('here')}
  >
    {Boolean(add) ? (
      <>
        <Add className="addIcon" />
        <Typography variant="subtitle2" className="addText">
          Add project
        </Typography>
      </>
    ) : (
      <>
        <div>
          <Typography variant="subtitle1">{project?.name}</Typography>
          <Typography variant="body2">{project?.description}</Typography>
        </div>

        <BarChart className="itemIcon" />
      </>
    )}
  </ProjectsItem.Container>
);

ProjectsItem.Container = styled.li<{ add?: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.add ? 'center' : 'flex-start')};
  justify-content: ${props => (props.add ? 'center' : 'space-between')};
  width: 296px;
  height: 208px;
  padding: 20px 20px 12px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  border-radius: 8px;

  &:not(:last-child) {
    margin-right: 30px;
  }

  .addIcon {
    margin-bottom: 10px;
    font-size: 30px;
    color: #1976d2;
  }

  .addText {
    color: #1976d2;
  }

  .itemIcon {
    font-size: 30px;
  }
`;

export default ProjectsItem;

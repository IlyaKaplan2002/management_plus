import { Box } from '@mui/material';
import styled from 'styled-components';

const getElasticLabel = value => {
  if (value > 1) return 'elastic';
  if (value < 1) return 'inelastic';
  return 'unit elasticity';
};

const ElasticityTooltip = props => (
  <ElasticityTooltip.Container>
    <p>{props.label}</p>
    {props.payload.map(item => (
      <p key={item.value}>
        {item.name} : {item.value} ({getElasticLabel(item.value)})
      </p>
    ))}
  </ElasticityTooltip.Container>
);

ElasticityTooltip.Container = styled(Box)`
  padding: 10px;
  background: white;
`;

export default ElasticityTooltip;

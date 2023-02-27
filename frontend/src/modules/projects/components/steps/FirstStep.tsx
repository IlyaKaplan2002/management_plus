import { useCallback } from 'react';
import { ProjectCreate } from 'store/projects/projects.types';

import AddProject from 'modules/projects/forms/AddProject';

interface FirstStepProps {
  onCreate: (value: ProjectCreate) => void;
}

const FirstStep = ({ onCreate }: FirstStepProps) => {
  const onSubmit = useCallback(
    (result: { name: string; description: string }) => {
      onCreate(result);
    },
    [onCreate],
  );

  return <AddProject onSubmit={onSubmit} submitButtonText="Next" />;
};

export default FirstStep;

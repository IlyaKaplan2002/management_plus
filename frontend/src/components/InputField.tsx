import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import styled from 'styled-components';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any, Element>) => void;
  touched: boolean;
  errorText?: string;
  width?: number;
  className?: string;
}

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  touched,
  errorText,
  width,
  className,
}: InputFieldProps) => {
  return (
    <InputField.Wrapper className={className} width={width}>
      <InputLabel>{label}</InputLabel>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={Boolean(errorText) && touched}
      />
      {Boolean(errorText) && touched && (
        <FormHelperText className="error">{errorText}</FormHelperText>
      )}
    </InputField.Wrapper>
  );
};

InputField.Wrapper = styled(FormControl)<{ width?: number }>`
  margin-bottom: 30px;
  width: ${props => (props.width ? props.width : 400)}px;

  .error {
    color: red;
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
  }
`;

export default InputField;

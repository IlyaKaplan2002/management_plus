import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import styled from 'styled-components';

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  onBlur: (e: React.FocusEvent<any, Element>) => void;
  touched: boolean;
  errorText?: string;
  width?: number;
  className?: string;
  options: { value: string; label: string }[];
}

const SelectField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  touched,
  errorText,
  width,
  className,
  options,
}: SelectFieldProps) => {
  return (
    <SelectField.Wrapper variant="standard" className={className} width={width}>
      <InputLabel id={name}>{label}</InputLabel>

      <Select
        labelId={name}
        id={name}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={Boolean(errorText) && touched}
      >
        {options.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>

      {Boolean(errorText) && touched && (
        <FormHelperText className="error">{errorText}</FormHelperText>
      )}
    </SelectField.Wrapper>
  );
};

SelectField.Wrapper = styled(FormControl)<{ width?: number }>`
  margin-bottom: 30px;
  width: ${props => (props.width ? props.width : 400)}px;
  position: relative;

  .error {
    color: red;
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
  }
`;

export default SelectField;

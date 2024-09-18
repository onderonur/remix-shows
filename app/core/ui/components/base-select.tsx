import type { SelectProps } from '@chakra-ui/react';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useId } from 'react';

type BaseSelectProps = Pick<
  SelectProps,
  'name' | 'value' | 'children' | 'onChange'
> & { label?: string };

export default function BaseSelect({
  label,
  children,
  ...rest
}: BaseSelectProps) {
  const id = useId();

  return (
    <FormControl variant="floating">
      <Select {...rest} id={id}>
        {children}
      </Select>
      {/* It is important that the Label comes after the Control due to css selectors */}
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
    </FormControl>
  );
}

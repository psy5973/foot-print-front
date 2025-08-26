import {
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import { ColumnType } from "./types/enum";
import type {
  CustomColumnProps,
  FormProps,
  InputColumnProps,
  RadioColumnProps,
  SelectColumnProps,
  FormColumnProps,
  CheckColumnProps,
} from "./types/formTypes";

const FPForm = <T extends Record<string, unknown>>({
  data,
  setData,
  columns,
}: FormProps<T>) => {
  const renderer = (item: FormColumnProps<T>) => {
    const { columnType } = item;

    if (columnType === ColumnType.CUSTOM) {
      // * custom Type
      return item?.renderComponent();
    } else {
      return (
        <FormColumn
          {...item}
          value={data[item.name] as unknown}
          onValueChange={(v: unknown) =>
            setData((prev) => ({ ...prev, [item.name]: v }))
          }
        />
      );
    }
  };

  return (
    <Grid container spacing={2} component="form">
      {columns.map((item) => (
        <Grid size={item?.size || { xs: 12 }}>{renderer(item)}</Grid>
      ))}
    </Grid>
  );
};

const FormColumn = <T extends Record<string, unknown>>({
  error = { isError: false, message: "" },
  columnType = ColumnType.INPUT,
  onValueChange,
  ...props
}: Exclude<FormColumnProps<T>, CustomColumnProps> & {}) => {
  const renderer = () => {
    switch (columnType) {
      case ColumnType.INPUT: {
        const p = { ...(props as InputColumnProps) };
        return (
          <TextField onChange={(e) => onValueChange(e.target.value)} {...p} />
        );
      }
      case ColumnType.CHECK: {
        const p = { ...(props as CheckColumnProps) };
        return (
          <Checkbox
            onChange={(e) => onValueChange(e.target.checked)}
            {...p}
          ></Checkbox>
        );
      }
      case ColumnType.RADIO: {
        const p = { ...(props as RadioColumnProps) };
        return <Radio {...p}></Radio>;
      }
      case ColumnType.SELECT: {
        const p = { ...(props as SelectColumnProps) };
        return <Select {...p}></Select>;
      }
    }
  };

  return (
    <FormControl className="w-100 mt-20" error={error?.isError}>
      {renderer()}
      {error?.isError && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  );
};

export default FPForm;

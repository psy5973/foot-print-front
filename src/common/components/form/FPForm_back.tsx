import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Radio,
  Select,
} from "@mui/material";
import { ColumnType } from "./types/enum";
import type { FormColumnProps, FormProps } from "./types/formTypes";

const Form = <T extends Record<string, unknown>>({
  data,
  setData,
  columns,
}: FormProps<T>) => {
  return (
    <Grid container spacing={2} component="form">
      {columns.map((item) => (
        <Grid size={item?.size || { xs: 12 }}>
          {item?.type === ColumnType.CUSTOM ? (
            item?.column
          ) : (
            <FormColumn
              label={item?.label || ""}
              type={item?.type}
              name={item?.name}
              value={data[item?.name]}
              onValueChange={(e) =>
                setData((prev) => ({ ...prev, [item.name]: e }))
              }
              error={item?.error}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

const FormColumn = <T extends Record<string, unknown>>({
  label = "",
  name,
  type = ColumnType.INPUT,
  // value,
  // onValueChange,
  error = { isError: false, message: "" },
  ...props
}: FormColumnProps<T>) => {
  return (
    <FormControl className="w-100 mt-20" error={error?.isError}>
      {type === ColumnType.CHECK ? (
        <BooleanTypeColumnn
          type={type}
          value={value as boolean}
          label={label}
          name={name}
          onValueChange={onValueChange}
        />
      ) : (
        <ColumnRenderer
          {...props}
          type={type}
          value={value as string | number}
          label={label}
          name={name}
          onValueChange={onValueChange}
        />
      )}
      {error?.isError && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  );
};

const ColumnRenderer = <T extends Record<string, unknown>>({
  type,
  label = "",
  value = "",
  onValueChange,
}: NonBooleanFormColumn<T>) => {
  switch (type) {
    case ColumnType.SELECT:
      return (
        <Select
          value={value}
          onChange={(e) => onValueChange(e?.target?.value as string)}
        />
      );
    case ColumnType.RADIO:
      return (
        <Radio
          value={value}
          onChange={(e) => onValueChange(e?.target?.value)}
        />
      );
    case ColumnType.INPUT:
    default:
      return (
        <>
          <InputLabel>{label}</InputLabel>
          <Input
            color="info"
            onChange={(e) => onValueChange(e?.target?.value)}
            value={value}
          />
        </>
      );
  }
};

const BooleanTypeColumnn = <T extends Record<string, unknown>>({
  type = ColumnType.CHECK,
  value = false,
  label = "",
  onValueChange,
}: BooleanFormColumn<T>) => {
  switch (type) {
    case ColumnType.CHECK:
    default:
      return (
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              value={value}
              onChange={(e) => onValueChange(e.target.checked)}
            />
          }
        />
      );
  }
};

export default Form;

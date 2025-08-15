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
import type {
  BooleanFormColumn,
  CustomFormType,
  FormColumnProps,
  FormProps,
  NonBooleanFormColumn,
} from "./types/formTypes";

const Form = <T extends Record<string, unknown>>({
  data,
  setData,
  columns,
}: FormProps<T>) => {
  return (
    <Grid container spacing={2} component="form">
      {columns.map((item) => (
        // Todo: 컬럼별 사이즈 조절 기능 만들기
        <Grid size={{ xs: 12, lg: 6 }}>
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
  value,
  onValueChange,
  error = { isError: false, message: "" },
}: Exclude<FormColumnProps<T>, CustomFormType> & {
  value: unknown;
  onValueChange: (e: boolean | string | number) => void;
}) => {
  return (
    <FormControl className="w-100" error={error?.isError}>
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
  onValueChange,
}: NonBooleanFormColumn<T> & {}) => {
  // console.log(label);
  switch (type) {
    case ColumnType.SELECT:
      return <Select />;
    case ColumnType.RADIO:
      return <Radio onChange={(e) => onValueChange(e?.target?.value)} />;
    case ColumnType.INPUT:
    default:
      return (
        <>
          <InputLabel>{label}</InputLabel>
          <Input
            color="info"
            onChange={(e) => onValueChange(e?.target?.value)}
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

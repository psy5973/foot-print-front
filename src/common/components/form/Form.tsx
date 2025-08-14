import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  Input,
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
    <Grid container>
      <Box component={"form"}>
        {columns.map((item) => {
          return item?.type === ColumnType.CUSTOM ? (
            item?.column
          ) : (
            <FormColumn
              type={item?.type}
              name={item?.name}
              value={data[item?.name]}
              onValueChange={(e) =>
                setData((prev) => ({ ...prev, [item.name]: e }))
              }
            />
          );
        })}
      </Box>
    </Grid>
  );
};

const FormColumn = <T extends Record<string, unknown>>({
  label = "",
  name,
  type = ColumnType.INPUT,
  value,
  onValueChange,
}: Exclude<FormColumnProps<T>, CustomFormType> & {
  value: unknown;
  onValueChange: (e: boolean | string | number) => void;
}) => {
  return (
    <FormControl error>
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
    </FormControl>
  );
};

const ColumnRenderer = <T extends Record<string, unknown>>({
  type,
  onValueChange,
}: NonBooleanFormColumn<T> & {}) => {
  switch (type) {
    case ColumnType.SELECT:
      return <Select />;
    case ColumnType.RADIO:
      return <Radio onChange={(e) => onValueChange(e?.target?.value)} />;
    case ColumnType.INPUT:
    default:
      return (
        <Input color="info" onChange={(e) => onValueChange(e?.target?.value)} />
      );
  }
};

const BooleanTypeColumnn = <T extends Record<string, unknown>>({
  type = ColumnType.CHECK,
  value = false,
  onValueChange,
}: BooleanFormColumn<T>) => {
  switch (type) {
    case ColumnType.CHECK:
    default:
      return (
        <Checkbox
          value={value}
          onChange={(e) => onValueChange(e.target.checked)}
        />
      );
  }
};

export default Form;

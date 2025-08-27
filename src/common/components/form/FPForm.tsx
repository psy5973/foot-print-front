import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  Radio,
  Select,
  TextField,
  type ButtonProps,
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
  ColumnProps,
} from "./types/formTypes";
import { cloneElement, type ReactElement } from "react";

const FPForm = <T extends Record<string, unknown>>({
  data,
  setData,
  columns,
  useButton = false,
  buttonElement = "submit",
  onSubmit,
}: FormProps<T>) => {
  const columnRenderer = (item: FormColumnProps<T>) => {
    const { columnType } = item;

    if (columnType === ColumnType.CUSTOM) {
      // * custom Type
      return item?.renderComponent();
    } else {
      return (
        <FormColumn
          {...item}
          value={(data[item?.name] as unknown) || ""}
          onValueChange={(v: unknown) =>
            setData((prev) => ({ ...prev, [item?.name]: v }))
          }
        />
      );
    }
  };

  const handleSubmit = () => {
    if (!onSubmit) {
      return;
    }

    onSubmit(data);
  };

  return (
    <Grid container spacing={2} component="form">
      {columns.map((item) => (
        <Grid size={item?.colSize || { xs: 12 }}>{columnRenderer(item)}</Grid>
      ))}
      {useButton && (
        <div className="w-100 mt-10">
          {typeof buttonElement === "string" ? (
            <Button
              variant="contained"
              onClick={() => handleSubmit()}
              fullWidth
            >
              {buttonElement}
            </Button>
          ) : (
            cloneElement(buttonElement as ReactElement<ButtonProps>, {
              onClick: () => handleSubmit(),
            })
          )}
        </div>
      )}
    </Grid>
  );
};

const FormColumn = <T extends Record<string, unknown>>({
  error = { isError: false, message: "" },
  columnType = ColumnType.INPUT,
  onValueChange,
  ...props
}: Exclude<ColumnProps<T>, CustomColumnProps> & {}) => {
  const renderer = () => {
    switch (columnType) {
      case ColumnType.INPUT: {
        const p = { ...(props as InputColumnProps) };
        return (
          <TextField
            size="small"
            onChange={(e) => onValueChange(e.target.value)}
            {...p}
          />
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

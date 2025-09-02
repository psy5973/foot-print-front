import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  RadioGroup,
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
import { cloneElement, useEffect, useRef, type ReactElement } from "react";
import "./css/form.css";

const FPForm = <T extends Record<string, unknown>>({
  data,
  setData,
  columns,
  useButton = false,
  buttonElement = "submit",
  onSubmit,
  onAfterChangeValue,
}: FormProps<T>) => {
  const columnRenderer = (item: FormColumnProps<T>) => {
    const { columnType } = item;

    if (columnType === ColumnType.CUSTOM) {
      // * custom Type
      // ! 삭제예정
      return item?.renderComponent();
    } else {
      return (
        <FormColumn
          {...item}
          value={data[item?.name] as unknown}
          onValueChange={(v: unknown) =>
            setData((prev) => ({ ...prev, [item?.name]: v }))
          }
          onAfterValueChange={(callback) => {
            if (!onAfterChangeValue && !item?.onAfterValueChange) {
              return;
            }

            if (onAfterChangeValue) {
              onAfterChangeValue(callback);
            } else if (item?.onAfterValueChange) {
              item?.onAfterValueChange(callback);
            }
          }}
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
  label = "",
  value,
  onValueChange,
  ...props
}: Exclude<ColumnProps<T>, CustomColumnProps> & {}) => {
  const prevValuRef = useRef<unknown | null>(value || null);

  const renderer = () => {
    switch (columnType) {
      case ColumnType.INPUT: {
        const p = { ...(props as InputColumnProps) };
        return (
          <TextField
            {...p}
            value={value}
            size="small"
            onChange={(e) => onValueChange(e.target.value)}
            {...(error?.isError && { color: "error" })}
          />
        );
      }
      case ColumnType.CHECK: {
        const p = { ...(props as CheckColumnProps) };
        return (
          <FormControlLabel
            label={p?.checkLabel || ""}
            control={
              <Checkbox
                checked={(p?.value as boolean) || false}
                onChange={(e) => onValueChange(e.target.checked)}
                {...p}
              />
            }
          ></FormControlLabel>
        );
      }
      case ColumnType.RADIO: {
        const p = { ...(props as RadioColumnProps) };
        return <RadioGroup {...p} value={value}></RadioGroup>;
      }
      case ColumnType.SELECT: {
        const p = { ...(props as SelectColumnProps) };
        return <Select {...p} value={value}></Select>;
      }
    }
  };

  useEffect(() => {
    if (props?.onAfterValueChange) {
      props?.onAfterValueChange({
        key: props?.name,
        prevValue: prevValuRef?.current,
        value: value,
      });
    }
    prevValuRef.current = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  /**
   * Todo: error / success custom 필요
   */
  return (
    <FormControl className="w-100 mt-20">
      {label && <FormLabel>{label}</FormLabel>}
      {renderer()}
      {error?.isError && (
        <FormHelperText className="">{error?.message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FPForm;

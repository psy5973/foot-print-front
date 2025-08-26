import type { Dispatch, SetStateAction } from "react";
import type { ColumnType } from "./enum";
import type {
  CheckboxProps,
  RadioProps,
  SelectProps,
  TextFieldProps,
} from "@mui/material";
import type { Breakpoint, GridSize } from "@mui/system";

export interface FormProps<T extends Record<string, unknown>> {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  columns: FormColumnProps<T>[];
}

export type FormColumnProps<T> =
  | (CheckColumnProps & BaseFormColumnProps<T>)
  | (CustomColumnProps & BaseFormColumnProps<T>)
  | (InputColumnProps & BaseFormColumnProps<T>)
  | (RadioColumnProps & BaseFormColumnProps<T>)
  | (SelectColumnProps & BaseFormColumnProps<T>);

interface FormError {
  isError: boolean;
  message?: string;
}

export interface BaseFormColumnProps<T> {
  name: keyof T;
  label?: string;
  size?:
    | GridSize
    | Array<GridSize | null>
    | { [key in Breakpoint]?: GridSize | null };
  error?: FormError;
}

/**
 * Todo: 추후 unknown 으로 지정된것 확인해볼 필요 있음
 */

// export type BaseColumnFieldProps<T> = {} & (
//   | (CheckColumnProps & BaseFormColumnProps<T>)
//   | (CustomColumnProps & BaseFormColumnProps<T>)
//   | (InputColumnProps & BaseFormColumnProps<T>)
//   | (RadioColumnProps & BaseFormColumnProps<T>)
//   | (SelectColumnProps & BaseFormColumnProps<T>)
);

export interface CustomColumnProps {
  columnType: ColumnType.CUSTOM;
  renderComponent: () => React.ReactElement;
  value?: never;
}
export type InputColumnProps = {
  columnType: ColumnType.INPUT;
  value: unknown;
  onValueChange: (e: unknown) => void;
} & Omit<TextFieldProps, "error" | "value">;

export type RadioColumnProps = {
  columnType: ColumnType.RADIO;
  value: unknown;
  onValueChange: (e: unknown) => void;
} & Omit<RadioProps, "value">;

export type SelectColumnProps = {
  columnType: ColumnType.SELECT;
  value: unknown;
  onValueChange: (e: unknown) => void;
} & Omit<SelectProps, "value">;

export type CheckColumnProps = {
  columnType: ColumnType.CHECK;
  value: unknown;
  onValueChange: (e: unknown) => void;
} & Omit<CheckboxProps, "value">;

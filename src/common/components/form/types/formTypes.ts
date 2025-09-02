import type { Dispatch, SetStateAction } from "react";
import type { ColumnType } from "./enum";
import type {
  ButtonProps,
  CheckboxProps,
  RadioGroupProps,
  SelectProps,
  TextFieldProps,
} from "@mui/material";
import type { Breakpoint, GridSize } from "@mui/system";

export interface FormProps<T extends Record<string, unknown>> {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  columns: FormColumnProps<T>[];
  useButton?: boolean;
  buttonElement?: string | React.ReactElement<ButtonProps>;
  onSubmit?: (callback: T) => void;
  onAfterChangeValue?: (callback: ChangeCallbackData<T>) => void;
}

interface ChangeCallbackData<T extends Record<string, unknown>> {
  key: keyof T;
  prevValue: unknown;
  value: unknown;
}

export type FormColumnProps<T extends Record<string, unknown>> =
  | (Omit<CheckColumnProps, "onValueChange" | "value"> & BaseFormColumnProps<T>)
  | (Omit<CustomColumnProps, "onValueChange" | "value"> &
      BaseFormColumnProps<T>)
  | (Omit<SelectColumnProps, "onValueChange" | "value"> &
      BaseFormColumnProps<T>)
  | (Omit<InputColumnProps, "onValueChange" | "value"> & BaseFormColumnProps<T>)
  | (Omit<RadioColumnProps, "onValueChange" | "value"> &
      BaseFormColumnProps<T>);

export interface FormError {
  isError: boolean;
  message?: string;
}

export interface BaseFormColumnProps<T extends Record<string, unknown>> {
  name: keyof T;
  label?: string;
  colSize?:
    | GridSize
    | Array<GridSize | null>
    | { [key in Breakpoint]?: GridSize | null };
  error?: FormError;
  required?: boolean;
  onAfterValueChange?: (callback: ChangeCallbackData<T>) => void;
}

/**
 * fixme: 1. 추후 unknown 으로 지정된것 확인해볼 필요 있음
 */

export type InputColumnProps = {
  columnType: ColumnType.INPUT;
  value: unknown;
  onValueChange: (e: unknown) => void;
} & Omit<TextFieldProps, "error" | "value">;

export type RadioColumnProps = {
  columnType: ColumnType.RADIO;
  value: unknown;
  onValueChange: (e: unknown) => void;
} & Omit<RadioGroupProps, "value">;

export type SelectColumnProps = {
  columnType: ColumnType.SELECT;
  value: unknown;
  onValueChange: (e: unknown) => void;
} & Omit<SelectProps, "value">;

export type CheckColumnProps = {
  columnType: ColumnType.CHECK;
  value: unknown;
  onValueChange: (e: unknown) => void;
  checkLabel?: string;
} & Omit<CheckboxProps, "value">;

/**
 *
 * !DEPRECATED: custom column 추후 삭제 예정
 */
export interface CustomColumnProps {
  columnType: ColumnType.CUSTOM;
  renderComponent: () => React.ReactElement;
  value?: never;
}

export type ColumnProps<T extends Record<string, unknown>> =
  | (CheckColumnProps & BaseFormColumnProps<T>)
  | (CustomColumnProps & BaseFormColumnProps<T>)
  | (InputColumnProps & BaseFormColumnProps<T>)
  | (RadioColumnProps & BaseFormColumnProps<T>)
  | (SelectColumnProps & BaseFormColumnProps<T>);

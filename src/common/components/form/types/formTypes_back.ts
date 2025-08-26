import type { Dispatch, ReactElement, SetStateAction } from "react";
import type { ColumnType } from "./enum";
import type { BaseTextFieldProps, Breakpoint } from "@mui/material";
import type { GridSize } from "@mui/system";

/**
 * Todo: type 명 일괄적으로 변경필요해보임
 */

export type CustomFormProps = {
  type: ColumnType.CUSTOM;
  column: ReactElement;
};

/**
 * Todo: SelectType도 추가 옵션 필요(options)
 */
// export type SelectFormTypeProps = {};

type Error = {
  isError: boolean;
  message?: string;
};

export type FormColumnProps<T extends Record<string, unknown>> = {
  name: keyof T;
  label?: string;
  error?: Error;
  size?:
    | GridSize
    | Array<GridSize | null>
    | { [key in Breakpoint]?: GridSize | null };
} & ({ type?: Exclude<ColumnType, ColumnType.CUSTOM> } | CustomFormProps);

export type FormProps<T extends Record<string, unknown>> = {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  columns: FormColumnProps<T>[];
};

type NonCustomFormColum<T extends Record<string, unknown>> = Omit<
  Exclude<FormColumnProps<T>, CustomFormProps>,
  "type" | "size"
>;

export type BooleanFormColumn<T extends Record<string, unknown>> =
  NonCustomFormColum<T> & {
    type: ColumnType.CHECK;
    value: boolean;
    onValueChange: (e: boolean) => void;
  };

// export type NonBooleanFormColumn<T extends Record<string, unknown>> =
//   | InputFormColumn<T>
//   | SelectFormColumn<T>
//   | RadioFormColumn<T>;

export type NonBooleanFormColumn<T extends Record<string, unknown>> =
  | InputFormColumn<T>
  | SelectFormColumn<T>
  | RadioFormColumn<T>;

type InputFormColumn<T extends Record<string, unknown>> =
  NonCustomFormColum<T> & {
    // type: Exclude<ColumnType, ColumnType.CHECK | ColumnType.CUSTOM>;
    type: ColumnType.INPUT;
    value: string | number;
    onValueChange: (e: string | number) => void;
  } & BaseTextFieldProps;

type RadioFormColumn<T extends Record<string, unknown>> =
  NonCustomFormColum<T> & {
    // type: Exclude<ColumnType, ColumnType.CHECK | ColumnType.CUSTOM>;
    type: ColumnType.RADIO;
    value: string;
    onValueChange: (e: string) => void;
  };

type SelectFormColumn<T extends Record<string, unknown>> =
  NonCustomFormColum<T> & {
    // type: Exclude<ColumnType, ColumnType.CHECK | ColumnType.CUSTOM>;
    type: ColumnType.SELECT;
    value: string;
    onValueChange: (e: string) => void;
  };

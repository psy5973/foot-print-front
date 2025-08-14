import type { Dispatch, ReactElement, SetStateAction } from "react";
import type { ColumnType } from "./enum";

/**
 * Todo: type 명 일괄적으로 변경필요해보임
 */

export type CustomFormType = {
  type: ColumnType.CUSTOM;
  column: ReactElement;
};

/**
 * Todo: SelectType도 추가 옵션 필요(options)
 */
// export type SelectFormTypeProps = {};

export type FormColumnProps<T extends Record<string, unknown>> = {
  label?: string;
  name: keyof T;
} & ({ type?: Exclude<ColumnType, ColumnType.CUSTOM> } | CustomFormType);

export type FormProps<T extends Record<string, unknown>> = {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  columns: FormColumnProps<T>[];
};

type NonCustomFormColum<T extends Record<string, unknown>> = Omit<
  Exclude<FormColumnProps<T>, CustomFormType>,
  "type"
>;

export type BooleanFormColumn<T extends Record<string, unknown>> =
  NonCustomFormColum<T> & {
    type: ColumnType.CHECK;
    value: boolean;
    onValueChange: (e: boolean) => void;
  };

export type NonBooleanFormColumn<T extends Record<string, unknown>> =
  | InputFormColumn<T>
  | SelectFormColumn<T>
  | RadioFormColumn<T>;

type InputFormColumn<T extends Record<string, unknown>> =
  NonCustomFormColum<T> & {
    type: Exclude<ColumnType, ColumnType.CHECK | ColumnType.CUSTOM>;
    value: string | number;
    onValueChange: (e: string | number) => void;
  };

type RadioFormColumn<T extends Record<string, unknown>> =
  NonCustomFormColum<T> & {
    type: Exclude<ColumnType, ColumnType.CHECK | ColumnType.CUSTOM>;
    value: string;
    onValueChange: (e: string) => void;
  };

type SelectFormColumn<T extends Record<string, unknown>> =
  NonCustomFormColum<T> & {
    type: Exclude<ColumnType, ColumnType.CHECK | ColumnType.CUSTOM>;
    value: string;
    onValueChange: (e: string) => void;
  };

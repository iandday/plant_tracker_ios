import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React from "react";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { useController } from "react-hook-form";
import { type TextInputProps, View } from "react-native";
import { twMerge } from "tailwind-merge";

import { Text } from "./text";

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
}

type TRule = Omit<
  RegisterOptions,
  "valueAsNumber" | "valueAsDate" | "setValueAs"
>;

interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}

export type RuleType<T> = { [name in keyof T]: TRule };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

export function ControlledDatePicker<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, rules, className, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  const labelStyle = React.useMemo(
    () => twMerge("mb-1 text-lg text-primary", className),
    [className]
  );

  return (
    <View className="flex flex-col">
      <Text className={labelStyle}>Purchase Date</Text>
      <DateTimePicker
        value={field.value.toDate()}
        mode={"date"}
        onChange={(event, selectedDate) => {
          field.onChange(dayjs(selectedDate));
        }}
      />
    </View>
  );
}

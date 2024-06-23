import * as React from "react";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { useController } from "react-hook-form";
import type { TextInput, TextInputProps } from "react-native";
import { I18nManager, StyleSheet, View } from "react-native";
import { TextInput as NTextInput } from "react-native";
import { tv } from "tailwind-variants";
import { Text } from "./text";
import { twMerge } from "tailwind-merge";

// const inputTv = tv({
//   slots: {
//     container: "mb-2",
//     label: "text-grey-100 mb-1 text-lg dark:text-neutral-100",
//     input:
//       "mt-0   size-40 text-xl rounded-xl border-[0.5px] border-neutral-300 bg-neutral-100  font-inter   font-medium leading-6 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
//   },

//   variants: {
//     focused: {
//       true: {
//         input: "border-neutral-400 dark:border-neutral-300",
//       },
//     },
//     error: {
//       true: {
//         input: "border-danger-600",
//         label: "text-danger-600 dark:text-danger-600",
//       },
//     },
//     disabled: {
//       true: {
//         input: "bg-neutral-200",
//       },
//     },
//   },
//   defaultVariants: {
//     focused: false,
//     error: false,
//     disabled: false,
//   },
// });

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
}

type TRule = Omit<
  RegisterOptions,
  "valueAsNumber" | "valueAsDate" | "setValueAs"
>;

export type RuleType<T> = { [name in keyof T]: TRule };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}

export const Input = React.forwardRef<TextInput, NInputProps>((props, ref) => {
  const { label, error, testID, className, ...inputProps } = props;
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = React.useCallback(() => setIsFocussed(false), []);
  const onFocus = React.useCallback(() => setIsFocussed(true), []);
  const cName = twMerge(
    "h-19 rounded-full border-[1px] border-border p-3  text-primary bg-input",
    className
  );

  // const styles = React.useMemo(
  //   () =>
  //     inputTv({
  //       error: Boolean(error),
  //       focused: isFocussed,
  //       disabled: Boolean(props.disabled),
  //     }),
  //   [error, isFocussed, props.disabled]
  // );

  return (
    <View className="">
      {label && <Text className="text-primary">{label}</Text>}
      <NTextInput
        ref={ref}
        //placeholderTextColor={colors.neutral[400]}
        className={cName}
        onBlur={onBlur}
        onFocus={onFocus}
        {...inputProps}
        //style={StyleSheet.flatten([inputProps.style])}
      />
      {error && (
        <Text className="text-sm text-danger-400 dark:text-danger-600">
          {error}
        </Text>
      )}
    </View>
  );
});

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, rules, className, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  return (
    <Input
      ref={field.ref}
      className={className}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={(field.value as string) || ""}
      {...inputProps}
      error={fieldState.error?.message}
    />
  );
}

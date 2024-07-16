import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import type { Option } from "~/components/ui";
import { Text } from "~/components/ui";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

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

interface MultiSelectProps {
  items: Option[];
  selectText: string;
  label: string;
}

interface ControlledMultiSelectProps<T extends FieldValues>
  extends MultiSelectProps,
    InputControllerType<T> {}

export function ControlledMultiSelect<T extends FieldValues>({
  control,
  name,
  items,
  selectText,
  label,
}: ControlledMultiSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => {
        return (
          <>
            <Text className="text-primary text-lg mb-1">{label}</Text>
            <SectionedMultiSelect
              className="text-secondary-foreground"
              items={items}
              IconRenderer={Icon}
              uniqueKey="value"
              displayKey="label"
              showCancelButton={true}
              onSelectedItemsChange={onChange}
              selectedItems={value}
              selectText={selectText}
              label={label}
              modalWithSafeAreaView={true}
              colors={{
                primary: "#1A1A1A",
                itemBackground: "#2e2e2e",
                text: "#FFF",
                selectToggleTextColor: "#FFF",
              }}
              styles={{
                item: {
                  paddingHorizontal: 10,
                },
                selectedItem: {
                  backgroundColor: "rgba(0,0,0,0.1)",
                },
                scrollView: { paddingHorizontal: 0 },
              }}
            />
          </>
        );
      }}
    />
  );
}

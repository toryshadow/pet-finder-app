import { StyleSheet, View, ViewStyle, Text } from "react-native";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Colors } from "@/src/constants";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { capitalize, formatPlaceholder } from "@/src/hepers";

interface FormInputProps<TFieldValues extends FieldValues, TContext> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues, TContext>;
  styles?: ViewStyle;
  title?: string;
  placeholder?: string;
  data: string[];
}

const FormDropdownPicker = <TFieldValues extends FieldValues, TContext>({
  styles,
  control,
  name,
  title,
  data,
  placeholder,
  ...props
}: FormInputProps<TFieldValues, TContext>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });
  const [isOpen, setIsOpen] = useState(false);

  const dropdownHeight = data.length >= 5 ? 240 : 55 * data.length;

  return (
    <View style={[style.wrapper, styles]}>
      <Text style={style.title}>{title || capitalize(name)}</Text>
      <DropDownPicker
        containerStyle={[
          style.container,
          { height: isOpen ? dropdownHeight : "auto" },
        ]}
        style={[style.input, error && style.inputError]}
        value={field.value}
        items={data.map((item) => ({ label: capitalize(item), value: item }))}
        placeholder={placeholder || `Select ${formatPlaceholder(title)}`}
        open={isOpen}
        setOpen={() => setIsOpen(true)}
        closeAfterSelecting
        closeOnBackPressed
        listMode="SCROLLVIEW"
        onClose={() => setIsOpen(false)}
        onChangeValue={(value) => field.onChange(value)}
        setValue={(value) => field.onChange(value)}
        placeholderStyle={{ color: error ? Colors.error : Colors.text }}
        {...props}
      />
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: 18,
  },
  container: {
    padding: 0,
    margin: 0,
    width: "100%",
    zIndex: 100,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    fontSize: 16,
    color: Colors.text,
    margin: 0,
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorBackground,
  },
  title: {
    color: Colors.text,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "300",
  },
});

export default FormDropdownPicker;

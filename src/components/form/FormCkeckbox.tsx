import { StyleSheet, View, ViewStyle, Text } from "react-native";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import Checkbox from "expo-checkbox";
import { ReactNode } from "react";
import { Colors } from "@/src/constants";

interface FormInputProps<TFieldValues extends FieldValues, TContext> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues, TContext>;
  styles?: ViewStyle;
  title?: string | ReactNode;
}

const FormCheckbox = <TFieldValues extends FieldValues, TContext>({
  styles,
  control,
  name,
  title,
  ...props
}: FormInputProps<TFieldValues, TContext>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <View style={[style.wrapper, styles]}>
      <Checkbox
        style={style.checkbox}
        value={field.value}
        onValueChange={field.onChange}
        color={error ? Colors.error : field.value ? Colors.tint : Colors.text}
        {...props}
      />
      <Text style={style.title}>{title}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingBottom: 18,
    flexDirection: "row",
  },
  checkbox: {
    marginRight: 10,
    marginTop: 4,
    borderRadius: 4,
  },
  title: {
    color: Colors.text,
    marginBottom: 4,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    flex: 1,
    marginLeft: 0,
  },
});

export default FormCheckbox;

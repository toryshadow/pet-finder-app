import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from "react-native";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useEffect, useState } from "react";
import CalendarIcon from "../../../assets/images/svg/calendar.svg";
import { format } from "date-fns";
import DateTimePicker from "react-native-modal-datetime-picker";
import { capitalize } from "@/src/hepers";
import { Colors } from "@/src/constants";

interface FormInputProps<TFieldValues extends FieldValues, TContext> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues, TContext>;
  styles?: ViewStyle;
  title?: string;
  mode?: "date" | "time" | "datetime" | undefined;
  format?: string;
}

const FormDateTimePicker = <TFieldValues extends FieldValues, TContext>({
  styles,
  control,
  name,
  title,
  ...props
}: FormInputProps<TFieldValues, TContext>) => {
  const maxDate = new Date();
  const minDate = new Date();
  minDate.setFullYear(
    minDate.getFullYear() - 100,
    minDate.getMonth(),
    minDate.getDate(),
  );

  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (date) {
      if (props?.mode === "time") {
        field.onChange(format(new Date(date), "h:mm a"));
      } else {
        field.onChange(format(new Date(date), "MM/dd/yyyy"));
      }
    }
  }, [date]);

  return (
    <View style={[style.wrapper, styles]}>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <View pointerEvents="none">
          <Text style={style.title}>{title || capitalize(name)}</Text>
          <TextInput
            style={[style.input, error && style.inputError]}
            onBlur={field.onBlur}
            onChangeText={(value) => field.onChange(value)}
            value={`${field.value || ""}`}
            placeholderTextColor={error ? Colors.error : Colors.placeholder}
            autoCorrect={false}
            autoCapitalize={"none"}
            editable={false}
          />
          <CalendarIcon style={style.icon} />
        </View>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isVisible}
        mode="date"
        display={"inline"}
        isDarkModeEnabled={false}
        accentColor={Colors.tintSecond}
        textColor={Colors.text}
        buttonTextColorIOS={Colors.tintSecond}
        maximumDate={props?.mode === "time" ? maxDate : undefined}
        minimumDate={minDate}
        onConfirm={(date: Date) => {
          setIsVisible(false);
          setDate(date);
        }}
        date={date}
        themeVariant="light"
        onCancel={() => setIsVisible(false)}
        {...props}
      />
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingBottom: 18,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorBackground,
  },
  title: {
    color: Colors.text,
    marginBottom: 4,
    fontSize: 14,
    fontFamily: "lato",
    fontWeight: "300",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 30,
  },
});

export default FormDateTimePicker;

import { StyleSheet, TextInput, TextInputProps, ViewStyle } from "react-native";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as React from "react";
import { Button } from "@/src/components/StyledButton";
import { Colors } from "@/src/constants";
import { Text, View } from "@/src/components";
import { capitalize, formatPlaceholder } from "@/src/hepers";
import { AntDesign } from "@expo/vector-icons";

interface FormInputProps<TFieldValues extends FieldValues, TContext>
  extends TextInputProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues, TContext>;
  styles?: ViewStyle;
  title?: string;
  disableTitle?: boolean;
  backButtonEnabled?: boolean;
  backButtonAction?: () => void;
  onSubmit?: () => void;
  titleBold?: boolean;
}

export const FormInput = <TFieldValues extends FieldValues, TContext>({
  styles,
  control,
  name,
  title,
  disableTitle,
  secureTextEntry,
  editable,
  multiline,
  backButtonEnabled,
  backButtonAction,
  onSubmit,
  titleBold,
  ...props
}: FormInputProps<TFieldValues, TContext>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });
  const [secureText, setSecureText] = useState(secureTextEntry);

  return (
    <View style={[style.wrapper, styles]}>
      {!disableTitle && (
        <Text style={[style.title, titleBold && style.titleBold]}>
          {title || capitalize(name)}
        </Text>
      )}
      {backButtonEnabled && (
        <Button onPress={backButtonAction} style={style.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.placeholder} />
        </Button>
      )}
      <TextInput
        style={[
          style.input,
          editable === false && style.disabled,
          error && style.inputError,
          multiline && style.multiline,
          backButtonEnabled && style.backButtonWrap,
        ]}
        onBlur={field.onBlur}
        onChangeText={(value) => field.onChange(value)}
        value={`${field.value || ""}`}
        placeholder={
          props.placeholder || `${capitalize(formatPlaceholder(title || name))}`
        }
        placeholderTextColor={error ? Colors.error : Colors.placeholder}
        autoCorrect={false}
        editable={editable}
        multiline={multiline}
        scrollEnabled={!multiline}
        autoCapitalize="sentences"
        onSubmitEditing={onSubmit}
        {...props}
        secureTextEntry={secureText}
      />
      {secureTextEntry && (
        <AntDesign
          name={secureText ? "eye" : "eyeo"}
          size={24}
          style={style.hideIcon}
          color="black"
          onPress={() => setSecureText(!secureText)}
        />
      )}
      {backButtonEnabled && (
        <Button
          onPress={() => {
            backButtonAction && backButtonAction();
            field.onChange("");
          }}
          style={style.closeButton}
        >
          <Ionicons name="close" size={24} color={Colors.placeholder} />
        </Button>
      )}
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
    textAlignVertical: "center",
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorBackground,
  },
  disabled: {
    backgroundColor: Colors.disabled,
  },
  title: {
    color: Colors.text,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "300",
  },
  titleBold: {
    fontSize: 16,
    marginBottom: 8,
  },
  hideIcon: {
    position: "absolute",
    top: 32,
    right: 10,
  },
  multiline: {
    minHeight: 100,
    paddingTop: 10,
    textAlignVertical: "top",
  },
  backButtonWrap: {
    paddingLeft: 40,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: -2,
    width: "auto",
    zIndex: 2,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: -2,
    width: "auto",
    zIndex: 2,
  },
});

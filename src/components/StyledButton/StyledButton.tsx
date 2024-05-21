import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useCallback } from "react";
import { Colors } from "@/src/constants";

interface ButtonProps extends PressableProps {
  activeOpacity?: number;
}

export const Button = ({
  activeOpacity = 0.5,
  style,
  ...props
}: ButtonProps) => {
  const _style = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => [
      styles.button,
      { opacity: pressed ? activeOpacity : 1 },
      style && (style as StyleProp<ViewStyle>),
      props.disabled && { backgroundColor: Colors.disabled },
    ],
    [style, props.disabled],
  );

  return (
    <Pressable style={_style} {...props}>
      {props.children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 12,
  },
});

import React, {FC} from "react";
import {SafeAreaView, StyleSheet, View, ViewStyle} from "react-native";

type ContainerProps = {
  children: React.ReactNode,
  style?: ViewStyle,
  disableTabletPadding?: boolean
}

export const AppContainer: FC<ContainerProps> = ({
  children, 
  style,
}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15
  }
});

export default AppContainer;
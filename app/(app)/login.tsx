import { Login } from "@/src/screens";
import { AppContainer } from "@/src/components/AppContainer";
import { Colors } from "@/src/constants";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "@/src/components";
import { Loader } from "@/src/components/Loader";
import { router } from "expo-router";
import Logo from "@/assets/images/logo.png";

function LoginScreen() {
  return (
    <AppContainer style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={Logo} style={styles.logo} resizeMethod="resize" />
        <Text style={styles.title}>Hi, Welcome Back!</Text>
        <Login />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.footerText}>Don’t have an account ?</Text>
        <Button
          style={styles.footerTextButton}
          onPress={() => router.navigate("sign-in")}
        >
          <Text style={styles.footerTextButtonText}>Sign Up</Text>
        </Button>
      </View>

      <Loader isLoading={false} />
    </AppContainer>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    textAlign: "center",
    marginVertical: 32,
  },
  footerText: {
    color: Colors.text,
    fontSize: 16,
    padding: 0,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  footerTextButton: {
    width: "auto",
    padding: 0,
    margin: 0,
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footerTextButtonText: {
    color: Colors.tint,
    fontSize: 16,
    padding: 0,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  footerTextButtonTextDemo: {
    color: Colors.error,
    fontSize: 18,
  },

  logo: {
    width: 150,
    height: 180,
    resizeMode: "contain",
    backgroundColor: Colors.white,
  },
});

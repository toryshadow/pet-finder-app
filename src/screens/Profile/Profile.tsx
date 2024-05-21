import { FlatList, StyleSheet } from "react-native";
import { View } from "@/src/components/Themed";
import { EditIcon, Text } from "@gluestack-ui/themed";
import { useQuery } from "react-query";
import { meRequest } from "@/src/api";
import { Loader } from "@/src/components/Loader";
import { AppContainer } from "@/src/components/AppContainer";
import { Avatar, Button } from "@/src/components";
import { Colors } from "@/src/constants";
import ListItem from "@/src/components/ListItem/ListItem";

export const Profile = () => {
  const me = useQuery(["me"], meRequest);

  if (!me?.data) {
    return <Loader />;
  }

  const keysToGet = ["email", "name", "firstName", "lastName", "phone"];

  return (
    <AppContainer style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.innerContainer}>
          <Button style={styles.userButton} onPress={() => {}}>
            <Avatar isLoading={false} image={""} size={78} />
          </Button>
          <Button style={styles.titleContainer} onPress={() => {}}>
            <Text
              style={styles.title}
            >{`${me?.data.firstName} ${me?.data.lastName}`}</Text>
            <EditIcon />
          </Button>
        </View>
        <View style={styles.buttonsContainer}>
          <Button style={styles.mpnButton} onPress={() => {}}>
            <Text style={styles.loginButtonText}>Add a pet</Text>
          </Button>
        </View>
      </View>
      <View style={[styles.container, { alignItems: "stretch" }]}>
        <Text style={styles.title}>My pets</Text>
        <FlatList
          style={styles.listContainer}
          data={[
            { id: 1, name: "name", address: "address" },
            { id: 2, name: "name", address: "address" },
          ]}
          renderItem={({ item }) => <ListItem item={item} key={item.id} />}
          onRefresh={() => {}}
          refreshing={false}
          // ListEmptyComponent={() => (
          //   <View style={styles.innerContainer}>
          //     <Inbox style={styles.icon} />
          //     <Text style={styles.title}>{emptyTitle}</Text>
          //   </View>
          // )}
          onEndReached={() => {}}
          onEndReachedThreshold={0.5}
        />
        <Loader isLoading={false} hideLoader />
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.7,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  separator: {
    height: 1,
    width: "80%",
  },
  list: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
  },

  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  userButton: {},
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    padding: 0,
  },
  title: {
    color: Colors.text,
    fontFamily: "playfair-bold",
    fontSize: 24,
    textAlign: "center",
    marginRight: 16,
  },
  loginButton: {
    backgroundColor: Colors.tint,
    padding: 15,
    marginTop: 24,
  },
  loginButtonText: {
    color: Colors.white,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 25,
  },
  mpnButton: {
    backgroundColor: Colors.tint,
    padding: 15,
    width: "auto",
    flex: 1,
    marginRight: 5,
  },

  dykmnButton: {
    backgroundColor: Colors.tintSecond,
    padding: 15,
    width: "auto",
    flex: 1,
    marginLeft: 5,
  },
  searchButton: {
    position: "absolute",
    left: 10,
    top: 10,
    width: "auto",
  },
  howToUseLink: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 5,
    left: "50%",
    marginLeft: -50,
  },
  howToUseText: {
    textDecorationStyle: "solid",
    textDecorationColor: Colors.text,
    textDecorationLine: "underline",
  },
  listContainer: {
    flex: 1,
  },
  icon: {
    marginTop: 50,
    marginBottom: 20,
  },
});

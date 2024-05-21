import { View } from "@/src/components/Themed";
import { EditIcon, Text } from "@gluestack-ui/themed";
import { meRequest, USER_KEY } from "@/src/api";
import { useQuery } from "react-query";
import { FlatList, StyleSheet } from "react-native";
import { Button, Avatar } from "@/src/components";
import { Colors } from "@/src/constants";
import ListItem from "@/src/components/ListItem/ListItem";
import { Loader } from "@/src/components/Loader";
export const Home = () => {
  const { data } = useQuery([USER_KEY], meRequest);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Button style={styles.userButton} onPress={() => {}}>
          <Avatar isLoading={false} image={""} size={78} />
        </Button>
        <View style={styles.buttonsContainer}>
          <Button style={styles.mpnButton} onPress={() => {}}>
            <Text style={styles.loginButtonText}>Find</Text>
          </Button>
        </View>
      </View>

      <View style={[styles.container, { alignItems: "stretch" }]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
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

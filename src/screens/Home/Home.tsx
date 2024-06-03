import { View } from "@/src/components/Themed";
import { Text } from "@gluestack-ui/themed";
import { useQuery } from "react-query";
import { FlatList, StyleSheet } from "react-native";
import { Button, Avatar, FormInput } from "@/src/components";
import { Colors } from "@/src/constants";
import ListItem from "@/src/components/ListItem/ListItem";
import { Loader } from "@/src/components/Loader";
import { GET_PET_KEY, getPets } from "@/src/api/pet";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Home = () => {
  const [page] = useState(1);

  const { data: pets, refetch } = useQuery([GET_PET_KEY, page], () =>
    getPets({
      page,
      limit: 10,
      isMyPets: false,
    }),
  );

  const { control } = useForm();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Button style={styles.userButton} onPress={() => {}}>
          <Avatar isLoading={false} image={""} size={78} />
        </Button>

        <View style={styles.buttonsContainer}>
          <FormInput
            control={control}
            name={"search"}
            title="Find a pet"
            placeholder="Red cat"
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button style={styles.mpnButton} onPress={() => {}}>
            <Text style={styles.loginButtonText}>Find</Text>
          </Button>
        </View>
      </View>

      <View style={[styles.container, { alignItems: "stretch" }]}>
        <FlatList
          style={styles.listContainer}
          data={pets}
          renderItem={({ item }) => <ListItem item={item} key={item.id} />}
          onRefresh={() => refetch()}
          refreshing={false}
          ListEmptyComponent={() => (
            <View style={styles.innerContainer}>
              <Text style={styles.title}>No data</Text>
            </View>
          )}
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
    marginTop: 5,
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

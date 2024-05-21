import { Alert, StyleSheet, View, Text } from "react-native";
import React, { useMemo } from "react";
import { Button, Avatar } from "@/src/components";
import { Colors } from "@/src/constants";

interface ListItemType<T> {
  item: T;
}

const ListItem = <T extends {}>({ item }: ListItemType<T>) => {
  // const [image, isImageLoading] = useFileDownload(item.Add_photo);

  const onDeleteItem = async () => {
    console.log("delete item");
  };

  const handleDeleteLowedOne = () => {
    Alert.alert("Are you sure", `Do you want to delete ?`, [
      {
        text: "Yes",
        onPress: onDeleteItem,
      },
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemWrapper}>
        <Button style={styles.avatar} onPress={() => {}}>
          <Avatar isLoading={false} image={""} size={60} />
        </Button>
        <Button style={styles.textContainer} onPress={() => {}}>
          <Text style={styles.name}>{`item.First_Name item.Last_Name`}</Text>
          <Text style={styles.address} numberOfLines={1}>
            {"address"}
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: Colors.disabledBorder,
  },
  itemWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    paddingRight: 15,
    paddingLeft: 0,
    marginBottom: 0,
    width: "auto",
    flex: undefined,
  },
  textContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 0,
    width: "auto",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: Colors.transparent,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: -10,
    width: 60,
  },
  name: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: "playfair-bold",
    marginBottom: 10,
  },
  address: {
    fontSize: 14,
    color: Colors.text,
    padding: 0,
    fontFamily: "lato",
  },
  buttonIcon: {
    padding: 0,
    marginVertical: 0,
    marginLeft: 20,
    width: "auto",
    flex: 1,
  },
  missed: {
    fontSize: 16,
    fontFamily: "lato-bold",
    color: Colors.text,
    padding: 0,
    marginRight: 5,
  },
  missedTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.transparent,
    marginTop: 5,
  },
  newLabel: {
    position: "absolute",
    top: 16,
    right: 16,
    color: Colors.error,
  },
  dateCreated: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});

export default ListItem;

import { Alert, StyleSheet, View, Text } from "react-native";
import React from "react";
import { Button, Avatar } from "@/src/components";
import { Colors, ROUTES } from "@/src/constants";
import { TPet } from "@/src/types/pet";
import { router } from "expo-router";

interface ListItemType {
  item: TPet;
  isEditable?: boolean;
}

const ListItem = ({ item, isEditable }: ListItemType) => {
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
        <Button
          style={styles.textContainer}
          onPress={() => router.navigate(`${ROUTES.PET}/${item.id}`)}
        >
          <Text style={styles.name}>{item?.name}</Text>
          <Text style={styles.address} numberOfLines={1}>
            {`Type: ${item.type?.name} Status: ${item.status}`}
          </Text>
        </Button>
      </View>
      {!isEditable && (
        <View style={styles.buttonContainer}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      )}
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
    marginBottom: 10,
  },
  address: {
    fontSize: 14,
    color: Colors.text,
    padding: 0,
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

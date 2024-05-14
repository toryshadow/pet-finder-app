import { View } from "@/src/components/Themed";
import { useSession } from "@/src/context";
import { Text } from "@gluestack-ui/themed";
import { meRequest, USER_KEY } from "@/src/api";
import { useQuery } from "react-query";

export const Home = () => {
  const { signOut } = useSession();
  const { data } = useQuery([USER_KEY], meRequest);

  console.log(data);
  // const me = meRequest();
  // console.log(me)
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
};

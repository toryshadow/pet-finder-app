import { useLocalSearchParams } from "expo-router";
import { PetDetails } from "@/src/screens";

export default function PetDetailsScreen() {
  const local = useLocalSearchParams();

  return <PetDetails petId={+local?.id} />;
}

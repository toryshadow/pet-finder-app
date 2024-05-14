import { Redirect } from "expo-router";
import { useSession } from "@/src/context";

const MainIndex = () => {
  const { isLoading } = useSession();

  if (isLoading) {
    return <></>;
  }

  return <Redirect href="/login" />;
};
export default MainIndex;

import { Text, View } from '@/components/Themed';
import {useSession} from "@/src/context";

export const Home = () => {
	const {signOut} = useSession();

	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text
				onPress={() => {
					// The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
					signOut();
				}}>
				Sign Out
			</Text>
		</View>
	)
}

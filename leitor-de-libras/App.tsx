// import { StatusBar } from 'expo-status-bar';
import { StatusBar } from 'react-native';
import { View } from 'react-native';

import Translations from "./src/screens/Translations";

export default function App() {
	return (
		<View style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" />
			<Translations />
		</View>
	);
}

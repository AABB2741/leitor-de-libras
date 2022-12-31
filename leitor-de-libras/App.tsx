// import { StatusBar } from 'expo-status-bar';
import { useCallback } from "react";
import { StatusBar } from 'react-native';
import { View } from 'react-native';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";

import SettingsProvider from "./src/contexts/Settings";
import ColorsProvider from "./src/contexts/Colors";
import AppRoutes from "./src/routes/app.routes";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = useFonts({
		"Exo-2": require("./assets/fonts/Exo2-Bold.ttf"),
		"Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
		"Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
		"Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
		"Rubik": require("./assets/fonts/Rubik-Regular.ttf"),
		"Ubuntu": require("./assets/fonts/Ubuntu-Bold.ttf"),
		"PT-Sans": require("./assets/fonts/PTSans-Regular.ttf"),
		"PT-Sans-Bold": require("./assets/fonts/PTSans-Bold.ttf")
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<SettingsProvider>
				<ColorsProvider>
					<NavigationContainer>
						<StatusBar barStyle="light-content" />
						<AppRoutes />
					</NavigationContainer>
				</ColorsProvider>
			</SettingsProvider>
		</View>
	);
}

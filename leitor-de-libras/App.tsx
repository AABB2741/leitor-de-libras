// import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from "react";
import { View } from 'react-native';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";

import log from "./src/utils/log";

import SettingsProvider from "./src/contexts/settings";
import LangProvider from "./src/contexts/lang";
import ColorsProvider from "./src/contexts/colors";
import Routes from "./src/routes";

SplashScreen.preventAutoHideAsync();
log("App iniciado", { color: "fgGray" });
const startTime = new Date().getTime();

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
	log(`App carregado. Tempo de carregamento: ${new Date().getTime() - startTime}ms`, { color: "fgYellow" });
	return (
		<View style={{ flex: 1, backgroundColor: "#000" }} onLayout={onLayoutRootView}>
			<SettingsProvider>
				<LangProvider>
					<ColorsProvider>
						<NavigationContainer>
							<Routes />
						</NavigationContainer>
					</ColorsProvider>
				</LangProvider>
			</SettingsProvider>
		</View>
	);
}

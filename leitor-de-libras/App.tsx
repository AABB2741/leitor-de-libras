// import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from "react";
import {
	View,
	ImageBackground,
	LogBox
} from 'react-native';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";

import log from "./src/utils/log";

import UserProvider from "./src/contexts/user";
import SettingsProvider from "./src/contexts/settings";
import LangProvider from "./src/contexts/lang";
import ColorsProvider from "./src/contexts/colors";
import RoutesProvider from "./src/routes";

LogBox.ignoreLogs(["Require cycle:"]);
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
		"PT-Sans-Bold": require("./assets/fonts/PTSans-Bold.ttf"),
		"Fira-Sans": require("./assets/fonts/FiraSans-Heavy.ttf"),
		"Inter-Black": require("./assets/fonts/Inter-Black.ttf")
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}
	log(`App carregado. Tempo de carregamento: ${new Date().getTime() - startTime}ms`, { color: "fgYellow", tab: true });
	return (
		<ImageBackground
			style={{ flex: 1, backgroundColor: "#000" }}
			onLayout={onLayoutRootView}
			source={require("./assets/imgs/splash.png")}
			imageStyle={{ flex: 1 }}
		>
			<UserProvider>
				<SettingsProvider>
					<LangProvider>
						<ColorsProvider>
							<NavigationContainer>
								<RoutesProvider />
							</NavigationContainer>
						</ColorsProvider>
					</LangProvider>
				</SettingsProvider>
			</UserProvider>
		</ImageBackground>
	);
}

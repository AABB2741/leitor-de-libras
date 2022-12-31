type SettingsCategory = "display" | "test";
type SettingsLocation = "appearance" | "lang" | "test2" | "test3";

type RootStackParamList = {
    Dashboard: undefined;
    Translations: undefined;
    Camera: undefined;
    Learn: undefined;
    Profile: undefined;
}

type DashboardParamList = {
    Home: undefined;
    Settings: undefined;
    Configure: {
        category: SettingsCategory;
        location: SettingsLocation;
    };
    Customize: undefined;
}

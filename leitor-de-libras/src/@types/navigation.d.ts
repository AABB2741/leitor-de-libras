type SettingsLocation = {
    display: "appearance" | "lang" | "performance";
    more: "update" | "about";
}

type RootStackParamList = {
    App: undefined;
    Login?: {
        location: "login" | "signup";
    };
}

type AppScreens = {
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

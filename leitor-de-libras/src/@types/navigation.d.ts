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
        category: "display" | "test";
        location: "theme" | "lang";
    };
    Customize: undefined;
}

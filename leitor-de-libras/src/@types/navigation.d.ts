type SettingsLocation = {
    display: "appearance" | "lang" | "performance";
    more: "update" | "about";
}

type RootStackParamList = {
    AppRoutes: undefined;
    LoginRoutes?: {
        location: "Login" | "SignUp" | "ResetPassword";
    };
}

type LoginParamList = {
    Login: undefined;
    SignUp: undefined;
    ResetPassword: undefined;
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
        location: ValueOf<keyof SettingsLocation>;
    };
    Customize: undefined;
}

type CuriosityID = "about_libras" | "different" | "adaptation" | "illiterate";

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
    Customize: undefined;
    Article: {
        id: CuriosityID;
    };
    Configure: {
        category: SettingsCategory;
        location: ValueOf<keyof SettingsLocation>;
    };
}

type CuriosityID = "about_libras" | "different" | "adaptation" | "illiterate";

type SettingsLocation = {
    display: "appearance" | "lang" | "performance";
    more: "update" | "dev_tools" | "about";
}

type AppScreens = {
    DashboardRoutes: undefined;
    TranslationsRoutes: undefined;
    Camera: undefined;
    TalkRoutes: undefined;
    Profile: undefined;
}

type LoginParamList = {
    Login: undefined;
    SignUp: undefined;
    ResetPassword: undefined;
}

type DashboardParamList = {
    Dashboard: undefined;
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

type TranslationsParamList = {
    Translations: undefined;
    Watch: undefined;
}

type TalkParamList = {
    Conversations: undefined;
    Chat: {
        id: number;
    };
}

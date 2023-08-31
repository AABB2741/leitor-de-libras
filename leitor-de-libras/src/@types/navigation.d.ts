type CuriosityID = "about_libras" | "different" | "adaptation" | "illiterate";

type SettingsLocation = {
	display: "appearance" | "lang" | "performance";
	features: "litalks";
	more: "update" | "dev_tools" | "about";
};

type ModeRoutes = {
	App: undefined;
	Camera: undefined;
};

type AppRoutes = {
	DashboardRoutes: undefined;
	TranslationsRoutes: undefined;
	Camera: undefined;
	TalkRoutes: undefined;
	Profile: undefined;
};

type LoginParamList = {
	Login: undefined;
	SignUp: undefined;
	ResetPassword: undefined;
};

type DashboardParamList = {
	Dashboard: undefined;
	Settings: undefined;
	Medical: undefined;
	Article: {
		id: CuriosityID;
	};
	Configure: {
		category: SettingsCategory;
		location: ValueOf<keyof SettingsLocation>;
	};
};

type TranslationsParamList = {
	Translations: undefined;
	Watch: {
		id: string;
	};
};

type TalkParamList = {
	ConversationsWelcome: undefined;
	Conversations: undefined;
	Chat: {
		id: string;
	};
};

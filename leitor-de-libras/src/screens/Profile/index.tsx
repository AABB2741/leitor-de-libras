import { useCallback, useEffect, useState } from "react";
import {
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	BackHandler,
} from "react-native";
import {
	ArrowCounterClockwise,
	SignOut,
	UserCircleMinus,
} from "phosphor-react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import * as Storage from "../../services/Storage";

import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";
import { useUser } from "../../contexts/user";
import { api } from "../../lib/api";

import Loading from "../../components/Loading";
import Popup from "../../components/Popup";
import Empty from "../../components/Empty";
import Input from "../../components/Input";
import Font from "../../components/Font";
import FixedCategory from "../../components/FixedCategory";
import LoginForm from "../../components/LoginForm";
import Avatar from "../../components/Avatar";

import createStyles from "./styles";
import log from "../../utils/log";
import Button from "../../components/Button";

export default function Profile() {
	const lang = useLang();
	const { user, signed, loadUser, logOut } = useUser();
	const colors = useColors();

	const styles = createStyles({ colors });

	const [loading, setLoading] = useState(false);
	const [signOutVisible, setSignOutVisible] = useState(false);
	const [loginFormVisible, setLoginFormVisible] = useState(false);

	const [data, setData] = useState<UserProps | null>(null);

	useEffect(() => {
		setData(user);
	}, [user]);

	useFocusEffect(
		useCallback(() => {
			function handleBack() {
				log('Saindo do APP em "Profile"', { color: "fgRed" });
				BackHandler.exitApp();
				return true;
			}

			const sub = BackHandler.addEventListener(
				"hardwareBackPress",
				handleBack
			);
			return sub.remove;
		}, [])
	);

	async function handleSaveChanges() {
		const token = await SecureStore.getItemAsync("token");

		if (!token || !data) return;

		setLoading(true);

		try {
			const localData = await Storage.getItem("user");

			const response = await api.put<UserProps>(
				"/user/edit",
				{
					aboutMe: data.aboutMe,
					name: data.name,
					email: data.email,
				},
				{
					headers: {
						Authorization: token,
					},
				}
			);
		} catch (err) {
			console.error(err);
		}

		loadUser();
		setLoading(false);
	}

	if (!data) return null;

	if (!user || !signed) {
		return (
			<>
				<LoginForm
					visible={loginFormVisible}
					onRequestClose={() => setLoginFormVisible(false)}
				/>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}
				>
					<Empty
						icon={(props) => <UserCircleMinus {...props} />}
						title={lang.profile.not_signed.title}
						desc={lang.profile.not_signed.desc}
						options={[
							{
								label: lang.general.login,
								highlight: true,
								onPress: () => setLoginFormVisible(true),
							},
						]}
					/>
				</ScrollView>
			</>
		);
	}

	return (
		<>
			<Popup
				title={lang.profile.logout.title}
				text={lang.profile.logout.text}
				type="boolean"
				visible={signOutVisible}
				caution
				onRequestClose={() => setSignOutVisible(false)}
				loading={loading}
				onRespondBoolean={async (response) => {
					setLoading(true);

					if (response) {
						await logOut();
						setLoginFormVisible(true);
					}

					setLoading(false);
					setSignOutVisible(false);
				}}
			/>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
			>
				<View style={styles.header}>
					<Avatar style={styles.avatar} />
					<View style={styles.userInfos}>
						<Font family="ubuntu" style={styles.userName}>
							{user.name}
						</Font>
						<Font style={styles.userEmail} numberOfLines={1}>
							{user.email}
						</Font>
					</View>
					<View style={styles.options}>
						<TouchableOpacity
							disabled={loading}
							style={styles.reload}
							onPress={loadUser}
						>
							{!loading && (
								<ArrowCounterClockwise
									color={colors.font}
									size={24}
								/>
							)}
							{loading && <Loading size={16} />}
						</TouchableOpacity>
						<TouchableOpacity
							disabled={loading}
							onPress={() => setSignOutVisible(true)}
						>
							<SignOut
								color={
									loading ? colors.disabled : colors.critic
								}
								size={24}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<FixedCategory title={lang.profile.personal_data.title}>
					<Input
						label={lang.profile.personal_data.username}
						placeholder={lang.profile.personal_data.username}
						editable={!loading}
						value={data.name}
						onChangeText={(name) => setData({ ...data, name })}
					/>
					<Input
						label={lang.profile.personal_data.email}
						placeholder={lang.profile.personal_data.email}
						editable={!loading}
						value={data.email}
						onChangeText={(email) => setData({ ...data, email })}
					/>
					<Input
						label={lang.profile.personal_data.about_me}
						placeholder={
							lang.profile.personal_data.about_me_placeholder
						}
						multiline
						numberOfLines={3}
						editable={!loading}
						textAlignVertical="top"
						value={data.aboutMe}
						onChangeText={(aboutMe) =>
							setData({ ...data, aboutMe })
						}
					/>
				</FixedCategory>
				<Button
					label={lang.general.modal.confirm}
					onPress={handleSaveChanges}
					loading={loading}
					highlight
				/>
			</ScrollView>
		</>
	);
}

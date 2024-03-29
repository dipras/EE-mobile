import React, { FC, useState, ComponentType, useMemo, useEffect } from "react";
import { AppStackScreenProps } from "app/navigators";
import { Screen, TextField, Button, Icon, TextFieldAccessoryProps } from "app/components";
import { colors, spacing } from "app/theme";
import { TextInputChangeEventData, ViewStyle } from "react-native";
import { useStores } from "app/models";
import { resetPasswordApi } from "app/utils/api/auth.api";


interface AccountSettingScreenProps extends AppStackScreenProps<"AccountSetting"> { }

export const AccountSettingScreen: FC<AccountSettingScreenProps> = ({navigation}) => {
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const { authenticationStore: { authToken } } = useStores();
    const [loading, setLoading] = useState(false);
    const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
    const [firstRender, setFirstRender] = useState(true);
    const [error, setError] = useState("");

    const checkPassword = () => {
        if(password.length < 8) {
            setError("Password should have atleast 8 character!");
            return false;
        } else if(password !== repassword) {
            setError("Your confirmation is not same with password!");
            return false;
        } else {
            setError("");
            return true;
        }
    }

    useEffect(() => {
        if(firstRender) {
            setFirstRender(false);
            return;
        }
        
        checkPassword();
    }, [password, repassword])

    const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
        () =>
            function PasswordRightAccessory(props: TextFieldAccessoryProps) {
                return (
                    <Icon
                        icon={isAuthPasswordHidden ? "view" : "hidden"}
                        color={colors.palette.neutral800}
                        containerStyle={props.style}
                        size={20}
                        onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
                    />
                )
            },
        [isAuthPasswordHidden],
    )

    const submit = async () => {
        if(!checkPassword()) return;
        setLoading(true);
        try {
            await resetPasswordApi(authToken, password);
            alert("Change password success");
            navigation.goBack();
        } catch (error) {
            console.log(error)
            alert("There something is wrong");
        } finally {
            setLoading(false)
        }
    }

    const inputPassword = (text: string) => {
        setPassword(text);
    }

    const inputRepassword = (text: string) => {
        setRepassword(text);
    }

    return (
        <Screen preset="scroll" safeAreaEdges={["bottom"]} style={{ paddingHorizontal: spacing.lg, paddingVertical: 0, marginBottom: 0 }} keyboardOffset={100}>
            <TextField
                value={password}
                containerStyle={$textField}
                inputWrapperStyle={$textStyle}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={inputPassword}
                label="Password"
                placeholder="Masukan Password anda"
                secureTextEntry={isAuthPasswordHidden}
                RightAccessory={PasswordRightAccessory}
                autoComplete="password"
            />
            <TextField
                value={repassword}
                containerStyle={$textField}
                inputWrapperStyle={$textStyle}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={inputRepassword}
                label="Confirm Password"
                placeholder="Masukan ulang Password anda"
                secureTextEntry={isAuthPasswordHidden}
                RightAccessory={PasswordRightAccessory}
                autoComplete="password"
                helper={error}
                status={error == "" ? undefined : "error"}
            />
            <Button style={$btn} textStyle={{ color: "#FFF" }} onPress={submit} loading={loading} disabled={error !== ""}>Save</Button>
        </Screen>
    )
}

const $textField: ViewStyle = {
    marginBottom: spacing.lg,
    backgroundColor: "white",
}

const $textStyle: ViewStyle = {
    backgroundColor: "#F2F2F2",
    borderRadius: 30,
    borderWidth: 0,
    paddingVertical: 5,
}

const $btn: ViewStyle = {
    backgroundColor: colors.main,
    borderWidth: 0,
    borderRadius: 15
}
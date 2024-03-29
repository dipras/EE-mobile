import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, ViewStyle, View, Image, ActivityIndicator, Alert } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import axios from "axios"
import { loginApi } from "app/utils/api/auth.api"
import Toast from 'react-native-root-toast';

const googleIcon = require("../../assets/images/google.png")
const privyIcon = require("../../assets/images/privy.png")
interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setSubmitted] = useState(false)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError, setAuthName, setExpiredtimestamp },
    statusStore: {setRedirect}
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  const login = async () => {
    if(validationError !== "") {
      setSubmitted(true);
      return;
    }
    setIsLoading(true);
    try {
      let response = await loginApi({
        email: authEmail,
        password: authPassword
      });
      const {accessToken, expiredIn} = response.data.data;
      setAuthToken(accessToken);
      setExpiredtimestamp(expiredIn);

      response = await axios.get("https://be-dev.exportexpert.id/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      setAuthName(response.data.data.name);
      if(_props.route.params.redirect?.id) {
        setRedirect("CourseDetail", {id: _props.route.params.redirect.id});
      }
      _props.navigation.replace("Main", {screen: "Home", params: {}});
    } catch (error: any) {
      let toast = Toast.show(error?.response?.data?.message || "There something is wrong", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })

      setTimeout(() => {
        Toast.hide(toast);
      }, 1000);
    } finally {
      setIsLoading(false)
    }
  }

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

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <View>
        <Text size="xl" weight="bold" style={{ textAlign: "center" }}>
          Sign In
        </Text>
        <Text size="sm" style={{ textAlign: "center", color: "#808080" }}>
          Hi, Welcome back you have been missed
        </Text>
      </View>
      <View style={{ marginBottom: 50 }}>
        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={$textField}
          inputWrapperStyle={{
            backgroundColor: "#F2F2F2",
            borderRadius: 30,
            borderWidth: 0,
            paddingVertical: 5,
          }}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          labelTx="loginScreen.emailFieldLabel"
          placeholder="Enter your email"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={$textField}
          inputWrapperStyle={{
            backgroundColor: "#F2F2F2",
            borderRadius: 30,
            borderWidth: 0,
            paddingVertical: 5,
          }}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen.passwordFieldLabel"
          placeholder="Enter your password"
          onSubmitEditing={login}
          RightAccessory={PasswordRightAccessory}
        />

        <Text style={{ color: "#F6BE2C", textAlign: "right" }}>Forgot Password?</Text>
      </View>
      <Button
        testID="login-button"
        style={$tapButton}
        preset="reversed"
        onPress={login}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator /> : "Sign In"}{" "}
      </Button>

      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
        <View style={{ height: 1, backgroundColor: "#878787", flex: 1 }}></View>
        <Text style={{ paddingHorizontal: 10 }}>Sign In with others</Text>
        <View style={{ height: 1, backgroundColor: "#878787", flex: 1 }}></View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Image source={googleIcon} style={{ width: 40, height: 40, marginRight: 10 }} />
        <Image source={privyIcon} style={{ width: 115, height: 30 }} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text> Don't have an account? </Text>
        <Text style={{ color: "#F6BE2C" }}>Sign Up</Text>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}
const $textField: ViewStyle = {
  marginBottom: spacing.lg,
  backgroundColor: "white",
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: "#F6BE2C",
  borderRadius: 15,
}

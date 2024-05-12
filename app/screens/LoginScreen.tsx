import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { loginApi, meApi, verifyGoogle } from "app/utils/api/auth.api"
import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { ActivityIndicator, Image, TextInput, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Toast from "react-native-root-toast"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import Constants from 'expo-constants';

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices()
  const userInfo = await GoogleSignin.signIn()
  return userInfo
}

const googleIcon = require("../../assets/images/google.png")
const privyIcon = require("../../assets/images/privy.png")
interface LoginScreenProps extends AppStackScreenProps<"Login"> { }

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setSubmitted] = useState(false)
  const {
    authenticationStore: {
      authEmail,
      setAuthEmail,
      setAuthToken,
      validationError,
      setAuthName,
      setExpiredtimestamp,
    },
    statusStore: { setRedirect },
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

  const login = async (type: "email" | "google") => {
    try {
      setIsLoading(true)
      let response: any
      if (type === "google") {
        if (Constants.appOwnership === "expo") {
          alert("This feature only work on native")
          return;
        }
        const googleResponse = await GoogleLogin()
        response = await verifyGoogle(`${googleResponse.idToken}`)
      } else {
        if (validationError !== "") {
          setSubmitted(true)
          return
        }
        response = await loginApi({
          email: authEmail,
          password: authPassword,
        })
      }
      const { accessToken, expiredIn } = response.data.data
      setAuthToken(accessToken)
      setExpiredtimestamp(expiredIn)

      response = await meApi(accessToken)

      setAuthName(response.data.data.name)
      const { id, to } = _props.route.params.redirect || {}
      if (id) {
        if (to === "ExpertDetail") {
          setRedirect("ExpertDetail", { id })
        } else {
          setRedirect("CourseDetail", { id })
        }
      }
      _props.navigation.replace("Main", { screen: "Home", params: {} })
    } catch (error: any) {
      const toast = Toast.show(error?.response?.data?.message || "There something is wrong", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      })
      console.log(error)

      setTimeout(() => {
        Toast.hide(toast)
      }, 1000)
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
          onSubmitEditing={() => login("email")}
          RightAccessory={PasswordRightAccessory}
        />

        <Text style={{ color: "#F6BE2C", textAlign: "right" }}>Forgot Password?</Text>
      </View>
      <Button
        testID="login-button"
        style={$tapButton}
        preset="reversed"
        onPress={() => login("email")}
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
        <TouchableOpacity onPress={() => login("google")}>
          <Image source={googleIcon} style={{ width: 40, height: 40, marginRight: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _props.navigation.navigate("PrivyLogin")}>
          <Image source={privyIcon} style={{ width: 115, height: 30 }} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text> Don't have an account? </Text>
        <Text style={{ color: "#F6BE2C" }} onPress={() => _props.navigation.navigate("Register")}>
          Sign Up
        </Text>
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

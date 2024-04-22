import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, ViewStyle, View, Image, ActivityIndicator, Alert } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { registerApi, verifyGoogle, meApi } from "app/utils/api/auth.api"
import Toast from 'react-native-root-toast';
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { TouchableOpacity } from "react-native-gesture-handler"

const googleIcon = require("../../assets/images/google.png")
const privyIcon = require("../../assets/images/privy.png")
const checkSuccess = require("assets/images/check-success.png");

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}


const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  const {
    authenticationStore: { setAuthToken, setAuthName, setExpiredtimestamp }
  } = useStores()
  const authPasswordInput = useRef<TextInput>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [authPassword, setAuthPassword] = useState("")
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSuccess, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const setEmailForm = (text: string) => {
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        setError("Email is not valid");
    } else {
        setError("");
    }
    
    setEmail(text);
  }

  const register = async () => {
    setIsLoading(true);
    try {
        await registerApi({
            name,
            email,
            password: authPassword,
        });

        setSuccess(true);
    } catch (error: any) {
        const toast = Toast.show(error?.response?.data?.message || "There something is wrong", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          })
          console.log(error)
    
          setTimeout(() => {
            Toast.hide(toast);
          }, 1000);
    } finally {
        setIsLoading(false)
    }
    
  }

  const login = async (type : "privy" | "google") => {
    try {
      setIsLoading(true);
      let response: any;
      if(type == "google") {
        const googleResponse = await GoogleLogin();
        response = await verifyGoogle(`${googleResponse.idToken}`);
      }
      const {accessToken, expiredIn} = response.data.data;
      setAuthToken(accessToken);
      setExpiredtimestamp(expiredIn);

      response = await meApi(accessToken);

      setAuthName(response.data.data.name);
      _props.navigation.replace("Main", {screen: "Home", params: {}});
    } catch (error: any) {
      const toast = Toast.show(error?.response?.data?.message || "There something is wrong", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
      console.log(error)

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

  if(isSuccess) {
      return (
        <View style={{flex: 1, paddingVertical: spacing.xxl, paddingHorizontal: spacing.md}}>
            <View style={{flex: 1, justifyContent: "center"}}>
                <Image source={checkSuccess} style={{alignSelf: "center", height: 125, width: 125}} />
                <Text weight="bold" size="lg" style={{textAlign: "center"}} >Submitted</Text>
                <Text style={{textAlign: "center"}}>You have successfully submited your register, please check your email to confirm</Text>
            </View>
            <Button style={{backgroundColor: colors.main, borderColor: colors.main}} textStyle={{color: "#FFF"}} onPress={() => _props.navigation.goBack()}>Back</Button>
        </View>
      )
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <View>
        <Text size="xl" weight="bold" style={{ textAlign: "center" }}>
          Sign Up
        </Text>
        <Text size="sm" style={{ textAlign: "center", color: "#808080" }}>
            Fill your information below or register with your Google account 
        </Text>
      </View>
      <View style={{ marginBottom: 50 }}>
        <TextField
            value={name}
            onChangeText={text => setName(text)}
            containerStyle={$textField}
            inputWrapperStyle={$inputWrapper}
            autoCapitalize="words"
            label="Name"
            placeholder="Enter Your Name"
         />
        <TextField
          value={email}
          onChangeText={setEmailForm}
          containerStyle={$textField}
          inputWrapperStyle={$inputWrapper}
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
          inputWrapperStyle={$inputWrapper}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen.passwordFieldLabel"
          placeholder="Enter your password"
          onSubmitEditing={register}
          RightAccessory={PasswordRightAccessory}
        />

      </View>
      <Button
        testID="login-button"
        style={$tapButton}
        preset="reversed"
        onPress={register}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator /> : "Sign Up"}{" "}
      </Button>

      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
        <View style={{ height: 1, backgroundColor: "#878787", flex: 1 }}></View>
        <Text style={{ paddingHorizontal: 10 }}>Sign Up with others</Text>
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
        <Image source={privyIcon} style={{ width: 115, height: 30 }} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text> Already have an account? </Text>
        <Text style={{ color: "#F6BE2C"}} onPress={() => _props.navigation.navigate("Login", {})}>Sign In</Text>
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

const $inputWrapper = {
    backgroundColor: "#F2F2F2",
    borderRadius: 30,
    borderWidth: 0,
    paddingVertical: 5,
  };

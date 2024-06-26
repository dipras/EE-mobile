/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import * as Screens from "app/screens"
import { colors } from "app/theme"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { useStores } from "../models"
import { MainNavigator, MainTabParamList } from "./MainNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: { redirect?: any }
  Register: undefined
  Main: NavigatorScreenParams<MainTabParamList>
  Boarding: undefined
  ProfileDetail: undefined
  Event: undefined
  EventDetail: { id: number }
  Exhibitor: {
    id: number
    price: number
    image: string
    productType: { id: number; name: string }
    name: string
  }
  Course: undefined
  CourseDetail: { id: number }
  Expert: undefined
  ExpertDetail: { id: number }
  OrderSummary: {
    id: number
    price: number
    image: string
    productType: { id: number; name: string }
    name: string
    first_name?: string
    last_name?: string
    phone_number?: string
    email?: string
  }
  AccountSetting: undefined
  Wishlist: undefined
  BoardingSign: undefined
  About: undefined
  Survey: undefined
  Halal: undefined
  Podcast: undefined
  PurchaseHistory: undefined
  PodcastPlay: { data: any }
  Success: undefined
  Payment: { url: string },
  PrivyLogin: undefined

  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

let interval: any
const AppStack = observer(function AppStack() {
  const {
    statusStore: { isFirstTime },
    authenticationStore: { expiredTimestamp, logout },
  } = useStores()

  useEffect(() => {
    clearInterval(interval)
    interval = setInterval(() => {
      if (expiredTimestamp && Math.floor(Date.now() / 1000) > expiredTimestamp) {
        logout()
        alert("Session has ended")
      }
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [expiredTimestamp])

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={isFirstTime ? "Boarding" : "Main"}
    >
      <Stack.Screen name="Boarding" component={Screens.BoardingScreen} />
      <Stack.Screen name="BoardingSign" component={Screens.BoardingSignScreen} />
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="Login" component={Screens.LoginScreen} />
      <Stack.Screen name="Register" component={Screens.RegisterScreen} />
      <Stack.Screen
        name="ProfileDetail"
        component={Screens.ProfileDetailScreen}
        options={{ headerShown: true, title: "Your Profile" }}
      />
      <Stack.Screen name="Event" component={Screens.EventScreen} />
      <Stack.Screen name="Course" component={Screens.CourseScreen} />
      <Stack.Screen name="CourseDetail" component={Screens.CourseDetailScreen} />
      <Stack.Screen name="EventDetail" component={Screens.EventDetailScreen} />
      <Stack.Screen name="ExpertDetail" component={Screens.ExpertDetailScreen} />
      <Stack.Screen name="Expert" component={Screens.ExpertScreen} />
      <Stack.Screen name="About" component={Screens.AboutScreen} />
      <Stack.Screen name="Podcast" component={Screens.PodcastScreen} />
      <Stack.Screen
        name="OrderSummary"
        component={Screens.OrderSummaryScreen}
        options={{ headerShown: true, title: "Order Summary", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="AccountSetting"
        component={Screens.AccountSettingScreen}
        options={{ headerShown: true, title: "Account Setting", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="Wishlist"
        component={Screens.WishlistScreen}
        options={{ headerShown: true, title: "Wishlist", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="PurchaseHistory"
        component={Screens.PurchaseHistoryScreen}
        options={{ headerShown: true, title: "Purchase History", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="Exhibitor"
        component={Screens.ExhibitorScreen}
        options={{ headerShown: true, title: "Exhibitor", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="Survey"
        component={Screens.SurveyScreen}
        options={{ headerShown: true, title: "Survey Your Market" }}
      />
      <Stack.Screen
        name="Halal"
        component={Screens.HalalScreen}
        options={{ headerShown: true, title: "Halal Your Market" }}
      />
      <Stack.Screen
        name="PodcastPlay"
        component={Screens.PodcastPlayScreen}
        options={{ headerShown: true, title: "Export Expert Podcast" }}
      />
      <Stack.Screen name="Success" component={Screens.SuccessScreen} />
      <Stack.Screen
        name="Payment"
        component={Screens.PaymenScreenScreen}
        options={{ headerShown: true, title: "Payment" }}
      />
      <Stack.Screen
        name="PrivyLogin"
        component={Screens.PrivyLoginScreen}
        options={{ headerShown: true, title: "Privy Login" }}
      />

      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})

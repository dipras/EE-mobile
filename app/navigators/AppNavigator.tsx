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
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { useStores } from "../models"
import { MainNavigator, MainTabParamList } from "./MainNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"

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
  Login: {redirect?: any}
  Main: NavigatorScreenParams<MainTabParamList>
  Boarding: undefined
  ProfileDetail: undefined
  Event: undefined
  Course: undefined
  CourseDetail: {id: number}
  Expert: undefined,
  OrderSummary: {id: number, price: number, image: string, productType: {id: Number, name: string}, name: string}
  AccountSetting: undefined,
  Wishlist: undefined,
  BoardingSign: undefined
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

let interval: any;
const AppStack = observer(function AppStack() {
  const {
    statusStore: { isFirstTime },
    authenticationStore: {expiredTimestamp, logout, authToken}
  } = useStores()

  useEffect(() => {
    clearInterval(interval);
    interval = setInterval(() => {
      if(expiredTimestamp && Math.floor(Date.now() / 1000) > expiredTimestamp) {
        logout();
        alert("Session has ended");
      }
    }, 5000);

    return () => {
      clearInterval(interval)
    }
  }, [expiredTimestamp]);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={isFirstTime ? "Boarding" : "Main"}
    >
      {isFirstTime ? (
        <>
          <Stack.Screen name="Boarding" component={Screens.BoardingScreen} />
          <Stack.Screen name="BoardingSign" component={Screens.BoardingSignScreen} />
    
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={MainNavigator} />
        </>
      )}
      <Stack.Screen name="Login" component={Screens.LoginScreen} />
      <Stack.Screen name="ProfileDetail" component={Screens.ProfileDetailScreen} options={{headerShown: true, title: "Your Profile"}} />
      <Stack.Screen name="Event" component={Screens.EventScreen} />
      <Stack.Screen name="Course" component={Screens.CourseScreen} />
      <Stack.Screen name="CourseDetail" component={Screens.CourseDetailScreen} />
      <Stack.Screen name="ExpertDetail" component={Screens.ExpertDetailScreen} />
      <Stack.Screen name="Expert" component={Screens.ExpertScreen} />
      <Stack.Screen name="OrderSummary" component={Screens.OrderSummaryScreen} options={{headerShown: true, title: "Order Summary", headerShadowVisible: false}} />
      <Stack.Screen name="AccountSetting" component={Screens.AccountSettingScreen} options={{headerShown: true, title: "Account Setting", headerShadowVisible: false}} />
      <Stack.Screen name="Wishlist" component={Screens.WishlistScreen} options={{headerShown: true, title: "Wishlist", headerShadowVisible: false}} />

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

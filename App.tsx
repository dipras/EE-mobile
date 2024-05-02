import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef } from "react";
import App from "./app/app";

if(Constants.appOwnership !== "expo") {
  GoogleSignin.configure({
    webClientId: "227957573473-g5888vmn7gcdpcdfs6jahgpjqgmr0a4f.apps.googleusercontent.com",
    scopes: ['profile', 'email'],
  });
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // setNotification(notification);
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default IgniteApp
